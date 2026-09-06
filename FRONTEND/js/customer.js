const API = "http://127.0.0.1:8000/customer";

let updateId = null;

// ================================
// ADD + UPDATE CUSTOMER
// ================================
document.getElementById("customerForm")
    .addEventListener("submit", async function (e) {

        e.preventDefault();

        const data = {
            customer_name: document.getElementById("customer_name").value,
            email: document.getElementById("email").value,
            phone: document.getElementById("phone").value,
            address: document.getElementById("address").value
        };

        let response;

        // ADD CUSTOMER
        if (updateId === null) {

            response = await fetch(API, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

        }

        // UPDATE CUSTOMER
        else {

            response = await fetch(`${API}/${updateId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            updateId = null;
        }

        if (response.ok) {

            alert("Customer Saved Successfully");

            document.getElementById("customerForm").reset();

            loadCustomers();

        } else {

            const error = await response.text();

            console.error("Save Customer Error:", error);

            alert("Failed to save customer.");

        }

    });


// ================================
// GET ALL CUSTOMERS
// ================================
async function loadCustomers() {

    try {

        const response = await fetch(API);

        if (!response.ok) {
            throw new Error("Failed to load customers");
        }

        const customers = await response.json();

        let rows = "";

        customers.forEach(customer => {

            rows += `
                <tr>

                    <td>${customer.id}</td>

                    <td>${customer.customer_name}</td>

                    <td>${customer.email}</td>

                    <td>${customer.phone}</td>

                    <td>${customer.address}</td>

                    <td>

                        <button onclick="editCustomer(${customer.id})">
                            Edit
                        </button>

                        <button onclick="deleteCustomer(${customer.id})">
                            Delete
                        </button>

                    </td>

                </tr>
            `;

        });

        document.getElementById("customerTable").innerHTML = rows;

    } catch (error) {

        console.error("Load Customers Error:", error);

    }

}


// ================================
// EDIT CUSTOMER
// ================================
async function editCustomer(id) {

    try {

        const response = await fetch(`${API}/${id}`);

        if (!response.ok) {
            throw new Error("Failed to get customer");
        }

        const customer = await response.json();

        document.getElementById("customer_name").value =
            customer.customer_name;

        document.getElementById("email").value =
            customer.email;

        document.getElementById("phone").value =
            customer.phone;

        document.getElementById("address").value =
            customer.address;

        // Store ID for UPDATE
        updateId = id;

    } catch (error) {

        console.error("Edit Customer Error:", error);

        alert("Failed to load customer.");

    }

}


// ================================
// DELETE CUSTOMER
// ================================
async function deleteCustomer(id) {

    if (!confirm("Delete Customer?")) {
        return;
    }

    try {

        const response = await fetch(`${API}/${id}`, {
            method: "DELETE"
        });

        if (response.ok) {

            alert("Customer Deleted");

            loadCustomers();

        } else {

            const error = await response.text();

            console.error("Delete Customer Error:", error);

            alert("Failed to delete customer.");

        }

    } catch (error) {

        console.error("Delete Customer Error:", error);

        alert("Error while deleting customer.");

    }

}


// ================================
// LOAD CUSTOMERS WHEN PAGE OPENS
// ================================
loadCustomers();