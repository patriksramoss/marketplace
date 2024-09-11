import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useLocation, useNavigate } from "react-router-dom";

import { toJS } from "mobx";

//store
import store from "./store"; // Update path as needed

// Components
import Container from "../../Components/Container/Container";
import ReusableForm from "../../Components/Input/Form/Form";

// STYLES
import styles from "./styles.module.scss";

const Market = observer(() => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState(null);
  useEffect(() => {
    const storedCategoryId = localStorage.getItem("selectedCategory-market");
    const initialCategoryId = location.hash
      ? location.hash.substring(1)
      : storedCategoryId || store.getCategories()[0]?.id;

    // Update selectedCategory based on the initialCategoryId
    const category = store.findCategory(initialCategoryId);
    setSelectedCategory(category || store.getCategories()[0]);

    // Handle category change to load content if needed
    const handleCategoryChange = (categoryId) => {
      if (categoryId) {
        const category = store.findCategory(categoryId);

        if (category) {
          setSelectedCategory(category); // Ensure `selectedCategory` is updated
          localStorage.setItem("selectedCategory-market", categoryId);
          navigate(`#${categoryId}`);

          const cachedContent = store.getContent(categoryId);
          if (!cachedContent) {
            store.loadContent(categoryId); // Fetch content if not cached
          }
        }
      }
    };

    console.log("SELECTED CATEGORY:", selectedCategory);

    // Handle category change to load content if needed
    handleCategoryChange(initialCategoryId);
  }, [location.hash]);

  return (
    <>
      <Helmet>
        <title>Market</title>
      </Helmet>
      <Container className={styles.appContainerSettings} fullHeight={true}>
        <ReusableForm
          store={store}
          bottomCategories={store.bottomCategories}
          categories={store.getRecommended()}
          categoriesSecondary={store.getCategories()}
          initialCategory={selectedCategory?.id}
          onCategoryChange={store.handleCategoryChange} // Ensure this prop is called correctly
          selectedCategory={selectedCategory}
        />
      </Container>
    </>
  );
});

export default Market;
