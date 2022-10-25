import ProductService from "../services/product.js";
import ProductFactory from "../factories/product.js";
import CartUtils from "../utils/cart.js";
import OrderUtils from "../utils/order.js";

class App {
  constructor() {
    this.cartItemsElement = document.querySelector("#cart__items");
  }

  emptyCart() {
    this.cartItemsElement.innerHTML = `<p style="text-align: center">Votre panier est vide</p>`;
  }

  displayData(cart) {
    this.cartItemsElement.innerHTML = cart.map(product => {
      const productTemplate = new ProductFactory(product);
      return productTemplate.ProductCartDOM();
    });
  }

  displayCartTotal({ quantity, price }) {
    const totalQuantity = document.querySelector("#totalQuantity");
    const totalPrice = document.querySelector("#totalPrice");

    totalQuantity.textContent = quantity;
    totalPrice.textContent = price;
  }

  async init() {
    let cart = JSON.parse(localStorage.getItem("products") || "[]");
    cart = await ProductService.getProductsCart(cart);

    (cart.length === 0) ? this.emptyCart() : this.displayData(cart);

    const cartHandler = new CartUtils();
    const orderHandler = new OrderUtils();

    const total = cartHandler.handleCartTotal(cart)
    this.displayCartTotal(total);

    cartHandler.init(cart, this.displayCartTotal, this.emptyCart);
    orderHandler.init(cart, ProductService)
  }
}

const app = new App();
app.init();