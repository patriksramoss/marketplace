import React, { useState, useEffect } from "react";
import StickyNavigation from "./Components/StickyNavigation";
import styles from "./styles.module.scss";

const ReusableForm = ({
  categories,
  initialCategory,
  onCategoryChange,
  styleWrapper,
  styleSection,
  bottomCategories,
}) => {
  const [selectedCategory, setSelectedCategory] = useState(() => {
    const hash = window.location.hash.substring(1);
    return (
      categories.find((category) => category.id === hash) ||
      categories.find((category) => category.id === initialCategory) ||
      categories[0]
    );
  });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1);
      const newCategory = categories.find((category) => category.id === hash);
      if (newCategory) {
        setSelectedCategory(newCategory);
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [categories]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    if (onCategoryChange) {
      onCategoryChange(category.id);
    }
  };

  const showTitle =
    selectedCategory &&
    (selectedCategory.enableTitle === true ||
      selectedCategory.enableTitle === undefined)
      ? true
      : false;

  return (
    <div className={styles.formPage} style={styleWrapper}>
      <StickyNavigation
        categories={categories}
        bottomCategories={bottomCategories && bottomCategories}
        handleCategoryClick={handleCategoryClick}
        selectedCategory={selectedCategory}
      />

      <main className={styles.formPageContent}>
        <section style={styleSection}>
          {showTitle && (
            <>
              <h1>
                <div width="24" height="24">
                  {selectedCategory.icon}
                </div>
                {selectedCategory.title}
              </h1>
              <p>{selectedCategory.description}</p>
            </>
          )}
          {selectedCategory.content}
        </section>
      </main>
    </div>
  );
};

export default ReusableForm;
