import React from "react";

import AppointmentTable from "./AppointmentTable";
function AdminAppointment() {
  return (
    <div>
      <div className="admin-patient-header">
        <h1>Manage Appointments</h1>
        <p>List of all Appointments</p>
      </div>
      <AppointmentTable />
    </div>
  );
}
export default AdminAppointment;
