import style from "./style.module.scss";

import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useUser } from "../../UserContext";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useUser();
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleSubmit = async (e) => {
    const roles = "64fd87340d7b594f26bd9594";
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4050/auth/register", {
        name,
        email,
        password,
        roles,
      });

      console.log("Register successful:", response.data);
      login(response.data);

      setRegistrationSuccess(true);
    } catch (error) {
      console.error("Register failed:", error);
    }
  };

  return (
    <div className={style.registerForm}>
      <h2>Register</h2>
      {registrationSuccess ? (
        <div>
          <p>Registration successful!</p>
          <p>
            You can now <Link to={"/login"}>login here</Link>.
          </p>
        </div>
      ) : (
        <>
          <form onSubmit={handleSubmit}>
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
            <button type="submit">Register</button>
          </form>
          <p>
            Already have an account? <Link to={"/login"}>Login here</Link>
          </p>
        </>
      )}
    </div>
  );
};

export default Register;
