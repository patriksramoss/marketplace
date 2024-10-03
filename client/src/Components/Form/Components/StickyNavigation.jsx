import React, { useState, useEffect } from "react";
import styles from "../styles.module.scss";
import { toJS } from "mobx";

// Icons
import { RiArrowDropDownLine } from "react-icons/ri";
import { FaSearch } from "react-icons/fa";
import { RiMenuSearchLine } from "react-icons/ri";
import { IoClose } from "react-icons/io5";

//Stores
import userStore from "../../../Stores/User";

const StickyNavigation = ({
  store,
  allCategories, // This includes top and bottom categories
  handleCategoryClick,
  selectedCategory,
}) => {
  // State to track expanded categories
  const [expandedCategories, setExpandedCategories] = useState({});
  const [filteredCategories, setFilteredCategories] = useState(allCategories);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);
  const [menuOpened, setMenuOpened] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Function to toggle subcategory visibility
  const toggleCategory = (categoryId) => {
    setExpandedCategories((prevState) => ({
      ...prevState,
      [categoryId]: !prevState[categoryId], // Toggle expand/collapse
    }));

    // Save the opened categories in the store
    const openedCategories = store.getOpenedCategories();
    if (openedCategories.includes(categoryId)) {
      // Category is already opened, remove it from the list
      store.setOpenedCategories(
        openedCategories.filter((id) => id !== categoryId)
      );
    } else {
      // Category is not opened, add it to the list
      store.setOpenedCategories([...openedCategories, categoryId]);
    }
  };

  const handleSearch = (query) => {
    if (query && query !== "") {
      store.searchItems(query);
    }

    // Create a new object for filtered categories
    const newFilteredCategories = {
      bottom: {},
      top: {},
    };

    // Loop through all sections (top and bottom)
    for (const section in allCategories) {
      for (const categoryKey in allCategories[section]) {
        const category = allCategories[section][categoryKey];
        const filteredCategory = category.filter((item) => {
          if (item && item.title) {
            item.title.toLowerCase().includes(query);
          }
        });
        // Loop through each category and filter its subcategories
        const filteredCategoryWithSubcategories = category.map((cat) => {
          const filteredSubcategories = cat.subcategories
            ? cat.subcategories.filter(
                (subcat) =>
                  subcat.name.toLowerCase().includes(query) ||
                  subcat.description.toLowerCase().includes(query)
              )
            : [];

          // If the category itself or its subcategories match the query, return the category with filtered subcategories
          if (filteredCategory.length > 0 || filteredSubcategories.length > 0) {
            return {
              ...cat,
              subcategories: filteredSubcategories, // Add filtered subcategories
            };
          }

          // If no matches, return null
          return null;
        });

        // Filter out any null entries (categories that didn't match and had no matching subcategories)
        const validFilteredCategories =
          filteredCategoryWithSubcategories.filter((cat) => cat !== null);

        // If any categories or their subcategories matched, add them to the newFilteredCategories
        if (validFilteredCategories.length > 0) {
          newFilteredCategories[section][categoryKey] = validFilteredCategories;
        }
      }
    }

    setFilteredCategories(newFilteredCategories);
  };

  // UseEffect to handle the case when allCategories changes
  useEffect(() => {
    setFilteredCategories(allCategories);
    handleSearch(userStore.search.market);
  }, [allCategories]);

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
      {isMobile && (
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
      )}
      <div
        className={`${styles.navigationWrapper} ${
          isMobile ? styles.navigationWrapperMobile : ""
        }
      ${isMobile && menuOpened ? styles.navigationWrapperMobileActive : ""}
      `}
      >
        <div className={`${styles.formPageNavigationTop} ${styles.topFirst}`}>
          <nav className={styles.searchWrapper}>
            <ul>
              <li className={styles.search}>
                <div className={styles.searchInput}>
                  <FaSearch className={styles.searchIcon} />
                  <input
                    type="text"
                    placeholder="Search"
                    className={styles.searchInput}
                    value={userStore.search.market}
                    onChange={(e) => {
                      if (userStore.search.market) {
                        store.selectedCategory = null;
                      }
                      handleSearch(e.target.value.toLowerCase());
                    }}
                  />
                </div>
              </li>
            </ul>
          </nav>

          {Object.entries(filteredCategories.top).map(
            ([key, topCategoryArray]) => (
              <nav key={key} className={styles.topNav}>
                {topCategoryArray.map((category) => (
                  <React.Fragment key={category.id}>
                    <li className={styles.categoryItem}>
                      <button
                        onClick={() => {
                          handleCategoryClick(category.id, category);
                          toggleCategory(category.id);
                        }}
                        className={`${styles.navButton} ${
                          selectedCategory &&
                          selectedCategory?.id === category.id
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
                      expandedCategories[category.id] && (
                        <ul
                          className={`${styles.subcategoryList} ${
                            expandedCategories[category.id]
                              ? styles.showSubcategories
                              : styles.hideSubcategories
                          }`}
                        >
                          {category.subcategories.map((subcategory) => (
                            <li
                              key={subcategory.id}
                              className={styles.subcategoryItem}
                            >
                              <button
                                onClick={() =>
                                  handleCategoryClick(
                                    subcategory.id,
                                    subcategory
                                  )
                                }
                                className={`${styles.navButtonSub} ${
                                  selectedCategory?.id === subcategory.id
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
            )
          )}
        </div>

        {allCategories.bottom &&
          allCategories.bottom.bottomCategories.length > 0 && (
            <div className={styles.formPageNavigationBottom}>
              <nav className={styles.bottomNav}>
                <ul>
                  {allCategories.bottom.bottomCategories.map((category) => (
                    <li key={category.id} className={styles.categoryItem}>
                      <button
                        onClick={() =>
                          handleCategoryClick(category.id, category)
                        }
                        className={`${styles.navButton} ${
                          selectedCategory?.id === category.id
                            ? styles.active
                            : ""
                        }`}
                      >
                        <div width="24" height="24">
                          {category.icon}
                        </div>
                        {category.title}
                      </button>

                      {category.subcategories && (
                        <ul
                          className={`${styles.subcategoryList} ${
                            expandedCategories[category.id]
                              ? styles.showSubcategories
                              : styles.hideSubcategories
                          }`}
                        >
                          {category.subcategories.map((subcategory) => (
                            <li
                              key={subcategory.id}
                              className={styles.subcategoryItem}
                            >
                              <button
                                onClick={() =>
                                  handleCategoryClick(
                                    subcategory.id,
                                    subcategory
                                  )
                                }
                                className={`${styles.navButtonSub} ${
                                  selectedCategory?.id === subcategory.id
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
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          )}
      </div>
    </>
  );
};

export default StickyNavigation;
