import style from "./style.module.scss";

import React, { useState } from "react";
import axios from "axios";

const Register = (props) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(email, name, password);
      const response = await axios.post("http://localhost:4050/auth/register", {
        name,
        email,
        password,
      });

      console.log("Register successful:", response.data);
    } catch (error) {
      console.error("Register failed:", error);
    }
  };

  return (
    <div className="register-form">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            type="text"
            id="name"
            name="name"
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="text"
            id="email"
            name="email"
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            id="password"
            name="password"
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
      <button onClick={() => props.onFormSwitch("login")}>
        Already have an account? Login here
      </button>
    </div>
  );
};

export default Register;
