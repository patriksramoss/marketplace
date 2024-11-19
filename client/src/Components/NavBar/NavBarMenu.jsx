import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import getMenuItems from "./MenuItems/getMenuItems";

import { FaSearch } from "react-icons/fa";

//styling
import styles from "./styles.module.scss";
//Stores
import userStore from "../../Stores/User";

const NavBarMenu = observer(({ authenticated }) => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [selectedPage, setSelectedPage] = useState("");

  useEffect(() => {
    setSelectedPage(window.location.pathname);
  }, [window.location.pathname]);

  const menuItems = getMenuItems(authenticated);
  const balance = userStore.data ? userStore.data.balance : 0;
  const numericBalance = Number(balance);

  return (
    <div className={styles.navBarMenu}>
      <nav className={styles.searchWrapper}>
        <ul>
          <li className={styles.search}>
            <div className={styles.searchInput}>
              <FaSearch className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search"
                className={styles.searchInput}
                value={userStore.search.market}
                onChange={(e) => {
                  userStore.setSearch("market", e.target.value);
                  if (userStore.search.market) {
                    store.selectedCategory = null;
                  }
                  if (userStore.search.market === "") {
                    store.selectedCategory = null;
                  }
                  handleSearch(e.target.value.toLowerCase());
                }}
              />
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
});

export default NavBarMenu;
