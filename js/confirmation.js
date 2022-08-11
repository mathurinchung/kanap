import { getParams } from "./utils/index.js";

// Get order ID from URL
const orderId = getParams("orderId");

// Redirect to homepage if no order ID
if (!orderId) window.location.replace("/");

// Display order ID
document.querySelector("#orderId").textContent = orderId;
