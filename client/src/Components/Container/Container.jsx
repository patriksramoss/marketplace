import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import styles from "./styles.module.scss";

//components
import Loader from "../Loader/Loader";

const Container = ({
  className = "",
  children,
  container = true,
  loading,
  loader = false,
  fullHeight = false,
}) => {
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
    <div
      className={`${container ? styles.container : styles.wrapper} ${
        fullHeight ? styles.fullHeight : null
      }`}
    >
      {loader && <Loader contained={true} loader={true} />}
      <div
        className={`${styles.loadingOverlay} ${styles.loading} ${
          !isLoading ? styles.loaded : ""
        }`}
      ></div>
      <div className={`${className}`}>{children}</div>
    </div>
  );
};

export default observer(Container);
