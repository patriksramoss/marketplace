import React, { useState, useRef } from "react";
import styles from "./styles.module.scss";
import { CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons";

//sounds
import SoundWrapper from "../../../SoundWrapper/SoundWrapper";
import click1 from "../../../../assets/sounds/click1.mp3";

const NavigationMobile = ({
  categories = [],
  categoriesSecondary = [],
  bottomCategories = [],
  handleCategoryClick,
  selectedCategory,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const bottomNavRef = useRef(null);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const closeMenu = () => setMenuOpen(false); // Method to close the menu

  const renderCategories = (categories) =>
    categories.map((category) => (
      <SoundWrapper key={category.id} audio={click1}>
        <button
          key={category.id}
          onClick={() => handleCategoryClick(category.id, category)}
          className={`${styles.navButton} ${
            selectedCategory?.id === category.id ? styles.active : ""
          }`}
        >
          <div className={styles.iconContainer}>
            <div className={styles.icon}>{category.icon}</div>
            <div className={styles.title}>{category.title}</div>
          </div>
        </button>
      </SoundWrapper>
    ));

  return (
    // Wrapper element to detect outside clicks
    <div
      className={`${styles.navigationWrapper} ${
        menuOpen === true ? styles.navigationWrapperActive : ""
      }`}
      onClick={() => closeMenu()} // Close the menu if clicked outside
    >
      <div
        className={`${styles.navContainer} ${
          menuOpen === true ? styles.navActive : ""
        }`}
        onClick={(e) => e.stopPropagation()} // Prevent closing the menu when clicking inside it
      >
        <button
          className={`${styles.menuButton} ${
            menuOpen === true ? styles.buttonActive : ""
          }`}
          onClick={toggleMenu}
        >
          {selectedCategory?.title ? (
            <p className={styles.title}> {selectedCategory?.title}</p>
          ) : null}
          {menuOpen ? <CaretDownOutlined /> : <CaretUpOutlined />}
        </button>
        {menuOpen && (
          <div className={styles.menuBody}>
            <div className={styles.menuHeader}>
              <p>Categories</p>
            </div>
            <div className={styles.menuLinks}>
              {renderCategories(categories)}
              {renderCategories(categoriesSecondary)}
              {renderCategories(bottomCategories)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavigationMobile;
