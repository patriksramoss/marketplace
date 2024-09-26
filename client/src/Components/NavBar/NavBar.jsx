import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Coins from "../../assets/images/coins1.png";
import logo from "../../assets/images/logo.png";
import { API_BASE_URL } from "../../config";
import { toJS } from "mobx";
import { Link } from "react-router-dom";
import Cart from "../Cart/Cart";
import getMenuItems from "./MenuItems/getMenuItems";
import CustomMenu from "../Controls/Menu/Menu";
//icons
import { DollarOutlined } from "@ant-design/icons";
//styling
import styles from "./styles.module.scss";
//Stores
import userStore from "../../Stores/User";

const NavBar = observer(({ authenticated }) => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [selectedPage, setSelectedPage] = useState("");

  useEffect(() => {
    setSelectedPage(window.location.pathname);
  }, [window.location.pathname]);

  const menuItems = getMenuItems(authenticated);
  const balance = userStore.data ? userStore.data.balance : 0;
  const numericBalance = Number(balance);

  const formattedBalance = !numericBalance
    ? "0.00"
    : Number.isInteger(numericBalance)
    ? numericBalance
    : numericBalance.toFixed(2);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1045); // 640px = 40rem
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/auth/google/register`,
        { token: credentialResponse.credential },
        { withCredentials: true }
      );
      if (response.data.success) {
        navigate(`/`);
        window.location.reload();
      } else {
        setErrorMessage(response.data.message);
        alert(response.data.message);
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Google sign-in failed");
      alert(errorMessage);
    }
  };

  return (
    <>
      {authenticated !== null && (
        <div className={styles.navWrapper}>
          <div className={styles.navLeftContainer}>
            <div className={styles.balanceNumber}>
              <img
                className={styles.logoIcon}
                src={logo}
                onClick={() => {
                  navigate("/");
                }}
              ></img>
            </div>
          </div>
          <div className={styles.navContainer}>
            <div className={styles.nav}>
              <div className={styles.navMenu}>
                {!authenticated ? (
                  <div
                    className={`${styles.navMenuLink} ${
                      selectedPage.startsWith("/register") ||
                      selectedPage === "/register"
                        ? styles.selected
                        : null
                    }`}
                  >
                    <NavLink to={"/register"} end>
                      Register
                    </NavLink>
                  </div>
                ) : (
                  <div
                    className={`${styles.navMenuLink} ${
                      selectedPage === "/" ? styles.selected : null
                    }`}
                  >
                    <NavLink to={"/"} end>
                      Home
                    </NavLink>
                  </div>
                )}
                <div
                  className={`${styles.navMenuLink} ${
                    selectedPage.startsWith("/market") ||
                    selectedPage === "/login"
                      ? styles.selected
                      : null
                  }`}
                >
                  <NavLink to={authenticated ? "/market" : "/login"} end>
                    {authenticated ? "Market" : "Login"}
                  </NavLink>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.navRightContainer}>
            {authenticated && (
              <>
                <div className={`${styles.navMenuContainer} ${styles.balance}`}>
                  <div className={styles.balanceNumber}>
                    <div className={styles.captionText}>
                      <div className={styles.captionTextTitle}>
                        {"Balance: "}
                      </div>
                      {formattedBalance}
                      <div className={styles.captionTextCurrency}>
                        {userStore.data.currency}
                      </div>
                    </div>
                    <div className={styles.balanceIcon}></div>
                  </div>
                </div>
                <Cart />
              </>
            )}
            {!authenticated && (
              <div className={styles.navMenuContainerAuth}>
                <GoogleLogin
                  onSuccess={handleGoogleLoginSuccess}
                  onError={() => {
                    setErrorMessage("Google Sign-In failed");
                  }}
                />
              </div>
            )}
            {!authenticated && !isMobile ? null : (
              <div className={styles.navMenuContainer}>
                <CustomMenu items={menuItems} authenticated={authenticated} />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
});

export default NavBar;
