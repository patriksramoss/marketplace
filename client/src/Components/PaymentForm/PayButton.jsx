import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CustomButton from "../../Components/Controls/Button/CustomButton";
import {
  API_BASE_URL,
  REACT_APP_STRIPE_PUBLISHABLE_KEY,
} from "../../config.js";
import { loadStripe } from "@stripe/stripe-js";
import styles from "./styles.module.scss";
import userStore from "../../Stores/User";
import Loader from "../../Components/Loader/Loader";

//icons
import { MdOutlinePayment } from "react-icons/md";

const stripePromise = loadStripe(REACT_APP_STRIPE_PUBLISHABLE_KEY);

const PaymentForm = () => {
  const stripe = useStripe();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Fetch the Checkout Session's id from your server
      const response = await fetch(
        `${API_BASE_URL}/payment/create-checkout-session`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount: userStore.cartTotalSum * 100 }), // Amount is in cents
        }
      );
      const data = await response.json();
      const sessionId = data.sessionId;

      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({
        sessionId,
      });

      if (error) {
        // Handle error here
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        if (!loading) {
          handleSubmit(e);
        } else {
          e.preventDefault();
        }
      }}
      className={styles.payForm}
    >
      <button className={styles.orderButton}>
        {loading ? (
          <Loader className={styles.loader} />
        ) : (
          <>
            <MdOutlinePayment /> <p>Order</p>
          </>
        )}
      </button>
    </form>
  );
};
export default PaymentForm;
