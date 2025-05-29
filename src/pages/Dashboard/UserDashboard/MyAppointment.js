import React from "react";

import AppointmentTable from "./AppointmentTable";
import DoctorCard from "./DoctorCard";

import "./UserDashboard.css";
import axios from "axios";
function MyAppointmentPatient() {
  const [doctors, setDoctors] = React.useState([]);
  const fetchDoctors = async () => {
    try {
      const response = await axios.get("http://localhost:5000/doctors");
      const data = response.data;
      setDoctors(data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };
  React.useEffect(() => {
    fetchDoctors();
  }, []);
  return (
    <div>
      <div className="admin-patient-header">
        <h1>My Appointments</h1>
        <p>List of all Appointments</p>
      </div>
      <AppointmentTable />
      <div className="row doctors-list">
        <h2>Doctors List</h2>
        <p>Book an appointment with your favorite doctor</p>
        {doctors.map((doctor) => (
          <div className="col-md-12 col-lg-3 mt-2 mb-2" key={doctor.id}>
            <DoctorCard doctor={doctor} />
          </div>
        ))}
      </div>
    </div>
  );
}
export default MyAppointmentPatient;
