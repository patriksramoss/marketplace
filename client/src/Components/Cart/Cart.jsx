import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
//components
import SidePanel from "./Components/SidePanel";
//icons
import { IoMdCart } from "react-icons/io";
//styling
import styles from "./styles.module.scss";
//Stores
import userStore from "../../Stores/User";
import rootStore from "../../Store";

const Cart = observer(() => {
  const [showCart, setShowCart] = useState(false);

  const toggleCart = () => {
    setShowCart((prevShowCart) => !prevShowCart);
    rootStore.setCartOpened(!showCart);
  };

  return (
    <div className={styles.cartWrapper}>
      <button className={styles.cartIcon} onClick={toggleCart}>
        <IoMdCart />
        <div className={styles.totalItemCountContainer}>
          {userStore.cartTotalItems !== 0 && (
            <p className={styles.totalItemCount}>{userStore.cartTotalItems}</p>
          )}
        </div>
      </button>
      <SidePanel show={showCart} />
    </div>
  );
});

export default Cart;
