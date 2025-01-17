import { Product } from "./product.js";

export async function getData() {
  const url = "https://dummyjson.com/products";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    return json.products.map(
      (product) =>
        new Product(
          product.id,
          product.title,
          product.thumbnail,
          product.images,
          product.stock,
          product.price,
          product.discountPercentage,
          product.category,
          product.rating
        )
    );
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}