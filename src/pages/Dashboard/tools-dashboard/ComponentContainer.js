import { Box } from "@mui/material";
import { useUserContext } from "../../../context/UserContext";
import AdminDashboard from "../AdminDashboard/AdminDashboard";
import AdminPatient from "../AdminDashboard/AdminPatient/AdminPatient";
import AdminDoctor from "../AdminDashboard/AdminDoctor/AdminDoctor";
import AdminAppointment from "../AdminDashboard/AdminAppointment/AdminAppointment";
import MyAppointment from "../DoctorDashboard/MyAppointment";
import AdminInventory from "../AdminDashboard/AdminInventory/AdminInventory";
import MyProfile from "../DoctorDashboard/MyProfile";
import UserProfile from "../UserDashboard/UserDashboard";
import MyAppointmentPatient from "../UserDashboard/MyAppointment";
import Logout from "../Logout.js";

const adminComponentList = {
  "/admin": <AdminDashboard />,
  "/admin-patient": <AdminPatient />,
  "/admin-doctor": <AdminDoctor />,
  "/admin-appointment": <AdminAppointment />,
  "/admin-inventory": <AdminInventory />,
  "/logout": <Logout />, // Placeholder for logout component
};
const doctorComponentList = {
  "/doctor": <MyProfile />,
  "/doctorAppointment": <MyAppointment />,
  "/logout": <Logout />, // Placeholder for logout component
};
const patientComponentList = {
  "/patient": <UserProfile />,
  "/my-appointment": <MyAppointmentPatient />,
  "/logout": <Logout />, // Placeholder for logout component
};
function Componentcontainer({ pathname }) {
  const { role } = useUserContext();
  console.log(role);
  console.log("userRole from comp container " + role);
  let componentList;
  switch (role) {
    case "admin":
      // Render admin components
      componentList = adminComponentList;
      break;
    case "doctor":
      // Render user components
      componentList = doctorComponentList;
      break;
    case "patient":
      // Handle unknown roles or redirect to a default component
      componentList = patientComponentList;
      break;
    default:
      // Handle unknown roles or redirect to a default component
      componentList = patientComponentList;
      break;
  }

  // Default to MainDashboard if path is empty or unrecognized
  const componentToRender =
    componentList[pathname] || componentList[`/${role}`];

  return (
    <Box
      sx={{
        background: "#111827",
        height: "100vh",
        p: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {componentToRender}
    </Box>
  );
}

export default Componentcontainer;
