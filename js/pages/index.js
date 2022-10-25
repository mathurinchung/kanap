import ProductService from "../services/product.js";
import ProductFactory from "../factories/product.js";

class App {
  displayData(products) {
    const productsElement = document.querySelector("#items");

    products.map(product => {
      const productTemplate = new ProductFactory(product);
      productsElement.innerHTML += productTemplate.ProductCardDOM();
    });
  }

  async init() {
    const products = await ProductService.getAllProducts();
    this.displayData(products);
  }
}

const app = new App();
app.init();