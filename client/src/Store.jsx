// store.js
import { makeAutoObservable } from "mobx";
import axios from "axios";
import { API_BASE_URL, API_BASE_CLIENT_URL } from "./config";

class AppStore {
  data = {
    news: [],
    loading: false,
  };
  showFooter = true;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchHome() {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/landing`, {
        withCredentials: true,
      });
      this.setNews(response.data);
    } catch (error) {
      console.error("Error SETTING NEWS:", error);
    }
  }

  setNews(data) {
    this.data.news = data;
  }

  setShowFooter(value) {
    this.showFooter = value;
  }
}

const store = new AppStore();
export default store;
