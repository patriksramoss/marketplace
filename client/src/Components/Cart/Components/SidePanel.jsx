import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { isObservable } from "mobx";
// styling
import styles from "../styles.module.scss";
// stores
import userStore from "../../../Stores/User";
//icons
import { MdOutlineArrowLeft } from "react-icons/md";
import { MdOutlineArrowRight } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";
import { ImFileEmpty } from "react-icons/im";

import Loader from "../../Loader/Loader";

const SidePanel = observer(({ show }) => {
  const [isVisible, setIsVisible] = useState(show);

  useEffect(() => {
    setIsVisible(show);
  }, [show, userStore.cart]);

  const cartItems = userStore.cart || [];

  return (
    <>
      <div
        className={`${styles.shadow} ${
          isVisible ? styles.show : styles.fadeOut
        }`}
      ></div>
      <div
        className={`${styles.sidePanelWrapper} ${
          isVisible ? styles.show : styles.fadeOut
        }`}
      >
        <div className={styles.sidePanel}>
          <h2 className={styles.cartTitle}>Your Cart</h2>
          <ul className={styles.cartList}>
            {cartItems.length && cartItems.length !== 0 ? (
              cartItems.map((cartItem) => (
                <div key={cartItem.itemId}>
                  {userStore.loading.cart && (
                    <Loader
                      style={{
                        backgroundColor: "rgba(255,255,255,0.6)",
                        backdropFilter: "blur(1px)",
                      }}
                    />
                  )}
                  <li key={cartItem.itemId} className={styles.cartItem}>
                    <img
                      src={cartItem.data?.images?.min[0]}
                      alt={cartItem.data?.name}
                      className={styles.itemImage}
                    />
                    <div className={styles.itemDetails}>
                      <h3 className={styles.itemName}>{cartItem.data?.name}</h3>
                      <div className={styles.itemQuantity}>
                        <div className={styles.quantityArrows}>
                          <MdOutlineArrowLeft />
                        </div>{" "}
                        <input
                          type="number"
                          value={cartItem.quantity}
                          onChange={(e) => {
                            const value = parseInt(e.target.value, 10);
                            if (!isNaN(value) && value >= 0) {
                              userStore.updateCartItemQuantity(
                                cartItem.itemId,
                                value
                              );
                            }
                          }}
                          min="0"
                          className={styles.itemQuantityInput}
                        />
                        <div className={styles.quantityArrows}>
                          <MdOutlineArrowRight />
                        </div>
                      </div>
                    </div>
                    <div className={styles.deleteItemContainer}>
                      <button className={styles.deleteItem}>
                        <IoMdTrash />
                      </button>
                    </div>
                  </li>
                  <div className={styles.sidePanelFooter}>
                    <button
                      className={styles.clearButton}
                      onClick={() => {
                        userStore.clearCart();
                      }}
                    >
                      <IoMdTrash />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.emptyCart}>
                <ImFileEmpty />
                <p>Your cart is empty</p>
              </div>
            )}
          </ul>
        </div>
      </div>
    </>
  );
});

export default SidePanel;
