import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useLocation, useNavigate } from "react-router-dom";

import { toJS } from "mobx";
import NavigationMobile from "../../Components/Form/Components/Mobile/Navigation";
import StickyNavigation from "../../Components/Form/Components/StickyNavigation";

//store
import store from "./store"; // Update path as needed
import userStore from "../../Stores/User";

// Components
import Container from "../../Components/Container/Container";
import ReusableForm from "../../Components/Form/Form";
import CategoryContent from "./Components/CategoryContent";

// STYLES
import styles from "./styles.module.scss";

const Market = observer(() => {
  const navigate = useNavigate();
  const location = useLocation();
  const storedCategoryId = localStorage.getItem("selectedCategory-market");
  const initialCategoryId = location.hash
    ? location.hash.substring(1)
    : storedCategoryId || store.getCategories()[0]?.id;

  const selectedCategory = store.selectedCategory;
  const search = userStore.search.market;

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
        store.setSelectedCategory(category);
        localStorage.setItem("selectedCategory-market", categoryId);
        navigate(`#${categoryId}`);

        const cachedContent = store.getContent(categoryId);
        if (!cachedContent || cachedContent.length === 0) {
          store.loadContent(categoryId);
        }
      }
    }
  };

  // useEffect(() => {
  //   if (!selectedCategory || selectedCategory.id !== initialCategoryId) {
  //     handleCategoryChange(initialCategoryId);
  //   }
  // }, [initialCategoryId, selectedCategory]);

  useEffect(() => {
    if (search && search !== "") {
      const searchCategory = {
        id: "search",
        title: "search",
        icon: null,
        description: "search",
        content: (
          <CategoryContent
            title="search"
            description="search"
            items={store.searchedItems}
          />
        ),
      };

      store.setSelectedCategory(searchCategory);
    }
  }, [search]);

  return (
    <>
      <Helmet>
        <title>Market</title>
      </Helmet>
      <ReusableForm
        store={store}
        allCategories={store.getAllCategories()}
        initialCategory={selectedCategory?.id}
        onCategoryChange={handleCategoryChange}
        selectedCategory={selectedCategory}
        styleSection={{ background: "transparent", boxShadow: "none" }}
      />
    </>
  );
});

export default Market;
