import React, { useState, useEffect } from "react";
import AppRoutes from "./Routes";
import NavBar from "./Components/NavBar/NavBar";
import NavBarMenu from "./Components/NavBar/NavBarMenu";
import Footer from "./Components/Footer/Footer";
import { isAuthenticated } from "./assets/javascripts/isAuth";
import { toJS } from "mobx";
import { observer } from "mobx-react";
import Loader from "./Components/Loader/Loader";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GOOGLE_CLIENT_ID } from "./config.js";

//STORES
import user from "../src/Stores/User";
import root from "../src/Store";

//STYLING
import "./Styles/CustomPresets.scss";
import "./Styles/global.scss";

function App() {
  const [authenticated, setAuthenticated] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function checkAuthentication() {
      try {
        const result = await isAuthenticated();
        setAuthenticated(result);
        setIsLoaded(true);

        user.fetchUser();
        root.fetchHome();
        user.fetchBalance();
      } catch (error) {
        console.error("Error checking authentication:", error);
        setIsLoaded(true);
      }
    }
    checkAuthentication();
  }, []);

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <NavBar authenticated={authenticated} />
      {authenticated && <NavBarMenu authenticated={authenticated} />}
      <AppRoutes authenticated={authenticated} />
      {isLoaded && root.showFooter && <Footer />}
    </GoogleOAuthProvider>
  );
}

export default observer(App);
