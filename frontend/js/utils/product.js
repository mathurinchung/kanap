import Utils from "./index.js";

export default class ProductUtils extends Utils{
  constructor(id) {
    super();
    this._id = id;
  }

  popupConfirm() {
    let text =  "Le produit a bien été ajouté au panier ! \n";
        text += "Consulter le panier OK ou revenir sur la page ANNULER";
  
    confirm(text) ? window.location.href = "./cart.html" : null;
  }

  handleAddToCart() {
    const selectedColor = document.querySelector("#colors");
    const quantityInput = document.querySelector("#quantity");

    const color = selectedColor.value;
    const quantity = parseInt(quantityInput.value);

    if (!color) return alert("Veuillez choisir une couleur !");
    if (quantity < 1 || quantity > 100) return alert("Veuillez choisir une quantité !");

    const index = this.getIndex(this._id, color);
    (index !== -1) ? this._cart[index].quantity = quantity : this._cart.push({ _id: this._id, color, quantity });
    localStorage.setItem("products", JSON.stringify(this._cart));

    selectedColor.value = "";
    quantityInput.value = 0;

    this.popupConfirm();
  }

  init() {
    const addButton = document.querySelector("#addToCart");
    addButton.addEventListener("click", () => this.handleAddToCart());
  }
}