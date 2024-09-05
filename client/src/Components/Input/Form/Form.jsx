import React, { useState, useEffect } from "react";
import StickyNavigation from "./Components/StickyNavigation";
import styles from "./styles.module.scss";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";

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

  const handleCategoryClick = (categoryId, subcategoryId) => {
    let newSelectedCategory;

    if (subcategoryId) {
      // Find the subcategory and set it as the selected category
      const parentCategory = categories.find((cat) =>
        cat.subcategories.some((sub) => sub.id === subcategoryId)
      );
      const subcategory = parentCategory?.subcategories.find(
        (sub) => sub.id === subcategoryId
      );
      newSelectedCategory = subcategory;
    } else {
      // Find the category and set it as the selected category
      newSelectedCategory = categories.find(
        (category) => category.id === categoryId
      );

      // If not found in categories, look in bottomCategories
      if (!newSelectedCategory) {
        newSelectedCategory = bottomCategories.find(
          (category) => category.id === categoryId
        );
      }
    }

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
