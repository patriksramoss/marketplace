import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";

//Components
import Container from "../../Components/Container/Container";
import ReusableForm from "../../Components/Input/Form/Form";

import Account from "./Categories/Account";
import Friends from "./Categories/Friends";
import SettingsPage from "./Categories/Settings";

// ICONS
import { IoSettingsOutline } from "react-icons/io5";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { RiAccountCircleLine } from "react-icons/ri";

//STYLES
import styles from "./styles.module.scss";

const categories = [
  {
    id: "settings",
    title: "Settings",
    icon: <IoSettingsOutline />,
    description: "General application settings.",
    content: <SettingsPage />,
  },
  {
    id: "account",
    title: "Account",
    icon: <RiAccountCircleLine />,
    description: "Change your account settings",
    content: <Account />,
  },
  {
    id: "friends",
    title: "Friends",
    icon: <LiaUserFriendsSolid />,
    description: "Manage and search other users.",
    content: <Friends />,
  },
];

const Settings = () => {
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
        <title>Settings</title>
      </Helmet>
      <Container className={styles.appContainerSettings}>
        <ReusableForm
          categories={categories}
          initialCategory={initialCategory}
          styleWrapper={{ maxWidth: "80vh" }}
          onCategoryChange={handleCategoryChange}
        />
      </Container>
    </>
  );
};

export default Settings;
