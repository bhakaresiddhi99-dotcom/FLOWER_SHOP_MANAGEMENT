const API_URL = "http://127.0.0.1:8000/delivery/";

let deliveryData = [];

window.onload = function () {
    loadDelivery();
};

async function loadDelivery() {

    try {

        const response = await fetch(API_URL);

        deliveryData = await response.json();

        displayDelivery(deliveryData);

    }
    catch (error) {

        console.log(error);

        alert("Cannot connect to FastAPI Server");

    }

}

function displayDelivery(data) {

    let html = "";

    data.forEach(item => {

        let status = "";

        switch(item.delivery_status.toLowerCase()){

            case "pending":
                status = "<span class='pending'>🟡 Pending</span>";
                break;

            case "shipped":
                status = "<span class='shipped'>🔵 Shipped</span>";
                break;

            case "out for delivery":
                status = "<span class='outfordelivery'>🟣 Out for Delivery</span>";
                break;

            case "delivered":
                status = "<span class='delivered'>🟢 Delivered</span>";
                break;

            case "cancelled":
                status = "<span class='cancelled'>🔴 Cancelled</span>";
                break;

            default:
                status = item.delivery_status;

        }

        html += `

        <tr>

            <td>${item.delivery_id}</td>

            <td>${item.order_id}</td>

            <td>${item.delivery_address}</td>

            <td>${item.delivery_date}</td>

            <td>${status}</td>

        </tr>

        `;

    });

    document.getElementById("deliveryTable").innerHTML = html;

}

function searchDelivery(){

    const keyword = document
        .getElementById("search")
        .value
        .toLowerCase();

    const filtered = deliveryData.filter(item =>

        item.order_id
            .toString()
            .includes(keyword)

    );

    displayDelivery(filtered);

}