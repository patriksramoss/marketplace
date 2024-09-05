import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";

//STYLES
import styles from "./styles.module.scss";

//Components
import Container from "../../Components/Container/Container";
import ReusableForm from "../../Components/Input/Form/Form";

//Categories
import Inventory from "./Categories/Inventory";
import Field from "./Categories/Field";

// ICONS
import { IoSettingsOutline } from "react-icons/io5";
import { LiaUserFriendsSolid } from "react-icons/lia";

const categories = [
  {
    id: "inventory",
    title: "Inventory",
    icon: <IoSettingsOutline />,
    description: "Manage your plants.",
    content: <Inventory />,
  },
  {
    id: "field",
    title: "Field",
    icon: <LiaUserFriendsSolid />,
    description: "Grow your plants!",
    content: <Field />,
  },
];

const Plants = () => {
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
        <title>Plants</title>
      </Helmet>
      <Container className={styles.appContainerSettings}>
        <ReusableForm
          categories={categories}
          initialCategory={initialCategory}
          styleWrapper={{ maxWidth: "100%" }}
          styleSection={{
            background: "transparent",
            boxShadow: "none",
            overflowX: "auto",
            padding: "0 1em 1em 1em",
            margin: "0",
          }}
          onCategoryChange={handleCategoryChange}
        />
      </Container>
    </>
  );
};

export default Plants;
