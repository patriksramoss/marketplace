// SoundWrapper.jsx
import React, { useRef } from "react";

const SoundWrapper = ({ children, soundSrc, onClick }) => {
  const audioRef = useRef(null);

  const handleClick = (event) => {
    // Play the sound
    if (audioRef.current) {
      audioRef.current.play();
    }

    // Call the onClick handler if provided
    if (onClick) {
      onClick(event);
    }
  };

  return (
    <div onClick={handleClick} style={{ cursor: "pointer" }}>
      {children}
      <audio ref={audioRef} src={soundSrc} preload="auto" />
    </div>
  );
};

export default SoundWrapper;
