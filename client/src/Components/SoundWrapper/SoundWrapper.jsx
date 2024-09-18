import React, { useCallback } from "react";

const SoundWrapper = ({ children, audio, onClick }) => {
  const handleClick = useCallback(
    (event) => {
      const source = new Audio(audio);
      source.play();
      if (onClick) {
        onClick(event);
      }
    },
    [audio, onClick]
  );

  return (
    <div onClick={handleClick} style={{ cursor: "pointer" }}>
      {children}
    </div>
  );
};

export default SoundWrapper;
