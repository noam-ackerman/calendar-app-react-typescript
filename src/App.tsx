import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FormCard from "./components/auth/formCard";
import "./styles/styles.scss";

function App(): JSX.Element {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<></>} />
          <Route path="/login" element={<FormCard formType="login" />} />
          <Route path="/signup" element={<FormCard formType="signup" />} />
          <Route
            path="/resetpassword"
            element={<FormCard formType="resetPassword" />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
