import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginFormData } from "../../utils/interfaces";
import { Link } from "react-router-dom";
import * as yup from "yup";

export default function LoginForm(): JSX.Element {
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

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <form onSubmit={onSubmit}>
      {errors.email && (
        <div className="error-message">{errors.email.message}</div>
      )}
      {!errors.email && errors.password && (
        <div className="error-message">{errors.password.message}</div>
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
      <Link
        to="/resetpassword"
        title="resetPassword"
        className="reset-password-link"
      >
        Forgot your password?
      </Link>
    </form>
  );
}
