import { getProductById } from '../services/product.js';
import { displayProduct } from '../views/product.js';
import { handleAddToCart } from '../containers/product.js';
import { getParams } from '../utils/params.js';

// Get ID from URL params
const id = getParams("id");

// Get product by ID
const product = await getProductById(id);

// Display product
displayProduct(product);

// Event handler
const buttonElement = document.querySelector('#addToCart');
buttonElement.addEventListener('click', () => handleAddToCart(id));