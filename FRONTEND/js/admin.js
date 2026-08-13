const API = "http://127.0.0.1:8000/admin";


let updateId = null;


// ADD + UPDATE ADMIN

document
.getElementById("adminForm")
.addEventListener("submit", async function(e){

    e.preventDefault();


    const data = {

        admin_name:
        document.getElementById("admin_name").value,


        email:
        document.getElementById("email").value,


        password:
        document.getElementById("password").value,


        phone:
        document.getElementById("phone").value

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

        response = await fetch(`${API}/${updateId}`,{

            method:"PUT",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify(data)

        });


        updateId=null;

    }



    if(response.ok){

        alert("Admin Saved Successfully");

        document.getElementById("adminForm").reset();

        loadAdmins();

    }


});




// GET ALL ADMINS

async function loadAdmins(){


    const response = await fetch(API);


    const admins = await response.json();


    let rows="";


    admins.forEach(admin=>{


        rows+=`

        <tr>

        <td>${admin.admin_id}</td>

        <td>${admin.admin_name}</td>

        <td>${admin.email}</td>

        <td>${admin.phone}</td>


        <td>

        <button onclick="editAdmin(${admin.admin_id})">
        Edit
        </button>


        <button onclick="deleteAdmin(${admin.admin_id})">
        Delete
        </button>


        </td>


        </tr>

        `;


    });


    document.getElementById("adminTable").innerHTML=rows;


}




// EDIT ADMIN

async function editAdmin(id){


    const response = await fetch(`${API}/${id}`);


    const admin = await response.json();



    document.getElementById("admin_name").value =
    admin.admin_name;


    document.getElementById("email").value =
    admin.email;


    document.getElementById("password").value =
    admin.password;


    document.getElementById("phone").value =
    admin.phone;


    updateId=id;


}

// DELETE ADMIN

async function deleteAdmin(id){


    let confirmDelete =
    confirm("Delete Admin?");


    if(confirmDelete){


        const response =
        await fetch(`${API}/${id}`,{

            method:"DELETE"

        });



        if(response.ok){

            alert("Admin Deleted");

            loadAdmins();

        }


    }


}





loadAdmins();