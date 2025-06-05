import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import { API_BASE_URL, GOOGLE_CLIENT_ID } from "../../config";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../../Components/Schemas/Validation";
import styles from "./styles.module.scss";
import formStyles from "../../Styles/Modules/Form.module.scss";
import { GoogleLogin } from "@react-oauth/google";

//Components
import Container from "../../Components/Container/Container";
import CustomButton from "../../Components/Controls/Button/CustomButton";
import TextInput from "../../Components/Input/Text/Text";
import VideoPreview from "../../Components/Video/VideoPreview";

// MEDIA
import greenAbstractVideo from "../../assets/videos/green-abstract.mp4";
import orangeAbstractVideo from "../../assets/videos/orange-abstract.mp4";

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
        <title>Register</title>
      </Helmet>
      <Container className={styles.appContainerAuth} fullHeight={true}>
        <form
          className={`${formStyles.formWrapper} ${styles.formWrapperRegister}`}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className={styles.formCenter}>
            <div className={styles.formInputs}>
              <div className={styles.introText}>
                <h1>Create an account</h1>
                <p>
                  Already have an account?{" "}
                  <NavLink to={"/login"} className={styles.link} end>
                    Login
                  </NavLink>
                </p>
              </div>
              <div className={formStyles.formControl}>
                <TextInput
                  name="username"
                  control={control}
                  type="text"
                  placeholder="Username"
                />
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
                  placeholder="Password"
                />
              </div>
              <div className={formStyles.formControl}>
                <TextInput
                  name="passConfirm"
                  control={control}
                  type="password"
                  placeholder="Confirm password"
                />
              </div>
              <CustomButton
                text="Register"
                type="submit"
                disabled={loading}
                style={{ paddingTop: "30px", justifyContent: "center" }}
              />
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
            <div className={styles.logoSpanRegister}>
              <VideoPreview src={orangeAbstractVideo} />
            </div>
          )}
        </form>
      </Container>
    </div>
  );
};

export default Register;
