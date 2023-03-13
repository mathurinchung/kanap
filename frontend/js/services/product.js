import * as api from './api/index.js'

const key = "products";

/**
 * 
 * @returns 
 */
export const getProducts = () => api.get({ url: `/${ key }` });

/**
 * 
 * @param {*} id 
 * @returns 
 */
export const getProductById = id => api.get({ url: `/${ key }/${ id }` });

/**
 * 
 * @returns 
 */
export const getProductsCart = async cart => {
  return await Promise.all(cart.map(async item => {
    const product = await getProductById(item._id);
    return { ...product, _id: item._id, color: item.color, quantity: item.quantity }
  }));
};

/**
 * 
 * @param {*} data 
 * @returns 
 */
export const createOrder = data => api.post({ url: `/${ key }/order`, data });