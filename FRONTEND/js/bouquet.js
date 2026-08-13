const API = "http://127.0.0.1:8000/bouquet/";

let updateId = null;

document.getElementById("bouquetForm")
.addEventListener("submit", async function(e){

e.preventDefault();

const data={

bouquet_name:
document.getElementById("bouquet_name").value,

flower_id:
Number(document.getElementById("flower_id").value),

price:
Number(document.getElementById("price").value),

description:
document.getElementById("description").value

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

alert("Bouquet Saved Successfully");

document.getElementById("bouquetForm").reset();

loadBouquets();

}

});

async function loadBouquets(){

const response=await fetch(API);

const bouquets=await response.json();

let rows="";

bouquets.forEach(bouquet=>{

rows+=`

<tr>

<td>${bouquet.bouquet_id}</td>

<td>${bouquet.bouquet_name}</td>

<td>${bouquet.flower_id}</td>

<td>${bouquet.price}</td>

<td>${bouquet.description}</td>

<td>

<button onclick="editBouquet(${bouquet.bouquet_id})">

Edit

</button>

<button onclick="deleteBouquet(${bouquet.bouquet_id})">

Delete

</button>

</td>

</tr>

`;

});

document.getElementById("bouquetTable").innerHTML=rows;

}

async function editBouquet(id){

const response=await fetch(`${API}${id}`);

const bouquet=await response.json();

document.getElementById("bouquet_name").value=bouquet.bouquet_name;

document.getElementById("flower_id").value=bouquet.flower_id;

document.getElementById("price").value=bouquet.price;

document.getElementById("description").value=bouquet.description;

updateId=id;

}

async function deleteBouquet(id){

if(confirm("Delete Bouquet?")){

const response=await fetch(`${API}${id}`,{

method:"DELETE"

});

if(response.ok){

alert("Bouquet Deleted");

loadBouquets();

}

}

}

loadBouquets();