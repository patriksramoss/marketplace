import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

//styles
import styles from "./styles.module.scss";

const CustomButton = (params) => {
  const navigate = useNavigate();

  function onClick() {
    if (params.href) {
      navigate(params.href);
    } else if (params.onClick) {
      params.onClick();
    }
  }

  console.log("params styles", params.style);
  return (
    <div className={styles.formControlBtns} style={params.style}>
      <button
        className={styles.button}
        onClick={onClick}
        type={params.type}
        disabled={params.disabled}
      >
        <div className={styles.buttonContent}>
          <div className={styles.buttonContentBorder}></div>
          <p className={styles.buttonText}>{params.text}</p>
        </div>
      </button>
    </div>
  );
};

export default CustomButton;
