const BASE_URL = "http://127.0.0.1:8000";

document.getElementById("loginForm").addEventListener("submit", async function(event){

    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try{

        const response = await fetch(`${BASE_URL}/login/`,{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({
                email:email,
                password:password
            })

        });

        const result = await response.json();

        if(response.ok){

            alert(result.message);

            window.location.href="dashboard.html";

        }else{

            alert(result.detail);

        }

    }catch(error){

        alert("Server Error");

    }

});