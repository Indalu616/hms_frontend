import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import "./TopN.css";
import "./AdminDoctor.css";
import axios from "axios";
const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },
  {
    field: "patientCount",
    headerName: "Patient Count",
    type: "number",
    width: 160,
  },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function TopNDoctor() {
  const [rows, setRows] = React.useState([]);
  const [searchResults, setSearchResults] = React.useState([]);
  const [topN, setTopN] = React.useState(2);
  //fetch doctor data from the server
  const fetchDoctorData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/doctors/top-doctors/" + topN
      );
      const data = response.data;
      const formattedData = data.map((doctor,index) => ({
        id: index + 1, // Use index as ID for display purposes
        firstName: doctor.doc_fname,
        lastName: doctor.doc_lname,
        patientCount: doctor.patient_count,
      }));
      setRows(formattedData);
      setSearchResults(formattedData);
    } catch (error) {
      console.error("Error fetching doctor data:", error);
    }
  };
  React.useEffect(() => {
    fetchDoctorData();
  }, [searchResults, rows, topN]);
  return (
    <div className="admin-patient">
      <div className="action-buttons">
        <div className="input-group">
          <label htmlFor="top">Select Top: </label>
          <select
            name="top_doc"
            id="top"
            onChange={(e) => setTopN(e.target.value)}
          >
            <option value="1">1</option>
            <option value="2" selected>
              2
            </option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>
      </div>
      <Paper sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
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
