const express = require("express");
const router = express.Router();
const payment_controller = require("../controllers/paymentController");

// _________________ Stripe Start _________________ //

router.post("/create-payment-intent", payment_controller.createPaymentIntent);
router.post(
  "/create-checkout-session",
  payment_controller.createCheckoutSession
);
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  payment_controller.webhook
);

// _________________ Stripe End _________________ //

module.exports = router;
