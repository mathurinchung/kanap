import { getProductById } from "../services/product.js";
import { displayProduct } from "../views/product.js";
import { handleAddToCart } from "../utils/product.js";

// Get ID from URL params
const URLSearchParams = new URL(window.location.href).searchParams;
const id = URLSearchParams.get("id") || null;

// Get product by ID
const product = await getProductById(id);

// Display product
displayProduct(product);

// Event handler
const buttonElement = document.querySelector("#addToCart");
buttonElement.addEventListener("click", () => handleAddToCart(id));