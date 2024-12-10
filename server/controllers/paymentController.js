const passport = require("passport");
const { body, validationResult } = require("express-validator");
const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;
const { clear_cart } = require("./mainController");

// -------------- Start Stripe ------------------ //

// STRIPE WEB HOOK
// This is your Stripe CLI webhook secret for testing your endpoint locally.
const app = express();
app.use(express.json());
exports.webhook = (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error("Webhook Error:", err.message);
    return res.status(400).json({ error: `Webhook Error: ${err.message}` });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    // heckout.session.completed event received: {
    //   id: 'cs_test_a1wn8y2zGNKC1ZXR4VF10Ya150QeApuztEdRuaNK64wqZNqJ8PFrHAAw8D',
    //   object: 'checkout.session',
    //   adaptive_pricing: { enabled: false },
    //   after_expiration: null,
    //   allow_promotion_codes: null,
    //   amount_subtotal: 79999,
    //   amount_total: 79999,
    //   automatic_tax: { enabled: false, liability: null, status: null },
    //   billing_address_collection: null,
    //   cancel_url: 'https://marketplacebuild.onrender.com/market',
    //   client_reference_id: null,
    //   client_secret: null,
    //   consent: null,
    //   consent_collection: null,
    //   created: 1733824078,
    //   currency: 'eur',
    //   currency_conversion: null,
    //   custom_fields: [],
    //   custom_text: {
    //     after_submit: null,
    //     shipping_address: null,
    //     submit: null,
    //     terms_of_service_acceptance: null
    //   },
    //   customer: null,
    //   customer_creation: 'if_required',
    //   customer_details: {
    //     address: {
    //       city: null,
    //       country: 'LV',
    //       line1: null,
    //       line2: null,
    //       postal_code: null,
    //       state: null
    //     },
    //     email: 'paija123@gmail.com',
    //     name: 'MAIJA PAIJA',
    //     phone: null,
    //     tax_exempt: 'none',
    //     tax_ids: []
    //   },
    //   customer_email: null,
    //   expires_at: 1733910478,
    //   invoice: null,
    //   invoice_creation: {
    //     enabled: false,
    //     invoice_data: {
    //       account_tax_ids: null,
    //       custom_fields: null,
    //       description: null,
    //       footer: null,
    //       issuer: null,
    //       metadata: {},
    //       rendering_options: null
    //     }
    //   },
    //   livemode: false,
    //   locale: null,
    //   metadata: {},
    //   mode: 'payment',
    //   payment_intent: 'pi_3QUQ36Rs4ZJ1btbH1ttGWIhl',
    //   payment_link: null,
    //   payment_method_collection: 'if_required',
    //   payment_method_configuration_details: null,
    //   payment_method_options: { card: { request_three_d_secure: 'automatic' } },
    //   payment_method_types: [ 'card' ],
    //   payment_status: 'paid',
    //   phone_number_collection: { enabled: false },
    //   recovered_from: null,
    //   saved_payment_method_options: null,
    //   setup_intent: null,
    //   shipping_address_collection: null,
    //   shipping_cost: null,
    //   shipping_details: null,
    //   shipping_options: [],
    //   status: 'complete',
    //   submit_type: null,
    //   subscription: null,
    //   success_url: 'https://marketplacebuild.onrender.com/settings',
    //   total_details: { amount_discount: 0, amount_shipping: 0, amount_tax: 0 },
    //   ui_mode: 'hosted',
    //   url: null
    // }
  }

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
      success_url: `${process.env.API_BASE_CLIENT_URL}/settings`,
      cancel_url: `${process.env.API_BASE_CLIENT_URL}/market`,
    });
    res.json({ sessionId: session.id });
  } catch (err) {
    console.error("Error creating CheckoutSession:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// -------------- End Stripe ------------------ //
