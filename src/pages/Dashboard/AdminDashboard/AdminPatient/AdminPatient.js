import React from "react";
import "./AdminPatient.css";
import PatientDataTable from "./PatientDataTable";
function AdminPatient() {
  return (
    <div>
      <div className="admin-patient-header">
        <h1>Manage Patients</h1>
        <p>List of all patients</p>
      </div>
      <PatientDataTable />
    </div>
  );
}

export default AdminPatient;
