console.log("Dashboard Loaded Successfully");

const API = "http://127.0.0.1:8000";

let ordersChart = null;
let salesChart = null;


// ===============================
// LOAD DASHBOARD DATA
// ===============================

async function loadDashboard() {

    try {

        let admin = await fetch(`${API}/admin/`);
        document.getElementById("adminCount").innerText =
            (await admin.json()).length;

        let category = await fetch(`${API}/category/`);
        document.getElementById("categoryCount").innerText =
            (await category.json()).length;

        let flower = await fetch(`${API}/flower/`);
        document.getElementById("flowerCount").innerText =
            (await flower.json()).length;

        let customer = await fetch(`${API}/customer/`);
        document.getElementById("customerCount").innerText =
            (await customer.json()).length;

        let order = await fetch(`${API}/order/`);
        const orders = await order.json();

        document.getElementById("orderCount").innerText =
            orders.length;


        let orderItem = await fetch(`${API}/order-item/`);
        document.getElementById("orderItemCount").innerText =
            (await orderItem.json()).length;

        let payment = await fetch(`${API}/payment/`);
        document.getElementById("paymentCount").innerText =
            (await payment.json()).length;

        let delivery = await fetch(`${API}/delivery/`);
        document.getElementById("deliveryCount").innerText =
            (await delivery.json()).length;

        let bouquet = await fetch(`${API}/bouquet/`);
        document.getElementById("bouquetCount").innerText =
            (await bouquet.json()).length;

        let inventory = await fetch(`${API}/inventory/`);
        document.getElementById("inventoryCount").innerText =
            (await inventory.json()).length;


        // Load graphs using real order data
        loadCharts(orders);

    }

    catch (error) {

        console.error(error);
        alert("Failed to load Dashboard Data");

    }

}


// ===============================
// PARSE ORDER DATE
// ===============================

function parseOrderDate(dateValue) {

    if (!dateValue) {
        return null;
    }

    // Supports DD-MM-YYYY
    if (
        typeof dateValue === "string" &&
        /^\d{2}-\d{2}-\d{4}$/.test(dateValue)
    ) {

        const [day, month, year] = dateValue.split("-");

        return new Date(
            Number(year),
            Number(month) - 1,
            Number(day)
        );
    }


    // Supports YYYY-MM-DD / ISO date
    const date = new Date(dateValue);

    if (!isNaN(date.getTime())) {
        return date;
    }

    return null;
}


// ===============================
// LOAD REAL-TIME CHARTS
// ===============================

function loadCharts(orders) {

    const months = [
        "Jan", "Feb", "Mar", "Apr",
        "May", "Jun", "Jul", "Aug",
        "Sep", "Oct", "Nov", "Dec"
    ];


    // Monthly order count
    const monthlyOrders = [
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0
    ];


    // Monthly sales amount
    const monthlySales = [
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0
    ];


    // Calculate data from actual orders
    orders.forEach(order => {

        const date = parseOrderDate(order.order_date);

        if (!date) {
            return;
        }

        const month = date.getMonth();

        monthlyOrders[month]++;

        monthlySales[month] +=
            Number(order.total_amount) || 0;

    });


    // ===============================
    // MONTHLY ORDERS CHART
    // ===============================

    if (ordersChart) {
        ordersChart.destroy();
    }

    ordersChart = new Chart(
        document.getElementById("ordersChart"),
        {

            type: "bar",

            data: {

                labels: months,

                datasets: [{

                    label: "Orders",

                    data: monthlyOrders,

                    backgroundColor: "#2e8b57"

                }]

            },

            options: {

                responsive: true,

                scales: {

                    y: {

                        beginAtZero: true,

                        ticks: {
                            stepSize: 1
                        }

                    }

                }

            }

        }
    );


    // ===============================
    // SALES REPORT CHART
    // ===============================

    if (salesChart) {
        salesChart.destroy();
    }

    salesChart = new Chart(
        document.getElementById("salesChart"),
        {

            type: "line",

            data: {

                labels: months,

                datasets: [{

                    label: "Sales",

                    data: monthlySales,

                    borderColor: "#ff69b4",

                    backgroundColor:
                        "rgba(255,105,180,0.15)",

                    fill: true,

                    tension: 0.3

                }]

            },

            options: {

                responsive: true,

                scales: {

                    y: {

                        beginAtZero: true,

                        ticks: {

                            callback: function(value) {

                                return "₹" + value;

                            }

                        }

                    }

                }

            }

        }
    );

}


// ===============================
// FIRST LOAD
// ===============================

loadDashboard();


// ===============================
// AUTO REFRESH
// EVERY 5 SECONDS
// ===============================

setInterval(() => {

    loadDashboard();

}, 5000);