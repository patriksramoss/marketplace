// InventoryStore.js
import { makeAutoObservable, runInAction, toJS } from "mobx";
// STORES
import rootStore from "../../Store";

import Account from "./Categories/Account";
import Friends from "./Categories/Friends";
import Settings from "./Categories/Settings";
// ICONS
import { IoSettingsOutline } from "react-icons/io5";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { RiAccountCircleLine } from "react-icons/ri";

class SettingsStore {
  loading = true;
  recommendedContent = [];
  selectedCategory = null;
  openedCategories = [];
  contentCache = {};
  categories = [
    {
      id: "settings",
      title: "Settings",
      icon: <IoSettingsOutline />,
      description: "Configure your Table.",
      content: <Settings />,
    },
    {
      id: "account",
      title: "Account",
      icon: <RiAccountCircleLine />,
      description: "Share your Table.",
      content: <Account />,
    },

    {
      id: "friends",
      title: "Friends",
      icon: <LiaUserFriendsSolid />,
      description: "Manage your friends.",
      content: <Friends />,
    },
  ];

  constructor() {
    makeAutoObservable(this);
    this.categories.forEach((category) => {
      if (!this.contentCache[category.id]) {
        this.contentCache[category.id] = [];
      }
      this.contentCache[category.id].push(category);
    });
  }

  setLoading(newLoading) {
    this.loading = newLoading;
    rootStore.loading = newLoading;
  }

  getCategories() {
    return this.categories;
  }

  getContent(categoryId) {
    const cacheKey = categoryId;
    return this.contentCache[cacheKey];
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

  setSelectedCategory(category) {
    this.selectedCategory = category;
  }

  getAllCategories() {
    const allCategories = {
      top: {
        categories: this.categories,
      },
    };

    return allCategories;
  }

  //FIND, HANDLE

  findCategory = (categoryId) => {
    const allCategories = [...this.categories];

    const category = this.categories.find((cat) => cat.id === categoryId);

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

const settingsStore = new SettingsStore();
export default settingsStore;
