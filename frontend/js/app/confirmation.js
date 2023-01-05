import { displayOrderId } from "../views/product.js";

// Get order ID from URL
const URLSearchParams = new URL(window.location.href).searchParams;
const orderId = URLSearchParams.get("orderId");

// Redirect to homepage if no order ID
if (!orderId) window.location.replace("/");

displayOrderId(orderId);