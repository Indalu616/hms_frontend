import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import AlertDialog from "./AlertDialog";
import CustomizedDialogs from "./CustomizedDialog";
import axios from "axios";
const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "First Name", width: 130 },
  { field: "lastName", headerName: "Last Name", width: 130 },
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
        <CustomizedDialogs id={params.row.id} />
      </>
    ),
  },
];


const paginationModel = { page: 0, pageSize: 5 };

export default function AppointmentTable() {
  const [rows, setRows] = React.useState([]);
  const [doc_id, setDocId] = React.useState(2);
  const [state, setState] = React.useState();
  const [searchResults, setSearchResults] = React.useState([]);
  //fetch appointment data from the server
  const fetchAppointmentData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/doctors/my-appointments/${doc_id}`
      );
      const data = response.data;
      console.log(data);
      console.log(doc_id);
      const formattedData = data.map((appointment) => ({
        id: appointment.appt_id,
        firstName: appointment.patient_fname,
        lastName: appointment.patient_lname,
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
          onStateChange={(state) => {
            setState(state);
          }}
          checkboxSelection
          sx={{ border: 0 }}
        />
      </Paper>
    </div>
  );
}
