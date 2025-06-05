import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//styles
import styles from "./styles.module.scss";

import clickSound from "../../../assets/sounds/click2.mp3";

const CustomButton = (params) => {
  const navigate = useNavigate();
  const [audio, setAudio] = useState(null);
  const [isAudioReady, setIsAudioReady] = useState(false);

  useEffect(() => {
    const sound = new Audio(clickSound);
    sound.oncanplaythrough = () => setIsAudioReady(true);
    setAudio(sound);
  }, []);

  function onClick() {
    if (isAudioReady && audio) {
      audio.currentTime = 0;
      audio.play();
    }

    if (params.href) {
      navigate(params.href);
    } else if (params.onClick) {
      params.onClick();
    }
  }

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
