const API = "http://127.0.0.1:8000/customer";

let updateId = null;

// ADD + UPDATE CUSTOMER
document.getElementById("customerForm")
.addEventListener("submit", async function(e){

    e.preventDefault();

    const data = {

        customer_name: document.getElementById("customer_name").value,

        email: document.getElementById("email").value,

        phone: document.getElementById("phone").value,

        address: document.getElementById("address").value

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

    }else{

        response = await fetch(`${API}/${updateId}`,{

            method:"PUT",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify(data)

        });

        updateId = null;

    }

    if(response.ok){

        alert("Customer Saved Successfully");

        document.getElementById("customerForm").reset();

        loadCustomers();

    }

});

// GET ALL CUSTOMERS
async function loadCustomers(){

    const response = await fetch(API);

    const customers = await response.json();

    let rows = "";

    customers.forEach(customer=>{

        rows += `
        <tr>

        <td>${customer.customer_id}</td>

        <td>${customer.customer_name}</td>

        <td>${customer.email}</td>

        <td>${customer.phone}</td>

        <td>${customer.address}</td>

        <td>

        <button onclick="editCustomer(${customer.customer_id})">
        Edit
        </button>

        <button onclick="deleteCustomer(${customer.customer_id})">
        Delete
        </button>

        </td>

        </tr>
        `;

    });

    document.getElementById("customerTable").innerHTML = rows;

}

// EDIT CUSTOMER
async function editCustomer(id){

    const response = await fetch(`${API}/${id}`);

    const customer = await response.json();

    document.getElementById("customer_name").value =
    customer.customer_name;

    document.getElementById("email").value =
    customer.email;

    document.getElementById("phone").value =
    customer.phone;

    document.getElementById("address").value =
    customer.address;

    updateId = id;

}

// DELETE CUSTOMER
async function deleteCustomer(id){

    if(confirm("Delete Customer?")){

        const response = await fetch(`${API}/${id}`,{

            method:"DELETE"

        });

        if(response.ok){

            alert("Customer Deleted");

            loadCustomers();

        }

    }

}

loadCustomers();