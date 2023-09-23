import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import PrivateRoute from "./components/routesWrappers/privateRoute";
import PublicAuthRoute from "./components/routesWrappers/publicAuthRoute";
import FormCard from "./components/auth/formCard";
import Calendar from "./components/calendar/calendar";
import "./styles/styles.scss";

function App(): JSX.Element {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Calendar />
              </PrivateRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicAuthRoute>
                <FormCard formType="login" />
              </PublicAuthRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicAuthRoute>
                <FormCard formType="signup" />
              </PublicAuthRoute>
            }
          />
          <Route
            path="/resetpassword"
            element={
              <PublicAuthRoute>
                <FormCard formType="resetPassword" />
              </PublicAuthRoute>
            }
          />
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
