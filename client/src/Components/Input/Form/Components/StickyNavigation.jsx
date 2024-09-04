import React, { useEffect, useState, useRef } from "react";
import styles from "../styles.module.scss";

const StickyNavigation = ({
  categories,
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

      // Check if the screen width is less than 40em (approx 640px)
      const isMobile = window.innerWidth <= 640; // 40em in pixels is approximately 640px

      // Set different offsets based on whether the user is on a mobile device
      const mobileOffset = 0; // Smaller offset for mobile
      const desktopOffset = 20; // Standard offset for desktop

      if (viewportHeight < 1000) {
        setBottomOffset(isMobile ? mobileOffset : desktopOffset);
      } else if (distanceFromBottom <= viewportHeight * 0.1) {
        setBottomOffset((isMobile ? mobileOffset : viewportHeight * 0.1) + 20);
      } else {
        setBottomOffset(isMobile ? mobileOffset : desktopOffset);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={styles.navigationWrapper}>
      {/* Top Navigation */}
      <div className={styles.formPageNavigationTop}>
        <nav className={styles.topNav}>
          <ul>
            {categories.map((category) => (
              <li key={category.id} className={styles.categoryItem}>
                <button
                  onClick={() => handleCategoryClick(category)}
                  className={`${styles.navButton} ${
                    selectedCategory.id === category.id ? styles.active : ""
                  }`}
                >
                  {category.title}
                </button>
                {/* Render subcategories if they exist */}
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
                    onClick={() => handleCategoryClick(category)}
                    className={`${styles.navButton} ${
                      selectedCategory.id === category.id ? styles.active : ""
                    }`}
                  >
                    <div width="24" height="24">
                      {category.icon}
                    </div>
                    {category.title}
                  </button>
                  {/* Render subcategories if they exist */}
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
