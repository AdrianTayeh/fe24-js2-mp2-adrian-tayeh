import { getData } from "./fetch.js";
import { applyFiltersAndSort } from "./sortAndFilter.js";

export async function fetchCategories() {
    try {
        const data = await getData();
        const categories = [...new Set(data.map(product => product.getCategory))];
        renderCategories(categories);
        return categories;
    } catch (error) {
        console.error("Error fetching categories:", error);
    }
}

function renderCategories(categories) {
    const filterCard = document.getElementById("filterCard");
    const form = filterCard.querySelector("form");
    form.innerHTML = ""; // Clear existing content

    categories.forEach(category => {
        const label = document.createElement("label");
        label.className = "form-check";

        const input = document.createElement("input");
        input.className = "form-check-input";
        input.type = "checkbox";
        input.value = category;
        input.addEventListener("change", applyFiltersAndSort);

        const span = document.createElement("span");
        span.className = "form-check-label";
        span.textContent = category;

        label.appendChild(input);
        label.appendChild(span);
        form.appendChild(label);
    });
}