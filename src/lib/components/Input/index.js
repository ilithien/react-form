import React, { useContext, useState } from "react";
import { FormActions } from "../../hooks/useForm/formActions";
import { FormContext } from "../../hooks/useForm";
import { controlPropTypes } from "../../propTypes";

export default function Input({ name, validate, onChange, onBlur, ...rest }) {
  const [dirty, setDirty] = useState(false);
  const { formEvent, errors, values } = useContext(FormContext);

  function handleChange(e) {
    formEvent(e.target.value, name, FormActions.VALUE_CHANGED);
    setDirty(true);
    onChange(e);
  }

  function handleBlur(e) {
    const error = validate(e.target.value);

    formEvent(
      error,
      name,
      error ? FormActions.FIELD_ERROR : FormActions.FIELD_CORRECT
    );
    onBlur(e);
  }
  return (
    <div
      className={`react__form ${
        errors[name]
          ? "react__form-input--has-error"
          : dirty
          ? "react__form-input--has-success"
          : ""
      }`}
    >
      <input
        {...rest}
        value={values[name]}
        name={name}
        onBlur={handleBlur}
        onChange={handleChange}
      />
      <span className="react__form-input--error">{errors[name]}</span>
    </div>
  );
}

Input.defaultProps = {
  onChange: () => {},
  onBlur: () => {},
  validate: () => null
};

Input.propTypes = {
  ...controlPropTypes
};
