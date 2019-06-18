import React, { useContext, useState } from "react";
import { FormActions } from "../../hooks/useForm/formActions";
import { FormContext } from "../../hooks/useForm";

export default function Checkbox({ name, onChange, id, ...rest }) {
  const [dirty, setDirty] = useState(false);
  const { formEvent, errors, values } = useContext(FormContext);

  function handleChange(e) {
    formEvent(e.target.checked, name, FormActions.VALUE_CHANGED);
    setDirty(true);
    onChange(e);
  }

  return (
    <div
      className={`react__form ${
        errors[name]
          ? "react__form-checkbox--has-error"
          : dirty
          ? "react__form-checkbox--has-success"
          : ""
      }`}
    >
      <label className="react__form-checkbox--label" htmlFor={id} />
      <input
        type="checkbox"
        {...rest}
        className="react__form-checkbox--input"
        id={id}
        checked={values[name]}
        name={name}
        onChange={handleChange}
      />
      <span className="react__form-checkbox--error">{errors[name]}</span>
    </div>
  );
}

Checkbox.defaultProps = {
  onChange: () => {},
  onBlur: () => {}
};
