import { fetchRecommended } from "./Utils/GlobalUtils";
import { makeAutoObservable, toJS } from "mobx";

class globalStore {
  isViewportAtTheTop = true;
  AppName = "Marketplace";
  recommendedItems = [];

  constructor() {
    makeAutoObservable(this);
  }

  setBalance(newBalance) {
    this.data.balance =
      newBalance && newBalance !== 0
        ? parseFloat(newBalance).toFixed(2)
        : parseFloat(0);
  }

  async fetchRecommended() {
    this.recommendedItems = await fetchRecommended();
  }
}

const store = new globalStore();
export default store;
