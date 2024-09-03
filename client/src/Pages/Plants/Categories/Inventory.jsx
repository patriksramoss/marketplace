import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";

//Components
import Container from "../../../Components/Container/Container";

import styles from "../styles.module.scss";

const Inventory = observer(() => {
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <Container className={styles.settingsAccountWrapper}>
        <div className="flex-center">
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
