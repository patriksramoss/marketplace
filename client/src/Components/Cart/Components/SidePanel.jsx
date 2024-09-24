import { observer } from "mobx-react-lite";
import React, { useEffect, useState, useCallback } from "react";
import { isObservable } from "mobx";
import debounce from "lodash/debounce";
// styling
import styles from "../styles.module.scss";
// stores
import userStore from "../../../Stores/User";
//icons
import { FiPlus, FiMinus } from "react-icons/fi";
import { IoMdTrash } from "react-icons/io";
import { ImFileEmpty } from "react-icons/im";
import { MdOutlinePayment } from "react-icons/md";

import Loader from "../../Loader/Loader";

const SidePanel = observer(({ show }) => {
  const [isVisible, setIsVisible] = useState(show);

  useEffect(() => {
    setIsVisible(show);
  }, [show, userStore.cart]);

  const cartItems = userStore.cart || [];

  const handleItemQuantityChange = (itemId, value) => {
    userStore.changeItemQuantity(itemId, value, false);
  };

  const handleItemQuantityChangeOverride = (itemId, value) => {
    userStore.changeItemQuantity(itemId, value, true);
  };

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
        <Loader
          className={`${styles.loader} ${
            userStore.loading.cart ? {} : styles.loaded
          }`}
        />
        <div
          className={styles.sidePanel}
          sx={userStore.loading.cart ? { pointerEvents: "none" } : {}}
        >
          <h2 className={styles.cartTitle}>Shopping Cart</h2>
          <ul className={styles.cartList}>
            {cartItems.length && cartItems.length !== 0 ? (
              cartItems.map((cartItem) => (
                <div key={cartItem.itemId}>
                  <li key={cartItem.itemId} className={styles.cartItem}>
                    <img
                      src={cartItem.data?.images?.min[0]}
                      alt={cartItem.data?.name}
                      className={styles.itemImage}
                    />
                    <div className={styles.itemDetails}>
                      <h3 className={styles.itemName}>{cartItem.data?.name}</h3>
                      <div className={styles.itemPrice}>
                        <h3>{cartItem.data?.price}</h3>
                        <p>{userStore.data.currency}</p>
                      </div>
                      <div className={styles.itemQuantity}>
                        <div
                          className={styles.quantityArrows}
                          onClick={() => {
                            if (cartItem.quantity === 1) {
                              userStore.removeItemFromCart(cartItem.itemId);
                            } else {
                              handleItemQuantityChange(cartItem.itemId, -1);
                            }
                          }}
                        >
                          <FiMinus />
                        </div>{" "}
                        <input
                          type="number"
                          value={cartItem.quantity}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (value.length > 1 && value.startsWith("0")) {
                              return; // Stop further handling if the number starts with "0"
                            }

                            if (value === "") {
                              cartItem.quantity = 0; // Set quantity to 0 if the input is cleared
                            } else if (value > 50) {
                              cartItem.quantity = 50;
                            } else {
                              const numericValue = parseInt(value, 10);
                              if (!isNaN(numericValue) && numericValue >= 0) {
                                cartItem.quantity = numericValue;
                              }
                            }
                          }}
                          max="50"
                          onBlur={(e) => {
                            const value = parseInt(e.target.value, 10);
                            if (isNaN(value) || value === 0) {
                              userStore.removeItemFromCart(cartItem.itemId);
                            } else if (value > 0) {
                              handleItemQuantityChangeOverride(
                                cartItem.itemId,
                                value
                              );
                            }
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.target.blur();
                            }
                          }}
                          className={styles.itemQuantityInput}
                        />
                        <div
                          className={`${styles.quantityArrows} ${
                            cartItem.quantity >= 50 ? styles.disabled : {}
                          }`}
                          onClick={() => {
                            if (cartItem.quantity >= 50) {
                              handleItemQuantityChangeOverride(
                                cartItem.itemId,
                                50
                              );
                            } else {
                              handleItemQuantityChange(cartItem.itemId, 1);
                            }
                          }}
                        >
                          <FiPlus />
                        </div>
                      </div>
                    </div>
                    <div className={styles.deleteItemContainer}>
                      <button
                        className={styles.deleteItem}
                        onClick={() => {
                          userStore.removeItemFromCart(cartItem.itemId);
                        }}
                      >
                        <IoMdTrash />
                      </button>
                    </div>
                  </li>
                  <div className={styles.sidePanelFooter}>
                    <div className={styles.cartSummary}>
                      <p>
                        Subtotal
                        <span>
                          {(userStore.cartTotalSum * 0.8).toFixed(2)}{" "}
                          {userStore.data.currency}
                        </span>
                      </p>

                      <p>
                        Shipping
                        <span style={{ fontWeight: "bold", display: "inline" }}>
                          {" "}
                          FREE
                        </span>
                      </p>

                      <p>
                        VAT (20%)
                        <span>
                          {(userStore.cartTotalSum * 0.2).toFixed(2)}{" "}
                          {userStore.data.currency}
                        </span>
                      </p>
                    </div>

                    <div className={styles.cartTotal}>
                      <h3>
                        Total:
                        <span>
                          {userStore.cartTotalSum.toFixed(2)}{" "}
                          {userStore.data.currency}
                        </span>
                      </h3>
                    </div>

                    <button
                      className={styles.clearButton}
                      onClick={() => {
                        userStore.clearCart();
                      }}
                    >
                      <IoMdTrash /> Clear cart
                    </button>
                    <button className={styles.orderButton} onClick={() => {}}>
                      <MdOutlinePayment /> <p>Order</p>
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
        {}
      </div>
    </>
  );
});

export default SidePanel;
