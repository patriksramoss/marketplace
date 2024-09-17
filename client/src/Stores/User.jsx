import axios from "axios";
import { makeAutoObservable } from "mobx";
import { API_BASE_URL } from "../config";

class userStore {
  data = {};

  constructor() {
    makeAutoObservable(this);
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
