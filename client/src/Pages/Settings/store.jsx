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

  //FIND, HANDLE

  findCategory = (categoryId) => {
    const category = this.categories.find((cat) => cat.id === categoryId);

    if (category) {
      return category; // Return the category if found
    }

    // If no category is found, search for the subcategory
    for (const cat of allCategories) {
      const subcategory = cat.subcategories?.find(
        (sub) => sub.id === categoryId
      );
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
