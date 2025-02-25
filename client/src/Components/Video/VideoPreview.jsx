import React from "react";
import styles from "./Video.module.scss";

const VideoPreview = ({ src }) => {
  return (
    <video className={styles.video} autoPlay loop muted playsInline>
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoPreview;
