import React, { useReducer } from "react";
import formReducer from "./formReducer";

export const FormContext = React.createContext({});

export function useForm({ values: initialValues }) {
  const [state, dispatch] = useReducer(formReducer, {
    values: initialValues,
    errors: []
  });

  function formEvent(value, name, type) {
    dispatch({ type, payload: { value, name } });
  }

  return {
    ...state,
    dispatch,
    formEvent
  };
}
