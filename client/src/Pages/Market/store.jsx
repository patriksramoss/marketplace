import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";
import { API_BASE_URL } from "../../config";
import { IoSettingsOutline } from "react-icons/io5";
import CategoryContent from "./Components/CategoryContent";
import { toJS } from "mobx";
import Container from "../../Components/Container/Container";

//STORES
import rootStore from "../../Store";

class InventoryStore {
  loading = true;
  categories = [];
  contentCache = {}; // Cache to store fetched content

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
            content: <Container loader={true} container={false} />,
          })),
          content: <Container loader={true} container={false} />,
        }));
        this.setLoading(false);
      });
    } catch (error) {
      console.error("Error fetching categories:", error);
      this.setLoading(false);
    }
  }
  async fetchContent(categoryId = null, subcategoryId = null) {
    const cacheKey = categoryId ? `cat-${categoryId}` : `sub-${subcategoryId}`;

    // Check if the content is already cached
    if (this.contentCache[cacheKey]) {
      return this.contentCache[cacheKey]; // Return cached content if available
    }

    this.setLoading(true);
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/main/contentByCategory`,
        {
          params: { categoryId, subcategoryId },
          withCredentials: true,
        }
      );

      const items = response.data;

      runInAction(() => {
        // Cache the fetched items
        this.contentCache[cacheKey] = items;

        // Update the content of the selected category or subcategory
        if (subcategoryId) {
          // Update content for subcategory
          const category = this.categories.find((cat) =>
            cat.subcategories.some((sub) => sub.id === subcategoryId)
          );
          if (category) {
            const subcategory = category.subcategories.find(
              (sub) => sub.id === subcategoryId
            );
            if (subcategory) {
              subcategory.content = (
                <CategoryContent
                  title={subcategory.name} // Use the title from the subcategory
                  description={subcategory.description} // Use the description from the subcategory
                  items={items} // Set items fetched from API
                />
              );
            }
          }
        } else if (categoryId) {
          // Update content for category
          const category = this.categories.find((cat) => cat.id === categoryId);
          if (category) {
            category.content = (
              <CategoryContent
                title={category.title} // Use the title from the category
                description={category.description} // Use the description from the category
                items={items} // Set items fetched from API
              />
            );
          }
        }

        this.setLoading(false);
      });

      return items; // Return fetched items
    } catch (error) {
      console.error("Error fetching content:", error);
      this.setLoading(false);
      return null;
    }
  }

  getCategories() {
    return this.categories;
  }

  getContent(categoryId = null, subcategoryId = null) {
    const cacheKey = categoryId ? `cat-${categoryId}` : `sub-${subcategoryId}`;
    return this.contentCache[cacheKey];
  }
}

const inventoryStore = new InventoryStore();
export default inventoryStore;
