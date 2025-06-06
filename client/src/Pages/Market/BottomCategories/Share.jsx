import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import CustomButton from "../../../Components/Controls/Button/CustomButton";
import TextInput from "../../../Components/Input/Text/Text";

//Components
import Container from "../../../Components/Container/Container";

// Form Validation
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { loginSchema } from "../../../Components/Schemas/Validation";

// Stores
import store from "../../../Stores/User";

import formStyles from "../../../Styles/Modules/Form.module.scss";
import styles from "../styles.module.scss";

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

  //set the input default values
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
        className={styles.settingsAccountWrapper}
        loading={loading !== null ? loading : undefined}
        container={true}
      >
        <form
          style={{
            padding: "2rem",
          }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex-center">
            <img alt="Profile" className={styles.accountProfilePicture} />
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
