import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import { observer } from "mobx-react-lite";
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
    if (store.getCategories().length > 0) {
      const initialCategory = location.hash
        ? location.hash.substring(1)
        : store.getCategories()[0]?.id;
      const category = store
        .getCategories()
        .find((cat) => cat.id === initialCategory);
      setSelectedCategory(category || store.getCategories()[0]);
    }
  }, [location.hash, store.getCategories()]);

  //hahahaha
  const handleCategoryChange = (categoryId, subcategoryId) => {
    if (subcategoryId) {
      // If a subcategory ID is provided
      const parentCategory = store
        .getCategories()
        .find((cat) =>
          cat.subcategories.some((sub) => sub.id === subcategoryId)
        );

      if (parentCategory) {
        const subcategory = parentCategory.subcategories.find(
          (sub) => sub.id === subcategoryId
        );

        setSelectedCategory(subcategory); // Set selected subcategory
        navigate(`#${subcategoryId}`);

        const cachedContent = store.getContent(null, subcategoryId);
        if (!cachedContent) {
          store.loadContent(null, subcategoryId); // Only fetch if not cached
        }
      }
    } else if (!subcategoryId && categoryId) {
      // If a category ID is provided
      const category = store
        .getCategories()
        .find((cat) => cat.id === categoryId);

      if (category) {
        setSelectedCategory(category); // Set selected category
        navigate(`#${categoryId}`);

        const cachedContent = store.getContent(categoryId, null);
        if (!cachedContent) {
          store.loadContent(categoryId, null); // Only fetch if not cached
        }
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Market</title>
      </Helmet>
      <Container className={styles.appContainerSettings} fullHeight={true}>
        <ReusableForm
          store={store}
          categories={store.getRecommended()}
          categoriesSecondary={store.getCategories()}
          initialCategory={selectedCategory?.id}
          onCategoryChange={handleCategoryChange}
        />
      </Container>
    </>
  );
});

export default Market;
