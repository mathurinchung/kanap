export default class Api {
    // Localhost API URL: "http://localhost:3000/api"
    // Herokuapp API URL: "https://kanap-app.herokuapp.com/api"
  static baseURL = "http://localhost:3000/api";

  /**
   * Fetch API
   * @param { string } endpoint 
   * @param { object } init 
   * @returns response
   */
  static async response(endpoint, init) {
    try {
      const response = await fetch(this.baseURL + endpoint, init);
    
      if (!response.ok) throw new Error(response.status);
  
      return response.json();
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Get method
   * @param {*} url 
   * @returns response
   */
  static get(url) { return this.response(url); }

  /**
   * POST method
   * @param {*} url 
   * @param {*} data 
   * @returns response
   */
  static post(url, data) {
    const init = {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    };

    return this.response(url, init);
  }
}