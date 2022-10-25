import CheckIsInvalid from "./checkIsInvalid.js";

export default class OrderUtils {
  constructor() {
    this.form = document.querySelector(".cart__order__form");
    this.form.setAttribute("novalidate", "")
  }

  getData(cart) {
    const formData = new FormData(this.form);
    const contact = Object.fromEntries(formData.entries());
  
    const products = cart.map(product => product._id);
  
    return { contact, products };
  }

  async sendOrder(cart, ProductService) {
    const data = this.getData(cart);

    const orderId = await ProductService.orderProducts(data);

    localStorage.removeItem("products");
    window.location.href = "./confirmation.html?orderId=" + orderId;
  }

  isInvalid() {
    const formData = [ ...document.querySelectorAll(".cart__order__form__question") ];
    const check = new CheckIsInvalid(formData);

   return (check.firstname("#firstName") || check.lastname("#lastName") || check.address("#address") || check.city("#city") || check.email("#email")) ? true : false;
  }

  handleSubmit(cart, ProductService) {
    return e => {
      e.preventDefault();
    
      if (cart.length === 0) return alert("Veuillez remplir le panier");
      if (this.isInvalid()) return;
    
      this.sendOrder(cart, ProductService);
    }
  }

  init(cart, ProductService) {
    const submit = this.handleSubmit(cart, ProductService);

    this.form.addEventListener("submit", submit);
  }
}