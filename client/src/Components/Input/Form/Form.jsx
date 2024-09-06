import React, { useState, useEffect } from "react";
import StickyNavigation from "./Components/StickyNavigation";
import styles from "./styles.module.scss";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";

const ReusableForm = ({
  categories,
  categoriesSecondary,
  bottomCategories,
  initialCategory,
  onCategoryChange,
  styleWrapper,
  styleSection,
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

  const handleCategoryClick = (categoryId, subcategoryId, category) => {
    let newSelectedCategory = category;

    if (newSelectedCategory) {
      setSelectedCategory(newSelectedCategory);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      if (onCategoryChange) {
        onCategoryChange(categoryId, subcategoryId);
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
        <section style={styleSection}>{selectedCategory.content}</section>
      </main>
    </div>
  );
};
export default observer(ReusableForm);
