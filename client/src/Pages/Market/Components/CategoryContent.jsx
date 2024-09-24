import React, { useEffect } from "react";
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
  if (!items || items.length === 0) {
    return <Container container={false}>No items available.</Container>;
  }

  const handleAddToCart = (itemId) => {
    const quantity = 1;
    store.addToCart(itemId, quantity);
  };

  return (
    <Container className={styles.categoryContainer} container={true}>
      <h2 className={styles.categoryTitle}>{title}</h2>
      <p className={styles.categoryDescription}>{description}</p>
      <div className={styles.gridContainer}>
        {items.map((item) => (
          <div key={item._id} className={styles.gridItem}>
            <div
              className={styles.addToCart}
              onClick={() => handleAddToCart(item._id)}
            >
              {userStore.loading.cart ? (
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
              className={styles.itemImage}
            />
            <div className={styles.details}>
              <div className={styles.itemDetails}>
                <h3 className={styles.itemName}>{item.name}</h3>
                <p className={styles.itemDescription}>{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default observer(CategoryContent);
