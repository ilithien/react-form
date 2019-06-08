import React from "react";
import { FormActions } from "../../hooks/formActions";
import { controlPropTypes } from "../propTypes";

export default function TextInput({
  onChange,
  onBlur,
  name,
  validate,
  errorMessage,
  formEvent,
  ...rest
}) {
  function changeHandler(e) {
    const value = e.target.value;

    formEvent(value, name, FormActions.VALUE_CHANGED);
    onChange(e);
  }

  function handleBlur(e) {
    const value = e.target.value;
    const error = validate(value);

    const action = error ? FormActions.FIELD_ERROR : FormActions.FIELD_CORRECT;
    formEvent(error, name, action);
    onBlur(e);
  }

  return (
    <div className="form-field">
      <input
        {...rest}
        name={name}
        onBlur={handleBlur}
        onChange={changeHandler}
      />
      <span className="error">{errorMessage}</span>
    </div>
  );
}

TextInput.propTypes = {
  ...controlPropTypes
};

TextInput.defaultProps = {
  onChange: () => true,
  onBlur: () => true,
  onFocus: () => true,
  validate: () => ""
};
