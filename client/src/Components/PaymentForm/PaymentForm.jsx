import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CustomButton from "../../Components/Controls/Button/CustomButton";
import {
  API_BASE_URL,
  REACT_APP_STRIPE_PUBLISHABLE_KEY,
} from "../../config.js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(REACT_APP_STRIPE_PUBLISHABLE_KEY);

const PaymentForm = () => {
  const stripe = useStripe();
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const response = await fetch(
      `${API_BASE_URL}/payment/create-checkout-session`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: amount * 100 }),
      }
    );
    const data = await response.json();
    const sessionId = data.sessionId;

    const stripe = await stripePromise;
    const { error } = await stripe.redirectToCheckout({
      sessionId,
    });

    if (error) {
    }

    setLoading(false);
  };

  return (
    <div className="payment-form">
      <form onSubmit={handleSubmit}>
        <div className="flex-center">
          <input
            type="number"
            name="amount"
            className="customInput min-width-100"
            value={amount}
            max="100"
            min="1"
            step="1"
            onChange={(e) => {
              let value = Math.floor(e.target.value);
              if (value > 100) {
                value = 100;
              }
              setAmount(value);
            }}
          ></input>
        </div>
        <CustomButton
          type="submit"
          disabled={!stripe || loading || amount === 0}
          text="Add Balance"
        ></CustomButton>
      </form>
    </div>
  );
};
export default PaymentForm;
