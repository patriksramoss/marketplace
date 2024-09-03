import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import MatterComponent from "../../../Components/Matter/useMatter";

// Stores
import store from "../../../Store";

// Styles
import styles from "../styles.module.scss";

// Images
import spriteImg from "../../../assets/images/waterdrop01.png";
import plantImg from "../../../assets/images/plant01.png";

const Field = observer(() => {
  useEffect(() => {
    store.setShowFooter(false);
    return () => {
      store.setShowFooter(true);
    };
  }, [store.setShowFooter]);

  return (
    <div className={styles.settingsAccountWrapper}>
      <MatterComponent
        type="SpriteDragAndDrop"
        spriteImage={spriteImg}
        dropAreaImage={plantImg}
      />
    </div>
  );
});

export default Field;
