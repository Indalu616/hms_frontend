import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import AlertDialog from "./AlertDialog";
import CustomizedDialogs from "./CustomizedDialog";
import "../AdminPatient/AdminPatient.css";
import AddSupplier from "./AddSupplier";
const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "supplier_name", headerName: "Supplier Name", width: 130 },
  { field: "med_name", headerName: "Medication Name", width: 130 },
  { field: "supp_date", headerName: "Supplied Date", width: 130 },
  {
    field: "exp_date",
    headerName: "Expiration Date",
    width: 160,
    sortable: true,
  },
  {
    field: "quantity",
    headerName: "Quantity",
    description: "This column has a value getter and is not sortable.",
    sortable: true,
    width: 180,
  },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function InventoryTable() {
  const [rows, setRows] = React.useState([]);
  const [searchResults, setSearchResults] = React.useState([]);

  //fetch patient data from the server
  const fetchInventory = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/medications/inventory"
      );
      const data = await response.json();
      const formattedData = data.map((patient) => ({
        id: patient.invent_id,
        supplier_name: patient.supplier_name,
        med_name: patient.drug_name,
        supp_date: new Date(patient.supplied_date).toLocaleDateString(),
        exp_date: new Date(patient.expiration_date).toLocaleDateString(),
        quantity: patient.quantity,
      }));
      setRows(formattedData);
    } catch (error) {
      console.error("Error fetching patient data:", error);
    }
  };
  React.useEffect(() => {
    fetchInventory();
  }, [searchResults]);
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
        <AddSupplier />
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
