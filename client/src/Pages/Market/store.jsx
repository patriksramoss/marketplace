import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";
import { API_BASE_URL } from "../../config";
import { IoSettingsOutline } from "react-icons/io5";
import Category from "./Components/Category";

//STORES
import rootStore from "../../Store";

class InventoryStore {
  loading = true;
  categories = [];

  constructor() {
    makeAutoObservable(this);
    this.fetchCategories(); // Fetch categories on initialization
  }

  setLoading(newLoading) {
    this.loading = newLoading;
    rootStore.loading = newLoading;
  }

  async fetchCategories() {
    this.setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/api/main/categories`, {
        withCredentials: true,
      });
      console.log("Fetched categories:", response.data); // Log fetched data
      runInAction(() => {
        this.categories = response.data.map((cat) => ({
          id: cat._id, // MongoDB ID
          title: cat.name,
          icon: <IoSettingsOutline />, // Default icon, replace if needed
          description: cat.description,
          subcategories: cat.subcategories.map((sub) => ({
            id: sub._id, // MongoDB ID
            name: sub.name,
            description: sub.description,
          })),
          content: <Category title={cat.name} description={cat.description} />,
        }));
        this.setLoading(false);
      });
    } catch (error) {
      console.error("Error fetching categories:", error);
      this.setLoading(false);
    }
  }

  getCategories() {
    return this.categories;
  }
}

const inventoryStore = new InventoryStore();
export default inventoryStore;
