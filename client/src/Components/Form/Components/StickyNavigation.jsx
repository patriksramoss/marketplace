import React, { useEffect, useRef, useState } from "react";
import styles from "../styles.module.scss";

//icons
import { RiArrowDropDownLine } from "react-icons/ri";

const StickyNavigation = ({
  categories,
  categoriesSecondary,
  bottomCategories,
  handleCategoryClick,
  selectedCategory,
}) => {
  const [bottomOffset, setBottomOffset] = useState(20);
  const bottomNavRef = useRef(null);
  // Retrieve expanded categories from localStorage or initialize with an empty array
  const [expandedCategories, setExpandedCategories] = useState(
    JSON.parse(localStorage.getItem("expandedCategories")) || []
  );

  // Update localStorage whenever expandedCategories state changes
  useEffect(() => {
    localStorage.setItem(
      "expandedCategories",
      JSON.stringify(expandedCategories)
    );
  }, [expandedCategories]);

  // Function to toggle category expand/collapse
  const toggleCategory = (categoryId) => {
    if (expandedCategories.includes(categoryId)) {
      setExpandedCategories(
        expandedCategories.filter((id) => id !== categoryId)
      );
    } else {
      setExpandedCategories([...expandedCategories, categoryId]);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const viewportHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const distanceFromBottom = documentHeight - viewportHeight - scrollTop;
      const desktopOffset = 20;

      if (viewportHeight < 1000 || distanceFromBottom <= viewportHeight * 0.1) {
        // setBottomOffset(viewportHeight * 0.1 + 20);
      } else {
        setBottomOffset(desktopOffset);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={styles.navigationWrapper}>
      <div className={styles.topNavigationWrapper}>
        {/* Top Navigation */}
        {categories && (
          <div className={`${styles.formPageNavigationTop} ${styles.topFirst}`}>
            <nav className={styles.topNav}>
              <ul key="top-nav">
                {categories.map((category) => (
                  <li key={category.id} className={styles.categoryItem}>
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
                    {category.subcategories &&
                      selectedCategory?.id === category.id &&
                      category.subcategories.length > 0 && (
                        <ul className={styles.subcategoryList}>
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

        {/* Top Secondary Navigation */}
        {categoriesSecondary && (
          <div
            className={`${styles.formPageNavigationTop} ${styles.topSecond}`}
          >
            <nav className={styles.topNav}>
              <ul key="top-secondary-nav">
                {categoriesSecondary.map((category) => (
                  <li key={category.id} className={styles.categoryItem}>
                    <div className={styles.categoryRow}>
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
                        <div className={styles.categoryTitleWrapper}>
                          <div>{category.title}</div>
                        </div>
                      </button>
                      <button
                        className={styles.categoryArrow}
                        onClick={() => toggleCategory(category.id)}
                      >
                        <RiArrowDropDownLine />
                      </button>
                    </div>
                    {category.subcategories &&
                      category.subcategories.length > 0 &&
                      expandedCategories.includes(category.id) && (
                        <ul
                          className={`${styles.subcategoryList} ${
                            expandedCategories.includes(category.id)
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

      {/* Bottom Navigation */}
      {bottomCategories && (
        <div
          className={styles.formPageNavigationBottom}
          ref={bottomNavRef}
          style={{ bottom: `${bottomOffset}px` }}
        >
          <nav className={styles.bottomNav}>
            <ul>
              {bottomCategories.map((category) => (
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
                  {category.subcategories &&
                    category.subcategories.length > 0 && (
                      <ul className={styles.subcategoryList}>
                        {category.subcategories.map((subcategory) => (
                          <li
                            key={subcategory.id}
                            className={styles.subcategoryItem}
                          >
                            <button
                              onClick={() => handleCategoryClick(subcategory)}
                              className={`${styles.navButton} ${
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
