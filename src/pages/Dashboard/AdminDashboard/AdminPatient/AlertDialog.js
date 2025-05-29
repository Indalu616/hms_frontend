import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import axios from "axios";

export default function AlertDialog({ id }) {
  const [open, setOpen] = useState(false);
  const [patient_id, setAppointmentId] = useState(id);
  // console.log(appointmentId);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = async () => {
    setOpen(false);
    try {
      const response = await axios.delete(
        "http://localhost:5000/patients/patient/" + patient_id
      );
      console.log(response.data);
      if (response.status == 204) {
        console.log("Patient deleted successfully");
        alert("Patient deleted successfully");
        // Optionally, you can refresh the appointment list or perform any other action
      } else {
        console.error("Failed to delete Patient");
      }
    } catch (error) {
      console.error("Error deleting Patient:", error);
    }
    // window.location.reload();
  };
  return (
    <React.Fragment>
      <Button
        onClick={handleClickOpen}
        variant="contained"
        color="error"
        size="small"
        style={{ marginRight: 8 }}
      >
        Delete
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" color="error">
          Are you sure you want to delete this patient?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" color="info">
            This action cannot be undone. Please confirm that you want to delete
            this Patient.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained">
            cancel
          </Button>
          <Button
            onClick={handleDelete}
            autoFocus
            variant="contained"
            color="error"
          >
            confirm
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
