import React from "react";
import "./App.css";
import Form from "./lib/components/Form";
import Field from "./lib/components/Field";

export default function App() {
  return (
    <div className="App">
      <Form
        onSubmit={values => console.log(values)}
        validate={values => {
          let errors = {};
          if (!values["username"].startsWith("John")) {
            errors = { username: "Username must start with John" };
          }

          return errors;
        }}
        initialValues={{
          username: "John"
        }}
      >
        <Field name="username" validate={value => {}} />
        <button type="submit">Send!</button>
      </Form>
    </div>
  );
}
