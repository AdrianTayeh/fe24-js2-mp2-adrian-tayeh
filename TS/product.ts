import { ProductType } from "./types.js";

export class Product implements ProductType {
  id: number;
  title: string;
  thumbnail: string;
  images: string[];
  stock: number;
  price: number;
  discountPercentage: number;
  category: string;
  rating: number;

  constructor(
    id: number,
    title: string,
    imageUrl: string,
    images: string[],
    stock: number,
    price: number,
    discountPercentage: number,
    category: string,
    rating: number
  ) {
    this.id = id;
    this.title = title;
    this.thumbnail = imageUrl;
    this.images = images;
    this.stock = stock;
    this.price = price;
    this.discountPercentage = discountPercentage;
    this.category = category;
    this.rating = rating;
  }

  get getId(): number {
    return this.id;
  }

  get getTitle(): string {
    return this.title;
  }

  get getThumbnail(): string {
    return this.thumbnail;
  }

  get getImages(): string[] {
    return this.images;
  }

  get getStock(): number {
    return this.stock;
  }

  get getPrice(): number {
    return this.price;
  }

  get getDiscountPercentage(): number {
    return this.discountPercentage;
  }

  get getCategory(): string {
    return this.category;
  }

  get getRating(): number {
    return this.rating;
  }

  calculateDiscountedPrice(): number {
    return parseFloat(
      (this.price - (this.price * this.discountPercentage) / 100).toFixed(2)
    );
  }

  updateStock(newStock: number): void {
    if (newStock < 0) {
      console.error("Stock cannot be below 0");
      return;
    }
    this.stock = newStock;
  }
}