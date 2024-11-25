import { Avatar, Box, Stack, Typography } from "@mui/material";
import "./adminDashboard.scss";
import {
  Outlet,
  useLocation,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import {
  AdminAttendance,
  AdminDashboardOverview,
  AllAdmins,
  AllEnrolledStudents,
  Blogs,
  ClassLevels,
  ClassSectionsData,
  CreateNewData,
  PlacementStudents,
  SchoolProgrammesData,
  SearchAttendance,
} from "../lazyLoading/admin/AdminLazyLoadingComponents";
import SearchForm from "../searchForm/SearchForm";
import { useEffect, useState } from "react";
import { EmploymentForm, NavigationBar } from "../lazyLoading/LazyComponents";
import {
  EnrollmentForm,
  StudentDataUpdateForm,
} from "../lazyLoading/student/StudentsLazyLoadingComponents";

export function AdminDashboard() {
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
  const { adminCurrentLink, adminCurrentAction, studentId } = useParams();
  const navigate = useNavigate();

  const { pathname } = useLocation();

  const [pageScrolled, setPageScrolled] = useState(false);
  const [fixedNavbar, setFixedNavbar] = useState(false);

  const dashWidth = window?.innerWidth - 136;

  //FUNCTION TO CHECK PAGE SCROLL
  const detectPageScroll = () => {
    if (window.scrollY >= 25) {
      setPageScrolled(true);
    } else {
      setPageScrolled(false);
    }
    if (window.scrollY >= 25) {
      setFixedNavbar(true);
    } else {
      setFixedNavbar(false);
    }
  };
  window.addEventListener("scroll", detectPageScroll);

  return (
    <Box
      // overflow={"hidden"}
      // component="main"
      // sx={{
      //   // flex: 5,
      //   // marginLeft: { xs: "0", sm: "20%" }, // The sidebar width
      //   // padding: "1rem",
      //   width: isSidebarOpen ? "80%" : "92.2%",
      //   // flexGrow: 1,
      //   marginLeft: isSidebarOpen ? "20%" : "8.5rem", // Adjust margin based on sidebar state
      //   // padding: "16px",
      //   transition: "margin-left 0.5s ease", // Smooth transition for main content
      //   // Apply only when the device is in landscape and has a max-height (smaller screens)
      //   "@media screen and (max-width: 1024px) and (orientation: landscape)": {
      //     marginLeft: "0%", // Adjust margin based on sidebar state,
      //     width: "100%",
      //   },

      //   // Apply only when the device is in portrait and has a max-height (smaller screens)
      //   "@media screen and (max-width: 1024px) and (orientation: portrait)": {
      //     marginLeft: "0%", // Adjust margin based on sidebar state,
      //     width: "100%",
      //   },
      //   "@media screen and (min-width: 1024px) (max-width: 1200px) and (orientation: landscape)":
      //     {
      //       marginLeft: isSidebarOpen ? "20%" : "8.5rem", // Adjust margin based on sidebar state,
      //     },
      //   // minHeight: "100vh",
      // }}
      bgcolor={"#fff"}
    >
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
      <Box display={fixedNavbar ? "none" : "flex"}>
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
      {/* Show component based on current dashboard link */}
      <Box
        sx={{
          fontSize: "calc(0.7rem + 1vmin)",
          marginTop: fixedNavbar ? "8rem" : "",
        }}
      >
        {adminCurrentLink === "Overview" && <AdminDashboardOverview />}
        {adminCurrentLink === "Class_Levels" && <ClassLevels />}
        {adminCurrentLink === "Class_Sections" && <ClassSectionsData />}
        {adminCurrentLink === "Programmes_&_Subjects" && (
          <SchoolProgrammesData />
        )}
        {adminCurrentLink === "Blogs" && <Blogs />}
        {adminCurrentLink === "Create_Data" && !pathname?.includes("new") && (
          <CreateNewData />
        )}
        {adminCurrentLink === "Placement_Students" && <PlacementStudents />}
        {adminCurrentLink === "View_Attendance" && <AdminAttendance />}
        {adminCurrentLink === "Search_Attendance" && <SearchAttendance />}
        {adminCurrentLink === "new_employment" && <EmploymentForm />}
        {adminCurrentAction === "employees" &&
          adminCurrentLink === "update" && <EmploymentForm />}
        {adminCurrentAction === "Students" && studentId && (
          <StudentDataUpdateForm />
        )}
        {adminCurrentAction === "Admins" && studentId && <EmploymentForm />}
        {/* {adminCurrentLink === "Admins" && !pathname?.includes("new") && (
          <AllAdmins />
        )} */}
      </Box>
      <Outlet />
    </Box>
  );
}
