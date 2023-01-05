export const handleCartTotal = cart => {
  const { quantity, price } = cart.reduce(
    (total, product) => ({
      quantity: total.quantity + product.quantity,
      price: total.price + product.price * product.quantity
    }),
    { quantity: 0, price: 0 }
  );

  const totalQuantityElement = document.querySelector("#totalQuantity");
  const totalPriceElement = document.querySelector("#totalPrice");

  totalQuantityElement.textContent = quantity;
  totalPriceElement.textContent = price;
};

const handleQuantityInput = cart => {
  return e => {
    const selectedItem = e.target.closest("[data-id]");
    const { id, color } = selectedItem.dataset;
    const quantity = parseInt(e.target.value);

    const index = cart.findIndex(product => product._id === id && product.color === color);
    cart[index].quantity = quantity;

    const newCart = cart.map(product => ({ _id: product._id, color: product.color, quantity: product.quantity }));
    localStorage.setItem("products", JSON.stringify(newCart));

    handleCartTotal(cart);
  }
}

const handleDeleteItem = cart => {
  return e => {
    const selectedItem = e.target.closest("[data-id]");
    const { id, color } = selectedItem.dataset;
  
    selectedItem.remove();
    
    const index = cart.findIndex(product => product._id === id && product.color === color);
    cart.splice(index, 1);
  
    const newCart = cart.map(product => ({ _id: product._id, color: product.color, quantity: product.quantity }));
    localStorage.setItem("products", JSON.stringify(newCart));

    handleCartTotal(cart);

    const cartItemsElement = document.querySelector("#cart__items");
    if (cart.length === 0) cartItemsElement.innerHTML = `<p style="text-align: center">Votre panier est vide</p>`
  }
}

export const handleCartProducts = cart => {
  const quantityInputElements = document.querySelectorAll(".itemQuantity");
  const deleteButtonElements = document.querySelectorAll(".deleteItem");

  const handleQuantity = handleQuantityInput(cart);
  const handleDelete = handleDeleteItem(cart);

  quantityInputElements.forEach(el => el.addEventListener("change", handleQuantity));
  deleteButtonElements.forEach(el => el.addEventListener("click", handleDelete));
}