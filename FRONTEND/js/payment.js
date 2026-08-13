const API = "http://127.0.0.1:8000/payment/";

let updateId = null;

document.getElementById("paymentForm")
.addEventListener("submit", async function(e){

e.preventDefault();

const data={

order_id:Number(document.getElementById("order_id").value),

payment_method:document.getElementById("payment_method").value,

payment_status:document.getElementById("payment_status").value,

amount:Number(document.getElementById("amount").value)

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

alert("Payment Saved Successfully");

document.getElementById("paymentForm").reset();

loadPayments();

}

});

async function loadPayments(){

const response=await fetch(API);

const payments=await response.json();

let rows="";

payments.forEach(payment=>{

rows+=`

<tr>

<td>${payment.payment_id}</td>

<td>${payment.order_id}</td>

<td>${payment.payment_method}</td>

<td>${payment.payment_status}</td>

<td>${payment.amount}</td>

<td>

<button onclick="editPayment(${payment.payment_id})">

Edit

</button>

<button onclick="deletePayment(${payment.payment_id})">

Delete

</button>

</td>

</tr>

`;

});

document.getElementById("paymentTable").innerHTML=rows;

}

async function editPayment(id){

const response=await fetch(`${API}${id}`);

const payment=await response.json();

document.getElementById("order_id").value=payment.order_id;

document.getElementById("payment_method").value=payment.payment_method;

document.getElementById("payment_status").value=payment.payment_status;

document.getElementById("amount").value=payment.amount;

updateId=id;

}

async function deletePayment(id){

if(confirm("Delete Payment?")){

const response=await fetch(`${API}${id}`,{

method:"DELETE"

});

if(response.ok){

alert("Payment Deleted");

loadPayments();

}

}

}

loadPayments();