// Components/Category.jsx
import React from "react";
import styles from "./styles.module.scss"; // Adjust the path to your styles

const Category = ({ title, description, items }) => {
  return (
    <div className={styles.categoryContainer}>
      <h2 className={styles.categoryTitle}>{title}</h2>
      <p className={styles.categoryDescription}>{description}</p>

      <div className={styles.gridContainer}>
        {/* {items.map((item) => (
          <div key={item.id} className={styles.gridItem}>
            <img
              src={item.image}
              alt={item.name}
              className={styles.itemImage}
            />
            <div className={styles.itemDetails}>
              <h3 className={styles.itemName}>{item.name}</h3>
              <p className={styles.itemDescription}>{item.description}</p>
            </div>
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default Category;
