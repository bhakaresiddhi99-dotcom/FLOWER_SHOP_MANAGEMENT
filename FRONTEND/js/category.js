const API = "http://127.0.0.1:8000/category";

let updateId = null;

// ADD + UPDATE CATEGORY
document.getElementById("categoryForm").addEventListener("submit", async function(e) {

    e.preventDefault();

    const data = {
        category_name: document.getElementById("category_name").value,
        description: document.getElementById("description").value
    };

    let response;

    if (updateId === null) {

        response = await fetch(API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

    } else {

        response = await fetch(`${API}/${updateId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        updateId = null;
    }

    if (response.ok) {
        alert("Category Saved Successfully");
        document.getElementById("categoryForm").reset();
        loadCategories();
    }
});

// GET ALL CATEGORIES
async function loadCategories() {

    const response = await fetch(API);
    const categories = await response.json();

    let rows = "";

    categories.forEach(category => {

        rows += `
        <tr>
            <td>${category.category_id}</td>
            <td>${category.category_name}</td>
            <td>${category.description}</td>
            <td>
                <button onclick="editCategory(${category.category_id})">Edit</button>
                <button onclick="deleteCategory(${category.category_id})">Delete</button>
            </td>
        </tr>
        `;
    });

    document.getElementById("categoryTable").innerHTML = rows;
}

// EDIT CATEGORY
async function editCategory(id) {

    const response = await fetch(`${API}/${id}`);
    const category = await response.json();

    document.getElementById("category_name").value = category.category_name;
    document.getElementById("description").value = category.description;

    updateId = id;
}

// DELETE CATEGORY
async function deleteCategory(id) {

    if (confirm("Delete Category?")) {

        const response = await fetch(`${API}/${id}`, {
            method: "DELETE"
        });

        if (response.ok) {
            alert("Category Deleted");
            loadCategories();
        }
    }
}

loadCategories();