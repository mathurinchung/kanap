import { displayOrderId } from "../views/order.js";
import { getParams } from "../utils/getParams.js";

// Get orderId from URL params
const orderId = getParams("orderId");

// Redirect to homepage if no orderId
if (!orderId) window.location.replace("/");

// Display orderId
displayOrderId(orderId);