import React, { useRef, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import styles from "./styles.module.scss";

//Components
import Container from "../../Components/Container/Container";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <Container
        className={styles.appContainerSettings}
        fullHeight={true}
      ></Container>
    </>
  );
};

export default Home;
