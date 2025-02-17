import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import { API_BASE_URL } from "../../config";
import { Helmet } from "react-helmet";

//Components
import Container from "../../Components/Container/Container";
import CustomButton from "../../Components/Controls/Button/CustomButton";
import TextInput from "../../Components/Input/Text/Text";
import VideoElement from "../../Components/Video/VideoElement";

//Form Validation
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../Components/Schemas/Validation";

//STYLING
import styles from "./styles.module.scss";
import formStyles from "../../Styles/Modules/Form.module.scss";

// MEDIA
import greenAbstractVideo from "../../assets/videos/green-abstract.mp4";

const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [loading, setLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    setLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/login`, formData, {
        withCredentials: true,
      });
      if (response.data.success) {
        navigate(`/`);
        window.location.reload();
        console.log("Login successful");
      }
    } catch (error) {
      alert(error.response.data.message);
      setLoading(false);
    }
  };

  const videoOptions = {
    autoplay: true,
    controls: false,
    responsive: false,
    mute: true,
    fluid: false,
    loop: true,
    sources: [
      {
        src: greenAbstractVideo,
        type: "video/mp4",
      },
    ],
  };

  // Callback function when the player is ready
  const handlePlayerReady = (player) => {
    console.log("Player is ready!", player);

    // Example: Listen for a play event
    player.on("play", () => {
      console.log("Video is playing");
    });

    // Example: Listen for a pause event
    player.on("pause", () => {
      console.log("Video is paused");
    });
  };

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <Container className={styles.appContainerAuth} fullHeight={true}>
        <form
          className={`${formStyles.formWrapper} ${styles.formWrapper}`}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className={styles.formCenter}>
            <div className={styles.logoSmall}></div>
            <div className={styles.formInputs}>
              <div className={styles.introText}>
                <h1>Welcome!</h1>
                <p>
                  Don't have an account?{" "}
                  <NavLink to={"/register"} className={styles.link} end>
                    Register
                  </NavLink>
                </p>
              </div>
              <div className={formStyles.formControl}>
                <TextInput
                  name="email"
                  control={control}
                  label="Email"
                  type="email"
                  placeholder="email@email.com"
                />
              </div>
              <div className={formStyles.formControl}>
                <TextInput
                  name="password"
                  control={control}
                  label="Password"
                  type="password"
                  placeholder="********"
                />
              </div>
              <CustomButton
                text={"Login"}
                type="submit"
                disabled={loading}
              ></CustomButton>
            </div>
          </div>
          <div className={styles.logoSpan}>
            <VideoElement options={videoOptions} onReady={handlePlayerReady} />
          </div>
        </form>
      </Container>
    </>
  );
};

export default Login;
