// ==========================================
// CUSTOM BOUQUET BUILDER
// ==========================================

const flowers = [

    {
        id: 1,
        name: "Rose",
        price: 100,
        image: "images/rose.jpg",
        qty: 0
    },

    {
        id: 2,
        name: "Sunflower",
        price: 80,
        image: "images/sunflower.jpg",
        qty: 0
    },

    {
        id: 3,
        name: "Tulip",
        price: 150,
        image: "images/tulip.jpg",
        qty: 0
    },

    {
        id: 4,
        name: "Lily",
        price: 120,
        image: "images/lily.jpg",
        qty: 0
    },

    {
        id: 5,
        name: "Orchid",
        price: 250,
        image: "images/orchid.jpg",
        qty: 0
    },

    {
        id: 6,
        name: "Marigold",
        price: 60,
        image: "images/marigold.jpg",
        qty: 0
    },

    {
        id: 7,
        name: "Lotus",
        price: 180,
        image: "images/lotus.jpg",
        qty: 0
    },

    {
        id: 8,
        name: "Daisy",
        price: 90,
        image: "images/daisy.jpg",
        qty: 0
    },

    {
        id: 9,
        name: "Jasmine",
        price: 70,
        image: "images/jasmine.jpg",
        qty: 0
    },

    {
        id: 10,
        name: "Carnation",
        price: 140,
        image: "images/carnation.jpg",
        qty: 0
    }

];


// ==========================================
// GET FLOWER FROM FLOWERS PAGE
// ==========================================

const selectedFlower =
    JSON.parse(localStorage.getItem("selectedFlower"));

if (selectedFlower) {

    const flower = flowers.find(
        f => f.id === selectedFlower.id
    );

    if (flower) {
        flower.qty = 1;
    }

    localStorage.removeItem("selectedFlower");
}


// Load flowers
loadFlowers();


// ==========================================
// LOAD FLOWERS
// ==========================================

function loadFlowers() {

    let html = "";

    flowers.forEach((flower, index) => {

        html += `

        <div class="card">

            <img
                src="${flower.image}"
                alt="${flower.name}"
            >

            <h2>${flower.name}</h2>

            <p>
                <b>Price :</b> ₹${flower.price}
            </p>

            <p>
                <b>Category :</b> Fresh Flower
            </p>

            <div class="qty">

                <button onclick="minus(${index})">
                    -
                </button>

                <span id="qty${index}">
                    ${flower.qty}
                </span>

                <button onclick="plus(${index})">
                    +
                </button>

            </div>

        </div>

        `;

    });

    document.getElementById("flowerList").innerHTML = html;

    update();
}


// ==========================================
// PLUS
// ==========================================

function plus(index) {

    flowers[index].qty++;

    update();
}


// ==========================================
// MINUS
// ==========================================

function minus(index) {

    if (flowers[index].qty > 0) {
        flowers[index].qty--;
    }

    update();
}


// ==========================================
// UPDATE SUMMARY
// ==========================================

function update() {

    let total = 0;
    let count = 0;
    let summary = "";


    flowers.forEach((flower, index) => {

        document.getElementById(
            "qty" + index
        ).innerHTML = flower.qty;


        if (flower.qty > 0) {

            count += flower.qty;

            total +=
                flower.qty * flower.price;


            summary += `
                <p>
                    🌸 ${flower.name}
                    × ${flower.qty}
                    = ₹${flower.qty * flower.price}
                </p>
            `;

        }

    });


    document.getElementById(
        "selectedFlowers"
    ).innerHTML =
        summary || "No flowers selected";


    document.getElementById(
        "flowerCount"
    ).innerHTML = count;


    document.getElementById(
        "totalPrice"
    ).innerHTML = total;
}


// ==========================================
// RESET BOUQUET
// ==========================================

function resetBouquet() {

    flowers.forEach(flower => {
        flower.qty = 0;
    });


    document.getElementById(
        "customerName"
    ).value = "";


    document.getElementById(
        "mobileNumber"
    ).value = "";


    document.getElementById(
        "bouquetName"
    ).value = "";


    document.getElementById(
        "deliveryDate"
    ).value = "";


    update();


    alert(
        "🔄 Bouquet Reset Successfully"
    );
}


// ==========================================
// SAVE BOUQUET
// ==========================================

async function saveBouquet() {

    const selectedFlower =
        flowers.find(
            flower => flower.qty > 0
        );


    if (!selectedFlower) {

        alert(
            "Please select flowers first"
        );

        return;
    }


    const bouquetData = {

        bouquet_name:
            document.getElementById(
                "bouquetName"
            ).value ||
            "Custom Bouquet",

        flower_id:
            selectedFlower.id,

        price:
            Number(
                document.getElementById(
                    "totalPrice"
                ).innerHTML
            ),

        description:
            "Custom bouquet created by customer"

    };


    try {

        const response = await fetch(
            "http://127.0.0.1:8000/bouquet/",
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body:
                    JSON.stringify(
                        bouquetData
                    )
            }
        );


        const result =
            await response.json();


        if (response.ok) {

            alert(
                "💾 Bouquet Saved Successfully"
            );

            console.log(result);

        } else {

            alert(
                result.detail ||
                "Failed to save bouquet"
            );

        }

    } catch (error) {

        console.log(error);

        alert(
            "FastAPI Server Not Connected"
        );
    }
}

// ==========================================
// PLACE ORDER
// ==========================================
async function placeOrder() {

    const totalPrice = Number(
        document.getElementById("totalPrice").innerHTML
    );

    if (totalPrice <= 0) {
        alert("Please select flowers first");
        return;
    }

    // Get logged-in customer
    const customer = JSON.parse(
        localStorage.getItem("customer")
    );

    if (!customer || !customer.id) {
        alert("❌ Please login as customer first");
        window.location.href = "customer_login.html";
        return;
    }

    // Get delivery details
    const deliveryAddress =
        customer.address ||
        document.getElementById("address")?.value ||
        "";

    const deliveryDate =
        document.getElementById("deliveryDate").value;

    if (!deliveryDate) {
        alert("Please select delivery date");
        return;
    }

    // ==========================================
    // ORDER DATA
    // ==========================================

    const orderData = {

        customer_id: customer.id,

        order_date: new Date().toISOString(),

        total_amount: totalPrice,

        order_status: "Pending"
    };

    try {

        // ==========================================
        // STEP 1: CREATE ORDER
        // ==========================================

        const orderResponse = await fetch(
            "http://127.0.0.1:8000/order/",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(orderData)
            }
        );

        const orderResult = await orderResponse.json();

        if (!orderResponse.ok) {

            alert(
                orderResult.detail ||
                "Failed to place order"
            );

            return;
        }

        console.log("Order Response:", orderResult);

        // Get newly created Order ID
        const order = orderResult.data[0];

        const orderId = order.id;

        // ==========================================
        // STEP 2: CREATE DELIVERY
        // ==========================================

        const deliveryData = {

            order_id: orderId,

            delivery_address: deliveryAddress,

            delivery_date: deliveryDate,

            delivery_status: "Pending"
        };

        const deliveryResponse = await fetch(
            "http://127.0.0.1:8000/delivery/",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(deliveryData)
            }
        );

        const deliveryResult =
            await deliveryResponse.json();

        if (!deliveryResponse.ok) {

            alert(
                "Order created but delivery creation failed."
            );

            console.log(deliveryResult);

            return;
        }

        console.log(
            "Delivery Response:",
            deliveryResult
        );

        // ==========================================
        // SAVE ORDER ID FOR TRACKING
        // ==========================================

        localStorage.setItem(
            "latestOrderId",
            orderId
        );

        // ==========================================
        // SUCCESS
        // ==========================================

        alert(
            "🌸 Order Successfully Placed!\n\n" +
            "Order ID: " + orderId + "\n" +
            "Total Amount: ₹" + totalPrice + "\n" +
            "Status: Pending"
        );

        // Go to Delivery Tracking
        window.location.href =
            "delivery_tracking.html";

    } catch (error) {

        console.log(error);

        alert(
            "❌ FastAPI Server Not Connected"
        );
    }
}
