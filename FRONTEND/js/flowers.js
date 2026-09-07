// ==========================================
// FLOWER SEARCH
// ==========================================

const searchInput = document.getElementById("flowerSearch");

const seasonTitle = document.getElementById("seasonTitle");

const cards = document.querySelectorAll(".card");


searchInput.addEventListener("input", function () {

    const searchText = this.value.toLowerCase().trim();

    let found = 0;

    let selectedSeason = "";


    // Check every flower card

    cards.forEach(card => {

        const button = card.querySelector(".add-to-bouquet");


        const flowerName =
            button.dataset.name.toLowerCase();


        const season =
            button.dataset.season.toLowerCase();


        // Search flower name or season

        if (
            flowerName.includes(searchText) ||
            season.includes(searchText)
        ) {

            card.style.display = "block";

            found++;


            // If exact season searched

            if (season === searchText) {

                selectedSeason =
                    button.dataset.season;

            }

        } else {

            card.style.display = "none";

        }

    });


    // ==========================================
    // SHOW SEASON TITLE
    // ==========================================

    if (selectedSeason !== "") {

        seasonTitle.innerText =
            "🌸 " + selectedSeason + " Flowers";

    }

    else if (searchText === "") {

        seasonTitle.innerText = "";

    }

    else {

        seasonTitle.innerText = "";

    }


    // ==========================================
    // NO RESULT
    // ==========================================

    if (
        searchText !== "" &&
        found === 0
    ) {

        seasonTitle.innerText =
            "❌ No flowers found";

    }

});



// ==========================================
// ADD FLOWER TO BOUQUET
// ==========================================

const buttons =
    document.querySelectorAll(".add-to-bouquet");


buttons.forEach(button => {

    button.addEventListener("click", function () {


        const flower = {

            id: Number(this.dataset.id),

            name: this.dataset.name,

            price: Number(this.dataset.price),

            season: this.dataset.season

        };


        // Save selected flower

        localStorage.setItem(
            "selectedFlower",
            JSON.stringify(flower)
        );


        // Go to bouquet builder

        window.location.href =
            "bouquet_builder.html";

    });

});