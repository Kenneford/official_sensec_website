import { Box } from "@mui/material";
import "./adminDashboard.scss";
import {
  Outlet,
  useLocation,
  useOutletContext,
  useParams,
} from "react-router-dom";
import {
  AdminDashboardOverview,
  AllAdmins,
  Blogs,
  ClassLevels,
  ClassSectionsData,
  CreateNewData,
  SchoolProgrammesData,
} from "../lazyLoading/admin/AdminLazyLoadingComponents";
import SearchForm from "../searchForm/SearchForm";
import { useState } from "react";

export function AdminDashboard() {
  const { isSidebarOpen } = useOutletContext();
  const { adminCurrentLink, adminCurrentAction, data } = useParams();

  const { pathname } = useLocation();
  console.log(pathname);

  const [pageScrolled, setPageScrolled] = useState(false);

  //FUNCTION TO CHECK PAGE SCROLL
  const detectPageScroll = () => {
    if (window.scrollY >= 25) {
      setPageScrolled(true);
    } else {
      setPageScrolled(false);
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
      }}
      bgcolor={"#fff"}
    >
      {/* Current Dashboard link */}
      <Box
        component={"div"}
        id="adminDashboardHeaderWrap"
        sx={{ width: "inherit", position: pageScrolled ? "fixed" : "" }}
      >
        <h1 className="dashAction">
          {adminCurrentAction?.replace(/_/g, "-")} /{" "}
          <span>{adminCurrentLink?.replace(/_/g, " ")}</span>
        </h1>
        <SearchForm value={""} onChange={""} />
      </Box>
      {/* Show component based on current dashboard link */}
      <Box
        sx={{
          fontSize: "calc(0.7rem + 1vmin)",
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
        {/* {adminCurrentLink === "Admins" && !pathname?.includes("new") && (
          <AllAdmins />
        )} */}
      </Box>
      <Outlet />
      {/* <DashBoardFooter /> */}
    </Box>
  );
}
