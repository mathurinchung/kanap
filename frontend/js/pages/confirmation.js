class App {
  displayData(orderId) {
    // Display order ID
    document.querySelector("#orderId").textContent = orderId;
  }

  init() {
    // Get order ID from URL
    const URLSearchParams = new URL(window.location.href).searchParams;
    const orderId = URLSearchParams.get("orderId");

    // Redirect to homepage if no order ID
    if (!orderId) window.location.replace("/");

    this.displayData(orderId);
  }
}

const app = new App();
app.init();