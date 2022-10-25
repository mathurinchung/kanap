import ProductService from "../services/product.js";
import ProductFactory from "../factories/product.js";
import ProductUtils from "../utils/product.js";

class App {
  displayData(product) {
    const productTemplate = new ProductFactory(product);
    productTemplate.ProductPageDOM();
  }

  async init() {
    const URLSearchParams = new URL(window.location.href).searchParams;
    const id = URLSearchParams.get("id");

    const product = await ProductService.getProductById(id);
    this.displayData(product);

    const productHandler = new ProductUtils(id);
    productHandler.init();
  }
}

const app = new App();
app.init();