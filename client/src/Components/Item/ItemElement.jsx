import React from "react";
import styles from "./styles.module.scss";

const ItemElement = ({
  card,
  pack,
  src,
  alt,
  onLoad,
  onClick,
  id,
  shine,
  style,
  key,
  overlay,
  texture,
  wrapperStyle,
  imageClass,
  overlayInner,
  overlayOpenPack,
  glow,
}) => {
  return (
    <div className={styles.cardWrapper}>
      <div key={key} id={id} style={wrapperStyle}>
        <img
          src={src}
          alt={alt}
          className={imageClass}
          onLoad={onLoad}
          onClick={onClick}
          style={{
            ...style,
            padding: pack ? "10px" : card ? "2px" : "0px",
          }}
        />
        {shine === true && <div id="shine"></div>}
        <div className={texture}></div>
        <div className={overlay}></div>
        <div className={overlayInner}></div>
        <div className={overlayOpenPack}></div>
        <div className={glow}></div>
      </div>
    </div>
  );
};

export default ItemElement;
