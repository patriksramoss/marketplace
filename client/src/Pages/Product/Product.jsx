import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { observer } from "mobx-react-lite";
import styles from "./styles.module.scss";
import Container from "../../Components/Container/Container";
//Components
import ItemPreview from "../../Components/Swiper/ItemPreview/ItemPreview";
import { useParams, useNavigate } from "react-router";
//Stores
import marketStore from "../../Stores/Market";
import userStore from "../../Stores/User";
//Icons
import { FaLongArrowAltLeft } from "react-icons/fa";

const Product = () => {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const product = marketStore.product;

  useEffect(() => {
    marketStore.getProduct(itemId);
  }, [itemId]);

  return (
    <>
      <Helmet>
        <title>Product</title>
      </Helmet>
      <Container className={styles.appContainerSettings} fullHeight={true}>
        <div className={styles.backArrowWrapper}>
          <div className={styles.backButton} onClick={() => navigate(-1)}>
            <FaLongArrowAltLeft /> Back
          </div>
        </div>
        <section className={styles.hero}>
          <div className={styles.textBlock}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <h2>{product.price}</h2>
            <p>{userStore.data.currency}</p>
            <div className={styles.shopButtonWrapper}></div>
          </div>

          <ItemPreview item={marketStore.product} />
        </section>
      </Container>
    </>
  );
};

export default observer(Product);
