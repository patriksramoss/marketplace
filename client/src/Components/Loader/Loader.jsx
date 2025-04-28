import React, { useState, useEffect } from "react";

import styles from "./styles.module.scss";

const Loader = (params) => {
  return (
    <div
      className={`${params.loader && styles.loader}  ${
        params.blur && styles.blur
      } ${params.contained === true ? styles.contained : ""} ${
        params.className
      }`}
      style={params.style}
    >
      {/* <a>Please wait ...</a> */}
    </div>
  );
};

export default Loader;
