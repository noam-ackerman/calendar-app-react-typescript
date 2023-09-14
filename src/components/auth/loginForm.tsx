import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginFormData } from "../../utils/interfaces";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../ctx/authCtx";
import * as yup from "yup";

export default function LoginForm(): JSX.Element {
  const { LoginUser } = useAuth();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Email must be valid.")
      .required("Email is required."),
    password: yup.string().required("Password is required."),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<LoginFormData>({ resolver: yupResolver(schema) });

  const onSubmit = handleSubmit(async (data): Promise<void> => {
    try {
      setError("");
      setLoading(true);
      await LoginUser(data.email, data.password);
      navigate("/");
    } catch (err: any) {
      if (err.code === "auth/user-not-found") {
        setError("Email/Password are incorrect.");
      } else if (err.code === "auth/wrong-password") {
        setError("Email/Passwords are incorrect.");
      } else if (err.code === "auth/too-many-requests") {
        setError("Too Many Failed Logins! try again later.");
      } else {
        setError("Failed to Login.");
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
      {!errors.email && !errors.password && error && (
        <div className="error-message">{error}</div>
      )}
      <div className="input-group">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="text"
          {...register("email", { required: true })}
          onChange={() => clearErrors()}
        />
      </div>
      <div className="input-group">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          {...register("password", { required: true })}
          onChange={() => clearErrors()}
        />
      </div>
      <button type="submit">Login</button>
      <Link to="/resetpassword" title="resetPassword">
        Forgot your password?
      </Link>
    </form>
  );
}
