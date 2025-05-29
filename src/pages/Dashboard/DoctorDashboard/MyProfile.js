import React from "react";
import "./MyProfile.css";
import { useUserContext } from "../../../context/UserContext";
function MyProfile() {
  //   {
  //   "doc_id": 2,
  //   "doc_fname": "Sarah",
  //   "doc_lname": "Johnson",
  //   "phone_num": "0509876543",
  //   "email": "sarah.johnson@example.com",
  //   "age": 38,
  //   "dept_id": 2
  // }
  const { user } = useUserContext();
  const { doc_fname, doc_lname, phone_num, email, age, dept_id } = user || {};

  return (
    <div className="my-profile">
      <div className="my-profile-header">
        <h3>
          Dr. {doc_fname} {doc_lname}{" "}
        </h3>
        <p>Manage your profile information</p>
      </div>
      <div className="my-profile-content">
        <div className="profile-card">
          <h2>Profile Information</h2>
          <p>First Name: {doc_fname}</p>
          <p>Last Name: {doc_lname}</p>
          <p>Age: {age}</p>
          <p>Email: {email}</p>
          <p>Phone: {phone_num}</p>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
