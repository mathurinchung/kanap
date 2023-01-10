/**
 * 
 */
const popupConfirm = () => {
  let text =  "Le produit a bien été ajouté au panier ! \n";
      text += "Consulter le panier OK ou revenir sur la page ANNULER";

  confirm(text) ? window.location.href = "./cart" : null;
};

/**
 * 
 * @param {*} id 
 * @returns 
 */
export const handleAddToCart = id => {
  const selectedColor = document.querySelector("#colors");
  const quantityInput = document.querySelector("#quantity");

  const color = selectedColor.value;
  const quantity = parseInt(quantityInput.value);

  if (!color) return alert("Veuillez choisir une couleur !");
  if (quantity < 1 || quantity > 100) return alert("Veuillez choisir une quantité !");

  const cart = JSON.parse(localStorage.getItem("products") || "[]");
  const index = cart.findIndex(product => product._id === id && product.color === color);
  (index !== -1) ? cart[index].quantity = quantity : cart.push({ _id: id, color, quantity });
  localStorage.setItem("products", JSON.stringify(cart));

  selectedColor.value = "";
  quantityInput.value = 0;

  popupConfirm();
};