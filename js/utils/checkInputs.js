import FormData from "./formData.js";

/**
 * Class that checks the value of inputs
 * @extends FormData
 */
export default class CheckInputs extends FormData {
  /**
   * Checks the value of the input name
   * @param {String} formdata
   */
  checkName(formdata) {
    const input = formdata.querySelector("input").value;
    const regex = /^[A-Za-z- ]+$/;

    if (input === "") throw new Error("Veuillez remplir ce champ");
    else if (regex.test(input) === false) throw new Error(`Veuillez saisir un nom valide`);
    else if (input.length < 2) throw new Error(`Veuillez saisir 2 caractères ou plus pour le champ du nom`);
  }

  /**
   * Checks the value of the input address
   * @param {String} formdata 
   */
  checkEmpty(formdata) {
    const input = formdata.querySelector("input").value;

    if (input === "") throw new Error("Veuillez remplir ce champ");
  }

  /**
   * Checks the value of the input email
   * @param {String} formdata 
   */
  checkEmail(formdata) {
    const input = formdata.querySelector("input").value;
    const regex = /[a-z0-9.-_]+@[a-z0-9]+\.[a-z]{2,3}/;

    if (input === "") throw new Error("Veuillez remplir ce champ");
    else if (regex.test(input) === false) throw new Error("Veuillez entrer un email valide");
  }
}