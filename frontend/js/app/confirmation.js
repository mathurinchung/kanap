import { displayOrderId } from "../views/product.js";

// Get orderId from URL params
const URLSearchParams = new URL(window.location.href).searchParams;
const orderId = URLSearchParams.get("orderId") || null;

// Redirect to homepage if no orderId
if (!orderId) window.location.replace("/");

// Display orderId
displayOrderId(orderId);