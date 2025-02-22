import { Avatar, Box, Stack, Typography } from "@mui/material";
import {
  Outlet,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import { NavigationBar } from "../navbar/NavigationBar";
import "./lecturerDashboard.scss";
import { useSelector } from "react-redux";
import { getAuthUser } from "../../features/auth/authSlice";
import { CreateReport } from "./components/reports/CreateReport";
import {
  ClassHandlingStudents,
  LecturerAttendance,
  ProgrammeStudents,
  SearchAttendance,
  SearchReport,
  Subjects,
  TeacherDashboardOverview,
} from "../lazyLoading/lecturer/LecturerLazyComponents";
import { ElectiveReport } from "./components/reports/ElectiveReport";
import NotAuthorized from "../notAuthorized/NotAuthorized";
import { useEffect } from "react";
import { toast } from "react-toastify";

export function LecturerDashboard() {
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
  const { lecturerCurrentAction, lecturerCurrentLink } = useParams();

  useEffect(() => {
    if (!authUser?.roles?.includes("Lecturer")) {
      toast.error("You are not an authorized user!", {
        position: "top-right",
        theme: "light",
        toastId: "unAuthorizedInfo",
      });
      return;
    }
  }, [authUser]);

  if (!authUser?.roles?.includes("Lecturer")) {
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
        {lecturerCurrentLink === "Overview" && <TeacherDashboardOverview />}
        {lecturerCurrentLink === "Class_Handling_Students" && (
          <ClassHandlingStudents />
        )}
        {lecturerCurrentLink === "Programme_Students" && <ProgrammeStudents />}
        {lecturerCurrentLink === "Subjects" && <Subjects />}
        {lecturerCurrentLink === "View_Attendance" && <LecturerAttendance />}
        {lecturerCurrentLink === "Search_Attendance" && <SearchAttendance />}
        {/* {lecturerCurrentLink === "create_report" && <CreateReport />} */}
        {/* {lecturerCurrentLink === "create_report" && <ElectiveReport />} */}
        {lecturerCurrentLink === "search" && <SearchReport />}
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
