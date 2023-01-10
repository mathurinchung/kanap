import { getProductsCart, orderProducts } from "../services/product.js";
import { displayCart } from "../views/product.js";
import { displayCartTotal } from "../views/cart.js";
import { handleCartTotal, handleQuantityInput, handleDeleteItem } from "../containers/cart.js";
import { handleSendOrder } from "../containers/order.js";

// Get cart
let cart = JSON.parse(localStorage.getItem("products") || "[]");
cart = await getProductsCart(cart);

// Display cart
const cartItemsElement = document.querySelector("#cart__items");
cartItemsElement.innerHTML = (cart.length === 0) ? emptyCart : cart.map(displayCart).join("");

const total = handleCartTotal(cart);
displayCartTotal(total);

// Event handler
const quantityInputElements = document.querySelectorAll(".itemQuantity");
const deleteButtonElements = document.querySelectorAll(".deleteItem");

const handleQuantity = handleQuantityInput(cart);
const handleDelete = handleDeleteItem(cart);

quantityInputElements.forEach(el => el.addEventListener("change", e => {
  handleQuantity(e);

  const total = handleCartTotal(cart);
  displayCartTotal(total);
}));

deleteButtonElements.forEach(el => el.addEventListener("click", e => {
  handleDelete(e)

  const total = handleCartTotal(cart);
  displayCartTotal(total);
}));

const formElement = document.querySelector(".cart__order__form");
formElement.setAttribute("novalidate", "");

const submit = handleSendOrder(cart, orderProducts);
formElement.addEventListener("submit", submit);