const baseURL = "http://localhost:3000/api";

/**
 * Fetch API
 * @param { string } endpoint
 * @param { object } init
 * @returns response
 */
const response = async (endpoint, init) => {
  const response = await fetch(baseURL + endpoint, init);

  if (!response.ok) throw new Error((await response.json()).message);

  return response.json();
};

/**
 * Get method
 * @param { string } url 
 * @returns response
 */
export const get = async url => {
  return response(url);
};

/**
 * POST method
 * @param { string } url
 * @param { object } data
 * @returns response
 */
export const post = async (url, data) => {
  const init = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  };

  return response(url, init);
};