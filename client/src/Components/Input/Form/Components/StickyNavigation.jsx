import React, { useEffect, useState, useRef } from "react";
import styles from "../styles.module.scss";
import { toJS } from "mobx";

const StickyNavigation = ({
  categories,
  categoriesSecondary,
  bottomCategories,
  handleCategoryClick,
  selectedCategory,
}) => {
  const [bottomOffset, setBottomOffset] = useState(20);
  const bottomNavRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const viewportHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;

      const distanceFromBottom = documentHeight - viewportHeight - scrollTop;
      const isMobile = window.innerWidth <= 640;
      const mobileOffset = 0;
      const desktopOffset = 20;

      if (viewportHeight < 1000) {
        setBottomOffset(isMobile ? mobileOffset : desktopOffset);
      } else if (distanceFromBottom <= viewportHeight * 0.1) {
        setBottomOffset((isMobile ? mobileOffset : viewportHeight * 0.1) + 20);
      } else {
        setBottomOffset(isMobile ? mobileOffset : desktopOffset);
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
                      onClick={() =>
                        handleCategoryClick(category.id, null, category)
                      }
                      className={`${styles.navButton} ${
                        selectedCategory.id === category.id ? styles.active : ""
                      }`}
                    >
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
                                onClick={() =>
                                  handleCategoryClick(
                                    category.id,
                                    subcategory.id,
                                    subcategory
                                  )
                                }
                                className={`${styles.navButtonSub} ${
                                  selectedCategory.id === subcategory.id
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
                    <button
                      onClick={() =>
                        handleCategoryClick(category.id, null, category)
                      }
                      className={`${styles.navButton} ${
                        selectedCategory.id === category.id ? styles.active : ""
                      }`}
                    >
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
                                onClick={() =>
                                  handleCategoryClick(
                                    category.id,
                                    subcategory.id,
                                    subcategory
                                  )
                                }
                                className={`${styles.navButtonSub} ${
                                  selectedCategory.id === subcategory.id
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
                    onClick={() =>
                      handleCategoryClick(category.id, null, category)
                    }
                    className={`${styles.navButton} ${
                      selectedCategory.id === category.id ? styles.active : ""
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
                                selectedCategory.id === subcategory.id
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
