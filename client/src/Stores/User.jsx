import { makeAutoObservable } from "mobx";
import { API_BASE_URL } from "../config";
import axios from "axios";

class userStore {
  data = {};

  constructor() {
    makeAutoObservable(this);
  }

  async fetchUser() {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/user`, {
        withCredentials: true,
      });
      this.setUser(response.data.user);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  }

  setUser(user) {
    this.data = user;
  }

  setPoints(newPoints) {
    this.data.points = parseFloat(newPoints).toFixed(2);
  }
}

const store = new userStore();
export default store;
