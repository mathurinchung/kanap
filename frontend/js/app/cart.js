import { getProductsCart, orderProducts } from "../services/product.js";
import { displayCart, displayCartTotal } from "../views/product.js";
import { handleQuantityInput, handleDeleteItem } from "../containers/cart.js";
import { handleSendOrder } from "../containers/order.js";

// Get cart
let cart = JSON.parse(localStorage.getItem("products") || "[]");
cart = await getProductsCart(cart);

// Display cart
const cartItemsElement = document.querySelector("#cart__items");
cartItemsElement.innerHTML = displayCart(cart);
displayCartTotal(cart);

// Event handler
const quantityInputElements = document.querySelectorAll(".itemQuantity");
const deleteButtonElements = document.querySelectorAll(".deleteItem");

const handleQuantity = handleQuantityInput(cart);
const handleDelete = handleDeleteItem(cart);

quantityInputElements.forEach(el => el.addEventListener("change", e => {
  handleQuantity(e);
  displayCartTotal(cart);
}));

deleteButtonElements.forEach(el => el.addEventListener("click", e => {
  handleDelete(e)
  displayCartTotal(cart);
}));


const formElement = document.querySelector(".cart__order__form");
formElement.setAttribute("novalidate", "");

const submit = handleSendOrder(cart, orderProducts);
formElement.addEventListener("submit", submit);