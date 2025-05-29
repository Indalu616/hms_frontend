import React, { use } from "react";
import "../DoctorDashboard/MyProfile.css";
import { useUserContext } from "../../../context/UserContext";
function UserProfile() {
  const { user } = useUserContext();
  // Destructuring user object to extract necessary fields
  const {
    age,
    birth_date,
    email,
    gender,
    insurance,
    patient_fname,
    patient_id,
    patient_lname,
    phone_num,
  } = user || {};
  return (
    <div className="my-profile">
      <div className="my-profile-header">
        <h3>
          Welcome, {patient_fname} {patient_lname}
        </h3>
        <p>Manage your profile information</p>
      </div>
      <div className="my-profile-content">
        <div className="profile-card">
          <h2>Profile Information</h2>
          <p>First Name:{patient_fname}</p>
          <p>Last Name:{patient_lname}</p>
          <p>Email: {email}</p>
          <p>Age: {age}</p>
          <p>Gender:{gender}</p>
          <p>Birth Date: {birth_date}</p>
          <p>Phone: {phone_num}</p>
          <p>Insurance: {insurance}</p>
        </div>
      </div>
      <div className="my-profile-footer">
        <button className="update-button">Update Profile</button>
      </div>
    </div>
  );
}

export default UserProfile;
