import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";
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
    store.fetchCategories();
  }, []);

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

  const handleCategoryChange = (categoryId) => {
    const category = store.getCategories().find((cat) => cat.id === categoryId);
    setSelectedCategory(category);
    navigate(`#${categoryId}`);
  };

  return (
    <>
      <Helmet>
        <title>Market</title>
      </Helmet>
      <Container className={styles.appContainerSettings}>
        <ReusableForm
          categories={store.getCategories()}
          initialCategory={selectedCategory?.id}
          onCategoryChange={handleCategoryChange}
        />
      </Container>
    </>
  );
});

export default Market;
