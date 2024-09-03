// Components/Container/Container.jsx
import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import styles from "./styles.module.scss";

const Container = ({ className = "", children, container = true, loading }) => {
  const [internalLoading, setInternalLoading] = useState(true);

  useEffect(() => {
    if (loading === undefined) {
      setTimeout(() => {
        setInternalLoading(false);
      }, 1);
    }
  }, [loading]);

  const isLoading = loading !== undefined ? loading : internalLoading;

  return (
    <div className={`${container && styles.container}`}>
      <div
        className={`${className} ${styles.loading} ${
          isLoading ? "" : styles.loaded
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default observer(Container);
