import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";

//Components
import Container from "../../Components/Container/Container";
import ReusableForm from "../../Components/Form/Form";

//STYLES
import styles from "./styles.module.scss";
import store from "../../Stores/Settings";

const Settings = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const storedCategoryId = localStorage.getItem("selectedCategory-settings");
  const initialCategoryId = location.hash
    ? location.hash.substring(1)
    : storedCategoryId;

  const handleCategoryChange = (categoryId) => {
    if (categoryId) {
      const category = store.findCategory(categoryId);
      if (category) {
        setSelectedCategory(category);
        localStorage.setItem("selectedCategory-settings", categoryId);
        navigate(`#${categoryId}`);
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
        <title>Settings</title>
      </Helmet>
      <Container className={styles.appContainerSettings} fullHeight={true}>
        <ReusableForm
          store={store}
          allCategories={store.getAllCategories()}
          initialCategory={selectedCategory?.id}
          onCategoryChange={handleCategoryChange}
          selectedCategory={selectedCategory}
        />
      </Container>
    </>
  );
};

export default Settings;
