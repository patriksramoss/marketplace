import React, { useEffect, useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import {
  API_BASE_URL,
  REACT_APP_STRIPE_PUBLISHABLE_KEY,
} from "../../config.js";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../Components/Controls/Button/CustomButton";
import userStore from "../../Stores/User";
import store from "../../Store";

import styles from "./styles.module.scss";

//Components
import Container from "../../Components/Container/Container";

const BalanceSandbox = () => {
  const [amount, setAmount] = useState(5);
  const [loading, setLoading] = useState(null);
  const navigate = useNavigate();

  const handleBalanceAdd = (amountToAdd) => {
    setLoading(true);
    // Convert amountToAdd to a number to ensure the server receives the correct type
    const numericAmountToAdd = Number(amountToAdd);
    if (isNaN(numericAmountToAdd) || numericAmountToAdd <= 0) {
      console.error("Invalid amount:", amountToAdd);
      return; // Optionally, show an error message to the user
    }
    axios
      .post(
        `${API_BASE_URL}/main/balance/add`,
        { amountToAdd: numericAmountToAdd },
        { withCredentials: true }
      )
      .then((response) => {
        userStore.setBalance(response.data.balance);
        navigate("/"); // Navigate to the home page or confirmation page
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error updating balance: ", error);
        setLoading(false);
        // Optionally, show an error message to the user
      });
  };

  useEffect(() => {
    store.setShowFooter(false);
    return () => {
      store.setShowFooter(true);
    };
  }, [store.setShowFooter]);

  return (
    <>
      <Helmet>
        <title>Balance</title>
      </Helmet>
      <Container loading={loading !== null ? loading : undefined}>
        <header className={styles.homeHeader}></header>
        <form
          style={{
            borderRadius: "0px 0px 20px 20px",
          }}
          onSubmit={(e) => {
            e.preventDefault();
            handleBalanceAdd(amount);
          }}
        >
          <p className="text-center">Add balance:</p>

          <div className="flex-center">
            <input
              type="decimal"
              name="amount"
              className={styles.customInput}
              value={amount}
              max="100"
              min="1"
              onChange={(e) => setAmount(e.target.value)}
            ></input>
          </div>
          <div className="flex-center">
            <CustomButton
              text="Add To Balance"
              style={{ justifyContent: "center", alignItems: "center" }}
            />
          </div>
        </form>
      </Container>
    </>
  );
};

export default BalanceSandbox;
