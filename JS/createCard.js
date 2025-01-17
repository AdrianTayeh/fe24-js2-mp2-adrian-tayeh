import { createModal } from './modal.js';

export function createCard(product) {
  const card = document.createElement("div");
  card.className = "card productCard m-2";
  card.setAttribute("data-product-id", product.id);

  const img = document.createElement("img");
  img.className = "card-img-top";
  img.src = product.getImageUrl;
  img.alt = product.getTitle;
  card.appendChild(img);

  const cardBody = document.createElement("div");
  cardBody.className = "card-body";

  const title = document.createElement("h5");
  title.className = "card-title";
  title.textContent = product.getTitle;
  cardBody.appendChild(title);

  const price = document.createElement("p");
  price.className = "card-text";
  price.innerHTML = `Price: <span class="text-muted" style="text-decoration: line-through;">$${product.getPrice}</span> <span class="ms-2">$${product.calculateDiscountedPrice()}</span>`;
  cardBody.appendChild(price);
  card.appendChild(cardBody);

  card.addEventListener('click', () => {
    const modal = createModal(product);
    document.body.appendChild(modal);
    const bootstrapModal = new bootstrap.Modal(modal, {
      backdrop: 'static',
      keyboard: false
    });
    bootstrapModal.show();
  });

  return card;
}