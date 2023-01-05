/**
 * 
 * @param {*} cart 
 * @returns 
 */
export const handleQuantityInput = cart => {
  return e => {
    const selectedItem = e.target.closest("[data-id]");
    const { id, color } = selectedItem.dataset;
    const quantity = parseInt(e.target.value);

    const index = cart.findIndex(product => product._id === id && product.color === color);
    cart[index].quantity = quantity;

    const newCart = cart.map(product => ({ _id: product._id, color: product.color, quantity: product.quantity }));
    localStorage.setItem("products", JSON.stringify(newCart));
  }
};

/**
 * 
 * @param {*} cart 
 * @returns 
 */
export const handleDeleteItem = cart => {
  return e => {
    const selectedItem = e.target.closest("[data-id]");
    const { id, color } = selectedItem.dataset;
  
    selectedItem.remove();
    
    const index = cart.findIndex(product => product._id === id && product.color === color);
    cart.splice(index, 1);
  
    const newCart = cart.map(product => ({ _id: product._id, color: product.color, quantity: product.quantity }));
    localStorage.setItem("products", JSON.stringify(newCart));

    const cartItemsElement = document.querySelector("#cart__items");
    if (cart.length === 0) cartItemsElement.innerHTML = `<p style="text-align: center">Votre panier est vide</p>`
  }
};