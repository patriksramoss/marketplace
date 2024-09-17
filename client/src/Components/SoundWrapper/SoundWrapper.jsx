// SoundWrapper.jsx
import React, { useCallback } from "react";

const SoundWrapper = ({ children, soundSrc, onClick }) => {
  const handleClick = useCallback(
    (event) => {
      // Create a new audio element and play the sound
      const audio = new Audio(soundSrc);
      audio.play();

      // Call the onClick handler if provided
      if (onClick) {
        onClick(event);
      }
    },
    [soundSrc, onClick]
  );

  return (
    <div onClick={handleClick} style={{ cursor: "pointer" }}>
      {children}
    </div>
  );
};

export default SoundWrapper;
