import React from "react";

import AppointmentTable from "./AppointmentTable";
function MyAppointment() {
  return (
    <div>
      <div className="admin-patient-header">
        <h1>My Appointments</h1>
        <p>List of all Appointments</p>
      </div>
      <AppointmentTable />
    </div>
  );
}
export default MyAppointment;
