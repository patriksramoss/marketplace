import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import styles from "./styles.module.scss";

const ItemPreview = ({ item = {} }) => {
  // useEffect(() => {
  //   console.log(item);
  // }, [item]);
  const images = !item.images?.preview ? item.images?.max : item.images.preview;
  return (
    <div className={styles.previewWrapper}>
      <Swiper
        modules={[EffectFade, Navigation]}
        effect="fade"
        navigation
        loop
        style={{ width: "100%", height: "100%" }}
      >
        {images?.map((image, index) => {
          const imageUrl = image;
          const imageId = image._id || image.id || index;

          return (
            <SwiperSlide key={imageId}>
              <img
                src={imageUrl}
                alt={image.name || `image ${index}`}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <div className={styles.overlay}></div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default ItemPreview;
