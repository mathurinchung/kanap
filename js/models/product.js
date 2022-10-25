export default class ProductModel {
  constructor(data) {
    this._colors = data.colors;
    this._id = data._id;
    this._name = data.name;
    this._price = data.price;
    this._image = data.imageUrl;
    this._description = data.description;
    this._alt = data.altTxt;

    this._color = data.color;
    this._quantity = data.quantity;
  }

  get colors() { return this._colors; }

  get id() { return this._id; }

  get name() { return this._name; }

  get price() { return this._price; }

  get image() { return this._image; }

  get description() { return this._description; }

  get alt() { return this._alt; }

  get quantity() { return this._quantity; }

  get color() { return this._color; }
}