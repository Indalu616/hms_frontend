import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { Button, Container } from "react-bootstrap";
import AppointmentModal from "./AppointmentModal";
import axios from "axios";
import { useUserContext } from "../../../context/UserContext";

export default function DoctorCard({ doctor }) {
  const [showModal, setShowModal] = React.useState(false);
  const [user, setUser] = React.useState(null);
  React.useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  const handleBook = async (data) => {
    console.log(data);
    console.log("Doctor ID:", doctor.doc_id);
    console.log(user);
    // console.log("Patient ID:", patientId);
    console.log(user);
    try {
      const response = await axios.post(
        "http://localhost:5000/appointments/create_appt",
        {
          ...data,
          doctor_id: doctor.doc_id,
          patient_id: user.patient_id, // Assuming user has an id property
        }
      );


      if (response.status == 200) {
        alert("Appointment booked successfully!");
        setShowModal(false);
      } else {
        alert("Failed to book appointment. Please try again.");
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
    }
  };
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Dr. {doctor.doc_fname} {doctor.doc_lname}
          </Typography>

          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Specialty: {doctor.specialty}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Phone Number: {doctor.phone_num}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Email: {doctor.email}
          </Typography>
          <Button onClick={() => setShowModal(true)}>Book Appointment</Button>
          <AppointmentModal
            show={showModal}
            handleClose={() => setShowModal(false)}
            handleSubmit={handleBook}
            doctorId={doctor.doc_id}
            // patientId={patientId}
            doc_fname={doctor.doc_fname}
            doc_lname={doctor.doc_lname}
          />
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
