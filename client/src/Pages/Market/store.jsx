// InventoryStore.js
import { makeAutoObservable, runInAction, toJS } from "mobx";
import { fetchCategories } from "./Utils/fetchCategories";
import { fetchContent } from "./Utils/fetchContent";
import { fetchRecommended } from "./Utils/fetchRecommended";
import { addToCart } from "./Utils/addToCart";
import { searchItems } from "./Utils/searchItems";
import CategoryContent from "./Components/CategoryContent";
import Container from "../../Components/Container/Container";

// STORES
import rootStore from "../../Store";
import userStore from "../../Stores/User";

// ICONS
import { IoSettingsOutline } from "react-icons/io5";
import { RiAccountCircleLine } from "react-icons/ri";

import Settings from "./BottomCategories/Settings";
import Share from "./BottomCategories/Share";

class InventoryStore {
  loading = true;
  selectedCategory = null;
  categories = [];
  recommendedContent = [];
  contentCache = {};
  openedCategories = [];
  extraCategories = [
    {
      id: "share",
      title: "Share",
      icon: <RiAccountCircleLine />,
      description: "Share your Table.",
      content: <Share />,
    },
    {
      id: "settings",
      title: "Settings",
      icon: <IoSettingsOutline />,
      description: "Configure your Table.",
      content: <Settings />,
    },
  ];
  bottomCategories = [
    // {
    //   id: "share",
    //   title: "Share",
    //   icon: <RiAccountCircleLine />,
    //   description: "Share your Table.",
    //   content: <Share />,
    // },
    // {
    //   id: "settings",
    //   title: "Settings",
    //   icon: <IoSettingsOutline />,
    //   description: "Configure your Table.",
    //   content: <Settings />,
    // },
  ];

  cart = {
    items: [],
  };

  searchedItems = [];

  constructor() {
    makeAutoObservable(this);
    this.bottomCategories.forEach((category) => {
      if (!this.contentCache[category.id]) {
        this.contentCache[category.id] = [];
      }
      this.contentCache[category.id].push(category);
    });
    this.loadCategories();
    this.loadRecommended();
  }

  setLoading(newLoading) {
    this.loading = newLoading;
    rootStore.loading = newLoading;
  }

  getOpenedCategories() {
    console.log("this.openedCategories", this.openedCategories);
    return this.openedCategories;
  }

  setOpenedCategories(categories) {
    this.openedCategories = categories;
  }

  async loadContent(categoryId) {
    const cacheKey = categoryId;

    if (
      this.contentCache[cacheKey] &&
      this.contentCache[cacheKey].length !== 0
    ) {
      return this.contentCache[cacheKey];
    }

    this.setLoading(true);
    try {
      const items = await fetchContent(categoryId);

      runInAction(() => {
        // Cache the fetched items
        this.contentCache[cacheKey] = items;

        // Update the content of the selected category or subcategory
        const category = this.findCategory(categoryId);
        if (category) {
          category.content = (
            <CategoryContent
              title={category.title}
              description={category.description}
              items={items}
            />
          );
        }

        this.setLoading(false);
      });

      return items;
    } catch (error) {
      this.setLoading(false);
      return null;
    }
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

  async searchItems(search) {
    this.setLoading(true);
    try {
      const items = await searchItems(search);
      runInAction(() => {
        this.searchedItems = items;
        this.setLoading(false);
      });
    } catch (error) {
      this.setLoading(false);
    }
  }

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
            id: "recommended",
            title: "Hot",
            icon: null,
            description: "Discounted items!",
            name: "Hot 🔥",
          },
        ];

        this.setLoading(false);
      });

      this.contentCache[cacheKey] = this.categoriesRecommeded;

      return recommendedItems;
    } catch (error) {
      console.error("Failed to fetch recommended items", error);
      this.setLoading(false);
      return null;
    }
  }

  async addToCart(itemId, quantity) {
    this.setLoading("cart", true);
    try {
      const response = await addToCart(itemId, quantity);
      userStore.getCart();
    } catch (error) {
      console.error("Failed to add item to cart:", error);
    }
  }

  getCategories() {
    return this.categories;
  }

  getRecommended() {
    return this.categoriesRecommeded;
  }

  getContent(categoryId) {
    const cacheKey = categoryId;
    return this.contentCache[cacheKey];
  }

  getAllCategories() {
    const allCategories = {
      top: {
        categoriesRecommeded: Array.isArray(this.categoriesRecommeded)
          ? this.categoriesRecommeded
          : [this.categoriesRecommeded],
        categories: this.categories,
        extraCategories: this.extraCategories,
      },
      bottom: {
        bottomCategories: this.bottomCategories,
      },
    };

    return allCategories;
  }

  setSelectedCategory(category) {
    this.selectedCategory = category;
  }

  //FIND, HANDLE

  findCategory = (categoryId) => {
    const allCategories = [
      ...this.categories,
      ...(Array.isArray(this.categoriesRecommeded)
        ? this.categoriesRecommeded
        : [this.categoriesRecommeded]),
      ...this.bottomCategories,
    ];

    // First, try to find the category
    const category = allCategories?.find((cat) => cat?.id === categoryId);

    if (category) {
      return category; // Return the category if found
    }

    // If no category is found, search for the subcategory
    for (const cat of allCategories) {
      let subcategory = null;
      if (cat) {
        if (cat.subcategories) {
          subcategory = cat.subcategories.find((sub) => sub.id === categoryId);
        }
      }

      if (subcategory) {
        return subcategory; // Return the subcategory if found
      }
    }

    // Return null if neither category nor subcategory is found
    return null;
  };
}

const inventoryStore = new InventoryStore();
export default inventoryStore;
