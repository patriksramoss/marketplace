import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
//components
import SidePanel from "./Utils/SidePanel";
//icons
import { IoMdCart } from "react-icons/io";
//styling
import styles from "./styles.module.scss";
//Stores
import userStore from "../../Stores/User";

const Cart = observer(() => {
  const [showCart, setShowCart] = useState(false);

  const toggleCart = () => {
    setShowCart((prevShowCart) => !prevShowCart);
  };

  return (
    <div className={styles.cartWrapper}>
      <button className={styles.cartIcon} onClick={toggleCart}>
        <IoMdCart />
      </button>
      <SidePanel show={showCart} />
    </div>
  );
});

export default Cart;
