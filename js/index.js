import { api } from "./utils/index.js";

displayProducts();

/**
 * Display product cards
 */
async function displayProducts() {
  const productsElement = document.querySelector("#items");

  try {
    const products = await api.get("/products");

    productsElement.innerHTML = products.map(createProductCard).join("");
  } catch (e) {
    productsElement.innerHTML = `<p>Produits introuvables - ${e.message}</p>`;
  }
}

/**
 * Create product card element
 * @param { object } productData
 * @returns HTML element
 */
function createProductCard({ _id, name, imageUrl, altTxt, description }) {
  return `
    <a href="./product?id=${_id}">
      <article>
        <img src=${imageUrl} alt="${altTxt}" />
        <h3 class="productName">${name}</h3>
        <p class="productDescripton">${description}</p>
      </article>
    </a>
  `;
}

/** TODO:
 *  comments
 *  error message
 */
