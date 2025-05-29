import { useUserContext } from "../../../context/UserContext";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import EventIcon from "@mui/icons-material/Event";
import InventoryIcon from "@mui/icons-material/Inventory";
import LogoutIcon from "@mui/icons-material/Logout";

function SideNavList() {
  let sideNav;
  const { role } = useUserContext();
  switch (role) {
    case "admin":
      // Render admin components
      sideNav = [
        {
          segment: "admin",
          title: "Main Dashboard",
          icon: <AdminPanelSettingsIcon />,
        },
        {
          segment: "admin-patient",
          title: "Patients",
          icon: <LocalHospitalIcon />,
        },
        {
          segment: "admin-doctor",
          title: "Doctors",
          icon: <LocalShippingIcon />,
        },

        {
          segment: "admin-appointment",
          title: "Appointments",
          icon: <EventIcon />,
        },
        {
          segment: "admin-inventory",
          title: "Inventory",
          icon: <InventoryIcon />,
        },
        {
          segment: "logout",
          title: "Logout",
          icon: <LogoutIcon />,
          isLogout: true, // Custom flag for special handling
        },
      ];
      break;
    case "doctor":
      // Render user components
      sideNav = [
        { segment: "doctor", title: "Profile" },
        { segment: "doctorAppointment", title: "Appointments" },
        {
          segment: "logout",
          title: "Logout",
          icon: <LogoutIcon />,
          isLogout: true, // Custom flag for special handling
        },
      ];
      break;
    case "patient":
      // Handle unknown roles or redirect to a default component
      sideNav = [
        {
          segment: "my-dashboard",
          title: "Profile",
          icon: <AdminPanelSettingsIcon />,
        },
        {
          segment: "my-appointment",
          title: "My Appointments",
          icon: <EventIcon />,
        },
        {
          segment: "logout",
          title: "Logout",
          icon: <LogoutIcon />,
          isLogout: true, // Custom flag for special handling
        },
      ];
      break;
    default:
      // Handle unknown roles or redirect to a default component
      sideNav = [
        {
          segment: "logout",
          title: "Logout",
          icon: <LogoutIcon />,
          isLogout: true, // Custom flag for special handling
        },
        // { segment: "Imagegenerator", title: "Image Generator" },
      ];
  }

  return sideNav;
}
export default SideNavList;
