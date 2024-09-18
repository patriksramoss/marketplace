import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../config";
import { Helmet } from "react-helmet";

//Components
import Container from "../../Components/Container/Container";
import CustomButton from "../../Components/Controls/Button/CustomButton";
import TextInput from "../../Components/Input/Text/Text";

//Form Validation
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../Components/Schemas/Validation";

//STYLING
import styles from "./styles.module.scss";
import formStyles from "../../Styles/Modules/Form.module.scss";

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

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <Container className={styles.appContainerAuth} fullHeight={true}>
        <div className={`${formStyles.formWrapper} ${styles.formWrapper}`}>
          <h2 className={styles.title}>Login</h2>
        </div>
        <form
          className={formStyles.formWrapper}
          style={{
            borderRadius: "0px 0px 20px 20px",
          }}
          onSubmit={handleSubmit(onSubmit)}
        >
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
        </form>
      </Container>
    </>
  );
};

export default Login;
