import { api, getParams } from "./utils/index.js";

// Get product ID from URL
const _id = getParams("id");

displayProduct();

const addButton = document.querySelector("#addToCart");
addButton.addEventListener("click", handleClick);

/**
 * Display product data
 */
async function displayProduct() {
  try {
    const { name, imageUrl, altTxt, description, price, colors } = await api.get(`/products/${_id}`);

    document.title = name + " - KANAP";
    document.querySelector(".item__img").innerHTML = `<img src=${imageUrl} alt="${altTxt}" />`;
    document.querySelector("#title").textContent = name;
    document.querySelector("#price").textContent = price;
    document.querySelector("#description").textContent = description;
    document.querySelector("#colors").innerHTML += colors.map(color => `<option value=${color}>${color}</option>`).join("");
  } catch (e) {
    document.querySelector(".item").textContent = "Produit introuvable";
  }
}

/**
 * 
 */
function handleClick () {
  const selectedColor = document.querySelector("#colors");
  const quantityInput = document.querySelector("#quantity");

  const color = selectedColor.value;
  const quantity = parseInt(quantityInput.value);

  if (!color) return alert("Veuillez choisir une couleur !");
  if (quantity < 1 || quantity > 100) return alert("Veuillez choisir une quantité !");

  addToCart({ color, quantity });

  selectedColor.value = "";
  quantityInput.value = 0;

  popupConfirm();
}

/**
 * 
 * @param { object }  
 */
function addToCart({ color, quantity }) {
  const storage = JSON.parse(localStorage.getItem("products") || "[]");

  const index = storage.findIndex(product => product._id === _id && product.color === color);
  (index !== -1) ? storage[index].quantity = quantity : storage.push({ _id, color, quantity });

  localStorage.setItem("products", JSON.stringify(storage));
}

/**
 * (optional)
 */
function popupConfirm() {
  let text =  "Le produit a bien été ajouté au panier ! \n";
      text += "Consulter le panier OK ou revenir sur la page ANNULER";

  confirm(text) ? window.location.href = "./cart" : null;
}

/** TODO:
 *  comments
 *  error message
 */
