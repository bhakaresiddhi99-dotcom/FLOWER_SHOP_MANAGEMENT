const BASE_URL = "http://127.0.0.1:8000";

document
    .getElementById("customerLoginForm")
    .addEventListener("submit", async function (event) {

        event.preventDefault();

        const email =
            document.getElementById("email").value.trim();

        const password =
            document.getElementById("password").value;

        const data = {
            email: email,
            password: password
        };

        try {

            const response = await fetch(
                `${BASE_URL}/customer-auth/login/`,
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

                // Save logged-in customer
                localStorage.setItem(
                    "customer",
                    JSON.stringify(result.customer)
                );

                alert("🌸 Login Successful!");

                window.location.href = "home.html";

            } else {

                alert(
                    "❌ Login Failed: " +
                    (result.detail || "Invalid Email or Password")
                );
            }

        } catch (error) {

            console.error(error);

            alert(
                "❌ Server Error. Please make sure FastAPI is running."
            );
        }

    });