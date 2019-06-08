import { useState, useReducer } from "react";
import { FormActions } from "./formActions";

export default function useForm({
  values: initialValues,
  onSubmit = () => true,
  onInvalidForm = () => true
}) {
  const [pristine, setPristine] = useState(true);
  const [state, dispatch] = useReducer(formReducer, {
    values: initialValues,
    errors: []
  });

  function handleFormEvent(value, name, type) {
    dispatch({ type, payload: { value, name } });
  }

  function isValidForm() {
    return getInvalidFields().length === 0;
  }

  function getInvalidFields() {
    return Object.keys(state.errors).filter(field => state.errors[field]);
  }

  function submit() {
    setPristine(false);
    if (isValidForm()) {
      onSubmit(state.values);
    } else {
      onInvalidForm(state.errors, state.values);
    }
  }

  return {
    ...state,
    handleFormEvent,
    submit,
    errors: pristine ? [] : state.errors
  };
}

function formReducer(state, { type, payload }) {
  switch (type) {
    case FormActions.VALUE_CHANGED: {
      return {
        ...state,
        values: {
          ...state.values,
          [payload.name]: payload.value
        }
      };
    }
    case FormActions.FIELD_CORRECT:
      return {
        ...state,
        errors: {
          ...state.errors,
          [payload.name]: payload.value
        }
      };
    case FormActions.FIELD_ERROR:
      return {
        ...state,
        errors: {
          ...state.errors,
          [payload.name]: payload.value
        }
      };
    default:
      return state;
  }
}
