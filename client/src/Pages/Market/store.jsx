// InventoryStore.js
import { makeAutoObservable, runInAction, toJS } from "mobx";
import { fetchCategories } from "./Utils/fetchCategories";
import { fetchContent } from "./Utils/fetchContent";
import { fetchRecommended } from "./Utils/fetchRecommended";
import { addToCart } from "./Utils/addToCart";
import { searchItems } from "./Utils/searchItems";
import CategoryContent from "./Components/CategoryContent";

// STORES
import rootStore from "../../Store";
import userStore from "../../Stores/User";

class InventoryStore {
  loading = true;
  selectedCategory = null;
  categories = [];
  recommendedContent = [];
  contentCache = {};
  openedCategories = [];
  extraCategories = [];
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
    const openedCategories = this.openedCategories;
    return openedCategories;
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

    try {
      const items = await fetchContent(categoryId);

      runInAction(() => {
        this.contentCache[cacheKey] = items;

        const category = this.findCategory(categoryId);

        console.log("category", category);
        if (category) {
          category.content = (
            <CategoryContent
              title={category.title ? category.title : category.name}
              description={category.description}
              items={items}
            />
          );
        }
      });

      return items;
    } catch (error) {
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
      });
    } catch (error) {
      console.error("Error searching items:", error);
    } finally {
      runInAction(() => {
        this.setLoading(false);
      });
    }
  }

  async loadRecommended() {
    const cacheKey = "recommended";

    if (this.contentCache[cacheKey]) {
      return this.contentCache[cacheKey];
    }

    this.setLoading(true);
    try {
      const recommendedItems = await fetchRecommended();

      runInAction(() => {
        this.contentCache[cacheKey] = recommendedItems;

        this.categoriesRecommeded = [
          // {
          //   content: (
          //     <CategoryContent
          //       title="Hot 🔥"
          //       description="Discounted items!"
          //       items={recommendedItems}
          //     />
          //   ),
          //   id: "recommended",
          //   title: "Hot",
          //   icon: null,
          //   description: "Discounted items!",
          //   name: "Hot 🔥",
          // },
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

    const category = allCategories?.find((cat) => cat?.id === categoryId);

    if (category) {
      return category;
    }

    for (const cat of allCategories) {
      let subcategory = null;
      if (cat) {
        if (cat.subcategories) {
          subcategory = cat.subcategories.find((sub) => sub.id === categoryId);
        }
      }

      if (subcategory) {
        return subcategory;
      }
    }

    return null;
  };
}

const inventoryStore = new InventoryStore();
export default inventoryStore;
