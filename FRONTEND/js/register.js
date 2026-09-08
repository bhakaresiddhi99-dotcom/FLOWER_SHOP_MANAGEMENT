const BASE_URL = "http://127.0.0.1:8000";

document
    .getElementById("registerForm")
    .addEventListener("submit", async function (event) {

        event.preventDefault();

        const customer_name =
            document.getElementById("customer_name").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const phone =
            document.getElementById("phone").value.trim();

        const address =
            document.getElementById("address").value.trim();

        const password =
            document.getElementById("password").value;

        const data = {
            customer_name: customer_name,
            email: email,
            phone: phone,
            address: address,
            password: password
        };

        try {

            const response = await fetch(
                `${BASE_URL}/customer-auth/register/`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(data)
                }
            );

            const result = await response.json();

            if (response.ok) {

                alert("🌸 Customer Registration Successful!");

                window.location.href = "customer_login.html";

            } else {

                alert(
                    "❌ Registration Failed: " +
                    (result.detail || "Something went wrong")
                );
            }

        } catch (error) {

            console.error(error);

            alert(
                "❌ Server Error. Please make sure FastAPI is running."
            );
        }

    });