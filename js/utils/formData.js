/**
 * Class that handles the formdata
 */
 export default class FormData {
  /**
   * Representing an array of the form's elements
   * @param {[HTMLElement]} formData - The array of the form's elements
   */
  constructor (formData) {
    this.formData = formData;
  }

  /**
   * Get FormData's element
   * @param {String} id - selector to match
   * @returns the formData within the document that matches the specified selector
   */
  getFormData = id => this.formData.find(el => el.querySelector(id));

  /**
   * Checks input
   * @param {String} id - selector to match formdata element
   * @param {Function} fn - The function that checks the input
   * @returns Boolean
   */
  checkInput(id, fn) {
    const errorMsgElement = document.querySelector(id + "ErrorMsg");
    const formdata = this.getFormData(id);

    try {
      fn(formdata);

      errorMsgElement.textContent = ""
      return false;
    } catch (error) {
      errorMsgElement.textContent = error.message;
      return true;
    }
  }
}