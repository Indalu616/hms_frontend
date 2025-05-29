import React from "react";
import "./AdminDoctor.css";

import DoctorDataTable from "./DoctorDataTable";
import axios from "axios";
function AdminDoctor() {
  //  {
  //   "doc_fname": "Sarah",
  //   "doc_lname": "Johnson",
  //   "patient_count": 2
  // },
  const [doctor1, setDoctor1] = React.useState();
   const [doctor2, setDoctor2] = React.useState();

   const fetchDoctorData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/doctors/top-doctors");
        const data = response.data;
        setDoctor1(data[0]);
        setDoctor2(data[1]);
        console.log(data);

      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    }
  React.useEffect(() => {
    fetchDoctorData();
  }, []);

  return (
    <div>
      <div className="admin-patient-header">
        <h1>Manage Doctors</h1>
        <p>List of all Doctors</p>
      </div>
      <div className="top-2-doctors-container">
        <h2>Top 2 Doctors By number of patient visits</h2>
        <div className="docs">
          <div className="doc-card">
            <h3>Name:Dr. {doctor1?.doc_fname} {doctor1?.doc_lname}</h3>
          
            <p>Number of Patients: {doctor1?.patient_count}</p>
          </div>
          <div className="doc-card">
            <h3>Name:Dr. {doctor2?.doc_fname} {doctor2?.doc_lname}</h3>
            <p>Number of Patients: {doctor2?.patient_count}</p>
          </div>
        </div>
      </div>
      <DoctorDataTable />
    </div>
  );
}

export default AdminDoctor;
