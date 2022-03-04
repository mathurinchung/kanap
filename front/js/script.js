import { api } from './api.js';

try {
    const products = await api.res();
    getProduct(products);
} catch (e) {
    const items = document.querySelector('#items');
    items.textContent = "Produits introuvables";

    // console.error(e); // Uncomment to see the error message
}

function getProduct(products) {
    for (const product of products) {
        displayProduct(product);
    }
}

function displayProduct(product) {
    const { _id, name, imageUrl, altTxt, description } = product;

    const productAnchor = document.createElement('a');
    productAnchor.href = "./product.html?id=" + _id;
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
