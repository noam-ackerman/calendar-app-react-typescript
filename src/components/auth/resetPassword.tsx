import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ResetPasswordFormData } from "../../utils/interfaces";
import { Link } from "react-router-dom";
import { useAuth } from "../../ctx/authCtx";
import { OvalBtn } from "../../utils/spinners";
import * as yup from "yup";

export default function ResetPassword(): JSX.Element {
  const { resetPassword } = useAuth();
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Email must be valid.")
      .required("Email is required."),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<ResetPasswordFormData>({ resolver: yupResolver(schema) });

  const onSubmit = handleSubmit(async (data): Promise<void> => {
    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(data.email);
      setMessage("Check your inbox for further instructions.");
    } catch {
      setError("Failed to reset password.");
    }
    setLoading(false);
  });

  return (
    <form onSubmit={onSubmit}>
      {errors.email && (
        <div className="error-message">{errors.email.message}</div>
      )}
      {!errors.email && error && <div className="error-message">{error}</div>}
      {!errors.email && !error && message && (
        <div className="success-message">{message}</div>
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
      <button disabled={loading} type="submit">
        {loading && <OvalBtn color="#3a86ff" />}
        <span>Reset Password</span>
      </button>
      <Link to="/login" title="login">
        Back to login
      </Link>
    </form>
  );
}
