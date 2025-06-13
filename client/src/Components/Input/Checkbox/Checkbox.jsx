import React from "react";
import { useController } from "react-hook-form";

import styles from "./styles.module.scss";
import formStyles from "../../../Styles/Modules/Form.module.scss";

const Checkbox = ({ name, control, label }) => {
  const {
    field: { ref, value, onChange, ...inputProps },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <div className={formStyles.formControl}>
      <label className={formStyles.checkboxLabel}>
        <input
          {...inputProps}
          ref={ref}
          type="checkbox"
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
        />
        {label}
      </label>
      {error && (
        <p className={formStyles.inputValidationError}>{error.message}</p>
      )}
    </div>
  );
};

export default Checkbox;
