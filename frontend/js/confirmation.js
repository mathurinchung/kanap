const params = new URL(document.location).searchParams;
document.querySelector('#orderId').textContent = params.get('orderId'); // Gets the orderId from the URL and display it

localStorage.clear(); // Clear the localStorage
