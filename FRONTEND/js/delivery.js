const API = "http://127.0.0.1:8000/delivery/";

let updateId = null;

document.getElementById("deliveryForm")
.addEventListener("submit", async function(e){

    e.preventDefault();

    const data={

        order_id:Number(document.getElementById("order_id").value),

        delivery_address:
        document.getElementById("delivery_address").value,

        delivery_date:
        document.getElementById("delivery_date").value,

        delivery_status:
        document.getElementById("delivery_status").value

    };

    let response;

    if(updateId==null){

        response=await fetch(API,{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify(data)

        });

    }

    else{

        response=await fetch(`${API}${updateId}`,{

            method:"PUT",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify(data)

        });

        updateId=null;

    }

    if(response.ok){

        alert("Delivery Saved Successfully");

        document.getElementById("deliveryForm").reset();

        loadDeliveries();

    }

});

async function loadDeliveries(){

    const response=await fetch(API);

    const deliveries=await response.json();

    let rows="";

    deliveries.forEach(delivery=>{

        rows+=`

        <tr>

        <td>${delivery.delivery_id}</td>

        <td>${delivery.order_id}</td>

        <td>${delivery.delivery_address}</td>

        <td>${delivery.delivery_date}</td>

        <td>${delivery.delivery_status}</td>

        <td>

        <button onclick="editDelivery(${delivery.delivery_id})">

        Edit

        </button>

        <button onclick="deleteDelivery(${delivery.delivery_id})">

        Delete

        </button>

        </td>

        </tr>

        `;

    });

    document.getElementById("deliveryTable").innerHTML=rows;

}

async function editDelivery(id){

    const response=await fetch(`${API}${id}`);

    const delivery=await response.json();

    document.getElementById("order_id").value=delivery.order_id;

    document.getElementById("delivery_address").value=delivery.delivery_address;

    document.getElementById("delivery_date").value=delivery.delivery_date;

    document.getElementById("delivery_status").value=delivery.delivery_status;

    updateId=id;

}

async function deleteDelivery(id){

    if(confirm("Delete Delivery?")){

        const response=await fetch(`${API}${id}`,{

            method:"DELETE"

        });

        if(response.ok){

            alert("Delivery Deleted");

            loadDeliveries();

        }

    }

}

loadDeliveries();