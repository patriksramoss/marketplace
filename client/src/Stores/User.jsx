import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";
import { API_BASE_URL } from "../config";
import {
  getCart,
  clearCart,
  removeItemFromCart,
  changeItemQuantity,
} from "./Utils/UserUtils";
import { toJS } from "mobx";

class userStore {
  data = {};
  cart = [];
  cartTotalItems = 0;
  cartTotalSum = 0;

  search = {
    market: "",
    settings: "",
  };

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
    } catch (error) {}
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
      this.getCart();
    } catch (error) {
      console.error("Failed to add item to cart:", error);
    }
  }

  async removeItemFromCart(itemId) {
    this.setLoading("cart", true);
    try {
      const response = await removeItemFromCart(itemId);
      this.getCart();
    } catch (error) {
      console.error("Failed to add item to cart:", error);
    }
  }

  async changeItemQuantity(itemId, value, override) {
    this.setLoading("cart", true);
    try {
      const response = await changeItemQuantity(itemId, value, override);
      this.getCart();
    } catch (error) {
      console.error("Failed to add item to cart:", error);
    }
  }

  setLoading(item, value) {
    this.loading[item] = value;
  }

  setSearch(item, value) {
    this.search[item] = value;
  }

  setCart(cart) {
    this.cart = cart;
    if (cart) {
      if (cart.length === 0) {
        this.cartTotalItems = 0;
        this.cartTotalSum = 0;
      } else {
        const { totalItems, totalSum } = cart.reduce(
          (acc, cartItem) => {
            acc.totalItems += cartItem.quantity;
            acc.totalSum += cartItem.data.price * cartItem.quantity;
            return acc;
          },
          { totalItems: 0, totalSum: 0 }
        );

        this.cartTotalItems = totalItems;
        this.cartTotalSum = totalSum;
      }
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
