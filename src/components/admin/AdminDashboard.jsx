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
import { EmploymentForm } from "../lazyLoading/LazyComponents";
import {
  EnrollmentForm,
  StudentDataUpdateForm,
} from "../lazyLoading/student/StudentsLazyLoadingComponents";
import { NavigationBar } from "../navbar/NavigationBar";
import { AdminDashboardOverview } from "./contents/overview/AdminDashboardOverview";
import { useSelector } from "react-redux";
import { getAuthUser } from "../../features/auth/authSlice";

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
  } = useOutletContext();
  const { adminCurrentLink, adminCurrentAction, studentId } = useParams();
  const navigate = useNavigate();

  const { authUser } = useSelector(getAuthUser);
  const { pathname } = useLocation();

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 140) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    console.log(window.scrollY > 10);

    // Cleanup the event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Box bgcolor={"#fff"}>
      <Box
        sx={
          {
            // position: isScrolled ? "none" : "block",
          }
        }
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
      </Box>
      {/* Show component based on current dashboard link */}
      <Box
        sx={{
          fontSize: "calc(0.7rem + 1vmin)",
          // marginTop: fixedNavbar ? "20rem" : "",
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
