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

  return (
    <>
      <Helmet>
        <title>Register</title>
      </Helmet>
      <Container className={styles.appContainerAuth} fullHeight={true}>
        <div className={`${formStyles.formWrapper} ${styles.formWrapper}`}>
          <h2 className={styles.title}>Register</h2>
        </div>
        <form
          className={formStyles.formWrapper}
          style={{ borderRadius: "0px 0px 20px 20px" }}
          onSubmit={handleSubmit(onSubmit)}
        >
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
        </form>
      </Container>
    </>
  );
};

export default Register;
