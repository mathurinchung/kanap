import * as check from "./checkIsInvalid.js";

const formElement = document.querySelector(".cart__order__form");
formElement.setAttribute("novalidate", "");

const getFormData = cart => {
  const formData = new FormData(formElement);
  const contact = Object.fromEntries(formData.entries());

  const products = cart.map(product => product._id);

  return { contact, products };
}

const isInvalid = () => {
  return (check.firstname("#firstName") || check.lastname("#lastName") || check.address("#address") || check.city("#city") || check.email("#email")) ? true : false;
}

const sendOrder = (cart, orderProducts) => {
  return async e => {
    e.preventDefault();
  
    if (cart.length === 0) return alert("Veuillez remplir le panier");
    if (isInvalid()) return;
  
    const data = getFormData(cart);

    const { orderId } = await orderProducts(data);
  
    localStorage.removeItem("products");
    window.location.href = "./confirmation.html?orderId=" + orderId;
  }
};

export const handleSubmit = (cart, orderProducts) => {
  const submit = sendOrder(cart, orderProducts);
  formElement.addEventListener("submit", submit);
};