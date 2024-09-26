import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { observer } from "mobx-react-lite";
import loader from "../../../assets/images/load.svg";
//store
import store from "../store";
import userStore from "../../../Stores/User";
//icons
import { IoMdCart } from "react-icons/io";
//Components
import Container from "../../../Components/Container/Container";

const CategoryContent = ({ title, description, items }) => {
  const [loadingItems, setLoadingItems] = useState({});

  if (!items || items.length === 0) {
    return <Container container={false}>No items available.</Container>;
  }

  const handleAddToCart = async (itemId) => {
    try {
      userStore.setLoading("cart", true); // Set loading state
      const quantity = 1;
      await store.addToCart(itemId, quantity); // Assuming this is a promise
    } catch (error) {
      console.error("Error adding to cart:", error);
      // Handle the error as needed, e.g., show a notification
    } finally {
      userStore.setLoading("cart", false); // Reset loading state
    }
  };

  return (
    <Container className={styles.categoryContainer} container={true}>
      <div className={styles.gridContainer}>
        {items.map((item) => {
          const isLoading = loadingItems[item._id] || false;
          return (
            <div key={item._id} className={styles.gridItem}>
              <div
                className={`${styles.addToCart} ${
                  isLoading ? styles.addToCartLoading : {}
                }`}
                onClick={() => {
                  if (!isLoading) {
                    setLoadingItems((prev) => ({ ...prev, [item._id]: true }));
                    handleAddToCart(item._id).finally(() => {
                      setLoadingItems((prev) => ({
                        ...prev,
                        [item._id]: false,
                      }));
                    });
                  }
                }}
              >
                {isLoading ? (
                  <img className={styles.loader} src={loader} />
                ) : (
                  <>
                    <IoMdCart /> Add to cart
                  </>
                )}
              </div>
              <img
                src={item.images.min[0]}
                alt={item.name}
                className={`${styles.itemImage} ${
                  isLoading ? styles.imageOverlay : ""
                }`}
              />
              <div className={styles.details}>
                <div className={styles.itemDetails}>
                  <h3 className={styles.itemName}>{item.name}</h3>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Container>
  );
};

export default observer(CategoryContent);
