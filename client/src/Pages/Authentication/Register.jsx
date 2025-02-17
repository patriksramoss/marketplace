import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL, GOOGLE_CLIENT_ID } from "../../config";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../../Components/Schemas/Validation";
import styles from "./styles.module.scss";
import formStyles from "../../Styles/Modules/Form.module.scss";

//Components
import Container from "../../Components/Container/Container";
import CustomButton from "../../Components/Controls/Button/CustomButton";
import TextInput from "../../Components/Input/Text/Text";
import VideoElement from "../../Components/Video/VideoElement";

// MEDIA
import greenAbstractVideo from "../../assets/videos/green-abstract.mp4";

const Register = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      passConfirm: "",
      username: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/register`,
        formData,
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
      setErrorMessage(error.response?.data?.message || "Registration failed");
      alert(errorMessage);
    } finally {
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
        <title>Register</title>
      </Helmet>
      <Container className={styles.appContainerAuth} fullHeight={true}>
        <form
          className={formStyles.formWrapper}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className={styles.formInputs}>
            <div className={formStyles.formControl}>
              <TextInput
                name="username"
                control={control}
                label="Username"
                type="text"
                placeholder="Username"
              />
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
            <div className={formStyles.formControl}>
              <TextInput
                name="passConfirm"
                control={control}
                label="Confirm Password"
                type="password"
                placeholder="********"
              />
            </div>
            <CustomButton text="Register" type="submit" disabled={loading} />
          </div>
          <div className={styles.logoSpan}>
            <VideoElement options={videoOptions} onReady={handlePlayerReady} />
          </div>
        </form>
      </Container>
    </>
  );
};

export default Register;
