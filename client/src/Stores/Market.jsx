import { getProduct } from "./Utils/Utils";
import { makeAutoObservable, toJS } from "mobx";

class marketStore {
  product = {};

  constructor() {
    makeAutoObservable(this);
    this.inintialize();
  }

  inintialize() {}

  async getProduct(itemId) {
    this.product = {};
    const product = await getProduct(itemId);
    this.product = product[0];
  }
}

const store = new marketStore();
export default store;
