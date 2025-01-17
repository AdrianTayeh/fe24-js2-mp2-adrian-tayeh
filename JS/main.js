import { initialize, applyFiltersAndSort, setSortCriteria } from "./sortAndFilter.js";
import { fetchCategories } from "./categories.js";

initialize();
  fetchCategories();

  document.getElementById("minPrice").addEventListener("input", applyFiltersAndSort);
  document.getElementById("maxPrice").addEventListener("input", applyFiltersAndSort);

  const sortButtons = document.querySelectorAll("#priceAsc, #priceDesc, #ratingsAsc, #ratingsDesc");
  sortButtons.forEach(button => {
    button.addEventListener("click", (event) => {
      setSortCriteria(event.target.id);
    });
  });

  document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', () => {
      const productId = card.getAttribute('data-product-id');
      const product = getProductById(productId);
      const modal = createModal(product);
      modal.show();
    });
  });