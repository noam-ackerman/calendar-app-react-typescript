import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "./loginForm";
import SignupForm from "./signupForm";
import ResetPassword from "./resetPassword";

interface Props {
  formType: string;
}

export default function FormCard({ formType }: Props): JSX.Element {
  return (
    <div className="authWrapper">
      <div className="authButtons">
        <Link
          to="/login"
          title="login"
          className={`login ${
            formType === "login"
              ? "active"
              : formType === "resetPassword"
              ? "active"
              : ""
          }`}
        >
          Login
        </Link>
        <Link
          to="/signup"
          title="signup"
          className={`signup ${formType === "signup" ? "active" : ""}`}
        >
          Signup
        </Link>
      </div>
      <div className="formCard">
        {formType === "login" ? (
          <LoginForm />
        ) : formType === "signup" ? (
          <SignupForm />
        ) : formType === "resetPassword" ? (
          <ResetPassword />
        ) : null}
      </div>
    </div>
  );
}
