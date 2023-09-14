import style from "./style.module.scss";
import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../AuthContext";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();
  const [userId, setUserId] = useState("");
  const [token, setToken] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4050/auth/login", {
        email,
        password,
      });
      console.log("Login successful:", response.data);

      const decodedToken = ""; // Use jsonwebtoken to decode the token

      if (decodedToken) {
        const userType = decodedToken.roles;
        if (userType === "64fd872c0d7b594f26bd9592") {
          setUserId(response.data._id);
          setToken("User");
          login(response.data._id, response.data.accessToken, userType);
        } else if (userType === "64fd872c0d7b594f26bd9592") {
          setUserId(response.data._id);
          setToken("Admin");
          login(response.data._id, response.data.accessToken, userType);
        }
      } else {
        console.log("Invalid token");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Login</button>
      </form>
      <button onClick={() => props.onFormSwitch("register")}>
        Don't have an account? Register here
      </button>
    </div>
  );
};

export default Login;
