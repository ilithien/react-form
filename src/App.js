import React from "react";
import "./App.css";
import useForm from "./hooks/useForm";
import TextInput from "./components/TextInput";

export default function App() {
  const { values, errors, handleFormEvent, submit } = useForm({
    values: {
      password: "",
      username: "John"
    },
    onSubmit: values => console.log(values),
    validate: true
  });

  return (
    <div className="App">
      <form className="login-form">
        <TextInput
          name="username"
          value={values.username}
          id="username"
          errorMessage={errors.username}
          validate={function(value) {
            return value.startsWith("John")
              ? null
              : 'username should start with "John"';
          }}
          formEvent={handleFormEvent}
        />
        <TextInput
          name="password"
          value={values.password}
          id="password"
          type="password"
          formEvent={handleFormEvent}
        />

        <button type="button" onClick={submit}>
          Send!
        </button>
      </form>
    </div>
  );
}
