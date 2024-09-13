import React, { useState, useRef } from "react";
import styles from "./styles.module.scss";
import { CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons";

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

  const renderCategories = (categories) =>
    categories.map((category) => (
      <button
        key={category.id}
        onClick={() => handleCategoryClick(category.id, category)}
        className={`${styles.navButton} ${
          selectedCategory?.id === category.id ? styles.active : ""
        }`}
      >
        {category.title}
      </button>
    ));

  return (
    <div className={styles.navigationWrapper}>
      <div
        className={`${styles.navContainer} ${
          menuOpen === true ? styles.navActive : ""
        }`}
      >
        <button
          className={`${styles.menuButton} ${
            menuOpen === true ? styles.buttonActive : ""
          }`}
          onClick={toggleMenu}
        >
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
