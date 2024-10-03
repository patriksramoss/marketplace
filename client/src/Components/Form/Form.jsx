import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import StickyNavigation from "./Components/StickyNavigation";
import NavigationMobile from "./Components/Mobile/Navigation";
import { toJS } from "mobx";

import styles from "./styles.module.scss";

//Stores
import userStore from "../../Stores/User";

const ReusableForm = ({
  store,
  allCategories,
  onCategoryChange,
  styleWrapper,
  styleSection,
  selectedCategory,
}) => {
  const handleCategoryClick = (categoryId, category) => {
    if (category) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      if (onCategoryChange) {
        onCategoryChange(categoryId);
      }
    }
  };

  return (
    <>
      <div className={styles.formPage} style={styleWrapper}>
        <StickyNavigation
          store={store}
          handleCategoryClick={handleCategoryClick}
          selectedCategory={selectedCategory}
          allCategories={allCategories}
        />

        <main className={styles.formPageContent}>
          <section
            style={styleSection}
            className={`${store.cartOpened ? styles.section : styles.section}`}
          >
            {selectedCategory?.content}
          </section>
        </main>
      </div>
    </>
  );
};

export default observer(ReusableForm);
