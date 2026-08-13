const API = "http://127.0.0.1:8000/flower/";

let updateId = null;



document
.getElementById("flowerForm")
.addEventListener("submit", async function(e){


e.preventDefault();



const data = {


flower_name:
document.getElementById("flower_name").value,


price:
Number(document.getElementById("price").value),


quantity:
Number(document.getElementById("quantity").value),


category:
document.getElementById("category").value,


image:
document.getElementById("image").value


};



let response;



if(updateId === null){


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


updateId=null;


}



if(response.ok){


alert("Flower Saved Successfully");


document
.getElementById("flowerForm")
.reset();


loadFlowers();


}


});




// GET ALL FLOWERS


async function loadFlowers(){


const response = await fetch(API);


const flowers = await response.json();



let rows="";



flowers.forEach(flower=>{


rows += `

<tr>

<td>${flower.flower_id}</td>

<td>${flower.flower_name}</td>

<td>${flower.price}</td>

<td>${flower.quantity}</td>

<td>${flower.category}</td>

<td>${flower.image}</td>


<td>

<button onclick="editFlower(${flower.flower_id})">
Edit
</button>


<button onclick="deleteFlower(${flower.flower_id})">
Delete
</button>


</td>


</tr>


`;


});



document
.getElementById("flowerTable")
.innerHTML=rows;


}




// EDIT


async function editFlower(id){


const response =
await fetch(`${API}${id}`);


const flower =
await response.json();



document.getElementById("flower_name").value =
flower.flower_name;


document.getElementById("price").value =
flower.price;


document.getElementById("quantity").value =
flower.quantity;


document.getElementById("category").value =
flower.category;


document.getElementById("image").value =
flower.image;



updateId=id;


}




// DELETE


async function deleteFlower(id){


if(confirm("Delete Flower?")){


const response =
await fetch(`${API}${id}`,{

method:"DELETE"

});



if(response.ok){


alert("Flower Deleted");


loadFlowers();


}


}


}



loadFlowers();
