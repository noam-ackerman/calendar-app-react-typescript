import PrivateRoute from "../../../components/routesWrappers/privateRoute";
import PublicAuthRoute from "../../../components/routesWrappers/publicAuthRoute";
import { render, screen, cleanup } from "@testing-library/react";
import { AuthContext } from "../../../ctx/authCtx";
import { CurrentUserType } from "../../../utils/types";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

afterEach(cleanup);

const SignupUser = jest.fn();
const LoginUser = jest.fn();
const LogoutUser = jest.fn();
const resetPassword = jest.fn();
const UpdatePassword = jest.fn();
const reAuthenticateUser = jest.fn();
const DeleteUser = jest.fn();

let values = {
  SignupUser,
  LoginUser,
  LogoutUser,
  resetPassword,
  UpdatePassword,
  reAuthenticateUser,
  DeleteUser,
};
const PrivateComponent = () => <>Private!</>;
const PublicComponent = () => <>Public!</>;

const RouterElement = () => (
  <Router>
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <PrivateComponent />
          </PrivateRoute>
        }
      />
      <Route
        path="/login"
        element={
          <PublicAuthRoute>
            <PublicComponent />
          </PublicAuthRoute>
        }
      />
    </Routes>
  </Router>
);

test("private route with authenticated user", () => {
  const currentUser = {} as CurrentUserType;
  render(
    <AuthContext.Provider
      value={{
        currentUser,
        ...values,
      }}
    >
      <RouterElement />
    </AuthContext.Provider>
  );

  expect(screen.queryByText("Public!")).not.toBeInTheDocument();
  expect(screen.getByText("Private!")).toBeInTheDocument();
});

test("private route without authenticated user", () => {
  const currentUser = null;
  render(
    <AuthContext.Provider
      value={{
        currentUser,
        ...values,
      }}
    >
      <RouterElement />
    </AuthContext.Provider>
  );

  expect(screen.queryByText("Private!")).not.toBeInTheDocument();
  expect(screen.getByText("Public!")).toBeInTheDocument();
});
