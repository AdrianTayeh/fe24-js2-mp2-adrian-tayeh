import { Product } from "./product.ts";

export function createModal(product: Product): HTMLDivElement {
  const modal = document.createElement("div");
  modal.className = "modal fade";
  modal.id = `productModal${product.getId}`;
  modal.tabIndex = -1;
  modal.setAttribute("aria-labelledby", `productModalLabel${product.getId}`);
  modal.setAttribute("aria-hidden", "true");
  modal.setAttribute("data-bs-backdrop", "static");
  modal.setAttribute("data-bs-keyboard", "false");

  const modalDialog = document.createElement("div");
  modalDialog.className = "modal-dialog modal-fullscreen";
  modalDialog.style.display = "flex";
  modalDialog.style.flexDirection = "column";

  const modalContent = document.createElement("div");
  modalContent.className = "modal-content";
  modalContent.style.flex = "1 1 auto";
  modalContent.style.overflow = "hidden";

  const modalHeader = document.createElement("div");
  modalHeader.className = "modal-header";

  const modalTitle = document.createElement("h5");
  modalTitle.className = "modal-title";
  modalTitle.id = `productModalLabel${product.getId}`;
  modalTitle.textContent = product.getTitle;
  modalHeader.appendChild(modalTitle);

  const modalCloseButton = document.createElement("button");
  modalCloseButton.className = "btn-close";
  modalCloseButton.setAttribute("data-bs-dismiss", "modal");
  modalCloseButton.setAttribute("aria-label", "Close");
  modalHeader.appendChild(modalCloseButton);

  const modalBody = document.createElement("div");
  modalBody.className = "modal-body";
  modalBody.style.flex = "1 1 auto";
  modalBody.style.overflowY = "auto";

  // Create carousel
  const carousel = document.createElement("div");
  carousel.id = `carousel${product.getId}`;
  carousel.className = "carousel slide";
  carousel.setAttribute("data-bs-ride", "carousel");

  const carouselInner = document.createElement("div");
  carouselInner.className = "carousel-inner";

  product.getImages.forEach((image: string, index: number) => {
    const carouselItem = document.createElement("div");
    carouselItem.className = `carousel-item ${index === 0 ? "active" : ""}`;

    const img = document.createElement("img");
    img.className = "d-block w-100";
    img.src = image;
    img.alt = product.getTitle;
    carouselItem.appendChild(img);

    carouselInner.appendChild(carouselItem);
  });

  const prevButton = document.createElement("button");
  prevButton.className = "carousel-control-prev";
  prevButton.type = "button";
  prevButton.setAttribute("data-bs-target", `#carousel${product.getId}`);
  prevButton.setAttribute("data-bs-slide", "prev");
  prevButton.innerHTML = `
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  `;

  const nextButton = document.createElement("button");
  nextButton.className = "carousel-control-next";
  nextButton.type = "button";
  nextButton.setAttribute("data-bs-target", `#carousel${product.getId}`);
  nextButton.setAttribute("data-bs-slide", "next");
  nextButton.innerHTML = `
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  `;

  carousel.appendChild(carouselInner);
  carousel.appendChild(prevButton);
  carousel.appendChild(nextButton);

  modalBody.appendChild(carousel);

  const price = document.createElement("p");
  price.innerHTML = `Price: <span class="text-muted" style="text-decoration: line-through;">$${
    product.getPrice
  }</span> <span class="ms-2">$${product.calculateDiscountedPrice()}</span>`;
  modalBody.appendChild(price);

  const discount = document.createElement("p");
  discount.innerHTML = `Discount: ${product.getDiscountPercentage}%`;
  modalBody.appendChild(discount);

  const stock = document.createElement("p");
  stock.textContent = `Stock: ${product.getStock}`;
  modalBody.appendChild(stock);

  const category = document.createElement("p");
  category.textContent = `Category: ${product.getCategory}`;
  modalBody.appendChild(category);

  const rating = document.createElement("p");
  rating.textContent = `Rating: ${product.getRating}`;
  modalBody.appendChild(rating);

  const modalFooter = document.createElement("div");
  modalFooter.className = "modal-footer";

  const lowerAmount = document.createElement("i");
  lowerAmount.className = "fa-solid fa-minus";
  modalFooter.appendChild(lowerAmount);

  const amountInput = document.createElement("input");
  amountInput.type = "number";
  amountInput.value = "0";
  amountInput.min = "0";
  amountInput.className = "productAmount";
  modalFooter.appendChild(amountInput);

  const higherAmount = document.createElement("i");
  higherAmount.className = "fa-solid fa-plus";
  modalFooter.appendChild(higherAmount);

  lowerAmount.addEventListener("click", (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    if (parseInt(amountInput.value) > 0) {
      amountInput.value = (parseInt(amountInput.value) - 1).toString();
    }
  });

  higherAmount.addEventListener("click", (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    amountInput.value = (parseInt(amountInput.value) + 1).toString();
  });

  const addToCartButton = document.createElement("button");
  addToCartButton.className = "btn btn-primary";
  addToCartButton.textContent = "Add to Cart";
  modalFooter.appendChild(addToCartButton);

  addToCartButton.addEventListener("click", (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    const amount = parseInt(amountInput.value);
    if (amount > 0 && amount <= product.getStock) {
      product.updateStock(product.getStock - amount);
      stock.textContent = `Stock: ${product.getStock}`;
      amountInput.value = "0";
    } else {
      alert("Invalid amount");
    }
  });

  const closeButton = document.createElement("button");
  closeButton.className = "btn btn-secondary";
  closeButton.setAttribute("data-bs-dismiss", "modal");
  closeButton.textContent = "Close";
  modalFooter.appendChild(closeButton);

  modalContent.addEventListener("click", (event: MouseEvent) => {
    event.stopPropagation();
  });

  modalContent.appendChild(modalHeader);
  modalContent.appendChild(modalBody);
  modalContent.appendChild(modalFooter);
  modalDialog.appendChild(modalContent);
  modal.appendChild(modalDialog);

  return modal;
}
