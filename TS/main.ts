import { initialize, applyFiltersAndSort, setSortCriteria } from "./sortAndFilter.ts";
import { fetchCategories } from "./categories.ts";
import { createModal } from "./modal.ts";
import { getProductById } from "./utils.ts";
import { Product } from "./product.ts";
import * as bootstrap from 'bootstrap';

let products: Product[] = [];

initialize().then(fetchedProducts => {
  products = fetchedProducts;
});
fetchCategories();

document.getElementById("minPrice")!.addEventListener("input", applyFiltersAndSort);
document.getElementById("maxPrice")!.addEventListener("input", applyFiltersAndSort);

const sortButtons = document.querySelectorAll("#priceAsc, #priceDesc, #ratingsAsc, #ratingsDesc");
sortButtons.forEach(button => {
  button.addEventListener("click", (event: Event) => {
    setSortCriteria((event.target as HTMLElement).id);
  });
});

document.querySelectorAll('.product-card').forEach(card => {
  card.addEventListener('click', () => {
    const productId = card.getAttribute('data-product-id');
    const product = getProductById(productId!, products);
    if (product) {
      const modal = createModal(product);
      document.body.appendChild(modal);
      const bootstrapModal = new bootstrap.Modal(modal, {
        backdrop: 'static',
        keyboard: false
      });
      bootstrapModal.show();
    }
  });
});