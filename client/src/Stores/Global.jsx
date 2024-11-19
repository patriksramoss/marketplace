import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";
import { API_BASE_URL } from "../config";
import { getCart } from "./Utils/getCart";
import { clearCart } from "./Utils/clearCart";
import { removeItemFromCart } from "./Utils/removeItemFromCart";
import { changeItemQuantity } from "./Utils/changeItemQuantity";
import { toJS } from "mobx";

class globalStore {
  isViewportAtTheTop = true;

  constructor() {}

  setBalance(newBalance) {
    this.data.balance =
      newBalance && newBalance !== 0
        ? parseFloat(newBalance).toFixed(2)
        : parseFloat(0);
  }
}

const store = new globalStore();
export default store;
