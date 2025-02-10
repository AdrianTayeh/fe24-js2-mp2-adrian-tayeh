import { getData } from "./fetch.ts";
import { applyFiltersAndSort } from "./sortAndFilter.ts";
import { Product } from "./product.ts";

export async function fetchCategories(): Promise<string[]> {
  try {
    const data: Product[] = await getData();
    const categories: string[] = [...new Set(data.map(product => product.getCategory))];
    renderCategories(categories);
    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

function renderCategories(categories: string[]): void {
  const filterCard = document.getElementById("filterCard");
  const form = filterCard!.querySelector("form");
  form!.innerHTML = ""; // Clear existing content

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
    form!.appendChild(label);
  });
}