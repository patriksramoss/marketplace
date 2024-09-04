import React, { useState, useEffect } from "react";
import StickyNavigation from "./Components/StickyNavigation";
import styles from "./styles.module.scss";
import { toJS } from "mobx";

const ReusableForm = ({
  categories,
  initialCategory,
  onCategoryChange,
  styleWrapper,
  styleSection,
  bottomCategories,
}) => {
  const [selectedCategory, setSelectedCategory] = useState(() => {
    return (
      categories.find((category) => category.id === initialCategory) ||
      categories[0]
    );
  });

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    const category = categories.find((category) => category.id === hash);
    if (category) {
      setSelectedCategory(category);
    }
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

  console.log("22222222222", toJS(selectedCategory));

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
                {/* <div width="24" height="24">
                  {selectedCategory.icon}
                </div> */}
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
