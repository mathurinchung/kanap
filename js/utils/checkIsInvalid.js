/**
 * Checks input
 * @param { string } id - selector to match formdata element
 * @param { function } fn - The function that checks the input
 * @returns Boolean
 */
const checkInput = (id, fn) => {
  const formElements = [ ...document.querySelectorAll(".cart__order__form__question") ];
  const errorMsgElement = document.querySelector(id + "ErrorMsg");
  const formdata = formElements.find(el => el.querySelector(id));

  try {
    fn(formdata);

    errorMsgElement.textContent = ""
    return false;
  } catch (error) {
    errorMsgElement.textContent = error.message;
    return true;
  }
}


/**
 * Checks the value of the input
 * @param { string } formdata
 */
const checkName = formdata => {
  const input = formdata.querySelector("input").value;
  const regex = /^[A-Za-z- ]+$/;

  if (input === "") throw new Error("Veuillez remplir ce champ");
  else if (regex.test(input) === false) throw new Error(`Veuillez saisir un nom valide`);
  else if (input.length < 2) throw new Error(`Veuillez saisir 2 caractères ou plus pour le champ du nom`);
}

const checkEmpty = formdata => {
  const input = formdata.querySelector("input").value;

  if (input === "") throw new Error("Veuillez remplir ce champ");
}

const checkEmail = formdata => {
  const input = formdata.querySelector("input").value;
  const regex = /[a-z0-9.-_]+@[a-z0-9]+\.[a-z]{2,3}/;

  if (input === "") throw new Error("Veuillez remplir ce champ");
  else if (regex.test(input) === false) throw new Error("Veuillez entrer un email valide");
}


/**
 * Checks firstname is invalid
 * @param { string } id - selector to match firstname
 * @returns Boolean
 */
export const firstname = id => checkInput(id, checkName);
export const lastname = id => checkInput(id, checkName);
export const address = id => checkInput(id, checkEmpty);
export const city = id => checkInput(id, checkEmpty);
export const email = id => checkInput(id, checkEmail);