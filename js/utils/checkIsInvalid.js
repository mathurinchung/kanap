/**
 * 
 */
export const schemas = {
  letters: {
    regex: /^[A-Za-z- ]+$/,
    message: "Veuillez saisir un nom valide"
  },
  lettersDigit: {
    regex: /^[0-9A-Za-zÀ-ÿ-', ]+$/,
    message: 'Veuillez saisir des chiffres et des lettres uniquement',
  },
  email: {
    regex: /[a-z0-9.-_]+@[a-z0-9]+\.[a-z]{2,3}/,
    message: "Veuillez entrer un email valide"
  }
};

/**
 * 
 * @param { string } id 
 * @param { object } schema 
 * @returns Boolean
 */
export const checkInput = (id, schema) => {
  const formElements = [ ...document.querySelectorAll(".cart__order__form__question") ];
  const formData = formElements.find(el => el.querySelector(id));
  const inputElement = formData.querySelector("input");
  const inputValue = inputElement.value.trim();

  const errorMsgElement = document.querySelector(id + "ErrorMsg");

  try {
    if (inputValue === "") throw new Error("Veuillez remplir ce champ");
    else if (!schema.regex.test(inputValue)) throw new Error(schema.message);
    else if (inputValue.length < 3) throw new Error("Veuillez saisir 3 caractères ou plus");

    errorMsgElement.textContent = ""
    return false;
  } catch (error) {
    errorMsgElement.textContent = error.message;
    return true;
  }
}