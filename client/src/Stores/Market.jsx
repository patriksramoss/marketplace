import { getProduct, addToCart, fetchCategories } from "./Utils/MarketUtils";
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

  async addToCart(itemId, quantity) {
    try {
      const response = await addToCart(itemId, quantity);
      return response;
    } catch (error) {
      console.error("Failed to add item to cart:", error);
    }
  }

  async fetchCategories() {
    try {
      const response = await fetchCategories();
      return response;
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      return;
    }
  }

  async fetchContent(categoryId = null) {
    try {
      const response = await fetchContent(categoryId);
      return response;
    } catch (error) {
      console.error("Failed to fetch content:", error);
      return;
    }
  }

  async searchItems(search) {
    try {
      const response = await searchItems(search);
      return response;
    } catch (error) {
      console.error("Failed to search items:", error);
      return;
    }
  }
}

const store = new marketStore();
export default store;
