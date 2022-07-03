import { api } from './api.js'; // API Module

const params = new URL(document.location).searchParams;
const id = params.get('id'); // Gets ID from the URL

try {
    const url = api.url + id; // l'URL d'un produit
    const product = await api.res(url) // { object } L'objet product
    // console.log(product); // Uncomment to see the result
    displayProduct(product);

    const button = document.querySelector('#addToCart');
    button.addEventListener('click', addToCart); // Événement du bouton "Ajouter au panier"
} catch (e) {
    const item = document.querySelector('.item');
    item.textContent = "Produit introuvable"; // message d'erreur si un incident se produit

    // console.error(e) // Uncomment to see the error message
}

/**
 * Crées les éléments d'un produit et l'affice
 * @param { object } obj - L'objet d'un produit
 */
function displayProduct(obj) {
    const { name, imageUrl, altTxt, description, price, colors } = obj;

    document.head.querySelector('title').textContent = name + " - KANAP";

    const image = document.createElement('img');
    image.src = imageUrl;
    image.alt = altTxt;
    document.querySelector(".item__img").appendChild(image);

    document.querySelector("#title").textContent = name;
    document.querySelector("#price").textContent = price;
    document.querySelector("#description").textContent = description;

    for (const i in colors) {
        const option = document.createElement('option');
        option.value = option.textContent = colors[i];
        document.querySelector('#colors').appendChild(option);
    }
}

/**
 * Crées et ajoute un objet produit dans le LocalStorage
 */
function addToCart() {
    const errorMsg = document.querySelector('#errorMsg');
    errorMsg.style.color = '#fbbcbc';

    const select = document.querySelector('#colors');
    const colorSelected = select.options[select.selectedIndex].value;
    const quantity = document.querySelector("#quantity");

    if (colorSelected === "") {
        errorMsg.textContent = "Veuillez choisir une couleur !";
    } else if (quantity.value <= 0) {
        errorMsg.textContent = "Veuillez choisir une quantité !";
    } else {
        const product = {
            _id: id,
            color: colorSelected,
            qty: parseInt(quantity.value)
        };

        // console.log(product); // Uncomment to see the result

        setStorage(product);

        select.value = "";
        quantity.value = 0;
    }

    setTimeout(() => {
        errorMsg.textContent = "";
    }, 3000);
}

/**
 * Sets the LocalStorage
 * @param { object } obj The object of a product
 */
function setStorage(obj) {
    const { _id, color, qty } = obj
    let storage = JSON.parse(localStorage.getItem("product") || "[]");

    if (storage.length === 0) {
        storage.push(obj)
        localStorage.setItem('product', JSON.stringify(storage));
    } else {
        const found = storage.find(obj => obj._id === _id && obj.color === color);

        if (found) {
            let quantityStorage = found.qty;
            quantityStorage += qty;
            storage = storage.map(obj => obj._id === _id && obj.color === color ? {...obj, qty: quantityStorage} : obj);
            localStorage.setItem('product', JSON.stringify(storage));
        } else {
            storage.push(obj)
            localStorage.setItem('product', JSON.stringify(storage));
        }
    }

    popupConfirm(obj);
}

/**
 * Résumes l'ajout et redirection
 * @param { object } obj The object of a product
 */
function popupConfirm(obj) {
    const name = document.querySelector('#title').textContent;
    const { color, qty} = obj
    let text = `${name} couleur: ${color}, quantité: ${qty} a bien été ajouté au panier ! \n`;
        text += "Consulter le panier OK ou revenir sur la page ANNULER";

    if (confirm(text)) {
        // console.log("OK"); // Uncomment to see the result
        window.location.href = "./cart";
    } else {
        // console.log("CANCEL"); // Uncomment to see the result
        window.location.href = "";
    }
}
