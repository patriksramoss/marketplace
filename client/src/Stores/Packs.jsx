import { makeAutoObservable } from "mobx";
import { API_BASE_URL, API_BASE_CLIENT_URL } from "../config";
import axios from "axios";

class packStore {
  data = {};

  constructor() {
    makeAutoObservable(this);
  }

  async fetchPOTD() {
    const response = await axios.get(`${API_BASE_URL}/api/POTD`, {
      withCredentials: true,
    });
    this.setPOTD(response.data);
  }

  setPOTD(POTD) {
    this.data = POTD;
  }

  getCountdown() {
    const { startDate, endDate } = this.data.POTD || {};
    const now = moment();
    const start = moment.tz(startDate, "your_database_timezone");
    const end = moment.tz(endDate, "your_database_timezone");

    if (now.isBefore(start)) {
      return start.diff(now);
    } else if (now.isBefore(end)) {
      return end.diff(now);
    } else {
      return null;
    }
  }
}

const store = new packStore();
export default store;
