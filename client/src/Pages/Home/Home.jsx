import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { observer } from "mobx-react-lite";
import styles from "./styles.module.scss";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import Container from "../../Components/Container/Container";
import global from "../../Stores/Global";
//Components
import ProductPreview from "./Components/ProductPreview/ProductPreview";

import { FaSearch } from "react-icons/fa";
//Stores
import userStore from "../../Stores/User";
import marketStore from "../../Pages/Market/store";

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);
  const [selectedPage, setSelectedPage] = useState("");

  useEffect(() => {
    setSelectedPage(window.location.pathname);
  }, [window.location.pathname]);

  const balance = userStore.data ? userStore.data.balance : 0;
  const numericBalance = Number(balance);
  const [searchInput, setSearchInput] = useState(userStore.search.market);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      updateSearch();
    }
  };

  const updateSearch = () => {
    const params = new URLSearchParams(location.search);
    params.set("search", searchInput);
    navigate(`/market?${params.toString()}`);
    userStore.setSearch("market", searchInput);
    if (userStore.search.market) {
      marketStore.selectedCategory = null;
    }
  };
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <Container className={styles.appContainerSettings} fullHeight={true}>
        <section className={styles.hero}>
          <div className={styles.textBlock}>
            <h2>
              <span className={styles.faded}>Shopping</span> without limits
            </h2>
            <p>
              Discover limitless deals, trends, and essentials — all in one
              place. Shop smarter, live better.
            </p>
            <div className={styles.shopButtonWrapper}>
              <NavLink to={"/market"} className={styles.shopButton} end>
                START SHOPPING
              </NavLink>
              {/* <p className={styles.or}>or</p> */}
            </div>

            <li className={styles.search}>
              <div className={styles.searchInputWrapper}>
                <FaSearch className={styles.searchIcon} />
                <input
                  type="text"
                  placeholder=""
                  className={styles.searchInput}
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </div>
              <button className={styles.searchButton} onClick={updateSearch}>
                SEARCH PRODUCT
              </button>
            </li>
          </div>
          <ProductPreview items={global.recommendedItems} />
        </section>
      </Container>
    </>
  );
};

export default observer(Home);
