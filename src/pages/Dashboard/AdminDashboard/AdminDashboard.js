import { useEffect, useState } from "react";
import "./AdminDashboard.css";
import AdminPatient from "./AdminPatient/AdminPatient";
import AdminDoctor from "./AdminDoctor/AdminDoctor";
import AdminAppointment from "./AdminAppointment/AdminAppointment";
import PersonIcon from "@mui/icons-material/Person";

import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import PatientVisitTreand from "./AdminPatient/PatientVisitTrendTable";
import axios from "axios";

function AdminDashboard() {
  const [component, setComponent] = useState("patient");
  const [doctorCounts, setDoctorCounts] = useState("");
  const [patientCounts, setPatientCounts] = useState("");
  const [appointmentCounts, setAppointmentCounts] = useState("");

  //fetch doctor counts
  const fetchDoctorCounts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/doctors/count");
      const patientData = await axios.get(
        "http://localhost:5000/patients/count"
      );
      const appointmentData = await axios.get(
        "http://localhost:5000/appointments/count"
      );
      const Docdata = response.data;
      const Patdata = patientData.data;
      const Appdata = appointmentData.data;
      setPatientCounts(Patdata.count);
      setAppointmentCounts(Appdata.count);
      setDoctorCounts(Docdata.count);
    } catch (error) {
      console.error("Error fetching patient data:", error);
    }
  };
  useEffect(() => {
    fetchDoctorCounts();
  }, []);
  return (
    <div className="admin-dashboard">
      <div className="admin-hero-header">
        <h1>Welcome to Admin Dashboard</h1>
        <p>
          Focus on your adminstrative Task,we will take care of the development
        </p>
      </div>
      <div className="hospital-statistics">
        <h2>Hospital Statistics</h2>
        <div className="row">
          <div className="col">
            <div className="card">
              <div className="icon">
                <PersonIcon className="icon" />
              </div>
              <h2>Total Patients</h2>
              <p>{patientCounts}</p>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <div className="icon">
                <MedicalServicesIcon className="icon" />
              </div>
              <h2>Total Doctors</h2>
              <p>{doctorCounts}</p>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <div className="icon">
                <LocalHospitalIcon className="icon" />
              </div>
              <h2>Total Appointments</h2>
              <p>{appointmentCounts}</p>
            </div>
          </div>
        </div>
        <div className="patient-visit-trends">
          <h2>Patient Visit Trends over the past 3 years</h2>
          <PatientVisitTreand />
        </div>
      </div>
    </div>
  );
}
export default AdminDashboard;
