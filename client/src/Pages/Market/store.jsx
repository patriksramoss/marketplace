import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";
import { API_BASE_URL } from "../../config";

//STORES
import rootStore from "../../Store";

class InventoryStore {
  loading = true;

  constructor() {
    makeAutoObservable(this);
  }

  setLoading(newLoading) {
    this.loading = newLoading;
    rootStore.loading = newLoading;
  }
}

const inventoryStore = new InventoryStore();
export default inventoryStore;
