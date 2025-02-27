import React, { useEffect, useState } from "react";
import "./studentDashboard.scss";
import { DataGridPro } from "@mui/x-data-grid-pro";
import { useDemoData } from "@mui/x-data-grid-generator";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import DataTable from "react-data-table-component";
import { toast } from "react-toastify";
import NotAuthorized from "../notAuthorized/NotAuthorized";
import {
  Outlet,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { getAuthUser } from "../../features/auth/authSlice";
import { NavigationBar } from "../navbar/NavigationBar";
import {
  CourseMates,
  StudentDashboardOverview,
} from "../lazyLoading/student/StudentsLazyLoadingComponents";

export function StudentDashboard() {
  const authUser = useSelector(getAuthUser);

  const navigate = useNavigate();
  const {
    currentAction,
    setCurrentAction,
    currentLink,
    setCurrentLink,
    setOpenSubNavLinks,
    openSubNavLinks,
    setOpenUserActions,
    openUserActions,
    setOpenSignUpActions,
    openSignUpActions,
    setOpenMenuLinks,
    openMenuLinks,
    isSidebarOpen,
    openSearchModal,
    setOpenSearchModal,
    hovered,
    setHovered,
    drawerWidthCollapsed,
    drawerWidthExpanded,
  } = useOutletContext();
  const { studentCurrentAction, studentCurrentLink } = useParams();
  console.log(studentCurrentLink);

  useEffect(() => {
    if (!authUser?.roles?.includes("Student")) {
      toast.error("You are not an authorized user!", {
        position: "top-right",
        theme: "light",
        toastId: "unAuthorizedInfo",
      });
      return;
    }
  }, [authUser]);

  if (!authUser?.roles?.includes("Student")) {
    return <NotAuthorized />;
  }

  return (
    <Box>
      <Stack
        direction="column"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
          padding: ".3rem 0",
          height: "4.5rem",
        }}
      >
        <Box
          onClick={() => {
            // Click handler
            localStorage.removeItem("currentNavLink");
            navigate("/sensec/homepage");
          }}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <Avatar
            src="/assets/sensec-logo1.png"
            sx={{ alignItems: "center" }}
          />
          <Box sx={{ display: "flex", height: "1.5rem" }}>
            <Typography variant="h6" color="green">
              Sen
            </Typography>
            <Typography variant="h6" color="#aeae0d">
              sec
            </Typography>
          </Box>
        </Box>
      </Stack>
      <Box>
        <NavigationBar
          setOpenSubNavLinks={setOpenSubNavLinks}
          openSubNavLinks={openSubNavLinks}
          setOpenUserActions={setOpenUserActions}
          openUserActions={openUserActions}
          setOpenSignUpActions={setOpenSignUpActions}
          openSignUpActions={openSignUpActions}
          setOpenMenuLinks={setOpenMenuLinks}
          openMenuLinks={openMenuLinks}
          currentAction={currentAction}
          setCurrentAction={setCurrentAction}
          currentLink={currentLink}
          setCurrentLink={setCurrentLink}
          isSidebarOpen={isSidebarOpen}
          openSearchModal={openSearchModal}
          setOpenSearchModal={setOpenSearchModal}
        />
      </Box>
      <Box
        sx={{
          fontSize: "calc(0.7rem + 1vmin)",
          // marginTop: fixedNavbar ? "20rem" : "",
        }}
      >
        {studentCurrentLink === "Overview" && <StudentDashboardOverview />}
        {studentCurrentLink === "Coursemates" && <CourseMates />}
        {studentCurrentLink === "Lecturers" && <StudentDashboardOverview />}
        {studentCurrentLink === "Weekly_Lectures" && (
          <StudentDashboardOverview />
        )}
        {studentCurrentLink === "Blogs" && <StudentDashboardOverview />}
      </Box>
      <Outlet
        context={{
          currentAction,
          setCurrentAction,
          currentLink,
          setCurrentLink,
          setOpenSubNavLinks,
          openSubNavLinks,
          setOpenUserActions,
          openUserActions,
          setOpenSignUpActions,
          openSignUpActions,
          setOpenMenuLinks,
          openMenuLinks,
          isSidebarOpen,
          openSearchModal,
          setOpenSearchModal,
          hovered,
          setHovered,
          drawerWidthCollapsed,
          drawerWidthExpanded,
        }}
      />
    </Box>
  );
}
