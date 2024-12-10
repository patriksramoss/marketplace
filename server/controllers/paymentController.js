const passport = require("passport");
const { body, validationResult } = require("express-validator");
const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;

// -------------- Start Stripe ------------------ //

// STRIPE WEB HOOK
// This is your Stripe CLI webhook secret for testing your endpoint locally.
const app = express();
app.use(express.json());
exports.webhook = (req, res) => {
  console.log("Raw body (SHOULD BE A BUFFER):", req.body); // should be buffer
  console.log("Is Buffer:", Buffer.isBuffer(req.body));
  console.log("Webhook endpoint hit");

  // Debugging session info before processing webhook
  console.log("Session before webhook:", req.session);

  const sig = req.headers["stripe-signature"];
  console.log("Stripe signature:", sig);

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error("Webhook Error:", err.message);
    return res.status(400).json({ error: `Webhook Error: ${err.message}` });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    // Update user's balance here
    console.log("checkout.session.completed event received:", session);
  }

  // Debugging session info after processing webhook
  console.log("Session after webhook:", req.session);

  res.status(200).json({ success: "Webhook processed successfully." });
};

exports.createPaymentIntent = async (req, res) => {
  console.log("createPaymentIntent endpoint hit");
  const { amount } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "eur",
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error("Error creating PaymentIntent:", err.message);
    res.status(500).json({ error: err.message });
  }
};

exports.createCheckoutSession = async (req, res) => {
  console.log("createCheckoutSession endpoint hit");
  const { amount } = req.body;
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: "Balance",
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.API_BASE_CLIENT_URL}/`,
      cancel_url: `${process.env.API_BASE_CLIENT_URL}/`,
    });
    res.json({ sessionId: session.id });
  } catch (err) {
    console.error("Error creating CheckoutSession:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// -------------- End Stripe ------------------ //
