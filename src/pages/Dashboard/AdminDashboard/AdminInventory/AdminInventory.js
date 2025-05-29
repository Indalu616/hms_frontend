import { Inventory } from "@mui/icons-material";
import React from "react";
import InventoryTable from "./InventoryTable";
import "./AdminInventory.css";
import axios from "axios";
//  "drug_name": "Humira",
//   "supplier_name": "Vital Meds Co.",
//   "supp_id": 10,
//   "supplied_date": "2023-09-04T20:00:00.000Z",
//   "duration": "21"
function AdminInventory() {
  const [suppliers, setSuppliers] = React.useState([]);

  //fetching suppliers data from the API
  React.useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/medications/longest-inventory"
        );
        const data = response.data;
        setSuppliers(data);
      } catch (error) {
        console.error("Error fetching suppliers:", error);
      }
    };

    fetchSuppliers();
  }, []);
  return (
    <div className="admin-inventory">
      <div className="supplier-whose-stayed-longest">
        <div className="supplier-icon">
          <Inventory />
          <h3>Supplier Whose Item Stayed Longest In inventory</h3>
        </div>
        {suppliers?.map((supplier) => (
          <div className="supplier-details" key={supplier.supp_id}>
            <div className="supplier-text">
              <p>Supplier Name: {supplier.supplier_name}</p>
              <p>Supplier ID: {supplier.supp_id}</p>
              <p>Supplied Date: {new Date(supplier.supplied_date).toLocaleDateString()}</p>
              <p>Duration: {supplier.duration} Month(s)</p>
              <p>Medication Name: {supplier.drug_name}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="admin-inventory-header">
        <h2>Manage Available Medications</h2>
        <p>
          Focus on your administrative Task, we will take care of the
          development
        </p>
      </div>
      <div className="medication-table">
        <InventoryTable />
      </div>
    </div>
  );
}

export default AdminInventory;
