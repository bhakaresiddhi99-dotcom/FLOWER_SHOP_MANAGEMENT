const API = "http://127.0.0.1:8000/order/";

let updateId = null;


// ========================================
// ADD + UPDATE ORDER
// ========================================

document
    .getElementById("orderForm")
    .addEventListener("submit", async function (e) {

        e.preventDefault();

        const data = {

            customer_id:
                Number(document.getElementById("customer_id").value),

            order_date:
                document.getElementById("order_date").value,

            total_amount:
                Number(document.getElementById("total_amount").value),

            order_status:
                document.getElementById("order_status").value

        };

        let response;

        try {

            // ============================
            // ADD ORDER
            // ============================

            if (updateId === null) {

                response = await fetch(API, {

                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(data)

                });

            }

            // ============================
            // UPDATE ORDER
            // ============================

            else {

                response = await fetch(`${API}${updateId}`, {

                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(data)

                });

            }


            // ============================
            // SUCCESS
            // ============================

            if (response.ok) {

                alert("Order Saved Successfully");

                document
                    .getElementById("orderForm")
                    .reset();

                updateId = null;

                loadOrders();

            }

            // ============================
            // ERROR
            // ============================

            else {

                const errorText = await response.text();

                console.error(
                    "Order Save Error:",
                    errorText
                );

                alert("Order Failed");

            }

        }

        catch (error) {

            console.error(
                "Order Request Error:",
                error
            );

            alert("Error while saving order.");

        }

    });


// ========================================
// GET ALL ORDERS
// ========================================

async function loadOrders() {

    try {

        const response = await fetch(API);

        if (!response.ok) {

            throw new Error(
                "Failed to load orders"
            );

        }

        const orders = await response.json();

        let rows = "";


        orders.forEach(order => {

            rows += `

                <tr>

                    <td>${order.id}</td>

                    <td>${order.customer_id}</td>

                    <td>${order.order_date}</td>

                    <td>${order.total_amount}</td>

                    <td>${order.order_status}</td>

                    <td>

                        <button
                            onclick="editOrder(${order.id})">
                            Edit
                        </button>

                        <button
                            onclick="deleteOrder(${order.id})">
                            Delete
                        </button>

                    </td>

                </tr>

            `;

        });


        document
            .getElementById("orderTable")
            .innerHTML = rows;

    }

    catch (error) {

        console.error(
            "Load Orders Error:",
            error
        );

    }

}


// ========================================
// EDIT ORDER
// ========================================

async function editOrder(id) {

    try {

        const response =
            await fetch(`${API}${id}`);


        if (!response.ok) {

            throw new Error(
                "Failed to get order"
            );

        }


        const order =
            await response.json();


        document
            .getElementById("customer_id")
            .value =
            order.customer_id;


        document
            .getElementById("order_date")
            .value =
            order.order_date;


        document
            .getElementById("total_amount")
            .value =
            order.total_amount;


        document
            .getElementById("order_status")
            .value =
            order.order_status;


        // Store order ID
        updateId = id;

    }

    catch (error) {

        console.error(
            "Edit Order Error:",
            error
        );

        alert("Failed to load order.");

    }

}


// ========================================
// DELETE ORDER
// ========================================

async function deleteOrder(id) {

    if (!confirm("Delete Order?")) {

        return;

    }


    try {

        const response =
            await fetch(`${API}${id}`, {

                method: "DELETE"

            });


        if (response.ok) {

            alert("Order Deleted");

            loadOrders();

        }

        else {

            const errorText =
                await response.text();

            console.error(
                "Delete Order Error:",
                errorText
            );

            alert("Failed to delete order.");

        }

    }

    catch (error) {

        console.error(
            "Delete Order Error:",
            error
        );

        alert("Error while deleting order.");

    }

}


// ========================================
// LOAD ORDERS WHEN PAGE OPENS
// ========================================

loadOrders();