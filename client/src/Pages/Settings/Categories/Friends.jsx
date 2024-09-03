import React, { useState } from "react";

//Components
import Container from "../../../Components/Container/Container";

//Styling
import styles from "../styles.module.scss";

const Friends = () => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(null);

  return (
    <>
      <Container
        className={styles.settingsAccountWrapper}
        loading={loading !== null ? loading : undefined}
        container={false}
      ></Container>
    </>
  );
};

export default Friends;
