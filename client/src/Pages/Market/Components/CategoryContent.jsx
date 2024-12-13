import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { observer } from "mobx-react-lite";
import loader from "../../../assets/images/load.svg";
import { toJS } from "mobx";
//store
import store from "../store";
import userStore from "../../../Stores/User";
//icons
import { IoMdCart } from "react-icons/io";
//Components
import Container from "../../../Components/Container/Container";
import StarRating from "../../../Components/Rating/StarRating";

const CategoryContent = ({ title, description, items }) => {
  const [loadingItems, setLoadingItems] = useState({});

  // useEffect(() => {
  //   if (
  //     !store.selectedCategory &&
  //     userStore.search.market &&
  //     userStore.search.market !== ""
  //   ) {
  //     items = store.searchedItems;
  //   }
  // }, [userStore.search.market]);

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
    <Container
      className={styles.categoryContainer}
      container={true}
      loading={store.loading}
      loader={store.loading}
    >
      {/* {store.loading && <Loader contained={true} loader={false} blur={true} />} */}

      <div className={styles.categoryTitle}>{title && title}</div>
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
