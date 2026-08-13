const API = "http://127.0.0.1:8000/order/";

let updateId = null;


// ADD + UPDATE ORDER

document
.getElementById("orderForm")
.addEventListener("submit", async function(e){

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


    if(updateId === null){


        // POST

        response = await fetch(API,{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify(data)

        });


    }

    else{


        // PUT

        response = await fetch(`${API}${updateId}`,{

            method:"PUT",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify(data)

        });


        updateId=null;

    }



    if(response.ok){


        alert("Order Saved Successfully");


        document
        .getElementById("orderForm")
        .reset();


        loadOrders();


    }

    else{

        let error = await response.json();

        console.log(error);

        alert("Order Failed");

    }


});




// GET ALL ORDERS

async function loadOrders(){


    const response = await fetch(API);


    const orders = await response.json();


    let rows="";


    orders.forEach(order=>{


        rows += `

        <tr>

        <td>${order.order_id}</td>

        <td>${order.customer_id}</td>

        <td>${order.order_date}</td>

        <td>${order.total_amount}</td>

        <td>${order.order_status}</td>


        <td>


        <button onclick="editOrder(${order.order_id})">
        Edit
        </button>


        <button onclick="deleteOrder(${order.order_id})">
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




// EDIT ORDER


async function editOrder(id){


    const response =
    await fetch(`${API}${id}`);


    const order =
    await response.json();



    document.getElementById("customer_id").value =
    order.customer_id;


    document.getElementById("order_date").value =
    order.order_date;


    document.getElementById("total_amount").value =
    order.total_amount;


    document.getElementById("order_status").value =
    order.order_status;



    updateId=id;


}




// DELETE ORDER


async function deleteOrder(id){


    if(confirm("Delete Order?")){


        const response =
        await fetch(`${API}${id}`,{


            method:"DELETE"


        });



        if(response.ok){


            alert("Order Deleted");


            loadOrders();


        }


    }


}



loadOrders();