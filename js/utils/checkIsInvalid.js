import CheckInputs from "./checkInputs.js";

/**
 * Class that checks for invalid inputs
 * @extends CheckInputs
 */
 export default class CheckIsInvalid extends CheckInputs {
  /**
   * Checks firstname is invalid
   * @param {String} id - selector to match firstname
   * @returns Boolean
   */
  firstname = id => this.checkInput(id, this.checkName);

  /**
   * Checks lastname is invalid
   * @param {String} id - selector to match lastname
   * @returns Boolean
   */
  lastname = id => this.checkInput(id, this.checkName);

  /**
   * Checks address is invalid
   * @param {String} id - selector to match address
   * @returns Boolean
   */
  address = id => this.checkInput(id, this.checkEmpty);

  /**
   * Checks city is invalid
   * @param {String} id - selector to match city
   * @returns Boolean
   */
  city = id => this.checkInput(id, this.checkEmpty);

  /**
   * Checks email is invalid
   * @param {String} id - selector to match email
   * @returns Boolean
   */
  email = id => this.checkInput(id, this.checkEmail);
}