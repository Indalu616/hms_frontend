import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./AdminDoctor.css";
import axios from "axios";

function AddDoctor() {
  const [show, setShow] = useState(false);
  const [departments, setDepartments] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [doctorData, setDoctorData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    age: "",
    phone_num: "",
    department_id: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDoctorData({ ...doctorData, [name]: value });
  };
  // Fetch departments from the server
  const fetchDepartments = async () => {
    try {
      const response = await axios.get("http://localhost:5000/departments");
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
        "http://localhost:5000/doctors",
        doctorData
      );
      console.log("Doctor added successfully:", response.data);
      // Optionally, you can close the modal and reset the form here
      handleClose();
      setDoctorData({
        firstName: "",
        lastName: "",
        email: "",
        age: "",
        phone_num: "",
        department: "",
      });
      alert("Doctor added successfully");
    } catch (error) {
      console.error("Error:", error);
      alert("Error adding doctor");
    }
  };
  useEffect(() => {
    fetchDepartments();
  }, []);
  useEffect(() => {
    console.log("Doctor Data:", doctorData);
  }, [doctorData]);

  return (
    <>
      <Button onClick={handleShow}>Add Doctor +</Button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add New Doctor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">
                First Name
              </label>
              <input type="text" className="form-control" id="firstName" onChange={handleInputChange} name="firstName"/>
            </div>
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">
                Last Name
              </label>
              <input type="text" className="form-control" id="lastName" onChange={handleInputChange} name="lastName"/>
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input type="email" className="form-control" id="email" onChange={handleInputChange} name="email"/>
            </div>
            <div className="mb-3">
              <label htmlFor="age" className="form-label">
                Age
              </label>
              <input type="number" className="form-control" id="age" onChange={handleInputChange} name="age"/>
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                Phone Number
              </label>
              <input type="tel" className="form-control" id="phone" onChange={handleInputChange} name="phone_num"/>
            </div>
            {/* select department */}
            <div className="mb-3">
              <label htmlFor="department" className="form-label">
                Department
              </label>
              <select className="form-select" id="department" onChange={handleInputChange} name="department_id">
                <option value="">Select Department</option>
                {departments.map((department) => (
                  <option key={department.id} value={department.dept_id}>
                    {department.dept_name}
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

export default AddDoctor;
