import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignupFormData } from "../../utils/interfaces";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../ctx/authCtx";
import * as yup from "yup";

export default function SignupForm(): JSX.Element {
  const { SignupUser } = useAuth();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Email must be valid.")
      .required("Email is required."),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters.")
      .required("Password is required."),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords do not match.")
      .required("Password confirmation is required."),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<SignupFormData>({ resolver: yupResolver(schema) });

  const onSubmit = handleSubmit(async (data): Promise<void> => {
    try {
      setError("");
      setLoading(true);
      await SignupUser(data.email, data.password);
      navigate("/");
    } catch (err: any) {
      if (err.code === "auth/invalid-email") {
        setError("Email must be valid.");
      } else if (err.code === "auth/weak-password") {
        setError("Password must be at least 6 characters.");
      } else if (err.code === "auth/email-already-in-use") {
        setError("Email is already in use.");
      } else {
        setError("Failed to sign up.");
      }
    } finally {
      setLoading(false);
    }
  });

  return (
    <form onSubmit={onSubmit}>
      {errors.email && (
        <div className="error-message">{errors.email.message}</div>
      )}
      {!errors.email && errors.password && (
        <div className="error-message">{errors.password.message}</div>
      )}
      {!errors.email && !errors.password && errors.passwordConfirmation && (
        <div className="error-message">
          {errors.passwordConfirmation.message}
        </div>
      )}
      {!errors.email &&
        !errors.password &&
        !errors.passwordConfirmation &&
        error && <div className="error-message">{error}</div>}
      <div className="input-group">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="text"
          placeholder="example@example.com"
          {...register("email", { required: true })}
          onChange={() => clearErrors()}
        />
      </div>
      <div className="input-group">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          placeholder=">= 6 characters"
          {...register("password", { required: true })}
          onChange={() => clearErrors()}
        />
      </div>
      <div className="input-group">
        <label htmlFor="passwordConfirmation">Password Confirmation</label>
        <input
          id="passwordConfirmation"
          type="password"
          placeholder=">= 6 characters"
          {...register("passwordConfirmation", { required: true })}
          onChange={() => clearErrors()}
        />
      </div>
      <button type="submit">Signup</button>
    </form>
  );
}
