import Utils from "./index.js";

export default class CartUtils extends Utils {
  handleCartTotal(cart) {
    const { quantity, price } = cart.reduce(
      (total, product) => ({
        quantity: total.quantity + product.quantity,
        price: total.price + product.price * product.quantity
      }),
      { quantity: 0, price: 0 }
    );

    return { quantity, price };
  }

  handleQuantityInput(cart, displayCartTotal) {
    return e => {
      const selectedItem = e.target.closest("[data-id]");
      const { id, color } = selectedItem.dataset;
      const quantity = parseInt(e.target.value);

      const index = this.getIndex(id, color);
      cart[index].quantity = quantity;

      const newCart = this.setCart(cart);
      localStorage.setItem("products", JSON.stringify(newCart));

      const total = this.handleCartTotal(cart);
      displayCartTotal(total);
    }
  }

  handleDeleteItem(cart, displayCartTotal, emptyCart) {
    return e => {
      const selectedItem = e.target.closest("[data-id]");
      const { id, color } = selectedItem.dataset;
    
      selectedItem.remove();
      
      const index = this.getIndex(id, color);
      cart.splice(index, 1);
    
      const newCart = this.setCart(cart);
      localStorage.setItem("products", JSON.stringify(newCart));
    
      const total = this.handleCartTotal(cart);
      displayCartTotal(total);
    
      if (cart.length === 0) emptyCart();
    }
  }

  init(cart, displayCartTotal, emptyCart) {
    const quantityInputs = document.querySelectorAll('.itemQuantity');
    const deleteButtons = document.querySelectorAll('.deleteItem');

    const quantityItem = this.handleQuantityInput(cart, displayCartTotal);
    const deleteItem = this.handleDeleteItem(cart, displayCartTotal, emptyCart);

    quantityInputs.forEach(el => el.addEventListener('change', quantityItem));
    deleteButtons.forEach(el => el.addEventListener('click', deleteItem));
  }
}