// InventoryStore.js
import { makeAutoObservable, runInAction, toJS } from "mobx";
import { fetchCategories } from "./utils/fetchCategories";
import { fetchContent } from "./utils/fetchContent";
import { fetchRecommended } from "./utils/fetchRecommended";
import CategoryContent from "./Components/CategoryContent";
import Container from "../../Components/Container/Container";

// STORES
import rootStore from "../../Store";

class InventoryStore {
  loading = true;
  categories = [];
  recommendedContent = [];
  contentCache = {}; // Cache to store fetched content
  categoriesRecommeded = [
    {
      content: this.contentCache["recommended"],
    },
  ];

  constructor() {
    makeAutoObservable(this);
    this.loadCategories(); // Fetch categories on initialization
    this.loadRecommended();
  }

  setLoading(newLoading) {
    this.loading = newLoading;
    rootStore.loading = newLoading;
  }

  async loadCategories() {
    this.setLoading(true);
    try {
      const categories = await fetchCategories();
      runInAction(() => {
        this.categories = categories;
        this.setLoading(false);
      });
    } catch (error) {
      this.setLoading(false);
    }
  }

  async loadContent(categoryId = null, subcategoryId = null) {
    const cacheKey = categoryId ? `cat-${categoryId}` : `sub-${subcategoryId}`;

    // Check if the content is already cached
    if (this.contentCache[cacheKey]) {
      return this.contentCache[cacheKey]; // Return cached content if available
    }

    this.setLoading(true);
    try {
      const items = await fetchContent(categoryId, subcategoryId);

      runInAction(() => {
        // Cache the fetched items
        this.contentCache[cacheKey] = items;

        // Update the content of the selected category or subcategory
        if (subcategoryId) {
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
                  title={subcategory.name}
                  description={subcategory.description}
                  items={items}
                />
              );
            }
          }
        } else if (categoryId) {
          const category = this.categories.find((cat) => cat.id === categoryId);
          if (category) {
            category.content = (
              <CategoryContent
                title={category.title}
                description={category.description}
                items={items}
              />
            );
          }
        }

        this.setLoading(false);
      });

      return items;
    } catch (error) {
      this.setLoading(false);
      return null;
    }
  }

  // Method to load recommended items
  // Method to load recommended items
  async loadRecommended() {
    const cacheKey = "recommended"; // Define a unique cache key for recommended items

    // Check if the recommended content is already cached
    if (this.contentCache[cacheKey]) {
      return this.contentCache[cacheKey]; // Return cached content if available
    }

    this.setLoading(true);
    try {
      const recommendedItems = await fetchRecommended(); // Fetch recommended items from the API
      runInAction(() => {
        // Cache the fetched items
        this.contentCache[cacheKey] = recommendedItems;

        // Update categoriesRecommeded with recommended content
        this.categoriesRecommeded = [
          {
            content: (
              <CategoryContent
                title="Hot 🔥"
                description="Discounted items!"
                items={recommendedItems}
              />
            ),
            id: "id-hot-123",
            title: "Hot 🔥",
            description: "Discounted items!",
            name: "Hot 🔥",
          },
        ];

        this.setLoading(false);
      });

      return recommendedItems;
    } catch (error) {
      console.error("Failed to fetch recommended items", error);
      this.setLoading(false);
      return null;
    }
  }

  getCategories() {
    return this.categories;
  }

  // Method to get recommended items from the cache
  getRecommended() {
    return this.categoriesRecommeded;
  }

  getContent(categoryId = null, subcategoryId = null) {
    const cacheKey = categoryId ? `cat-${categoryId}` : `sub-${subcategoryId}`;
    return this.contentCache[cacheKey];
  }
}

const inventoryStore = new InventoryStore();
export default inventoryStore;
