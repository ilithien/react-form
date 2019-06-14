import React, { useState } from "react";
import { FormContext, useForm } from "../hooks/useForm";
import { FormActions } from "../hooks/useForm/formActions";

export default function Form({
  onSubmit = () => {},
  onReset,
  onInvalidForm = () => {},
  validate: validateForm = () => ({}),
  children,
  initialValues,
  ...rest
}) {
  const { values, errors, formEvent, dispatch } = useForm({
    values: initialValues
  });

  const [validate, setValidate] = useState(false);

  function isFormValid() {
    return (
      Object.keys(validateForm(values)).length === 0 &&
      Object.keys(errors).length === 0
    );
  }

  function setFormValidationErrors() {
    dispatch({ type: FormActions.FORM_INVALID, payload: validateForm(values) });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setValidate(true);

    if (isFormValid()) {
      onSubmit(values);
    } else {
      setFormValidationErrors();
      onInvalidForm(values);
    }
  }

  return (
    <FormContext.Provider
      value={{ formEvent, values, errors: validate ? errors : [] }}
    >
      <form {...rest} onSubmit={handleSubmit} onReset={onReset}>
        {children}
      </form>
    </FormContext.Provider>
  );
}
