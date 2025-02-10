import { getData } from "./fetch.js";
import { createCard } from "./createCard.js";
import { Product } from "./product.js";

let products: Product[] = [];
let sortCriteria: string = "";

export async function initialize(): Promise<Product[]> {
  const products = await getData();
  renderProducts(products);
  return products;
}

const filterByCategory = (categories: string[]) => (product: Product): boolean =>
  categories.length === 0 || categories.includes(product.getCategory);

const filterByPrice = (minPrice: number, maxPrice: number) => (product: Product): boolean =>
  product.getPrice >= minPrice && product.getPrice <= maxPrice;

const sortProducts = (criteria: string) => {
  const sortFunctions: { [key: string]: (a: Product, b: Product) => number } = {
    "priceAsc": (a, b) => a.getPrice - b.getPrice,
    "priceDesc": (a, b) => b.getPrice - a.getPrice,
    "ratingsAsc": (a, b) => a.getRating - b.getRating,
    "ratingsDesc": (a, b) => b.getRating - a.getRating,
  };
  return sortFunctions[criteria] || (() => 0);
};

export function applyFiltersAndSort(): void {
  const selectedCategories = Array.from(document.querySelectorAll(".form-check-input:checked")).map(input => (input as HTMLInputElement).value);
  const minPrice = parseFloat((document.getElementById("minPrice") as HTMLInputElement).value) || 0;
  const maxPrice = parseFloat((document.getElementById("maxPrice") as HTMLInputElement).value) || Infinity;

  const filteredProducts = products
    .filter(filterByCategory(selectedCategories))
    .filter(filterByPrice(minPrice, maxPrice))
    .sort(sortProducts(sortCriteria));

  renderProducts(filteredProducts);
}

export function setSortCriteria(criteria: string): void {
  sortCriteria = criteria;
  applyFiltersAndSort();
}

function renderProducts(products: Product[]): void {
  const container = document.getElementById("productContainer");
  container!.innerHTML = "";
  products.forEach(product => {
    const card = createCard(product);
    container!.appendChild(card);
  });
}