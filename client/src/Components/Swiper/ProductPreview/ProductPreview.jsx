import React from "react";
import { NavLink } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import styles from "./styles.module.scss";

const ProductPreview = ({ items = [] }) => {
  return (
    <div className={styles.previewWrapper}>
      <Swiper
        modules={[EffectFade, Autoplay, Navigation]}
        effect="fade"
        autoplay={{ delay: 5000 }}
        navigation
        loop
        speed={600}
        style={{ width: "100%", height: "100%" }}
      >
        {items.map((product, index) => {
          const imageUrl = product.images?.max?.[0] || "";
          const productId = product._id || product.id || index;

          return (
            <SwiperSlide key={productId}>
              <img
                src={imageUrl}
                alt={product.name || `Product ${index}`}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <div className={styles.overlay}>
                <NavLink
                  to={`/product/${productId}`}
                  className={styles.productLink}
                >
                  See product details
                </NavLink>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default ProductPreview;
