import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";
import { API_BASE_URL } from "../config";
import { getCart } from "./Utils/getCart";
import { clearCart } from "./Utils/clearCart";

class userStore {
  data = {};
  cart = [];
  cartTotalItems = 0;
  loading = {
    main: false,
    cart: false,
  };

  constructor() {
    makeAutoObservable(this);
    this.getCart();
  }

  async fetchUser() {
    try {
      const response = await axios.get(`${API_BASE_URL}/main/user`, {
        withCredentials: true,
      });
      this.setUser(response.data.user);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  }

  async fetchBalance() {
    try {
      const response = await axios.get(`${API_BASE_URL}/main/balance`, {
        withCredentials: true,
      });
      this.setBalance(response.data.balance);
    } catch (error) {
      // console.error("Failed to fetch user data:", error);
    }
  }

  async getCart() {
    this.setLoading("cart", true);
    try {
      const response = await getCart();
      this.setCart(response.cart);
    } catch (error) {
      console.error("Failed to add item to cart:", error);
    }
  }

  async clearCart() {
    this.setLoading("cart", true);
    try {
      const response = await clearCart();
      this.setCart(response.cart);
    } catch (error) {
      console.error("Failed to add item to cart:", error);
    }
  }

  setLoading(item, value) {
    this.loading[item] = value;
  }

  setCart(cart) {
    this.cart = cart;
    if (cart.items?.length === 0) {
      this.cartTotalItems = 0;
    } else {
      this.cartTotalItems = cart.reduce(
        (total, cartItem) => total + cartItem.quantity,
        0
      );
    }

    this.setLoading("cart", false);
  }

  setUser(user) {
    this.data = user;
  }

  setBalance(newBalance) {
    this.data.balance =
      newBalance && newBalance !== 0
        ? parseFloat(newBalance).toFixed(2)
        : parseFloat(0);
  }
}

const store = new userStore();
export default store;
