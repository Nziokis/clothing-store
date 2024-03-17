import React, { useState } from "react";
import "./CSS/LoginSignup.css";
import Navbar from "../Components/Navbar/Navbar";
import { useAuth } from "../Context/AuthProvider";

const LoginSignup = () => {
  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  const auth = useAuth();
  const handleSubmitEvent = (e) => {
    e.preventDefault();

    if (input.username !== null && input.password !== null) {
      auth.loginAction(input);
      return;
    } else {
      alert("pleae provide a valid input");
    }
  };
  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <>
      <Navbar />
      <div className="loginsignup">
        <form onSubmit={handleSubmitEvent} className="loginsignup-container">
          <h1>Login</h1>
          <div className="loginsignup-fields">
            <input
              type="email"
              name="email"
              placeholder="Enter your email address"
              aria-invalid="false"
              onChange={handleInput}
              required="true"
            />

            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              aria-invalid="false"
              onChange={handleInput}
              required="true"
            />
          </div>

          <button className="btn-submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default LoginSignup;
