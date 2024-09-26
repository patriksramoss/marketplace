import React, { useEffect, useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import {
  API_BASE_URL,
  REACT_APP_STRIPE_PUBLISHABLE_KEY,
} from "../../config.js";
import { useNavigate } from "react-router-dom";
//Components
import Container from "../../Components/Container/Container";
//styles
import styles from "./styles.module.scss";
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
      <Container
        className={styles.balanceContainer}
        container={true}
        fullHeight
      >
        <Elements stripe={stripePromise}>
          <PaymentForm />
        </Elements>
      </Container>
    </div>
  );
};

export default Balance;
