import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import StickyNavigation from "./Components/StickyNavigation";
import { toJS } from "mobx";
import Loader from "../../Components/Loader/Loader";

import styles from "./styles.module.scss";

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
        {/* {store.loading && (
          <Loader contained={true} loader={false} blur={true} />
        )} */}

        <main className={styles.formPageContent}>
          <StickyNavigation
            store={store}
            handleCategoryClick={handleCategoryClick}
            selectedCategory={selectedCategory}
            allCategories={allCategories}
          />
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
