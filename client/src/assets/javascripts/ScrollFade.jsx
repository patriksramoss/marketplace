import React, { useEffect, useRef, useState } from "react";
import "../styles/ScrollFade.css"; // Ensure the path is correct

const ScrollFade = ({ children }) => {
  const [fade, setFade] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
        const scrollPercent = scrollTop / (scrollHeight - clientHeight);
        const fadeAmount = Math.min(scrollPercent * 2, 1); // Adjust multiplier for desired effect
        console.log("Scroll Percent:", scrollPercent);
        console.log("Fade Amount:", fadeAmount);
        setFade(fadeAmount);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      // Cleanup listener on component unmount
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <div className="scroll-container" ref={containerRef}>
      <div className="fade-overlay" style={{ opacity: fade }}></div>
      {children}
    </div>
  );
};

export default ScrollFade;
