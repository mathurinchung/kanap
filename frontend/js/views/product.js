/**
 * 
 * @param {*} products
 * @returns 
 */
export const displayProducts = products => {
  const ProductCardDOM = product => `
    <a href="./product.html?id=${product._id}">
      <article>
        <img src=${product.imageUrl} alt="${product.altTxt}" />
        <h3 class="productName">${product.name}</h3>
        <p class="productDescripton">${product.description}</p>
      </article>
    </a>
  `;

  return products.map(ProductCardDOM);
};

/**
 * 
 * @param {*} product
 */
export const displayProduct = product => {
  document.title = product.name + " - KANAP";
  document.querySelector(".item__img").innerHTML = `<img src=${product.imageUrl} alt="${product.altTxt}" />`;
  document.querySelector("#title").textContent = product.name;
  document.querySelector("#price").textContent = product.price;
  document.querySelector("#description").textContent = product.description;
  document.querySelector("#colors").innerHTML += product.colors.map(color => `<option value=${color}>${color}</option>`).join("");
};

/**
 * 
 * @param {*} cart 
 * @returns 
 */
export const displayCart = cart => {
  const emptyCart = `<p style="text-align: center">Votre panier est vide</p>`;

  const ProductCartDOM = product => `
    <article class="cart__item" data-id=${product._id} data-color=${product.color}>
      <div class="cart__item__img">
        <img src=${product.imageUrl} alt=${product.altTxt} />
      </div>
      <div class="cart__item__content">
        <div class="cart__item__content__description">
          <h2>${product.name}</h2>
          <p>${product.color}</p>
          <p>${product.price} €</p>
        </div>
        <div class="cart__item__content__settings">
          <div class="cart__item__content__settings__quantity">
            <p>Qté : </p>
            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${product.quantity}>
          </div>
          <div class="cart__item__content__settings__delete">
            <p class="deleteItem">Supprimer</p>
          </div>
        </div>
      </div>
    </article>
  `;

  return (cart.length === 0) ? emptyCart : cart.map(ProductCartDOM).join("");
};

/**
 * 
 * @param {*} cart 
 */
export const displayCartTotal = cart => {
  const { quantity, price } = cart.reduce(
    (total, product) => ({
      quantity: total.quantity + product.quantity,
      price: total.price + product.price * product.quantity
    }),
    { quantity: 0, price: 0 }
  );

  const totalQuantityElement = document.querySelector("#totalQuantity");
  const totalPriceElement = document.querySelector("#totalPrice");

  totalQuantityElement.textContent = quantity;
  totalPriceElement.textContent = price;
};

/**
 * 
 * @param {*} orderId 
 */
export const displayOrderId = orderId => {
  document.querySelector("#orderId").textContent = orderId;
};