/**
 * 
 * @returns 
 */
export function isInvalid() {
  if (checkFirstname()) return true;
  else if (checkLastname()) return true;
  else if (checkAddress()) return true;
  else if (checkCity()) return true;
  else if (checkEmail()) return true;
  else return false;
}

/**
 * 
 * @returns 
 */
function checkFirstname() {
  const firstname = document.querySelector("#firstName").value;
  const errmsg = document.querySelector("#firstNameErrorMsg");
  const regex = /^[A-Za-z- ]+$/;

  if (firstname === "") {
    errmsg.textContent = "Veuillez remplir ce champ";
    return true;
  } else if (regex.test(firstname) === false) {
    errmsg.textContent = "Veuillez saisir un prénom valide";
    return true;
  }

  errmsg.textContent = "";
}

/**
 * 
 * @returns 
 */
function checkLastname() {
  const lastname = document.querySelector("#lastName").value;
  const errmsg = document.querySelector("#lastNameErrorMsg");
  const regex = /^[A-Za-z- ]+$/;

  if (lastname === "") {
    errmsg.textContent = "Veuillez remplir ce champ";
    return true;
  } else if (regex.test(lastname) === false) {
    errmsg.textContent = "Veuillez saisir un nom valide";
    return true;
  }

  errmsg.textContent = "";
}

/**
 * 
 * @returns 
 */
function checkAddress() {
  const address = document.querySelector("#address").value;
  const errmsg = document.querySelector("#addressErrorMsg");

  if (address === "") {
    errmsg.textContent = "Veuillez remplir ce champ";
    return true;
  }

  errmsg.textContent = "";
}

/**
 * 
 * @returns 
 */
function checkCity() {
  const city = document.querySelector("#city").value;
  const errmsg = document.querySelector("#cityErrorMsg");

  if (city === "") {
    errmsg.textContent = "Veuillez remplir ce champ";
    return true;
  }

  errmsg.textContent = "";
}

/**
 * 
 * @returns 
 */
function checkEmail() {
  const email = document.querySelector("#email").value;
  const errmsg = document.querySelector("#emailErrorMsg");
  const regex = /[a-z0-9.-_]+@[a-z]+\.[a-z]{2,3}/;

  if (email === "") {
    errmsg.textContent = "Veuillez remplir ce champ";
    return true;
  } else if (regex.test(email) === false) {
    errmsg.textContent = "Veuillez entrer un email valide";
    return true;
  }

  errmsg.textContent = "";
}
