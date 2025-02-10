import { Product } from "./product.ts";

export function getProductById(productId: string, products: Product[]): Product | undefined {
    return products.find(product => product.getId.toString() === productId);
}