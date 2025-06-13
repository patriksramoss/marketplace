import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { observer } from "mobx-react-lite";
import styles from "./styles.module.scss";
import Container from "../../Components/Container/Container";
import loader from "../../assets/images/load.svg";
//Components
import ItemPreview from "../../Components/Swiper/ItemPreview/ItemPreview";
import { useParams, useNavigate } from "react-router";
//Stores
import marketStore from "../../Stores/Market";
import userStore from "../../Stores/User";
//Icons
import { FaLongArrowAltLeft } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";

const Product = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [loadingItem, setLoadingItem] = useState();
  const { itemId } = useParams();
  const navigate = useNavigate();
  const product = marketStore.product;

  const isLoading = loadingItem || false;

  useEffect(() => {
    marketStore.getProduct(itemId);
  }, [itemId]);

  const isMobileScreen = () => window.innerWidth < 768;

  useEffect(() => {
    const handleResize = () => setIsMobile(isMobileScreen());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleAddToCart = async (itemId) => {
    try {
      userStore.setLoading("cart", true);
      const quantity = 1;
      await marketStore.addToCart(itemId, quantity);
      userStore.getCart();
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      userStore.setLoading("cart", false);
    }
  };

  const textBlock = (
    <>
      <div className={styles.textBlock}>
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <h2>{product.price}</h2>
        <p>{userStore.data.currency}</p>
        <div className={styles.shopButtonWrapper}></div>
        <div
          className={`${styles.addToCart} ${
            isLoading ? styles.addToCartLoading : ""
          }`}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            if (!isLoading) {
              setLoadingItem(() => true);
              handleAddToCart(product._id).finally(() => {
                setLoadingItem(() => false);
              });
            }
          }}
        >
          {isLoading ? (
            <img className={styles.loader} src={loader} />
          ) : (
            <>
              <IoMdCart /> Add to cart
            </>
          )}
        </div>
      </div>
    </>
  );

  return (
    <>
      <Helmet>
        <title>Product</title>
      </Helmet>
      <Container className={styles.appContainerSettings} fullHeight={true}>
        <div className={styles.backArrowWrapper}>
          <div className={styles.backButton} onClick={() => navigate(-1)}>
            <FaLongArrowAltLeft />
          </div>
        </div>

        <section className={styles.hero}>
          {isMobile ? (
            <>
              <ItemPreview item={marketStore.product} />
              {textBlock}
            </>
          ) : (
            <>
              {textBlock}
              <ItemPreview item={marketStore.product} />
            </>
          )}
        </section>
      </Container>
    </>
  );
};

export default observer(Product);
