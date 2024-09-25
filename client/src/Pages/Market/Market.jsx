import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useLocation, useNavigate } from "react-router-dom";

import { toJS } from "mobx";
import NavigationMobile from "../../Components/Form/Components/Mobile/Navigation";

//store
import store from "./store"; // Update path as needed

// Components
import Container from "../../Components/Container/Container";
import ReusableForm from "../../Components/Form/Form";

// STYLES
import styles from "./styles.module.scss";

const Market = observer(() => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const storedCategoryId = localStorage.getItem("selectedCategory-market");
  const initialCategoryId = location.hash
    ? location.hash.substring(1)
    : storedCategoryId || store.getCategories()[0]?.id;

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleCategoryChange = (categoryId) => {
    if (categoryId) {
      const category = store.findCategory(categoryId);
      if (category) {
        setSelectedCategory(category);
        localStorage.setItem("selectedCategory-market", categoryId);
        navigate(`#${categoryId}`);

        const cachedContent = store.getContent(categoryId);
        if (!cachedContent || cachedContent.length === 0) {
          store.loadContent(categoryId);
        }
      }
    }
  };

  useEffect(() => {
    if (!selectedCategory || selectedCategory.id !== initialCategoryId) {
      handleCategoryChange(initialCategoryId);
    }
  }, [initialCategoryId, selectedCategory]);

  return (
    <>
      <Helmet>
        <title>Market</title>
      </Helmet>
      {isMobile && (
        <NavigationMobile
          categories={store.getRecommended()}
          categoriesSecondary={store.getCategories()}
          bottomCategories={store.bottomCategories}
          handleCategoryClick={handleCategoryChange}
          selectedCategory={selectedCategory}
        />
      )}
      <Container className={styles.appContainerSettings} fullHeight={true}>
        <ReusableForm
          store={store}
          bottomCategories={store.bottomCategories}
          categories={store.getRecommended()}
          categoriesSecondary={store.getCategories()}
          initialCategory={selectedCategory?.id}
          onCategoryChange={handleCategoryChange}
          selectedCategory={selectedCategory}
          styleSection={{ background: "transparent", boxShadow: "none" }}
        />
      </Container>
    </>
  );
});

export default Market;
