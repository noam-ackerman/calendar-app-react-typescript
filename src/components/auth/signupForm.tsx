import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignupFormData } from "../../utils/interfaces";
import * as yup from "yup";

export default function SignupForm(): JSX.Element {
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
      {!errors.email && !errors.password && errors.passwordConfirmation && (
        <div className="error-message">
          {errors.passwordConfirmation.message}
        </div>
      )}
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
