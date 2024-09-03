import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";

//Components
import Container from "../../Components/Container/Container";
import ReusableForm from "../../Components/Input/Form/Form";
import Inventory from "./Categories/Inventory";

//STYLES
import styles from "./styles.module.scss";

// ICONS
import { IoSettingsOutline } from "react-icons/io5";

const categories = [
  {
    id: "inventory",
    title: "Inventory",
    icon: <IoSettingsOutline />,
    description: "Manage your plants.",
    content: <Inventory />,
  },
];

const Market = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialCategory = location.hash
    ? location.hash.substring(1)
    : categories[0].id;

  const handleCategoryChange = (categoryId) => {
    navigate(`#${categoryId}`);
  };
  return (
    <>
      <Helmet>
        <title>Market</title>
      </Helmet>
      <Container className={styles.appContainerSettings}>
        <ReusableForm
          categories={categories}
          initialCategory={initialCategory}
          styleWrapper={{ maxWidth: "100%" }}
          onCategoryChange={handleCategoryChange}
        />
      </Container>
    </>
  );
};

export default Market;
