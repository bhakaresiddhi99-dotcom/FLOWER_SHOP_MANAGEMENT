const API = "http://127.0.0.1:8000/order-item/";

let updateId = null;

document.getElementById("orderItemForm")
.addEventListener("submit", async function(e){

e.preventDefault();

const data={

order_id:Number(document.getElementById("order_id").value),

flower_id:Number(document.getElementById("flower_id").value),

quantity:Number(document.getElementById("quantity").value),

price:Number(document.getElementById("price").value)

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

alert("Order Item Saved Successfully");

document.getElementById("orderItemForm").reset();

loadOrderItems();

}

});

async function loadOrderItems(){

const response=await fetch(API);

const items=await response.json();

let rows="";

items.forEach(item=>{

rows+=`

<tr>

<td>${item.id}</td>

<td>${item.order_id}</td>

<td>${item.flower_id}</td>

<td>${item.quantity}</td>

<td>${item.price}</td>

<td>

<button onclick="editOrderItem(${item.id})">
Edit
</button>

<button onclick="deleteOrderItem(${item.id})">
Delete
</button>

</td>

</tr>

`;

});

document.getElementById("orderItemTable").innerHTML=rows;

}   

async function editOrderItem(id){

const response=await fetch(`${API}${id}`);

const item=await response.json();

document.getElementById("order_id").value=item.order_id;

document.getElementById("flower_id").value=item.flower_id;

document.getElementById("quantity").value=item.quantity;

document.getElementById("price").value=item.price;

updateId=id;

}

async function deleteOrderItem(id){

if(confirm("Delete Order Item?")){

const response=await fetch(`${API}${id}`,{

method:"DELETE"

});

if(response.ok){

alert("Order Item Deleted");

loadOrderItems();

}

}

}

loadOrderItems();