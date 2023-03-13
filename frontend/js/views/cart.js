/**
 * 
 * @param {*} cart 
 */
export const displayCartTotal = ({ quantity, price }) => {
  const totalQuantityElement = document.querySelector('#totalQuantity');
  const totalPriceElement = document.querySelector('#totalPrice');

  totalQuantityElement.textContent = quantity;
  totalPriceElement.textContent = price;
};