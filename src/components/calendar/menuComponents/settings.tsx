import { useState, useRef } from "react";
import { OvalBtn } from "../../../utils/spinners";
import { useAuth } from "../../../ctx/authCtx";
import { useCalendarCtx } from "../../../ctx/calendarCtx";
import { useForm } from "react-hook-form";
import { ChangePasswordFormData } from "../../../utils/interfaces";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import useToggleBtnClick from "../../../utils/custom-hooks/ useToggleBtnClick";
import * as yup from "yup";

export default function Settings(): JSX.Element {
  const { currentUser, reAuthenticateUser, UpdatePassword, DeleteUser } =
    useAuth();
  const { deleteUserDatabase } = useCalendarCtx();
  const [error, setError] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const form = useRef<HTMLFormElement>(null);
  const deleteEventBtn = useRef<HTMLButtonElement>(null);
  const [deleteClickedOnce, setDeleteClickedOnce] = useToggleBtnClick(
    deleteEventBtn?.current
  );
  const navigate = useNavigate();

  const schema = yup.object().shape({
    password: yup.string().required("Current Password is required."),
    newPassword: yup
      .string()
      .required("New Password is required.")
      .min(6, "New Password must be at least 6 characters."),
    newPasswordConfirmation: yup
      .string()
      .required("New Password confirmation is required.")
      .oneOf([yup.ref("newPassword")], "Passwords do not match."),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<ChangePasswordFormData>({ resolver: yupResolver(schema) });

  const onSubmit = handleSubmit(async (data): Promise<void> => {
    setLoading(true);
    setError("");
    setMessage("");
    try {
      await reAuthenticateUser(data.password);
      await UpdatePassword(data.newPassword);
      setMessage("Password updated successfully");
      form.current!.reset();
    } catch {
      setError("Failed to update password");
    } finally {
      setLoading(false);
    }
  });

  const handleDeleteUser = async (
    event: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    event.preventDefault();
    if (!deleteClickedOnce) {
      setDeleteClickedOnce(true);
      return;
    }
    setLoading(true);
    setError("");
    setMessage("");
    const userId = currentUser!.uid;
    const passwordInput = form.current![0] as HTMLInputElement;
    try {
      if (!passwordInput.value) {
        setError("Current Password is required.");
        return;
      }
      await reAuthenticateUser(passwordInput.value);
      await DeleteUser();
      await deleteUserDatabase(userId);
      navigate("/login");
    } catch {
      setError("Failed to delete account");
    } finally {
      setLoading(false);
      setDeleteClickedOnce(false);
    }
  };

  return (
    <div className="menuComponentWrapper">
      <form ref={form} onSubmit={onSubmit}>
        <div className="title">Change Password</div>
        {errors.password ? (
          <div className="error-message">{errors.password.message}</div>
        ) : errors.newPassword ? (
          <div className="error-message">{errors.newPassword.message}</div>
        ) : errors.newPasswordConfirmation ? (
          <div className="error-message">
            {errors.newPasswordConfirmation.message}
          </div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : message ? (
          <div className="success-message">{message}</div>
        ) : null}
        <div className="input-group">
          <label htmlFor="eventTitle">Password</label>
          <input
            id="password"
            type="password"
            {...register("password", { required: true })}
            onChange={() => clearErrors()}
          />
        </div>
        <div className="input-group">
          <label htmlFor="eventTitle">New Password</label>
          <input
            id="newPassword"
            type="password"
            {...register("newPassword", { required: true })}
            onChange={() => clearErrors()}
          />
        </div>
        <div className="input-group">
          <label htmlFor="eventTitle">New Password Confirmation</label>
          <input
            id="newPasswordConfirmation"
            type="password"
            {...register("newPasswordConfirmation", { required: true })}
            onChange={() => clearErrors()}
          />
        </div>
        <div className="actions">
          <button disabled={loading} className="submitBtn" type="submit">
            {loading && <OvalBtn color="#3a86ff" />}
            <span>Save</span>
          </button>
          <button
            className="deleteBtn"
            onClick={handleDeleteUser}
            disabled={loading}
            ref={deleteEventBtn}
            type="button"
          >
            {!deleteClickedOnce ? "Delete My Account" : "Are you sure? 'Y'"}
          </button>
        </div>
      </form>
    </div>
  );
}
