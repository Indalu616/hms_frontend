import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../AdminDoctor/AdminDoctor.css";
import axios from "axios";

function AddSupplier() {
  const [show, setShow] = useState(false);
  const [departments, setDepartments] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [doctorData, setDoctorData] = useState({
    firstName: "",
    lastName: "",
    birth_date: "",
    email: "",
    age: "",
    gender: "",
    phone_num: "",
    insurance_provider: "",
    insurance_id: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDoctorData({ ...doctorData, [name]: value });
  };
  //handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/medications/add-supplier",
        doctorData
      );
      console.log("Supplier added successfully:", response.data);
      // Optionally, you can close the modal and reset the form here
      handleClose();
      setDoctorData({
        firstName: "",
        email: "",
        phone_num: "",
      });
      alert("Supplier added successfully");
    } catch (error) {
      console.error("Error:", error);
      alert("Error adding Supplier");
    }
  };
  useEffect(() => {
    console.log("Doctor Data:", doctorData);
  }, [doctorData]);

  return (
    <>
      <Button onClick={handleShow}>Add Supplier +</Button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add New Supplier</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">
                Supplier Name
              </label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                onChange={handleInputChange}
                name="firstName"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                onChange={handleInputChange}
                name="email"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                Phone Number
              </label>
              <input
                type="tel"
                className="form-control"
                id="phone"
                onChange={handleInputChange}
                name="phone_num"
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Add +
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddSupplier;
