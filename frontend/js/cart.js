import { api, isInvalid } from "./utils/index.js";

// Get cart from localStorage
let cart = JSON.parse(localStorage.getItem("products") || "[]");

displayCart();

const submit = document.querySelector("#order");
submit.addEventListener("submit", handleSubmit);

/**
 * 
 */
async function displayCart() {
  (cart.length === 0) ? emptyCart() : await displayProducts();

  displayCartTotal();
}

/**
 * 
 */
async function displayProducts () {
  try {
    cart = await Promise.all(cart.map(getProduct));

    document.querySelector("#cart__items").innerHTML = cart.map(createProduct).join("");

    const deleteButtons = document.querySelectorAll('.deleteItem');
    deleteButtons.forEach(el => el.addEventListener('click', handleDeleteItem));
    
    const quantityInputs = document.querySelectorAll('.itemQuantity');
    quantityInputs.forEach(el => el.addEventListener('change', handleQuantityInput));
  } catch (e) {
    document.querySelector("#cart__items").innerHTML = `<p>${e.message}</p>`;
  }
}

/**
 * 
 * @param {*} param0 
 * @returns 
 */
async function getProduct({ _id, color, quantity }) {
  const product = await api.get(`/products/${_id}`);
  return { ...product, _id, color, quantity };
}

/**
 * 
 * @param {*} param0 
 * @returns 
 */
function createProduct({ _id, name, imageUrl, altTxt, color, price, quantity }) {
  return `
    <article class="cart__item" data-id=${_id} data-color=${color}>
      <div class="cart__item__img">
        <img src=${imageUrl} alt=${altTxt} />
      </div>
      <div class="cart__item__content">
        <div class="cart__item__content__description">
          <h2>${name}</h2>
          <p>${color}</p>
          <p>${price} €</p>
        </div>
        <div class="cart__item__content__settings">
          <div class="cart__item__content__settings__quantity">
            <p>Qté : </p>
            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${quantity}>
          </div>
          <div class="cart__item__content__settings__delete">
            <p class="deleteItem">Supprimer</p>
          </div>
        </div>
      </div>
    </article>
  `;
}

/**
 * 
 */
function displayCartTotal() {
  const totalQuantity = document.querySelector("#totalQuantity");
  const totalPrice = document.querySelector("#totalPrice");

  const { quantity, price } = cart.reduce(
    (total, product) => ({
      quantity: total.quantity + product.quantity,
      price: total.price + product.price * product.quantity
    }),
    { quantity: 0, price: 0 }
  );

  totalQuantity.textContent = quantity;
  totalPrice.textContent = price;
}

/**
 * 
 */
function emptyCart() {
  document.querySelector("#cart__items").innerHTML = `<p style="text-align: center">Votre panier est vide</p>`;
}

/**
 * 
 * @param {*} e 
 */
function handleQuantityInput(e) {
  const selectedItem = e.target.closest("[data-id]");
  const { id, color } = selectedItem.dataset;
  const quantity = parseInt(e.target.value);

  const index = cart.findIndex(product => product._id === id && product.color === color);
  cart[index].quantity = quantity;

  const storage = cart.map(product => ({ _id: product._id, color: product.color, quantity: product.quantity }));
  localStorage.setItem("products", JSON.stringify(storage));

  displayCartTotal();
}

/**
 * 
 * @param {*} e 
 */
function handleDeleteItem(e) {
  const selectedItem = e.target.closest("[data-id]");
  const { id, color } = selectedItem.dataset;

  selectedItem.remove();
  
  const index = cart.findIndex(product => product._id === id && product.color === color);
  cart.splice(index, 1);

  const storage = cart.map(product => ({ _id: product._id, color: product.color, quantity: product.quantity }));
  localStorage.setItem("products", JSON.stringify(storage));

  displayCartTotal();

  if (cart.length === 0) emptyCart();
}

/**
 * 
 * @param {*} e 
 * @returns 
 */
function handleSubmit(e) {
  e.preventDefault();

  if (cart.length === 0) return alert("Veuillez remplir le panier");
  if (isInvalid()) return; // TODO: Check invalid inputs

  sendOrder();
}

/**
 * 
 */
async function sendOrder() {
  try {
    const data = getData();

    const { orderId } = await api.post("/products/order", data);

    localStorage.removeItem("products");
    window.location.href = "./confirmation?orderId=" + orderId;
  } catch (e) {
    alert(e.message);
  }
}

/**
 * 
 * @returns 
 */
function getData() {
  const form = document.querySelector(".cart__order__form");
  const formData = new FormData(form);
  const contact = Object.fromEntries(formData.entries());

  const products = cart.map(product => product._id);

  return { contact, products };
}

/** TODO:
 *  comments
 *  error message
 */
