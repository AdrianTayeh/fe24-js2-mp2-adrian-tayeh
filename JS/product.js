export class Product {
    #id;
    #title;
    #imageUrl;
    #images;
    #stock;
    #price;
    #discountPercentage;
    #category;
    #rating;
  
    constructor(id, title, imageUrl, images, stock, price, discountPercentage, category, rating) {
      this.#id = id;
      this.#title = title;
      this.#imageUrl = imageUrl;
      this.#images = images;
      this.#stock = stock;
      this.#price = price;
      this.#discountPercentage = discountPercentage;
      this.#category = category;
      this.#rating = rating;
    }
  
    get getId() {
      return this.#id;
    }
  
    get getTitle() {
      return this.#title;
    }
  
    get getImageUrl() {
      return this.#imageUrl;
    }
  
    get getImages() {
      return this.#images;
    }
  
    get getStock() {
      return this.#stock;
    }
  
    get getPrice() {
      return this.#price;
    }
  
    get getDiscountPercentage() {
      return this.#discountPercentage;
    }
  
    get getCategory() {
      return this.#category;
    }
  
    get getRating() {
      return this.#rating;
    }
  
    calculateDiscountedPrice() {
      return parseFloat((this.#price - (this.#price * this.#discountPercentage / 100)).toFixed(2));
    }
  
    updateStock(newStock) {
      if (newStock < 0) {
        console.error("Stock cannot be below 0");
        return;
      }
      this.#stock = newStock;
    }
  }