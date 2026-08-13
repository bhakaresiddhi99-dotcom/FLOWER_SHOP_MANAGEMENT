const API_URL = "http://127.0.0.1:8000/inventory/";

let inventoryData = [];

window.onload = function () {
    loadInventory();
};

async function loadInventory() {

    try {

        const response = await fetch(API_URL);

        inventoryData = await response.json();

        displayInventory(inventoryData);

    }
    catch (error) {

        console.log(error);

        alert("Cannot connect to FastAPI Server");

    }

}

function displayInventory(data) {

    let html = "";

    data.forEach(item => {

        let status = "";

        if (item.stock_quantity == 0) {

            status = "<span class='outstock'>❌ Out of Stock</span>";

        }
        else if (item.stock_quantity <= 10) {

            status = "<span class='lowstock'>⚠️ Low Stock</span>";

        }
        else {

            status = "<span class='instock'>✅ In Stock</span>";

        }

        html += `

        <tr>

            <td>${item.inventory_id}</td>

            <td>${item.flower_id}</td>

            <td>${item.stock_quantity}</td>

            <td>${status}</td>

            <td>${item.last_updated}</td>

        </tr>

        `;

    });

    document.getElementById("inventoryTable").innerHTML = html;

}

function searchFlower() {

    const keyword = document
        .getElementById("search")
        .value
        .toLowerCase();

    const filtered = inventoryData.filter(item =>

        item.flower_id
            .toString()
            .includes(keyword)

    );

    displayInventory(filtered);

}