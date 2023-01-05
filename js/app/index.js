import { getAllProducts } from "../services/product.js";
import { displayProducts } from "../views/product.js";

// Get All products
const products = await getAllProducts();

// Display products
const productsElement = document.querySelector("#items");
productsElement.innerHTML = displayProducts(products).join("");