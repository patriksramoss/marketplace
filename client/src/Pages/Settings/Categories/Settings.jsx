import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";

// Components
import Container from "../../../Components/Container/Container";
import CustomButton from "../../../Components/Controls/Button/CustomButton";
import TextInput from "../../../Components/Input/Text/Text";
import SelectInput from "../../../Components/Input/Select/Select";
import Checkbox from "../../../Components/Input/Checkbox/Checkbox";

// Form Validation
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Stores
import store from "../../../Stores/User";

import styles from "../styles.module.scss";
import formStyles from "../../../Styles/Modules/Form.module.scss";

// Validation Schema
const settingsSchema = yup.object().shape({
  storeName: yup.string().required("Store name is required"),
  storeDescription: yup.string().max(200, "Max 200 characters"),
  contactEmail: yup
    .string()
    .email("Invalid email")
    .required("Email is required"),
  currency: yup.string().required("Currency is required"),
  itemsPerPage: yup.number().min(1).max(100).required("Required"),
  maintenanceMode: yup.boolean(),
  defaultLanguage: yup.string().required(),
  supportPhone: yup.string().required("Support number is required"),
});

const Settings = observer(() => {
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(null);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(settingsSchema),
    defaultValues: {
      storeName: "My Webshop",
      storeDescription: "",
      contactEmail: "",
      currency: "USD",
      itemsPerPage: 12,
      maintenanceMode: false,
      defaultLanguage: "en",
      supportPhone: "",
    },
  });

  const onSubmit = (data) => {
    setLoading(true);
    console.log("Saving settings:", data);
    setTimeout(() => {
      setLoading(false);
      alert("Settings saved!");
    }, 1000);
  };

  return (
    <Container
      className={styles.container}
      loading={loading !== null ? loading : undefined}
      container={true}
    >
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={formStyles.formControl}>
          <TextInput
            name="storeName"
            control={control}
            type="text"
            label="Store Name"
            placeholder="Your webshop name"
          />
        </div>

        <div className={formStyles.formControl}>
          <TextInput
            name="storeDescription"
            control={control}
            type="text"
            label="Store Description"
            placeholder="A short description"
          />
        </div>

        <div className={formStyles.formControl}>
          <TextInput
            name="contactEmail"
            control={control}
            type="email"
            label="Contact Email"
            placeholder="support@example.com"
          />
        </div>

        <div className={formStyles.formControl}>
          <SelectInput
            name="currency"
            control={control}
            label="Currency"
            options={[
              { value: "USD", label: "USD ($)" },
              { value: "EUR", label: "EUR (€)" },
              { value: "GBP", label: "GBP (£)" },
            ]}
          />
        </div>

        <div className={formStyles.formControl}>
          <TextInput
            name="itemsPerPage"
            control={control}
            type="number"
            label="Items Per Page"
            placeholder="e.g., 12"
          />
        </div>

        <div className={formStyles.formControl}>
          <Checkbox
            name="maintenanceMode"
            control={control}
            label="Enable Maintenance Mode"
          />
        </div>

        <div className={formStyles.formControl}>
          <SelectInput
            name="defaultLanguage"
            control={control}
            label="Default Language"
            options={[
              { value: "en", label: "English" },
              { value: "fr", label: "French" },
              { value: "de", label: "German" },
            ]}
          />
        </div>

        <div className={formStyles.formControl}>
          <TextInput
            name="supportPhone"
            control={control}
            type="text"
            label="Support Phone"
            placeholder="+1 234 567 890"
          />
        </div>

        <CustomButton text={loading ? "Saving..." : "Save Settings"} />
      </form>
    </Container>
  );
});

export default Settings;
