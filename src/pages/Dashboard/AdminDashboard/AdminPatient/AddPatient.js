import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../AdminDoctor/AdminDoctor.css";
import axios from "axios";

function AddPatient() {
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
  // Fetch departments from the server
  const fetchInsurance = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/patients/insurance-providers"
      );
      const data = response.data;
      setDepartments(data);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };
  //handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/patients/create_patient",
        doctorData
      );
      console.log("Doctor added successfully:", response.data);
      // Optionally, you can close the modal and reset the form here
      handleClose();
      setDoctorData({
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
      alert("Patient added successfully");
    } catch (error) {
      console.error("Error:", error);
      alert("Error adding Patient");
    }
  };
  useEffect(() => {
    fetchInsurance();
  }, []);
  useEffect(() => {
    console.log("Doctor Data:", doctorData);
  }, [doctorData]);

  return (
    <>
      <Button onClick={handleShow}>Add Patient +</Button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add New Patient</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">
                First Name
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
              <label htmlFor="lastName" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                onChange={handleInputChange}
                name="lastName"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="birth-date" className="form-label">
                Birth Date
              </label>
              <input
                type="date"
                className="form-control"
                id="birth-date"
                onChange={handleInputChange}
                name="birth_date"
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
              <label htmlFor="age" className="form-label">
                Age
              </label>
              <input
                type="number"
                className="form-control"
                id="age"
                onChange={handleInputChange}
                name="age"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="department" className="form-label">
                Gender
              </label>
              <select
                className="form-select"
                id="gender"
                onChange={handleInputChange}
                name="gender"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
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
            {/* select department */}
            <div className="mb-3">
              <label htmlFor="department" className="form-label">
                Insurance Provider
              </label>
              <select
                className="form-select"
                id="department"
                onChange={handleInputChange}
                name="department_id"
              >
                <option value="">Select Insurance</option>
                {departments.map((department) => (
                  <option
                    key={department.insurance_id}
                    value={department.insurance_id}
                  >
                    {department.insurance_name}
                  </option>
                ))}
                {/* Add more departments as needed */}
              </select>
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

export default AddPatient;
