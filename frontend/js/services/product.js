import Api from "../api/index.js";

export default class ProductService extends Api {
  static async getAllProducts() {
    const products = await this.get("/products");

    return products;
  }

  static async getProductById(id) {
    const product = await this.get(`/products/${id}`);

    return product;
  }

  static async getProductsCart(cart) {
    return await Promise.all(cart.map(async item => {
      const product = await this.getProductById(item._id);
      return { ...product, _id: item._id, color: item.color, quantity: item.quantity };
    }));
  }

  static async orderProducts() {
    const data = {
      contact: {
        firstName: "first",
        lastName: "last",
        address: "address",
        city: "city",
        email: "email@example.com"
      },
      products: [
        "415b7cacb65d43b2b5c1ff70f3393ad1"
      ]
    }
    const { orderId } = await this.post("/products/order" , data);

    return orderId;
  }
}