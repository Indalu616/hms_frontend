import React from "react";
import "./AdminDoctor.css";

import DoctorDataTable from "./DoctorDataTable";
import TopNDoctor from "./TopNDoctor";
function AdminDoctor() {
  return (
    <div>
      <div className="top-2-doctors-container">
        <h2>Top N Doctors By number of patient visits</h2>
        <p>View top most busy doctors</p>
      </div>
      <TopNDoctor />
      <div className="admin-patient-header">
        <h1>Manage Doctors</h1>
        <p>List of all Doctors</p>
      </div>
      <DoctorDataTable />
    </div>
  );
}

export default AdminDoctor;
