import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";

//Components
import Container from "../../Components/Container/Container";
import ReusableForm from "../../Components/Input/Form/Form";

//STYLES
import styles from "./styles.module.scss";

import Settings from "./BottomCategories/Settings";
import Share from "./BottomCategories/Share";

// ICONS
import { IoSettingsOutline } from "react-icons/io5";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { RiAccountCircleLine } from "react-icons/ri";

const categories = [
  {
    id: "note1",
    title: "Note 1",
    description: "Task to complete.",
    content: <p>aaaaaa</p>,
  },
  {
    id: "note2",
    title: "Note 2",
    description: "Take notes of your tasks.",
    content: <p>bbbbb</p>,
  },
  {
    id: "note3",
    title: "Note 3",
    description: "Configure your Table.",
    content: <p>cccc</p>,
  },
];

const bottomCategories = [
  {
    id: "share",
    title: "Share",
    icon: <RiAccountCircleLine />,
    description: "Share your Table.",
    content: <Share />,
  },
  {
    id: "settings",
    title: "Settings",
    icon: <IoSettingsOutline />,
    description: "Configure your Table.",
    content: <Settings />,
  },
];

const Table = () => {
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
        <title>Table</title>
      </Helmet>
      <Container className={styles.appContainerSettings}>
        <ReusableForm
          categories={categories}
          bottomCategories={bottomCategories}
          initialCategory={initialCategory}
          styleWrapper={{ maxWidth: "100%" }}
          // styleSection={{
          //   background: "transparent",
          //   boxShadow: "none",
          //   overflowX: "auto",
          // }}
          onCategoryChange={handleCategoryChange}
        />
      </Container>
    </>
  );
};

export default Table;
