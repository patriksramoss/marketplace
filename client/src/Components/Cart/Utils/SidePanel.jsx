import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
//styling
import styles from "../styles.module.scss";

const SidePanel = observer(({ show }) => {
  const [isVisible, setIsVisible] = useState(show);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [show]);

  return (
    <>
      <div
        className={`${styles.shadow} ${
          isVisible ? styles.show : styles.fadeOut
        }`}
      ></div>
      <div
        className={`${styles.sidePanelWrapper} ${
          isVisible ? styles.show : styles.fadeOut
        }`}
      >
        <div className={styles.sidePanel}></div>
      </div>
    </>
  );
});

export default SidePanel;
