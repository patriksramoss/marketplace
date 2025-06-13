import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";

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

// Components
import SelectInput from "../../../Components/Input/Select/Select";
import Checkbox from "../../../Components/Input/Checkbox/Checkbox";
import TextInput from "../../../Components/Input/Text/Text";
import CustomButton from "../../../Components/Controls/Button/CustomButton";

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
      username: "",
      displayName: "",
      email: "",
      bio: "",
      newsletter: false,
      currency: "USD",
    },
  });

  useEffect(() => {
    if (store.data.email) {
      setValue("username", store.data.username || "user123");
      setValue("displayName", store.data.displayName || "John Doe");
      setValue("email", store.data.email || "");
      setValue("bio", store.data.bio || "");
      setValue("newsletter", store.data.newsletter || false);
      setValue("currency", store.data.currency || "USD");
      setLoading(false);
    }
  }, [store.data, setValue]);

  const onSubmit = async (formData) => {
    setLoading(true);
    try {
      console.log("Form Submitted", formData);
      // Simulate save logic
      setTimeout(() => {
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error("Error saving:", error);
      setErrorMessage("An error occurred");
      setLoading(false);
    }
  };

  const currencyOptions = [
    { value: "USD", label: "USD - $ US Dollar" },
    { value: "EUR", label: "EUR - € Euro" },
    { value: "GBP", label: "GBP - £ British Pound" },
    { value: "JPY", label: "JPY - ¥ Japanese Yen" },
  ];

  return (
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

        <TextInput
          name="username"
          control={control}
          type="text"
          label="Username"
          placeholder="e.g. user123"
        />

        <TextInput
          name="displayName"
          control={control}
          type="text"
          label="Display Name"
          placeholder="e.g. John Doe"
        />

        <TextInput
          name="email"
          control={control}
          type="email"
          label="Email"
          placeholder="you@example.com"
        />

        <TextInput
          name="bio"
          control={control}
          type="text"
          label="Bio"
          placeholder="Tell us about yourself"
        />

        <SelectInput
          name="currency"
          control={control}
          label="Preferred Currency"
          options={currencyOptions}
        />

        <Checkbox
          name="newsletter"
          control={control}
          label="Subscribe to newsletter"
        />

        {errorMessage && (
          <p className={formStyles.inputValidationError}>{errorMessage}</p>
        )}

        <CustomButton text="Save" />
      </form>
    </Container>
  );
});

export default Account;
