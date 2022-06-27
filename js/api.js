export const api = {
    url: "http://localhost:3000/api/products/", // URL de l'API
    // Un objet qui contient les paramètres de la requête
    init: function (str = 'GET', data) {
        const init = {
            method: str
        };
    
        if (str === 'POST') {
            init.headers = {
                "Content-Type": "application/json"
            }
            init.body = JSON.stringify(data)
        }
    
        return init;
    },
    // function asynchrone qui retourne une réponse
    res: async function (url = this.url, init = this.init) {
        const response = await fetch(url, init);

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(errorMessage);
        }

        return response.json(); // la méthode json qui permet de produire un objet JavaScript
    }
};

// const response = await api.res();
// console.log(response);

// const init = api.init();
// console.log(init);
