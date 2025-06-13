import React from "react";
import { useController } from "react-hook-form";

import styles from "./styles.module.scss";
import formStyles from "../../../Styles/Modules/Form.module.scss";

const SelectInput = ({ name, control, label, options }) => {
  const {
    field: { ref, value, ...selectProps },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <div className={formStyles.formControl}>
      <label htmlFor={name}>{label}</label>
      <select {...selectProps} ref={ref} id={name} value={value}>
        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      {error && (
        <p className={formStyles.inputValidationError}>{error.message}</p>
      )}
    </div>
  );
};

export default SelectInput;
