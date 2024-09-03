import React from "react";
import { useController } from "react-hook-form";

import styles from "./styles.module.scss";
import formStyles from "../../../Styles/Modules/Form.module.scss";

const TextInput = ({ name, control, label, type, placeholder }) => {
  const {
    field: { ref, value, ...inputProps },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });

  let inputType = "text";
  switch (type) {
    case "email":
      inputType = "email";
      break;
    case "password":
      inputType = "password";
      break;
    default:
      inputType = "text";
      break;
  }

  return (
    <div className={formStyles.formControl}>
      <label htmlFor={name}>{label}</label>
      <input
        {...inputProps}
        ref={ref}
        id={name}
        type={inputType}
        placeholder={placeholder}
        value={value}
      />
      {error && (
        <p className={formStyles.inputValidationError}>{error?.message}</p>
      )}
    </div>
  );
};

export default TextInput;
