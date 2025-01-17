import { getData } from "./fetch.js";
import { createCard } from "./createCard.js";

let products = [];
let sortCriteria = "";

export async function initialize() {
  products = await getData();
  renderProducts(products);
}

const filterByCategory = (categories) => (product) =>
  categories.length === 0 || categories.includes(product.getCategory);

const filterByPrice = (minPrice, maxPrice) => (product) =>
  product.getPrice >= minPrice && product.getPrice <= maxPrice;

const sortProducts = (criteria) => {
  const sortFunctions = {
    "priceAsc": (a, b) => a.getPrice - b.getPrice,
    "priceDesc": (a, b) => b.getPrice - a.getPrice,
    "ratingsAsc": (a, b) => a.getRating - b.getRating,
    "ratingsDesc": (a, b) => b.getRating - a.getRating,
  };
  return sortFunctions[criteria] || (() => 0);
};

export function applyFiltersAndSort() {
  const selectedCategories = Array.from(document.querySelectorAll(".form-check-input:checked")).map(input => input.value);
  const minPrice = parseFloat(document.getElementById("minPrice").value) || 0;
  const maxPrice = parseFloat(document.getElementById("maxPrice").value) || Infinity;

  const filteredProducts = products
    .filter(filterByCategory(selectedCategories))
    .filter(filterByPrice(minPrice, maxPrice))
    .sort(sortProducts(sortCriteria));

  renderProducts(filteredProducts);
}

export function setSortCriteria(criteria) {
  sortCriteria = criteria;
  applyFiltersAndSort();
}

function renderProducts(products) {
  const container = document.getElementById("productContainer");
  container.innerHTML = "";
  products.forEach(product => {
    const card = createCard(product);
    container.appendChild(card);
  });
}