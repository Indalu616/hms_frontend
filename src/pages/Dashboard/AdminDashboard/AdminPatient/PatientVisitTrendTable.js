import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import AlertDialog from "./AlertDialog";
import CustomizedDialogs from "./CustomizedDialog";
import axios from "axios";
import "./AdminPatient.css";
// {
//   "year": 2025,
//   "month": "June",
//   "dept_name": "Dermatology",
//   "gender": "Male",
//   "visit_count": 2
// },
const columns = [
  // { field: "id", headerName: "ID", width: 70 },
  { field: "year", headerName: "Year", width: 130 },
  { field: "month", headerName: "Month", width: 130 },
  {
    field: "dept_name",
    headerName: "Department",
    width: 130,
    sortable: true,
  },
  {
    field: "gender",
    headerName: "Gender",
    description: "This column has a value getter and is not sortable.",
    sortable: true,
    width: 180,
  },
  {
    field: "visit_count",
    headerName: "Visit Count",
    width: 250,
    headerClassName: "super-app-theme--header",
    sortable: true,
  },
];

const paginationModel = { page: 0, pageSize: 5 };
export default function PatientVisitTreand() {
  const [rows, setRows] = React.useState([]);
  const [searchResults, setSearchResults] = React.useState([]);

  //fetch patient data from the server
  const fetchVisitTrends = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/patients/patient_trends"
      );
      const data = response.data;
      const formattedData = data.map((patient, index) => ({
        id: patient.dept_id,
        year: patient.year,
        month: patient.month,
        dept_name: patient.dept_name,
        gender: patient.gender,
        visit_count: patient.visit_count,
      }));
      setRows(formattedData);
    } catch (error) {
      console.error("Error fetching patient data:", error);
    }
  };
  React.useEffect(() => {
    fetchVisitTrends();
  }, [searchResults]);
  return (
    <div className="admin-patient">
      <div className="action-buttons">
        <input
          type="text"
          placeholder="Search by Dept ID.."
          className="search-input"
          onChange={(e) => {
            const searchTerm = e.target.value.toLowerCase();
            const filteredRows = rows.filter(
              (row) => row.id.toString().toLowerCase() === searchTerm
            );
            setSearchResults(filteredRows);
          }}
        />
      </div>
      <Paper sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={searchResults.length > 0 ? searchResults : rows}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          sx={{ border: 0 }}
        />
      </Paper>
    </div>
  );
}
