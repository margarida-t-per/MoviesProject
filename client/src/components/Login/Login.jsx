import React, { useState } from "react";
import style from "./style.module.scss";
import axios from "axios";
import { useUser } from "../../UserContext";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4050/auth/login", {
        email,
        password,
      });

      const userData = response.data;

      login(userData);
      console.log("Login successfull:", userData);
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className={style.loginForm}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to={"/register"}>Register here</Link>
      </p>
    </div>
  );
};

export default Login;
