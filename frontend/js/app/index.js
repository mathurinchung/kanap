import { getProducts } from '../services/product.js';
import { displayProducts } from '../views/product.js';

// Get All products
const products = await getProducts();

// Display products
const productsElement = document.querySelector('#items');
productsElement.innerHTML = products.map(displayProducts).join('');