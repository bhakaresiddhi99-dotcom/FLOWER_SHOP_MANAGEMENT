const buttons = document.querySelectorAll(".add-to-bouquet");

buttons.forEach(button => {

    button.addEventListener("click", function () {

        const flower = {
            id: Number(this.dataset.id),
            name: this.dataset.name,
            price: Number(this.dataset.price)
        };

        localStorage.setItem(
            "selectedFlower",
            JSON.stringify(flower)
        );

        window.location.href = "bouquet_builder.html";

    });

});