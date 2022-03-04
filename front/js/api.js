export const api = {
    url: "http://localhost:3000/api/products/",
    init: function (method="GET", data) {
        const init = {
            method: method
        };

        if (method === "POST") {
            init.headers = {
                "Content-Type": "application/json"
            };

            init.body = JSON.stringify(data);
        }

        return init;
    },
    res: async function(url = this.url, init = this.init) {
        const response = await fetch(url, init);

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(errorMessage);
        }

        return response.json();
    }
};
