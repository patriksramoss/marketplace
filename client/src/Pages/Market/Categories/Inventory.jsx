import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";

//Styling
import styles from "../styles.module.scss";

//Components
import Container from "../../../Components/Container/Container";

const Inventory = observer(() => {
  return (
    <>
      <Container className={styles.settingsAccountWrapper} container={false}>
        <div className={styles.marketWrapper}>
          <div className={styles.taskContainer}>
            <p>AAAAAAAAAAAAAAAAAAA</p>
          </div>
          <div className={styles.notesContainer}>
            <p>AAAAAAAAAAAAAAAAAAA</p>
          </div>
        </div>
      </Container>
    </>
  );
});

export default Inventory;
