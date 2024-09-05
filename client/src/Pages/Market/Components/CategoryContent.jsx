import React, { useEffect } from "react";
import styles from "./styles.module.scss";
import { observer } from "mobx-react-lite";

//store
import store from "../store";

//Components
import Container from "../../../Components/Container/Container";

const CategoryContent = ({ title, description, items }) => {
  if (!items || items.length === 0) {
    return <Container container={false}>No items available.</Container>;
  }

  return (
    <Container className={styles.categoryContainer} container={true}>
      <h2 className={styles.categoryTitle}>{title}</h2>
      <p className={styles.categoryDescription}>{description}</p>
      <div className={styles.gridContainer}>
        {items.map((item) => (
          <div key={item._id} className={styles.gridItem}>
            <img
              src={item.images.min[0]}
              alt={item.name}
              className={styles.itemImage}
            />
            <div className={styles.itemDetails}>
              <h3 className={styles.itemName}>{item.name}</h3>
              <p className={styles.itemDescription}>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default observer(CategoryContent);
