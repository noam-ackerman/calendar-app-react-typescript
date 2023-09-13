import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ResetPasswordFormData } from "../../utils/interfaces";
import { Link } from "react-router-dom";
import * as yup from "yup";

export default function ResetPassword(): JSX.Element {
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

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <form onSubmit={onSubmit}>
      {errors.email && (
        <div className="error-message">{errors.email.message}</div>
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
      <button type="submit">Reset Password</button>
      <Link to="/login" title="login">
        Back to login
      </Link>
    </form>
  );
}
