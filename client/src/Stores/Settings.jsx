import { makeAutoObservable, runInAction, toJS } from "mobx";
import rootStore from "../Store";
// Components
import CategoryContent from "../Pages/Market/Components/CategoryContent";
import Account from "../Pages/Settings/Categories/Account";
import Settings from "../Pages/Settings/Categories/Settings";
// ICONS
import { IoSettingsOutline } from "react-icons/io5";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { RiAccountCircleLine } from "react-icons/ri";

class settingsStore {
  loading = true;
  recommendedContent = [];
  selectedCategory = null;
  openedCategories = [];
  contentCache = {};
  categories = [
    {
      id: "general",
      title: "General",
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
        this.contentCache[cacheKey] = items;
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

const store = new settingsStore();
export default store;
