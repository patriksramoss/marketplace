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

  async fetchPoints() {
    try {
      const response = await axios.get(`${API_BASE_URL}/main/points`, {
        withCredentials: true,
      });
      this.setPoints(response.data.points);
    } catch (error) {
      // console.error("Failed to fetch user data:", error);
    }
  }

  setUser(user) {
    this.data = user;
  }

  setPoints(newPoints) {
    this.data.points =
      newPoints && newPoints !== 0
        ? parseFloat(newPoints).toFixed(2)
        : parseFloat(0);
  }
}

const store = new userStore();
export default store;
