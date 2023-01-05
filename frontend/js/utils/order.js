import { checkInput, schemas } from "./checkIsInvalid.js";

/**
 * 
 * @param {*} cart 
 * @returns 
 */
const getFormData = cart => {
  const formElement = document.querySelector(".cart__order__form");
  const formData = new FormData(formElement);
  const contact = Object.fromEntries(formData.entries());

  const products = cart.map(product => product._id);

  return { contact, products };
}

/**
 * 
 * @returns 
 */
const handleIsInvalid = () => {
  return (checkInput("#firstName", schemas.letters) || checkInput("#lastName", schemas.letters) || checkInput("#address", schemas.lettersDigit) || checkInput("#city", schemas.letters) || checkInput("#email", schemas.email)) ? true : false;
}

/**
 * 
 * @param {*} cart 
 * @param {*} orderProducts 
 * @returns 
 */
export const handleSendOrder = (cart, orderProducts) => {
  return async e => {
    e.preventDefault();
  
    if (cart.length === 0) return alert("Veuillez remplir le panier");
    if (handleIsInvalid()) return;
  
    const data = getFormData(cart);

    const { orderId } = await orderProducts(data);
  
    localStorage.removeItem("products");
    window.location.href = "./confirmation.html?orderId=" + orderId;
  }
};