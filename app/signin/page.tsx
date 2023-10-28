"use client";
import "./signin.css";
import { useState } from "react";
import { FiChevronRight } from "react-icons/fi";
import Link from "next/link";

const SigninPage = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSignIn = () => {
    //TODO Handle sign-in logic here, e.g., send data to a server
    console.log("Username:", username);
    console.log("Password:", password);
  };

  return (
    <div className="signin-page">
      <form className="singin-form" onSubmit={handleSignIn}>
        <div className="signin-header">
          <h2>
            Limited Edition
            <br />
            Bricks Hub
          </h2>
          <h3>Sign in</h3>
        </div>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            placeholder="username"
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            placeholder="password"
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">Sign In</button>
      </form>
      <div className="register-section">
        <h3> New user</h3>
        <button>Create account</button>
      </div>
      <div className="social-options">
        <div className="signin-facebook-div">
          <p>Continue with Facebook</p>
          <FiChevronRight />
        </div>
        <div>
          <p>Continue with Google</p>
          <FiChevronRight />
        </div>
      </div>
    </div>
  );
};

export default SigninPage;
