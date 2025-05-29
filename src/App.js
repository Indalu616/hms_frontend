import React from "react";
// import Dashboard from "./pages/Dashboard/Dashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./pages/RegistrationPage/SignUp/SignUp";
import SignIn from "./pages/RegistrationPage/SignIn/SignIn";
import Dashboard from "../src/pages/Dashboard/tools-dashboard/DashboardSetUp";
import LoginForm from "./pages/RegistrationPage/SignIn/SignIn";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUp />} />

          <Route path="/dashboard*" element={<Dashboard />} />
          <Route path="/" element={<LoginForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
