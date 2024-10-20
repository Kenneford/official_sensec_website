import { Box } from "@mui/material";
import "./sidebar.scss";
import { useState } from "react";
import PropTypes from "prop-types";
import AdminSidebar from "./admin/AdminSidebar";

export default function SideBar({
  isSidebarOpen,
  toggleSidebar,
  setCurrentAction,
  setCurrentLink,
}) {
  const authAdminInfo = true;

  // State to check if navbar is scrolling
  const [navbar, setNavbar] = useState(false);

  // Get scroll position
  const pageScrolling = () => {
    if (window.scrollY >= 25) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };
  window.addEventListener("scroll", pageScrolling);

  return (
    <Box
      component="div"
      className="sidebar"
      sx={{
        backgroundColor: "#292929",
        padding: "3rem 0 5rem",
        width: isSidebarOpen ? "20%" : "8.5rem", // Change width when open/closed
        flexShrink: 0,
        transition: "width 0.5s ease", // Smooth transition when toggling
        position: "fixed",
        // Apply only when the device is in landscape and has a max-height (smaller screens)
        "@media screen and (max-width: 1024px) and (orientation: landscape)": {
          backgroundColor: "lightgreen",
          display: "none",
        },
      }}
    >
      {authAdminInfo && (
        <AdminSidebar
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          setCurrentAction={setCurrentAction}
          setCurrentLink={setCurrentLink}
          navbar={navbar}
        />
      )}
      <Box
        sx={{
          width: isSidebarOpen ? "20%" : "8.5rem",
        }}
        className="sideBarLogoutBtn"
      >
        <h5>Logout</h5>
        {/* <LogoutBtn isSidebarOpen={isSidebarOpen} /> */}
      </Box>
    </Box>
  );
}
{
  /* <>{authAdminInfo && <AdminSidebar />}</>; */
}

SideBar.propTypes = {
  setSidebarOpen: PropTypes.func,
  isSidebarOpen: PropTypes.bool,
  toggleSidebar: PropTypes.func,
  setCurrentAction: PropTypes.func,
  setCurrentLink: PropTypes.func,
};
