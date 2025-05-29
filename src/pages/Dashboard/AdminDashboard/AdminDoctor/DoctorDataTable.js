import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import AlertDialog from "./AlertDialog";
import CustomizedDialogs from "./CustomizedDialog";
import "./AdminDoctor.css";
import AddDoctor from "./AddDoctorModal";
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
    field: "phone_num",
    headerName: "Phone Number",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
  },
  {
    field: "email",
    headerName: "Email",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
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
      </>
    ),
  },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function DoctorDataTable() {
  const [rows, setRows] = React.useState([]);
  const [searchResults, setSearchResults] = React.useState([]);
  //fetch doctor data from the server
  const fetchDoctorData = async () => {
    try {
      const response = await fetch("http://localhost:5000/doctors");
      const data = await response.json();
      const formattedData = data.map((doctor) => ({
        id: doctor.doc_id,
        firstName: doctor.doc_fname,
        lastName: doctor.doc_lname,
        phone_num: doctor.phone_num,
        email: doctor.email,
        age: doctor.age,
      }));
      setRows(formattedData);
    } catch (error) {
      console.error("Error fetching doctor data:", error);
    }
  };
  React.useEffect(() => {
    fetchDoctorData();
  }, [searchResults,rows]);
  return (
    <div className="admin-patient">
      <div className="action-buttons">
        <input
          type="text"
          placeholder="Search by ID.."
          onChange={(e) => {
            const searchTerm = e.target.value.toLowerCase();
            const filteredRows = rows.filter(
              (row) => row.id.toString().toLowerCase() === searchTerm
            );
            setSearchResults(filteredRows);
          }}
        />
        <AddDoctor />
      </div>
      <Paper sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={searchResults.length > 0 ? searchResults : rows}
          //track changes in rows
          onRowsChange={(newRows) => {
            setRows(newRows);
          }}
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
