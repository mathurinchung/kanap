/**
 * 
 * @param {*} products
 * @returns 
 */
export const displayProducts = product => (`
  <a href="./product?id=${product._id}">
    <article>
      <img src=${product.imageUrl} alt="${product.altTxt}" />
      <h3 class="productName">${product.name}</h3>
      <p class="productDescripton">${product.description}</p>
    </article>
  </a>
`);

/**
 * 
 * @param {*} product
 */
export const displayProduct = product => {
  document.title = `${ product.name } - KANAP`;
  document.querySelector('.item__img').innerHTML = `<img src=${ product.imageUrl } alt="${ product.altTxt }" />`;
  document.querySelector('#title').textContent = product.name;
  document.querySelector('#price').textContent = product.price;
  document.querySelector('#description').textContent = product.description;
  document.querySelector('#colors').innerHTML += product.colors.map(color => `<option value=${color}>${color}</option>`).join('');
};

/**
 * 
 * @param {*} cart 
 * @returns 
 */
export const displayCart = product => (`
  <article class="cart__item" data-id=${ product._id } data-color=${ product.color }>
    <div class="cart__item__img">
      <img src=${ product.imageUrl } alt=${ product.altTxt } />
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>${ product.name }</h2>
        <p>${ product.color }</p>
        <p>${ product.price } €</p>
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
`);