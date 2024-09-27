import React, { useState, useEffect } from "react";
import styles from "../styles.module.scss";
import { toJS } from "mobx";

// Icons
import { RiArrowDropDownLine } from "react-icons/ri";
import { FaSearch } from "react-icons/fa";

//Stores
import userStore from "../../../Stores/User";
import marketStore from "../../../Pages/Market/store";

const StickyNavigation = ({
  allCategories, // This includes top and bottom categories
  handleCategoryClick,
  selectedCategory,
}) => {
  // State to track expanded categories
  const [expandedCategories, setExpandedCategories] = useState({});
  const [filteredCategories, setFilteredCategories] = useState(allCategories);

  // Function to toggle subcategory visibility
  const toggleCategory = (categoryId) => {
    setExpandedCategories((prevState) => ({
      ...prevState,
      [categoryId]: !prevState[categoryId], // Toggle expand/collapse
    }));
  };

  const handleSearch = (query) => {
    userStore.setSearch("market", query);
    if (query && query !== "") {
      console.log("QUERY", query);
      marketStore.searchItems(query);
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

        // Filter the category itself by title/description
        const filteredCategory = category.filter((item) =>
          item.title.toLowerCase().includes(query)
        );

        // Loop through each category and filter its subcategories
        const filteredCategoryWithSubcategories = category.map((cat) => {
          // Filter subcategories
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

  return (
    <div className={styles.navigationWrapper}>
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
                      marketStore.selectedCategory = null;
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
                      onClick={() => handleCategoryClick(category.id, category)}
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
                      <div className={styles.arrowIcon}>
                        <RiArrowDropDownLine
                          onClick={() => toggleCategory(category.id)}
                          style={{
                            transform: expandedCategories[category.id]
                              ? "rotate(180deg)"
                              : "rotate(0deg)",
                          }}
                        />
                      </div>
                    )}
                  </li>
                  {category.subcategories &&
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
                                handleCategoryClick(subcategory.id, subcategory)
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

      {allCategories.bottom.bottomCategories.length > 0 && (
        <div className={styles.formPageNavigationBottom}>
          <nav className={styles.bottomNav}>
            <ul>
              {allCategories.bottom.bottomCategories.map((category) => (
                <li key={category.id} className={styles.categoryItem}>
                  <button
                    onClick={() => handleCategoryClick(category.id, category)}
                    className={`${styles.navButton} ${
                      selectedCategory?.id === category.id ? styles.active : ""
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
                              handleCategoryClick(subcategory.id, subcategory)
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
  );
};

export default StickyNavigation;
