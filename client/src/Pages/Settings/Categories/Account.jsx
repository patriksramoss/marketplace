import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import TextInput from "../../../Components/Input/Text/Text";
import CustomButton from "../../../Components/Controls/Button/CustomButton";

//Components
import Container from "../../../Components/Container/Container";

// Form Validation
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../../Components/Schemas/Validation";

// Stores
import store from "../../../Stores/User";

import styles from "../styles.module.scss";
import formStyles from "../../../Styles/Modules/Form.module.scss";

const Account = observer(() => {
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(null);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      bio: "",
    },
  });

  useEffect(() => {
    if (store.data.email) {
      setValue("email", String(store.data.email));
      setLoading(false);
    }
  }, [store.data.email, setValue]);

  const onSubmit = async (formData) => {
    setLoading(true);
    try {
      setLoading(false);
    } catch (error) {
      console.error("Login error:", formData);
      setErrorMessage("An error occurred");
      setLoading(false);
    }
  };

  return (
    <>
      <Container
        className={styles.container}
        loading={loading !== null ? loading : undefined}
        container={true}
      >
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className="flex-center">
            <img
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
              alt="Profile"
              className={styles.accountProfilePicture}
            />
          </div>

          <div className={formStyles.formControl}>
            <TextInput
              name="email"
              control={control}
              type="email"
              label="Email"
              placeholder="Email"
            />
          </div>
          <div className={formStyles.formControl}>
            <TextInput
              name="bio"
              control={control}
              type="text"
              label="Bio"
              placeholder="Bio"
            />
          </div>
          <CustomButton text="Save" />
        </form>
      </Container>
    </>
  );
});

export default Account;
