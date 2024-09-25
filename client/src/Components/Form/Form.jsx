import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import StickyNavigation from "./Components/StickyNavigation";
import NavigationMobile from "./Components/Mobile/Navigation";

import styles from "./styles.module.scss";

import rootStore from "../../Store";

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
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
    <>
      {/* {isMobile ? (
        <NavigationMobile
          categories={categories}
          categoriesSecondary={categoriesSecondary}
          bottomCategories={bottomCategories}
          handleCategoryClick={handleCategoryClick}
          selectedCategory={selectedCategory}
        />
      ) : null} */}
      <div className={styles.formPage} style={styleWrapper}>
        {isMobile ? null : (
          <StickyNavigation
            categories={categories}
            categoriesSecondary={categoriesSecondary}
            bottomCategories={bottomCategories}
            handleCategoryClick={handleCategoryClick}
            selectedCategory={selectedCategory}
          />
        )}
        <main className={styles.formPageContent}>
          <section
            style={styleSection}
            className={`${
              rootStore.cartOpened ? styles.sectionSrink : styles.section
            }`}
          >
            {selectedCategory?.content}
          </section>
        </main>
      </div>
    </>
  );
};
export default observer(ReusableForm);
