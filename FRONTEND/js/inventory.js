const API = "http://127.0.0.1:8000/inventory/";

let updateId = null;

document.getElementById("inventoryForm")
.addEventListener("submit", async function(e){

    e.preventDefault();

    const data = {

        flower_id: Number(document.getElementById("flower_id").value),

        stock_quantity: Number(document.getElementById("stock_quantity").value),

        last_updated: document.getElementById("last_updated").value

    };

    let response;

    if(updateId == null){

        response = await fetch(API,{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify(data)

        });

    }

    else{

        response = await fetch(`${API}${updateId}`,{

            method:"PUT",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify(data)

        });

        updateId = null;

    }

    if(response.ok){

        alert("Inventory Saved Successfully");

        document.getElementById("inventoryForm").reset();

        loadInventory();

    }

}

);

async function loadInventory(){

    const response = await fetch(API);

    const inventories = await response.json();

    let rows="";

    inventories.forEach(inventory=>{

        rows += `

        <tr>

        <td>${inventory.inventory_id}</td>

        <td>${inventory.flower_id}</td>

        <td>${inventory.stock_quantity}</td>

        <td>${inventory.last_updated}</td>

        <td>

        <button onclick="editInventory(${inventory.inventory_id})">

        Edit

        </button>

        <button onclick="deleteInventory(${inventory.inventory_id})">

        Delete

        </button>

        </td>

        </tr>

        `;

    });

    document.getElementById("inventoryTable").innerHTML = rows;

}

async function editInventory(id){

    const response = await fetch(`${API}${id}`);

    const inventory = await response.json();

    document.getElementById("flower_id").value = inventory.flower_id;

    document.getElementById("stock_quantity").value = inventory.stock_quantity;

    document.getElementById("last_updated").value = inventory.last_updated;

    updateId = id;

}

async function deleteInventory(id){

    if(confirm("Delete Inventory?")){

        const response = await fetch(`${API}${id}`,{

            method:"DELETE"

        });

        if(response.ok){

            alert("Inventory Deleted");

            loadInventory();

        }

    }

}

loadInventory();