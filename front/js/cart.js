import { api } from './api.js';

let storage = JSON.parse(localStorage.getItem('product') || "[]")
let totalQuantity = 0;
let totalPrice = 0;

const spanQuantity = document.querySelector('#totalQuantity');
const spanPrice = document.querySelector('#totalPrice');

if (storage.length === 0) {
    emptyCart();
} else {
    try {
        const products = await retrieveProducts(storage, api);

        getProduct(storage, products)
    } catch (e) {

        // console.error(e) // Uncomment to see the error message
    }
}

const submit = document.querySelector('#order');
submit.addEventListener('click', submitOrder);

async function retrieveProducts(arr, api) {
    const array = [];

    for (const storage of arr) {
        const { _id, color, qty } = storage;
        const url = api.url + _id;
        const init = api.init();

        const response = await api.res(url, init);
        const { name, imageUrl, altTxt, price } = response;

        const product = {
            _id: _id,
            name: name,
            imageUrl: imageUrl,
            altTxt: altTxt,
            price: price,
            color: color,
            qty: qty
        };

        array.push(product);
    }

    return array;
}

function getProduct(storage, arr) {
    for (const product of arr) {
        displayProduct(storage, product);
    }    
}

function displayProduct(arr, obj) {
    const { _id, name, imageUrl, altTxt, color, price, qty } = obj;

    const productArticle = document.createElement('article');
    productArticle.classList = "cart__item"
    productArticle.dataset.id = _id;
    productArticle.dataset.color = color;
    document.querySelector('#cart__items').appendChild(productArticle);

    const productImage = document.createElement('div');
    productImage.classList = "cart__item__img";
    productArticle.appendChild(productImage);

    const image = document.createElement('img');
    image.src = imageUrl;
    image.alt = altTxt;
    productImage.appendChild(image);

    const productContent = document.createElement('div');
    productContent.classList = "cart__item__content";
    productArticle.appendChild(productContent);

    const productDescription = document.createElement('div');
    productDescription.classList = "cart__item__content__description";
    productContent.appendChild(productDescription);

    const productName = document.createElement('h2');
    productName.textContent = name;
    productDescription.appendChild(productName);

    const productColor = document.createElement('p');
    productColor.textContent = color;
    productDescription.appendChild(productColor);

    const productPrice = document.createElement('p');
    productPrice.textContent = price + " €";
    productDescription.appendChild(productPrice);

    const productSettings = document.createElement('div');
    productSettings.classList = "cart__item__content__settings";
    productContent.appendChild(productSettings);

    const productQuantity = document.createElement('div');
    productQuantity.classList = "cart__item__content__settings__quantity";
    productSettings.appendChild(productQuantity);

    const quantityText = document.createElement('p');
    quantityText.textContent = "Qty: ";
    productQuantity.appendChild(quantityText);

    const inputQuantity = document.createElement('input');
    inputQuantity.classList = "itemQuantity";
    inputQuantity.type = "number";
    inputQuantity.name = "itemQuantity";
    inputQuantity.min = 1;
    inputQuantity.max = 100;
    inputQuantity.setAttribute("value", qty);
    productQuantity.appendChild(inputQuantity);

    const deleteButton = document.createElement('p');
    deleteButton.classList = "cart__item__content__settings__delete";
    productSettings.appendChild(deleteButton);

    const deleteItem = document.createElement('p');
    deleteItem.classList = "deleteItem";
    deleteItem.textContent = "Supprimer";
    deleteButton.appendChild(deleteItem);

    totalQuantity += qty;
    spanQuantity.textContent = totalQuantity;

    let totalPriceProduct = qty * price;
    totalPrice += totalPriceProduct;
    spanPrice.textContent = totalPrice;

    inputQuantity.addEventListener("change", (e) =>{
        const target = parseInt(e.target.value);
        const found = arr.find(el => el._id === _id && el.color === color);

        if (target <= 0) {
            alert("Veuillez mettre une quantité");
            inputQuantity.value = found.qty;
        } else {
        
            totalQuantity -= found.qty;
            totalPrice -= (found.qty * price);

            arr = arr.map(el => (el._id === _id && el.color === color) ? {...el, qty: target} : el);
            localStorage.setItem('product', JSON.stringify(arr));

            totalQuantity += target;
            spanQuantity.textContent = totalQuantity;

            totalPriceProduct = target * price;
            totalPrice += totalPriceProduct;
            spanPrice.textContent = totalPrice;
        }
    });

    deleteItem.addEventListener('click', () => {
        const found = arr.find(el => el._id === _id && el.color === color);
        totalQuantity -= found.qty;
        totalPrice -= (found.qty * price);
    
        arr.splice(arr.indexOf(found), 1)
        localStorage.setItem('product', JSON.stringify(arr));
        productArticle.remove();
    
        spanQuantity.textContent = totalQuantity;
        spanPrice.textContent = totalPrice;
    
        if (arr.length === 0) {
            emptyCart();
        }
    });
}

function emptyCart() {
    const empty = document.createElement('h2');
    empty.textContent = "Votre panier est vide";
    empty.style.textAlign = "center";
    document.querySelector("#cart__items").appendChild(empty);

    spanQuantity.textContent = spanPrice.textContent = 0;
}

async function submitOrder(e) {
    e.preventDefault();
    const form = document.querySelector(".cart__order__form");

    if (storage.length === 0) {
        alert("Veuillez remplir le panier");
    } else {
        if (isInvalid()) return;

        const body = getBody(form, storage);

        const url = api.url + "order";
        const init = api.init('POST', body);
        const response = await api.res(url, init);

        window.location.href = "./confirmation.html?orderId=" + response.orderId;
    }
}

function isInvalid() {
    if (checkFirstname()) return true;
    else if (checkLastname()) return true;
    else if (checkAddress()) return true;
    else if (checkCity()) return true;
    else if (checkEmail()) return true;
    else return false;
}

function checkFirstname() {
    const firstname = document.querySelector('#firstName').value;
    const errmsg = document.querySelector('#firstNameErrorMsg');
    const regex = /^[A-Za-z- ]+$/;
    if (firstname === "") {
        errmsg.textContent = "Veuillez remplir ce champ";
        return true;
    } else if (regex.test(firstname) === false) {
        errmsg.textContent = "Veuillez saisir un prénom valide";
        return true;
    }

    errmsg.textContent = "";
}

function checkLastname() {
    const lastname = document.querySelector('#lastName').value;
    const errmsg = document.querySelector('#lastNameErrorMsg');
    const regex = /^[A-Za-z- ]+$/;
    if (lastname === "") {
        errmsg.textContent = "Veuillez remplir ce champ";
        return true;
    } else if (regex.test(lastname) === false) {
        errmsg.textContent = "Veuillez saisir un nom valide";
        return true;
    }

    errmsg.textContent = "";
}

function checkAddress() {
    const address = document.querySelector('#address').value;
    const errmsg = document.querySelector('#addressErrorMsg');
    if (address === "") {
        errmsg.textContent = "Veuillez remplir ce champ";
        return true;
    }

    errmsg.textContent = "";
}

function checkCity() {
    const city = document.querySelector('#city').value;
    const errmsg = document.querySelector('#cityErrorMsg');
    if (city === "") {
        errmsg.textContent = "Veuillez remplir ce champ";
        return true;
    }

    errmsg.textContent = "";
}

function checkEmail() {
    const email = document.querySelector('#email').value;
    const errmsg = document.querySelector('#emailErrorMsg')
    const regex = /[a-z0-9.-_]+@[a-z]+\.[a-z]{2,3}/;
    if (city === "") {
        errmsg.textContent = "Veuillez remplir ce champ";
        return true;
    } else if (regex.test(email) === false) {
        errmsg.textContent = "Veuillez entrer un email valide";
        return true;
    }

    errmsg.textContent = "";
}

function getBody(form, arr) {
    const body = {
        contact: retrieveContactForm(form),
        products: retrieveProductId(arr)
    };

    return body;
}

function retrieveContactForm(form) {
    const formData = new FormData(form);
    const contactForm = Object.fromEntries(formData.entries());

    return contactForm;
}

function retrieveProductId(arr) {
    const productID = [];
    for (const product of arr) {
        const { _id } = product;
        productID.push(_id);
    }

    return productID;
}
