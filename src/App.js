import React from "react";
import "./App.css";
import Form from "./lib/components/Form";
import Input from "./lib/components/Input";
import Checkbox from "./lib/components/Checkbox";

export default function App() {
  return (
    <div className="App">
      <Form
        onSubmit={console.log}
        validate={values => {
          let errors = {};
          if (!values.username.startsWith("John")) {
            errors = { username: "Username must start with John" };
          }

          return errors;
        }}
        initialValues={{
          username: "John",
          accept: true
        }}
      >
        <Input name="username" />
        <Checkbox value="accept" name="accept" />
        <button type="submit">Send!</button>
      </Form>
    </div>
  );
}
