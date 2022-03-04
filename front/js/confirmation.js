const params = new URL(document.location).searchParams;
document.querySelector('#orderId').textContent = params.get('orderId');

localStorage.clear();
