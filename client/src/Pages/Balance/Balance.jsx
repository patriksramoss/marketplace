import React, { useEffect, useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import {
  API_BASE_URL,
  REACT_APP_STRIPE_PUBLISHABLE_KEY,
} from "../../config.js";
import { useNavigate } from "react-router-dom";

//STRIPE
import PaymentForm from "../../Components/PaymentForm/PaymentForm";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const Balance = () => {
  const stripePromise = loadStripe(REACT_APP_STRIPE_PUBLISHABLE_KEY);
  return (
    <div>
      <Helmet>
        <title>Balance</title>
      </Helmet>
      <div className="container">
        <div className="page-wrapper">
          <header className="home-header"></header>
          <div className="flex-center"></div>
          <div className="flex-center">
            <Elements stripe={stripePromise}>
              <PaymentForm />
            </Elements>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Balance;
