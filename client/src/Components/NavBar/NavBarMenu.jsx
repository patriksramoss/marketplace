import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import getMenuItems from "./MenuItems/getMenuItems";
import { FaSearch } from "react-icons/fa";
//styling
import styles from "./styles.module.scss";
//Stores
import userStore from "../../Stores/User";
import marketStore from "../../Pages/Market/store";

import Loader from "../../Components/Loader/Loader";

const NavBarMenu = observer(({ authenticated }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);
  const [selectedPage, setSelectedPage] = useState("");

  useEffect(() => {
    setSelectedPage(window.location.pathname);
  }, [window.location.pathname]);

  const menuItems = getMenuItems(authenticated);
  const balance = userStore.data ? userStore.data.balance : 0;
  const numericBalance = Number(balance);
  const [searchInput, setSearchInput] = useState(userStore.search.market); // Local state for search input

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      updateSearch();
    }
  };

  const updateSearch = () => {
    console.log("searchInput", searchInput);

    const params = new URLSearchParams(location.search);
    params.set("search", searchInput); // Update query parameter

    // Navigate with the updated URL including the query parameter
    navigate(`/market?${params.toString()}`);

    // Update the store
    userStore.setSearch("market", searchInput);

    // Clear the selected category if the search field is updated
    if (userStore.search.market) {
      marketStore.selectedCategory = null;
    }
  };
  return (
    <div className={styles.navBarMenu}>
      <nav className={styles.searchWrapper}>
        <ul>
          <li className={styles.search}>
            <div className={styles.searchInputWrapper}>
              <FaSearch className={styles.searchIcon} />
              <input
                type="text"
                placeholder=""
                className={styles.searchInput}
                value={searchInput} // Bind input to local state
                onChange={(e) => setSearchInput(e.target.value)} // Update local state on input change
                onKeyDown={handleKeyDown} // Trigger search on Enter key press
              />
            </div>
            <button
              className={styles.searchButton}
              onClick={updateSearch} // Trigger search on button click
            >
              SEARCH
            </button>
            {marketStore.loading && (
              <Loader
                loader
                contained={false}
                style={{
                  left: "160px",
                  transform: "scale(0.6)",
                }}
              />
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
});
export default NavBarMenu;
