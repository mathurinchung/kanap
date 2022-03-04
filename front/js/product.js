import { api } from './api.js';

const params = new URL(document.location).searchParams;
const id = params.get('id');

try {
    const url = api.url + id;
    const product = await api.res(url);
    displayProduct(product);

    const button = document.querySelector('#addToCart');
    button.addEventListener('click', addToCart);
} catch (e) {
    const item = document.querySelector('.item');
    item.textContent = "Produit introuvable";

    // console.error(e) // Uncomment to see the error message
}

function displayProduct(product) {
    const { name, imageUrl, altTxt, description, price, colors } = product;

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

        setStorage(product);

        select.value = "";
        quantity.value = 0;
    }

    setTimeout(() => {
        errorMsg.textContent = "";
    }, 3000);
}

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

function popupConfirm(product) {
    const name = document.querySelector('#title').textContent;
    const { color, qty} = product
    let text = `${name} couleur: ${color}, quantité: ${qty} a bien été ajouté au panier ! \n`;
        text += "Consulter le panier OK ou revenir sur la page ANNULER";

    if (confirm(text)) {
        window.location.href = "./cart.html";
    } else {
        window.location.href = "";
    }
}
