import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import axios from "axios";
import UpdateAppointment from "./CustomizedDialog";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "First Name", width: 130 },
  { field: "lastName", headerName: "Last Name", width: 130 },
  {
    field: "doctorName",
    headerName: "Doctor Name",
    width: 200,
    sortable: true,
  },
  {
    field: "date",
    headerName: "Appointment Date",
    width: 160,
    sortable: true,
  },
  {
    field: "time",
    headerName: "Time",
    width: 160,
    sortable: true,
  },
  {
    field: "status",
    headerName: "Status",
    sortable: true,
    width: 160,
  },
  {
    field: "reason",
    headerName: "Reason",
    width: 160,
  },
  {
    field: "cancel",
    headerName: "Action",
    width: 250,
    headerClassName: "super-app-theme--header",
    renderCell: (params) => (
      <>
        <UpdateAppointment id={params.row.id} />
      </>
    ),
  },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function AppointmentTable() {
  const [rows, setRows] = React.useState([]);
  const [state, setState] = React.useState();
  const [patient_Id, setPat_id] = React.useState("");

  // Load patient ID from local storage on first render
  React.useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.patient_id) {
      setPat_id(user.patient_id);
    }
  }, []);

  // Fetch appointment data only when patient_Id is available
  React.useEffect(() => {
    const fetchAppointmentData = async () => {
      try {
        // console.log("Fetching appointments for patient_Id:", patient_Id);
        const response = await axios.get(
          `http://localhost:5000/patients/my-appointments/${patient_Id}`
        );
        const data = response.data;
        const formattedData = data.map((appointment) => ({
          id: appointment.appt_id,
          firstName: appointment.patient_fname,
          lastName: appointment.patient_lname,
          doctorName: `Dr.${appointment.doc_fname} ${appointment.doc_lname}`,
          date: appointment.appt_date.split("T")[0],
          time: appointment.time,
          reason: appointment.reason,
          status: appointment.status,
        }));
        setRows(formattedData);
      } catch (error) {
        console.error("Error fetching appointment data:", error);
      }
    };

    if (patient_Id) {
      fetchAppointmentData();
    }
  }, [patient_Id, state]);

  return (
    <div className="admin-patient">
      <Paper sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          onStateChange={(state) => {
            console.log("State changed:", state);
            setState(state);
          }}
          checkboxSelection
          sx={{ border: 0 }}
        />
      </Paper>
    </div>
  );
}
