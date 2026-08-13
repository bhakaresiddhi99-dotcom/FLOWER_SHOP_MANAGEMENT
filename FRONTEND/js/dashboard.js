console.log("Dashboard Loaded Successfully");

const API = "http://127.0.0.1:8000";

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
        document.getElementById("orderCount").innerText =
            (await order.json()).length;

        // ✅ Correct API
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

    }
    catch (error) {

        console.error(error);
        alert("Failed to load Dashboard Data");

    }

}

loadDashboard();

const ordersChart = new Chart(document.getElementById("ordersChart"), {

    type: "bar",

    data: {

        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],

        datasets: [{

            label: "Orders",

            data: [10, 20, 15, 30, 25, 40],

            backgroundColor: "#2e8b57"

        }]

    }

});

const salesChart = new Chart(document.getElementById("salesChart"), {

    type: "line",

    data: {

        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],

        datasets: [{

            label: "Sales",

            data: [5000, 7000, 6000, 10000, 12000, 15000],

            borderColor: "#ff69b4",

            fill: false

        }]

    }

});