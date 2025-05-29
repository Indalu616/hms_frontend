import React, { use } from "react";
import AdminDashboard from "./AdminDashboard/AdminDashboard";
import DoctorDashboard from "./DoctorDashboard/DoctorDashboard";
import { useUserContext } from "../../context/UserContext";

function UserDashboard() {
  const { user, role, login, logout } = useUserContext();
  return (
    <div className="dashboard">
      {role === "admin" && <AdminDashboard />}
      {role === "doctor" && <DoctorDashboard />}
      {role === "user" && <UserDashboard />}
    </div>
  );
}

export default UserDashboard;
