import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import { API_BASE_URL } from "../../config";
import { Helmet } from "react-helmet";
import { GoogleLogin } from "@react-oauth/google";

//stores
import global from "../../Stores/Global";

//Components
import Container from "../../Components/Container/Container";
import CustomButton from "../../Components/Controls/Button/CustomButton";
import TextInput from "../../Components/Input/Text/Text";
import VideoPreview from "../../Components/Video/VideoPreview";

//Form Validation
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../Components/Schemas/Validation";

//STYLING
import styles from "./styles.module.scss";
import formStyles from "../../Styles/Modules/Form.module.scss";

// MEDIA
import greenAbstractVideo from "../../assets/videos/green-abstract.mp4";
import orangeAbstractVideo from "../../assets/videos/orange-abstract.mp4";

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
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const onSubmit = async (formData) => {
    setLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/login`, formData, {
        withCredentials: true,
      });
      if (response.data.success) {
        navigate(`/`);
        window.location.reload();
      }
    } catch (error) {
      alert(error.response.data.message);
      setLoading(false);
    }
  };

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
    <div className={styles.background}>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <Container className={styles.appContainerAuth} fullHeight={true}>
        <form
          className={`${formStyles.formWrapper} ${styles.formWrapper}`}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className={styles.formCenter}>
            <div className={styles.logoWrapper}>
              <div className={styles.logoSmall} title={global.AppName}></div>
            </div>
            <div className={styles.formInputs}>
              <div className={styles.introText}>
                <h1>Welcome back!</h1>
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
                  type="email"
                  placeholder="email@email.com"
                />
              </div>
              <div className={formStyles.formControl}>
                <TextInput
                  name="password"
                  control={control}
                  type="password"
                  placeholder="********"
                />
              </div>
              <CustomButton
                text={"Login"}
                type="submit"
                style={{ paddingTop: "30px", justifyContent: "center" }}
                disabled={loading}
              ></CustomButton>
            </div>
            <div className={styles.altSignInBlock}>
              <div className={styles.line}></div>
              <div className={styles.altSignInText}>Or sign-in with</div>
              <div className={styles.line}></div>
            </div>
            <div className={styles.googleContainerAuth}>
              <GoogleLogin
                onSuccess={handleGoogleLoginSuccess}
                onError={() => {
                  setErrorMessage("Google Sign-In failed");
                }}
              />
            </div>
          </div>
          {!isMobile && (
            <div className={styles.logoSpan}>
              <VideoPreview src={orangeAbstractVideo} />
            </div>
          )}
        </form>
      </Container>
    </div>
  );
};

export default Login;
