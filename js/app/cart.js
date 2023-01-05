import { getProductsCart, orderProducts } from "../services/product.js";
import { displayCart } from "../views/product.js";
import { handleCartTotal, handleCartProducts} from "../utils/cart.js";
import { handleSubmitOrder } from "../utils/order.js";

// Cart localStorage && Services
let cart = JSON.parse(localStorage.getItem("products") || "[]");
cart = await getProductsCart(cart);

// Views
const cartItemsElement = document.querySelector("#cart__items");
cartItemsElement.innerHTML = displayCart(cart);

// Event handlers
handleCartTotal(cart);
handleCartProducts(cart);
handleSubmit(cart, orderProducts);