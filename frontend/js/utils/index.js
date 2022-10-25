export default class Utils {
  constructor() {
    this._cart = JSON.parse(localStorage.getItem("products") || "[]");
  }

  getIndex = (id, color) => this._cart.findIndex(product => product._id === id && product.color === color);

  setCart = (cart) => cart.map(product => ({ _id: product._id, color: product.color, quantity: product.quantity }));
}