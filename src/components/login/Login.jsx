//import "./Login.css";
import React, { useState } from "react";
import InputWithLabel from "./input-with-label/InputWhithLabel";
import { login } from "../../services/api.service";
import { Redirect } from "react-router-dom";

export default function Login({ user, onLogIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onSubmit = (e) => {
    console.log(email)
    e.preventDefault();
    login(email, password)
      .then((user) => onLogIn(user))
      .catch((e) => setError(e.response.data.message));
  };

  if (user) {
    return <Redirect to="/map" />;
  }

  return (
    <div className="Login">
      <div>Whiz </div>
      {error && <p>There was an error: {error}</p>}
      <form onSubmit={onSubmit}>
        <InputWithLabel
          value={email}
          label="email"
          onChange={(e) => setEmail(e.target.value)}
          type="email"
        />
        <InputWithLabel
          value={password}
          label="password"
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
        <button type="submit">Log in</button>
      </form>
    </div>
  );
}