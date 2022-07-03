import { api } from './api.js'; // API request Module

try {
    const products = await api.res(); // Récupération du tableau de produits
    // console.log(products); // Uncomment to see the result
    getProduct(products);
} catch (e) {
    const items = document.querySelector('#items');
    items.textContent = "Produits introuvables";

    // console.error(e); // Uncomment to see the error message
}

/**
 * Permet d'obtenir un produit du tableau de produit et l'afficher
 * @param { object } arr - Le tableau de products
 */
function getProduct(arr) {
    for (const product of arr) {
        // console.log(product); // Uncomment to see the result
        displayProduct(product);
    }
}

/**
 * Crées les éléments d'un produit et l'affiche
 * @param { object } obj - L'objet d'un produit
 */
function displayProduct(obj) {
    const { _id, name, imageUrl, altTxt, description } = obj;

    const productAnchor = document.createElement('a');
    productAnchor.href = "./product?id=" + _id;
    document.querySelector('#items').appendChild(productAnchor);

    const productArticle = document.createElement('article');
    productAnchor.appendChild(productArticle);

    const productImage = document.createElement('img');
    productImage.src = imageUrl;
    productImage.alt = altTxt;

    const productHeading = document.createElement('h3');
    productHeading.classList = "productName";
    productHeading.textContent = name;

    const productDescription = document.createElement('p');
    productDescription.classList = "productDescripton";
    productDescription.textContent = description;

    const elements = [productImage, productHeading, productDescription];
    for (const i in elements) {
        productArticle.appendChild(elements[i]);
    }
}
