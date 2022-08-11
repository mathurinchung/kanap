class Api {
  constructor (baseURL) {
    this.baseURL = baseURL;
  }

  /**
   * Fetch API
   * @param { string } endpoint 
   * @param { object } init 
   * @returns response
   */
  async response(endpoint, init) {
    try {
      const response = await fetch(this.baseURL + endpoint, init);
    
      if (!response.ok) throw response;
  
      return response.json();
    } catch (e) {
      throw Error(`${e.status} ${e.statusText}`)
    }
  }

  /**
   * Get method
   * @param {*} url 
   * @returns response
   */
  get(url) {
    return this.response(url)
  }

  /**
   * POST method
   * @param {*} url 
   * @param {*} data 
   * @returns response
   */
  post(url, data) {
    const init = {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    };

    return this.response(url, init)
  }
}

// Localhost API URL: "http://localhost:3000/api"
export const api = new Api("https://kanap-app.herokuapp.com/api");
