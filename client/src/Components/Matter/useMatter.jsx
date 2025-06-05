import React, { useRef, useState, useEffect } from "react";
import SpriteDragAndDrop from "./Components/Types/SpriteDragAndDrop";
import styles from "./styles.module.scss";

const typeHandlers = {
  SpriteDragAndDrop: SpriteDragAndDrop,
};

const MatterComponent = ({ type, ...props }) => {
  const canvasContainerRef = useRef(null);
  const [loading, setLoading] = useState(true);

  const handleType = typeHandlers[type];
  if (handleType) {
    handleType(canvasContainerRef, props);
  } else {
    console.error(`Unknown type: ${type}`);
  }

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1);
    return () => {};
  }, [type, props]);

  return (
    <div ref={canvasContainerRef} className={styles.canvasContainer}></div>
  );
};

export default MatterComponent;
