export default class ProductTemplate {
  constructor(data) {
    this._data = data;
  }

  ProductCardDOM() {
    return `
      <a href="./product.html?id=${this._data.id}">
        <article>
          <img src=${this._data.image} alt="${this._data.alt}" />
          <h3 class="productName">${this._data.name}</h3>
          <p class="productDescripton">${this._data.description}</p>
        </article>
      </a>
    `;
  }

  ProductPageDOM() {
    document.title = this._data.name + " - KANAP";
    document.querySelector(".item__img").innerHTML = `<img src=${this._data.image} alt="${this._data.alt}" />`;
    document.querySelector("#title").textContent = this._data.name;
    document.querySelector("#price").textContent = this._data.price;
    document.querySelector("#description").textContent = this._data.description;
    document.querySelector("#colors").innerHTML += this._data.colors.map(color => `<option value=${color}>${color}</option>`).join("");
  }

  ProductCartDOM() {
    return `
      <article class="cart__item" data-id=${this._data.id} data-color=${this._data.color}>
        <div class="cart__item__img">
          <img src=${this._data.image} alt=${this._data.alt} />
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>${this._data.name}</h2>
            <p>${this._data.color}</p>
            <p>${this._data.price} €</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté : </p>
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${this._data.quantity}>
            </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem">Supprimer</p>
            </div>
          </div>
        </div>
      </article>
    `;
  }
}