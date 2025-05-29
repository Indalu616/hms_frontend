import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import AlertDialog from "./AlertDialog";
import CustomizedDialogs from "./CustomizedDialog";
import "./AdminPatient.css";
import AddPatient from "./AddPatient";
const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 90,
  },
  {
    field: "email",
    headerName: "Email",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 180,
  },
  {
    field: "cancel",
    headerName: "Action",
    width: 250,
    headerClassName: "super-app-theme--header",
    sortable: false,
    renderCell: (params) => (
      <>
        <AlertDialog id={params.row.id} />
      </>
    ),
  },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function PatientDataTable() {
  const [rows, setRows] = React.useState([]);
  const [searchResults, setSearchResults] = React.useState([]);
  const [state, setState] = React.useState();

  //fetch patient data from the server
  const fetchPatientData = async () => {
    try {
      const response = await fetch("http://localhost:5000/patients");
      const data = await response.json();
      const formattedData = data.map((patient) => ({
        id: patient.patient_id,
        firstName: patient.patient_fname,
        lastName: patient.patient_lname,
        age: patient.age,
        email: patient.email,
      }));
      setRows(formattedData);
    } catch (error) {
      console.error("Error fetching patient data:", error);
    }
  };
  React.useEffect(() => {
    fetchPatientData();
  }, [searchResults, state]);
  return (
    <div className="admin-patient">
      <div className="action-buttons">
        <input
          type="text"
          placeholder="Search by ID.."
          className="search-input"
          onChange={(e) => {
            const searchTerm = e.target.value.toLowerCase();
            const filteredRows = rows.filter(
              (row) => row.id.toString().toLowerCase() === searchTerm
            );
            setSearchResults(filteredRows);
          }}
        />
        <AddPatient />
      </div>
      <Paper sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={searchResults.length > 0 ? searchResults : rows}
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
