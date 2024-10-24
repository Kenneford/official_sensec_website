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
import { NavigationBar } from "../lazyLoading/LazyComponents";

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
    setOpenMenuLinks,
    openMenuLinks,
    isSidebarOpen,
  } = useOutletContext();
  const { adminCurrentLink, adminCurrentAction, data } = useParams();
  const navigate = useNavigate();

  const { pathname } = useLocation();
  console.log(pathname);

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
      flexGrow={5}
      component="main"
      sx={{
        // flex: 5,
        // marginLeft: { xs: "0", sm: "20%" }, // The sidebar width
        // padding: "1rem",
        width: isSidebarOpen ? "80%" : "92.2%",
        // flexGrow: 1,
        marginLeft: isSidebarOpen ? "20%" : "8.5rem", // Adjust margin based on sidebar state
        // padding: "16px",
        transition: "margin-left 0.5s ease", // Smooth transition for main content
        // Apply only when the device is in landscape and has a max-height (smaller screens)
        "@media screen and (max-width: 1024px) and (orientation: landscape)": {
          marginLeft: "0%", // Adjust margin based on sidebar state,
          width: "100%",
        },

        // Apply only when the device is in portrait and has a max-height (smaller screens)
        "@media screen and (max-width: 1024px) and (orientation: portrait)": {
          marginLeft: "0%", // Adjust margin based on sidebar state,
          width: "100%",
        },
        "@media screen and (min-width: 1024px) (max-width: 1200px) and (orientation: landscape)":
          {
            marginLeft: isSidebarOpen ? "20%" : "8.5rem", // Adjust margin based on sidebar state,
          },
        // minHeight: "100vh",
      }}
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
          setOpenMenuLinks={setOpenMenuLinks}
          openMenuLinks={openMenuLinks}
          currentAction={currentAction}
          setCurrentAction={setCurrentAction}
          currentLink={currentLink}
          setCurrentLink={setCurrentLink}
          isSidebarOpen={isSidebarOpen}
        />
      </Box>
      {/* <Box
        component={"div"}
        id="adminDashboardHeaderWrap"
        sx={{
          position: "sticky",
          top: 0,
          backgroundColor: "#fff",
          padding: 0,
          // zIndex: 1,
        }}
        minHeight={"4rem"}
        // sx={{
        //   // width: "100%",
        //   position: fixedNavbar ? "fixed" : "",
        //   top: 0,
        //   // marginTop: fixedNavbar && !pageScrolled ? "4.5rem" : "",
        //   width:
        //     isSidebarOpen && !fixedNavbar
        //       ? "100%"
        //       : !isSidebarOpen && fixedNavbar
        //       ? "94.5%"
        //       : isSidebarOpen && fixedNavbar
        //       ? "80%"
        //       : "100%",
        //   "@media screen and (max-width: 1024px) and (orientation: landscape)":
        //     {
        //       marginLeft: "0%", // Adjust margin based on sidebar state,
        //       width: "100%",
        //     },

        //   // Apply only when the device is in portrait and has a max-height (smaller screens)
        //   "@media screen and (max-width: 1024px) and (orientation: portrait)": {
        //     marginLeft: "0%", // Adjust margin based on sidebar state,
        //     width: "100%",
        //   },
        //   "@media screen and (min-width: 1024px) (max-width: 1200px) and (orientation: landscape)":
        //     {
        //       marginLeft: isSidebarOpen ? "20%" : "8.5rem", // Adjust margin based on sidebar state,
        //     },
        // }}
      >
        <h1 className="dashAction">
          {adminCurrentAction?.replace(/_/g, "-")} /{" "}
          <span>{adminCurrentLink?.replace(/_/g, " ")}</span>
        </h1>
        {window?.innerWidth >= 900 && (
          <SearchForm
            value={""}
            onChange={""}
            placeholder={"Search attendance by title"}
          />
        )}
      </Box> */}
      {/* <Box
        id="adminDashboardHeaderWrap"
        sx={{
          position: fixedNavbar ? "fixed" : "relative",
          // left: 0,
        }}
        width={
          fixedNavbar && isSidebarOpen
            ? "80%"
            : !isSidebarOpen && fixedNavbar
            ? window?.innerWidth - 136
            : "100%"
        }
        // width={fixedNavbar && !isSidebarOpen ? window?.innerWidth - 136 : "100%"}
      >
        <h1 className="dashAction">
          {adminCurrentAction?.replace(/_/g, "-")} /{" "}
          <span>{adminCurrentLink?.replace(/_/g, " ")}</span>
        </h1>
        <SearchForm value={""} onChange={""} />
      </Box> */}
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
        {/* {adminCurrentLink === "Admins" && !pathname?.includes("new") && (
          <AllAdmins />
        )} */}
      </Box>
      <Outlet />
      {/* <DashBoardFooter /> */}
    </Box>
  );
}
