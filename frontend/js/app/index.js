import { getAllProducts } from "../services/product.js";
import { displayProducts } from "../views/product.js";

// DOM Element
const productsElement = document.querySelector("#items");

// Get All products
const products = await getAllProducts();

// Display products
productsElement.innerHTML = displayProducts(products).join("");