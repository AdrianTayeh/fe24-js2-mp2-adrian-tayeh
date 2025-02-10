import { Product } from "./product.js";

export function getProductById(productId: string, products: Product[]): Product | undefined {
    return products.find(product => product.getId.toString() === productId);
}