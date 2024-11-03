import { Box, Button, Typography } from "@mui/material";
import "./sidebar.scss";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { AdminSidebar } from "../lazyLoading/admin/AdminLazyLoadingComponents";
import { StudentSideBar } from "./student/StudentSideBar";
import { useDispatch, useSelector } from "react-redux";
import { getAuthUser, userLogout } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import { AdminSidebar } from "../lazyLoading/admin/AdminLazyLoadingComponents";
// import AdminSidebar from "./admin/AdminSidebar";

export default function SideBar({
  isSidebarOpen,
  setSidebarOpen,
  toggleSidebar,
  setCurrentAction,
  setCurrentLink,
}) {
  const authUser = useSelector(getAuthUser);
  console.log(isSidebarOpen);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const handleLogout = (e) => {
    e.preventDefault();
    if (authUser) {
      dispatch(userLogout());
      navigate("/sensec/homepage");
      toast.success("You logged out Successfully!", {
        position: "top-right",
        theme: "dark",
        toastId: "loggedOut",
      });
      // localStorage.removeItem("currentNavLink");
    }
  };

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
        left: 0,
        top: 0,
        // Apply only when the device is in landscape and has a max-height (smaller screens)
        "@media screen and (max-width: 1024px) and (orientation: landscape)": {
          backgroundColor: "lightgreen",
          display: "none",
        },
      }}
    >
      {authUser?.roles?.includes("admin") && (
        <AdminSidebar
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          setCurrentAction={setCurrentAction}
          setCurrentLink={setCurrentLink}
          navbar={navbar}
        />
      )}
      {authUser?.roles?.includes("student") && (
        <StudentSideBar
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
        <Button
          sx={{ textTransform: "capitalize", color: "#fff", fontSize: "1rem" }}
          onClick={handleLogout}
        >
          <Typography>Logout</Typography>
        </Button>
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
