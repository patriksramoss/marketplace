import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import StickyNavigation from "./Components/StickyNavigation";
import styles from "./styles.module.scss";

const ReusableForm = ({
  categories,
  categoriesSecondary,
  bottomCategories,
  initialCategory,
  onCategoryChange,
  styleWrapper,
  styleSection,
  selectedCategory,
}) => {
  const handleCategoryClick = (categoryId, category) => {
    let newSelectedCategory = category;

    if (newSelectedCategory) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      if (onCategoryChange) {
        onCategoryChange(categoryId);
      }
    }
  };

  return (
    <div className={styles.formPage} style={styleWrapper}>
      <StickyNavigation
        categories={categories}
        categoriesSecondary={categoriesSecondary}
        bottomCategories={bottomCategories}
        handleCategoryClick={handleCategoryClick}
        selectedCategory={selectedCategory}
      />
      <main className={styles.formPageContent}>
        <section style={styleSection}>{selectedCategory?.content}</section>
      </main>
    </div>
  );
};
export default observer(ReusableForm);
