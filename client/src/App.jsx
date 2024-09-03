import React, { useState, useEffect } from "react";
import AppRoutes from "./Routes";
import NavBar from "./Components/NavBar/NavBar";
import Footer from "./Components/Footer/Footer";
import { isAuthenticated } from "./assets/javascripts/isAuth";
import { toJS } from "mobx";
import { observer } from "mobx-react";
import Loader from "./Components/Loader/Loader";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GOOGLE_CLIENT_ID } from "./config.js";
// import luxy from "luxy.js";

//STORES
import user from "../src/Stores/User";
import packs from "../src/Stores/Packs";
import rootStore from "../src/Store";

//SCRIPTS
// import BackgroundAnimation from "./assets/javascripts/backgroundScript.js";
// import { Gradient } from "./assets/javascripts/backgroundGradient.js";

// import "./assets/javascripts/smoothscroll";

//STYLING
import "./Styles/CustomPresets.scss";
import "./Styles/global.scss";

function App() {
  const [authenticated, setAuthenticated] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const canvasContainerRef = React.useRef(null);

  useEffect(() => {
    async function checkAuthentication() {
      try {
        const result = await isAuthenticated();
        setAuthenticated(result);
        setIsLoaded(true);
      } catch (error) {
        console.error("Error checking authentication:", error);
        setIsLoaded(true);
      }
    }
    checkAuthentication();
  }, []);

  if (authenticated) {
    user.fetchUser();
  }

  packs.fetchPOTD();
  rootStore.fetchHome();

  //SMOOTH SCROLL JAUNAIS

  // useEffect(() => {
  //     luxy.init({
  //       wrapperSpeed: 0.1,
  //       wrapper: "#luxy",
  //       targets: ".luxy-el",
  //     });
  // }, []);

  //VECAIS FONA ANIIMACIJA

  // useEffect(() => {
  //   console.log("Creating BackgroundAnimation instance");
  //   const animation = new BackgroundAnimation(canvasContainerRef.current);
  //   return () => {
  //     console.log("Destroying BackgroundAnimation instance");
  //     animation && animation.destroy && animation.destroy();
  //   };
  // }, []);

  //JAUNA  FONA ANIIMACIJA

  // var gradient = new Gradient();
  // gradient.initGradient("#gradient-canvas");

  return (
    <div ref={canvasContainerRef} id="luxy">
      {/* SIS VAJADZIGS JAUNAJAM GRADIENT FONA ANIMACIJAI */}
      {/* <div className="flex-center">
        <canvas id="gradient-canvas"> </canvas>
      </div> */}

      {/* {rootStore.loading && <Loader />} */}
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <NavBar authenticated={authenticated} />
      </GoogleOAuthProvider>
      {/* <CornerBox /> */}
      <AppRoutes authenticated={authenticated} />
      {isLoaded && rootStore.showFooter && <Footer />}
    </div>
  );
}

export default observer(App);
