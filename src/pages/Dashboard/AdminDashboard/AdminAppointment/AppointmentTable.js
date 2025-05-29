import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import AlertDialog from "./AlertDialog";
import CustomizedDialogs from "./CustomizedDialog";
import axios from "axios";

const columns = [
  { field: "id", headerName: "Appt ID", width: 70 },
  { field: "firstName", headerName: "Patient Name", width: 130 },
  { field: "docname", headerName: "Doctor", width: 130 },
  {
    field: "apptdate",
    headerName: "Appointment Date",
    width: 160,
    sortable: true,
  },
  {
    field: "time",
    headerName: "Time",
    description: "This column has a value getter and is not sortable.",
    sortable: true,
    width: 160,
  },
  {
    field: "reason",
    headerName: "Reason",
    description: "This column has a value getter and is not sortable.",
    sortable: true,
    width: 160,
  },
  {
    field: "status",
    headerName: "Status",
    description: "This column has a value getter and is not sortable.",
    sortable: true,
    width: 160,
  },

  {
    field: "cancel",
    headerName: "Action",
    width: 250,
    headerClassName: "super-app-theme--header",
    renderCell: (params) => (
      <>
        <AlertDialog id={params.row.id} />
        <CustomizedDialogs id={params.row.id} />
      </>
    ),
  },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function AppointmentTable() {
  const [rows, setRows] = React.useState([]);
  const[state, setState] = React.useState();

  //fetch appointment data from the server

  const fetchAppointmentData = async () => {
 
    try {
      const response = await axios.get("http://localhost:5000/appointments");
      const data = response.data;
      console.log(data);
      const formattedData = data.map((appointment) => ({
        id: appointment.appt_id,
        firstName: `${appointment.patient_fname} ${appointment.patient_lname}`,
        docname: `${appointment.doc_fname} ${appointment.doc_lname}`,
        apptdate: appointment.appt_date.split("T")[0],
        time: appointment.time,
        reason: appointment.reason,
        status: appointment.status,
      }));
      console.log(formattedData);
      setRows(formattedData);
    } catch (error) {
      console.error("Error fetching appointment data:", error);
    }
  };
  React.useEffect(() => {
    fetchAppointmentData();
  }, [state]);

  return (
    <div className="admin-patient">
      <Paper sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          onStateChange={(state) => {
            console.log("State changed:", state);
            setState(state);
          }}
          sx={{ border: 0 }}
        />
      </Paper>
    </div>
  );
}
