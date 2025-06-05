import React, { useState, useEffect } from "react";
import styles from "../styles.module.scss";
import { toJS } from "mobx";
import { useSearchParams, useLocation } from "react-router-dom";
import { observer } from "mobx-react-lite";

// Icons
import { RiArrowDropDownLine } from "react-icons/ri";
import { FaSearch } from "react-icons/fa";
import { RiMenuSearchLine } from "react-icons/ri";
import { IoClose } from "react-icons/io5";

//Stores
import userStore from "../../../Stores/User";
import rootStore from "../../../Store";

const StickyNavigation = ({
  store,
  allCategories,
  handleCategoryClick,
  selectedCategory,
}) => {
  const [expandedCategories, setExpandedCategories] = useState({});
  const [cartOpened, setCartOpened] = useState(false);
  const [filteredCategories, setFilteredCategories] = useState(allCategories);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);
  const [menuOpened, setMenuOpened] = useState(false);
  const location = useLocation();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleCategory = (categoryId) => {
    setExpandedCategories((prevState) => ({
      ...prevState,
      [categoryId]: !prevState[categoryId],
    }));

    const openedCategories = store.getOpenedCategories();
    if (openedCategories.includes(categoryId)) {
      store.setOpenedCategories(
        openedCategories.filter((id) => id !== categoryId)
      );
    } else {
      store.setOpenedCategories([...openedCategories, categoryId]);
    }
  };

  const handleSearch = (query) => {
    if (query) {
      store.searchItems(query);
    }

    const newFilteredCategories = {
      bottom: {},
      top: {},
    };

    for (const section in allCategories) {
      for (const categoryKey in allCategories[section]) {
        const category = allCategories[section][categoryKey];
        const filteredCategory = category.filter((item) => {
          item.title.toLowerCase().includes(query);
        });

        const filteredCategoryWithSubcategories = category.map((cat) => {
          const filteredSubcategories = cat.subcategories
            ? cat.subcategories.filter(
                (subcat) =>
                  subcat.name.toLowerCase().includes(query) ||
                  subcat.description.toLowerCase().includes(query)
              )
            : [];

          if (filteredCategory.length > 0 || filteredSubcategories.length > 0) {
            return {
              ...cat,
              subcategories: filteredSubcategories,
            };
          }

          return null;
        });

        const validFilteredCategories =
          filteredCategoryWithSubcategories.filter((cat) => cat !== null);

        if (validFilteredCategories.length > 0) {
          newFilteredCategories[section][categoryKey] = validFilteredCategories;
        }
      }
    }
  };

  useEffect(() => {
    setFilteredCategories(allCategories);
  }, []);

  useEffect(() => {
    const searchParam = searchParams.get("search");

    if (searchParam) {
      userStore.setSearch("market", searchParam);
      handleSearch(searchParam);
    }
  }, [location.search]);

  useEffect(() => {
    const openedCategories = store.getOpenedCategories();
    if (openedCategories.length > 0) {
      setExpandedCategories(
        openedCategories.reduce((acc, categoryId) => {
          acc[categoryId] = true;
          return acc;
        }, {})
      );
    }
  }, [store]);

  useEffect(() => {
    const storedCategories = localStorage.getItem("openedCategories");
    if (storedCategories) {
      setExpandedCategories(JSON.parse(storedCategories));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "openedCategories",
      JSON.stringify(expandedCategories)
    );
  }, [expandedCategories]);

  useEffect(() => {
    const getSelectedCategory = localStorage.getItem("selectedCategory-market");
    const findSelectedCategory = store.findCategory(getSelectedCategory);
    store.setSelectedCategory(findSelectedCategory);
    const cachedContent = store.getContent(getSelectedCategory);
    if (!cachedContent || cachedContent.length === 0) {
      store.loadContent(getSelectedCategory);
    }
  }, []);

  return (
    <>
      {isMobile && !rootStore.cartOpened ? (
        <div
          className={`${styles.mobileNavButtonWrapper} ${
            menuOpened ? styles.mobileNavButtonWrapperActive : ""
          }`}
        >
          <button
            onClick={() => setMenuOpened(!menuOpened)}
            className={`${styles.mobileNavButton} ${
              menuOpened ? styles.mobileNavButtonActive : ""
            }`}
          >
            {menuOpened ? <IoClose /> : <RiMenuSearchLine />}
          </button>
        </div>
      ) : null}
      <div
        className={`${styles.navigationWrapper} ${
          isMobile ? styles.navigationWrapperMobile : ""
        }
      ${isMobile && menuOpened ? styles.navigationWrapperMobileActive : ""}
      `}
      >
        <div className={`${styles.formPageNavigationTop} ${styles.topFirst}`}>
          {Object.entries(filteredCategories.top)
            .filter(([key, topCategoryArray]) => topCategoryArray.length > 0)
            .map(([key, topCategoryArray]) => (
              <nav key={key} className={styles.topNav}>
                {topCategoryArray.map((category) => (
                  <React.Fragment key={category?.id}>
                    <li className={styles.categoryItem}>
                      <button
                        onClick={() => {
                          handleCategoryClick(category?.id, category);
                          toggleCategory(category?.id);
                        }}
                        className={`${styles.navButton} ${
                          selectedCategory &&
                          selectedCategory?.id === category?.id
                            ? styles.active
                            : ""
                        }`}
                      >
                        <div width="24" height="24">
                          {category && category.icon}
                        </div>
                        {category && category.title}
                      </button>
                    </li>
                    {category &&
                      category.subcategories &&
                      expandedCategories[category?.id] && (
                        <ul
                          className={`${styles.subcategoryList} ${
                            expandedCategories[category?.id]
                              ? styles.showSubcategories
                              : styles.hideSubcategories
                          }`}
                        >
                          {category.subcategories.map((subcategory) => (
                            <li
                              key={subcategory?.id}
                              className={styles.subcategoryItem}
                            >
                              <button
                                onClick={() =>
                                  handleCategoryClick(
                                    subcategory?.id,
                                    subcategory
                                  )
                                }
                                className={`${styles.navButtonSub} ${
                                  selectedCategory?.id === subcategory?.id
                                    ? styles.active
                                    : ""
                                }`}
                              >
                                {subcategory.name}
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                  </React.Fragment>
                ))}
              </nav>
            ))}
        </div>
      </div>
    </>
  );
};

export default observer(StickyNavigation);
