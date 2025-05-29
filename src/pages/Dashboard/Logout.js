import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Logout() {
  const navigate = useNavigate();
  useEffect(() => {
    // Clear user data from local storage or state management
    localStorage.removeItem("user");
    // Redirect to the login page
    navigate("/");
  }, [navigate]);
  return <div>Logout</div>;
}

export default Logout;
