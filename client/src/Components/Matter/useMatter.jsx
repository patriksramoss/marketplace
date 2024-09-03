// Components/Matter/MatterComponent.jsx
import React, { useRef, useState, useEffect } from "react";
import SpriteDragAndDrop from "./Components/Types/SpriteDragAndDrop"; // Hook for Matter.js logic
import styles from "./styles.module.scss";

// Mapping object for type-to-function association
const typeHandlers = {
  SpriteDragAndDrop: SpriteDragAndDrop, // Add more types and their corresponding hooks here if needed
};

const MatterComponent = ({ type, ...props }) => {
  const canvasContainerRef = useRef(null); // Reference to the canvas container
  const [loading, setLoading] = useState(true);

  // Get the function associated with the type and call it
  const handleType = typeHandlers[type];
  if (handleType) {
    handleType(canvasContainerRef, props); // Call the corresponding hook or function based on the type
  } else {
    console.error(`Unknown type: ${type}`); // Handle unknown types gracefully
  }

  // Simulate loading behavior
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1);
    // Cleanup function
    return () => {
      // Add cleanup code if needed
    };
  }, [type, props]);

  return (
    <div ref={canvasContainerRef} className={styles.canvasContainer}></div>
  );
};

export default MatterComponent;
