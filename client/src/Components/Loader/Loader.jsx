import React, { useState, useEffect } from "react";

import styles from "./styles.module.scss";

const Loader = (params) => {
  return (
    <div
      className={`${styles.loader} ${
        params.contained === true ? styles.contained : ""
      }`}
      style={params.style}
    >
      {/* <a>Please wait ...</a> */}
    </div>
  );
};

export default Loader;
