import { api } from './api.js'; // API request Module

let storage = JSON.parse(localStorage.getItem('product') || "[]")
let totalQuantity = 0;
let totalPrice = 0;

const spanQuantity = document.querySelector('#totalQuantity');
const spanPrice = document.querySelector('#totalPrice');

// Si le localStorage est vide
if (storage.length === 0) {
    emptyCart(); // un message "votre panier est vide" s'affiche
} else {
    try {
        const products = await retrieveProducts(storage, api); // récupération des produits du panier

        getProduct(storage, products)
    } catch (e) {

        // console.error(e) // Uncomment to see the error message
    }
}

const submit = document.querySelector('#order');
submit.addEventListener('click', submitOrder); // Événement du bouton "Commander !"

/**
 * Permet de récupérer les produits du localStorage et de l'API
 * @param {*} arr Tableau du localStorage
 * @param {*} api Tableau de l'API
 * @returns { object } array
 */
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
    // console.log(array); // Uncomment to see the result
    return array;
}

/**
 * Permet d'obtenir un produit du tableau de produit et l'afficher
 * @param { object } storage - Le tableau du LocalStorage
 * @param { object } arr - Le tableau de products
 */
function getProduct(storage, arr) {
    for (const product of arr) {
        displayProduct(storage, product);
    }    
}

/**
 * Crées les éléments d'un produit et l'affiche
 * @param { object } arr - Le tableau du LocalStorage
 * @param { object } obj - L'objet d'un produit
 */
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

    // Calcul de la quantité total
    totalQuantity += qty;
    spanQuantity.textContent = totalQuantity;

    // Calcul du prix total
    let totalPriceProduct = qty * price;
    totalPrice += totalPriceProduct;
    spanPrice.textContent = totalPrice;

    // Changer la quantité d'un produit
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

    // Supprimer un article du panier
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

/**
 * Si le panier est vide un message votre panier est vide s'affiche
 * et initialise les totaux à 0
 */
function emptyCart() {
    const empty = document.createElement('h2');
    empty.textContent = "Votre panier est vide";
    empty.style.textAlign = "center";
    document.querySelector("#cart__items").appendChild(empty);

    spanQuantity.textContent = spanPrice.textContent = 0;
}

/**
 * Permet de valider la commande
 * @param {*} e événement click du bouton "Commander"
 */
async function submitOrder(e) {
    e.preventDefault(); // permet de ne pas rafraîchir le formulaire
    const form = document.querySelector(".cart__order__form");

    // si le tableau est vide
    if (storage.length === 0) {
        alert("Veuillez remplir le panier"); // une boîte de dialogue indique de remplir le panier
    } else {
        if (isInvalid()) return; // vérification de tous les champs du formulaire

        const body = getBody(form, storage); // récupération du body

        const url = api.url + "order";
        const init = api.init('POST', body); // paramètres de la requête
        const response = await api.res(url, init); // réponse de la requête
        // console.log(response); // Uncomment to see the result; before comment line: 208

        window.location.href = "./confirmation?orderId=" + response.orderId; // redirection dans la page de confirmation avec l'orderId en paramètre dans l'URL
    }
}

/** 
 * Permet de vérifier tous les champs du formulaire
 */
function isInvalid() {
    if (checkFirstname()) return true;
    else if (checkLastname()) return true;
    else if (checkAddress()) return true;
    else if (checkCity()) return true;
    else if (checkEmail()) return true;
    else return false;
}

// Vérification du champ firstname
function checkFirstname() {
    const firstname = document.querySelector('#firstName').value;
    const errmsg = document.querySelector('#firstNameErrorMsg');
    const regex = /^[A-Za-z- ]+$/; // regex qui accepte de les lettres les tirets et les espaces
    if (firstname === "") {
        errmsg.textContent = "Veuillez remplir ce champ"; // message d'erreur champ vide
        return true;
    } else if (regex.test(firstname) === false) {
        errmsg.textContent = "Veuillez saisir un prénom valide"; // message d'erreur format invalide
        return true;
    }

    errmsg.textContent = "";
}

// Vérification du champ lastname
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

// Vérification du champ address
function checkAddress() {
    const address = document.querySelector('#address').value;
    const errmsg = document.querySelector('#addressErrorMsg');
    if (address === "") {
        errmsg.textContent = "Veuillez remplir ce champ"; // message d'erreur champ vide
        return true;
    }

    errmsg.textContent = "";
}

// Vérification du champ city
function checkCity() {
    const city = document.querySelector('#city').value;
    const errmsg = document.querySelector('#cityErrorMsg');
    if (city === "") {
        errmsg.textContent = "Veuillez remplir ce champ";
        return true;
    }

    errmsg.textContent = "";
}

// Vérification du champ email
function checkEmail() {
    const email = document.querySelector('#email').value;
    const errmsg = document.querySelector('#emailErrorMsg')
    const regex = /[a-z0-9.-_]+@[a-z]+\.[a-z]{2,3}/;
    if (city === "") {
        errmsg.textContent = "Veuillez remplir ce champ"; // message d'erreur champ vide
        return true;
    } else if (regex.test(email) === false) {
        errmsg.textContent = "Veuillez entrer un email valide"; // message d'erreur format invalide
        return true;
    }

    errmsg.textContent = "";
}

/**
 * Permet de déclarer un objet body et de le retourner
 * @param { object } form L'objet du formulaire de contact
 * @param {*} arr Le tableau d'ID de produits
 * @returns { object }
 */
function getBody(form, arr) {
    const body = {
        contact: retrieveContactForm(form),
        products: retrieveProductId(arr)
    };
    // console.log(body); // Uncomment to see the result
    return body;
}

/**
 * Permet de récupérer les entrées du formulaires
 * @param {*} form 
 * @returns { object }
 */
function retrieveContactForm(form) {
    const formData = new FormData(form);
    const contactForm = Object.fromEntries(formData.entries());
    // console.log(contactForm); // Uncomment to see the result
    return contactForm;
}

/**
 * Permet de récupérer les ID des produits
 * @param {*} arr Tableau du localStorage
 * @returns {*} Tableau de productID
 */
function retrieveProductId(arr) {
    const productID = [];
    for (const product of arr) {
        const { _id } = product;
        productID.push(_id);
    }
    return productID;
}
