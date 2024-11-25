import { Box, Button, Drawer, Typography } from "@mui/material";
import "./sidebar.scss";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { AdminSidebar } from "../lazyLoading/admin/AdminLazyLoadingComponents";
import { StudentSideBar } from "./student/StudentSideBar";
import { useDispatch, useSelector } from "react-redux";
import { getAuthUser, userLogout } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FetchAllAcademicTerms,
  FetchCurrentAcademicTerms,
} from "../../data/term.year/FetchAcademicTerms";
import { FetchCurrentAcademicYear } from "../../data/term.year/FetchAcademicYears";
// import { AdminSidebar } from "../lazyLoading/admin/AdminLazyLoadingComponents";
// import AdminSidebar from "./admin/AdminSidebar";

export function SideBar({
  isSidebarOpen,
  setSidebarOpen,
  toggleSidebar,
  setCurrentAction,
  setCurrentLink,
  hovered,
  setHovered,
  drawerWidthCollapsed,
  drawerWidthExpanded,
}) {
  const authUser = useSelector(getAuthUser);
  const currentTerm = FetchCurrentAcademicTerms();
  const currentAcademicYear = FetchCurrentAcademicYear();

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
    <Drawer
      variant="permanent"
      anchor="left"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="sidebar"
      // open={hovered}
      // sx={{
      //   width: hovered ? drawerWidthExpanded : drawerWidthCollapsed,
      //   transition: "width 0.5s ease",
      //   flexShrink: 1,
      //   backgroundColor: "#292929",
      //   padding: "3rem 0 5rem",
      //   position: "relative",
      //   "& .MuiDrawer-paper": {
      //     width: hovered ? drawerWidthExpanded : drawerWidthCollapsed,
      //     overflowX: "hidden",
      //     boxSizing: "border-box",
      //     transition: "width 0.5s ease", // Smooth transition when toggling
      //     backgroundColor: "#292929",
      //   },
      // }}
      sx={{
        "& .MuiDrawer-paper": {
          position: "fixed", // Fix the drawer to the viewport
          top: 0,
          left: 0,
          height: "100vh",
          width: hovered ? drawerWidthExpanded : drawerWidthCollapsed, // Expand on hover
          transition: "width 0.3s", // Smooth width transition
          overflowX: "hidden", // Prevent content from spilling
          backgroundColor: "#292929", // Optional background color
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
          hovered={hovered}
          currentTerm={currentTerm}
          currentAcademicYear={currentAcademicYear}
        />
      )}
      {authUser?.roles?.includes("student") && (
        <StudentSideBar
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          setCurrentAction={setCurrentAction}
          setCurrentLink={setCurrentLink}
          navbar={navbar}
          currentTerm={currentTerm}
        />
      )}
      <Box
        sx={
          {
            // width: isSidebarOpen ? "20%" : "8.5rem",
          }
        }
        bgcolor={"red"}
        position={"absolute"}
        bottom={0}
        left={0}
        width={"inherit"}
        display={"flex"}
        justifyContent={"center"}
        // alignItems={"center"}
        // className="sideBarLogoutBtn"
      >
        <Button
          sx={{
            textTransform: "capitalize",
            color: "#fff",
            fontSize: "1rem",
            textAlign: hovered && "center",
            letterSpacing: "1px",
          }}
          onClick={handleLogout}
        >
          <Typography width={"100%"} textAlign={"center"}>
            Logout
          </Typography>
        </Button>
        {/* <LogoutBtn isSidebarOpen={isSidebarOpen} /> */}
      </Box>
    </Drawer>
    // <Box
    //   component="div"
    //   className="sidebar"
    //   sx={{
    //     backgroundColor: "#292929",
    //     padding: "3rem 0 5rem",
    //     width: isSidebarOpen ? "20%" : "8.5rem", // Change width when open/closed
    //     flexShrink: 0,
    //     transition: "width 0.5s ease", // Smooth transition when toggling
    //     position: "fixed",
    //     left: 0,
    //     top: 0,
    //     // Apply only when the device is in landscape and has a max-height (smaller screens)
    //     "@media screen and (max-width: 1024px) and (orientation: landscape)": {
    //       backgroundColor: "lightgreen",
    //       display: "none",
    //     },
    //   }}
    // >
    //   {authUser?.roles?.includes("admin") && (
    //     <AdminSidebar
    //       isSidebarOpen={isSidebarOpen}
    //       toggleSidebar={toggleSidebar}
    //       setCurrentAction={setCurrentAction}
    //       setCurrentLink={setCurrentLink}
    //       navbar={navbar}
    //     />
    //   )}
    //   {authUser?.roles?.includes("student") && (
    //     <StudentSideBar
    //       isSidebarOpen={isSidebarOpen}
    //       toggleSidebar={toggleSidebar}
    //       setCurrentAction={setCurrentAction}
    //       setCurrentLink={setCurrentLink}
    //       navbar={navbar}
    //     />
    //   )}
    //   <Box
    //     sx={{
    //       width: isSidebarOpen ? "20%" : "8.5rem",
    //     }}
    //     className="sideBarLogoutBtn"
    //   >
    //     <Button
    //       sx={{ textTransform: "capitalize", color: "#fff", fontSize: "1rem" }}
    //       onClick={handleLogout}
    //     >
    //       <Typography>Logout</Typography>
    //     </Button>
    //     {/* <LogoutBtn isSidebarOpen={isSidebarOpen} /> */}
    //   </Box>
    // </Box>
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
  hovered: PropTypes.bool,
  setHovered: PropTypes.func,
  drawerWidthCollapsed: PropTypes.number,
  drawerWidthExpanded: PropTypes.number,
};
