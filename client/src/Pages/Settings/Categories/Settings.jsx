import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";

//Components
import Container from "../../../Components/Container/Container";
import CustomButton from "../../../Components/Controls/Button/CustomButton";
import TextInput from "../../../Components/Input/Text/Text";

// Form Validation
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../../Components/Schemas/Validation";

// Stores
import store from "../../../Stores/User";

import styles from "../styles.module.scss";
import formStyles from "../../../Styles/Modules/Form.module.scss";

const Settings = observer(() => {
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

  return (
    <>
      <Container
        className={styles.container}
        loading={loading !== null ? loading : undefined}
        container={true}
      >
        <form
          className={styles.form}
          onSubmit={() => {
            console.log("SUBMITTED");
          }}
        >
          <div className={formStyles.formControl}>
            <TextInput
              name="setting1"
              control={control}
              type="text"
              label="Setting 1"
              placeholder="---"
            />
          </div>
          <div className={formStyles.formControl}>
            <TextInput
              name="setting2"
              control={control}
              type="text"
              label="Setting 2"
              placeholder="---"
            />
          </div>
          <div className={formStyles.formControl}>
            <TextInput
              name="setting3"
              control={control}
              type="text"
              label="Setting 3"
              placeholder="---"
            />
          </div>
          <div className={formStyles.formControl}>
            <TextInput
              name="setting4"
              control={control}
              type="text"
              label="Setting 4"
              placeholder="---"
            />
          </div>
          <CustomButton text="Save" />
        </form>
      </Container>
    </>
  );
});

export default Settings;
