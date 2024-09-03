import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL, GOOGLE_CLIENT_ID } from "../../config";
import logo from "../../assets/images/logo.png";
import Coins from "../../assets/images/coins1.png";
import { toJS } from "mobx";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

import getMenuItems from "./MenuItems/getMenuItems";

import CustomMenu from "../Controls/Menu/Menu";

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
  const points = userStore.data.points;
  const numericPoints = Number(points);
  const formattedPoints = !numericPoints
    ? null
    : Number.isInteger(numericPoints)
    ? numericPoints
    : numericPoints.toFixed(2);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640); // 640px = 40rem
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
            <div className={styles.pointsNumber}>
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
                <div
                  className={`${styles.navMenuLink} ${
                    selectedPage.startsWith("/table") ||
                    selectedPage === "/register"
                      ? styles.selected
                      : null
                  }`}
                >
                  <NavLink to={authenticated ? "/table" : "/register"} end>
                    {authenticated ? "Table" : "Register"}
                  </NavLink>
                </div>

                {/* {authenticated ? (
                  <div
                    className={`${styles.navMenuLink} ${
                      selectedPage.startsWith("/plants")
                        ? styles.selected
                        : null
                    }`}
                  >
                    <NavLink to="/plants" end>
                      Plants
                    </NavLink>
                  </div>
                ) : null} */}

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
              <div className={`${styles.navMenuContainer} ${styles.points}`}>
                <div className={styles.pointsNumber}>
                  <p className={styles.captionText}>{formattedPoints}</p>
                  <img
                    className={styles.icon}
                    src={Coins}
                    onClick={() => {
                      navigate("/points");
                    }}
                  ></img>
                </div>
              </div>
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
                <CustomMenu items={menuItems} />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
});

export default NavBar;
