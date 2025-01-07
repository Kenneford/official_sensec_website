import { Box, Button, Drawer, Typography } from "@mui/material";
import "./sidebar.scss";
import { useState } from "react";
import PropTypes from "prop-types";
import { StudentSideBar } from "./student/StudentSideBar";
import { useDispatch, useSelector } from "react-redux";
import { getAuthUser, userLogout } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FetchCurrentAcademicTerms } from "../../data/term.year/FetchAcademicTerms";
import { FetchCurrentAcademicYear } from "../../data/term.year/FetchAcademicYears";
import { AdminSidebar } from "./admin/AdminSidebar";
import { LecturerSidebar } from "./lecturer/LecturerSidebar";

export function SideBar({
  toggleSidebar,
  setCurrentAction,
  setCurrentLink,
  drawerWidthCollapsed,
  drawerWidthExpanded,
}) {
  const authUser = useSelector(getAuthUser);
  const currentTerm = FetchCurrentAcademicTerms();
  const currentAcademicYear = FetchCurrentAcademicYear();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [hovered, setHovered] = useState(false);

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
    <Box>
      <Drawer
        variant="permanent"
        anchor="left"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="sidebar"
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
        {authUser?.roles?.includes("Admin") && (
          <AdminSidebar
            toggleSidebar={toggleSidebar}
            setCurrentAction={setCurrentAction}
            setCurrentLink={setCurrentLink}
            currentTerm={currentTerm}
            currentAcademicYear={currentAcademicYear}
            hovered={hovered}
          />
        )}
        {authUser?.roles?.includes("Lecturer") && (
          <LecturerSidebar
            toggleSidebar={toggleSidebar}
            setCurrentAction={setCurrentAction}
            setCurrentLink={setCurrentLink}
            currentTerm={currentTerm}
            currentAcademicYear={currentAcademicYear}
            hovered={hovered}
          />
        )}
        {authUser?.roles?.includes("student") && (
          <StudentSideBar
            toggleSidebar={toggleSidebar}
            setCurrentAction={setCurrentAction}
            setCurrentLink={setCurrentLink}
            currentTerm={currentTerm}
            currentAcademicYear={currentAcademicYear}
            hovered={hovered}
          />
        )}
        <Box
          bgcolor={"red"}
          position={"absolute"}
          bottom={0}
          left={0}
          width={"inherit"}
          display={"flex"}
          justifyContent={"center"}
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
    </Box>
  );
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
