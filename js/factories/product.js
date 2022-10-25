import ProductModel from "../models/product.js";
import ProductTemplate from "../templates/product.js";

export default class ProductFactory {
  constructor(data) {
    this._data = new ProductModel(data);

    return new ProductTemplate(this._data);
  }
}