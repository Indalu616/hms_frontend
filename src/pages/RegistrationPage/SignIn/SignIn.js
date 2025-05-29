import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useUserContext } from "../../../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("Admin");
  const [remember, setRemember] = useState(false);
  const { role, setRole } = useUserContext();
  const { user, setUser } = useUserContext();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log({ email, password, userType, remember });
    if (userType.toLowerCase() === "admin") {
      if (email === "admin@gmail.com" && password === "admin123") {
        alert("Login successful");
        setRole(userType.toLowerCase());
        navigate("/dashboard");
      } else {
        alert("Invalid credentials");
      }
    } else {
      try {
        const response = await axios.post("http://localhost:5000/login", {
          email,
          userType,
        });
        console.log("Login response:", response.data);
        console.log(response.status);
        if (response.status === 200) {
          setUser(response.data);
          setRole(userType.toLowerCase());
          //clear previous user data
          localStorage.removeItem("user");
          localStorage.setItem("user", JSON.stringify(response.data));
          localStorage.setItem("role", userType.toLowerCase());
          console.log(user);
          console.log(role);
          alert("Login successful");
          navigate("/dashboard");
        } else {
          alert("Invalid credentials");
        }
      } catch (error) {
        console.error("Error during login:", error);
        alert("Login failed. Please try again.");
      }
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center min-vh-100"
      style={{
        background: "linear-gradient(to right, #4e54c8, #8f94fb)",
      }}
    >
      <div
        className="card shadow-lg p-4 rounded-4"
        style={{ width: "100%", maxWidth: "420px" }}
      >
        <h2 className="text-center mb-4 text-primary fw-bold">
          Hospital Management System Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="userType" className="form-label">
              User Type
            </label>
            <select
              className="form-select"
              id="userType"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
            >
              <option value="admin">Admin</option>
              <option value="doctor">Doctor</option>
              <option value="patient">Patient</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-check mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              id="remember"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="remember">
              Remember me
            </label>
          </div>

          <button type="submit" className="btn btn-primary w-100 fw-semibold">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
