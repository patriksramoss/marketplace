import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { observer } from "mobx-react-lite";
import loader from "../../../assets/images/load.svg";
import { toJS } from "mobx";
import { useNavigate } from "react-router-dom";
//store
import store from "../../../Stores/Market";
import userStore from "../../../Stores/User";
import marketStore from "../../../Stores/Market";
//icons
import { IoMdCart } from "react-icons/io";
//Components
import Container from "../../../Components/Container/Container";
import StarRating from "../../../Components/Rating/StarRating";

const CategoryContent = ({ title, description, items }) => {
  const [loadingItems, setLoadingItems] = useState({});
  const navigate = useNavigate();

  if (!items || items.length === 0) {
    return (
      <Container container={false} className={styles.noItemsContainer}>
        <>
          <div className={styles.categoryTitle}>{title && title}</div>
          No items available.
        </>
      </Container>
    );
  }

  const handleAddToCart = async (itemId) => {
    try {
      userStore.setLoading("cart", true);
      const quantity = 1;
      await marketStore.addToCart(itemId, quantity);
      userStore.getCart();
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      userStore.setLoading("cart", false);
    }
  };

  return (
    <Container
      className={styles.categoryContainer}
      container={true}
      loading={store.loading}
      loader={store.loading}
    >
      <div className={styles.categoryTitle}>{title && title}</div>
      <div className={styles.gridContainer}>
        {items.map((item) => {
          const isLoading = loadingItems[item._id] || false;
          return (
            <div
              key={item._id}
              className={styles.gridItem}
              onClick={() => {
                navigate(`/product/${item._id}`);
              }}
            >
              <div
                className={`${styles.addToCart} ${
                  isLoading ? styles.addToCartLoading : {}
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
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
                  <StarRating />
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
