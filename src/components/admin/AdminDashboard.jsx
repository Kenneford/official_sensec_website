import { Box } from "@mui/material";
import React from "react";
import { useOutletContext, useParams } from "react-router-dom";
import {
  AdminDashboardOverview,
  ClassLevels,
} from "../lazyLoading/AuthLazyComponents";

export function AdminDashboard() {
  const { isSidebarOpen } = useOutletContext();
  const { adminCurrentLink } = useParams();
  return (
    <Box
      flexGrow={5}
      component="main"
      sx={{
        // flex: 5,
        // marginLeft: { xs: "0", sm: "20%" }, // The sidebar width
        // padding: "1rem",

        flexGrow: 1,
        marginLeft: isSidebarOpen ? "20%" : "8.5rem", // Adjust margin based on sidebar state
        // padding: "16px",
        transition: "margin-left 0.5s ease", // Smooth transition for main content
        // Apply only when the device is in landscape and has a max-height (smaller screens)
        "@media screen and (max-width: 1024px) and (orientation: landscape)": {
          marginLeft: "0%", // Adjust margin based on sidebar state,
        },

        // Apply only when the device is in portrait and has a max-height (smaller screens)
        "@media screen and (max-width: 1024px) and (orientation: portrait)": {
          marginLeft: "0%", // Adjust margin based on sidebar state,
        },
        "@media screen and (min-width: 1024px) (max-width: 1200px) and (orientation: landscape)":
          {
            marginLeft: isSidebarOpen ? "20%" : "8.5rem", // Adjust margin based on sidebar state,
          },
      }}
      bgcolor={"#fff"}
    >
      {adminCurrentLink === "Overview" && <AdminDashboardOverview />}
      {adminCurrentLink === "Class_Levels" && <ClassLevels />}
    </Box>
    //   <Box
    //     component="main"
    //     sx={{
    //       flex: 5,
    //       marginLeft: "20%", // The sidebar width
    //       padding: "16px",
    //     }}
    //   >
    //     {/* Your main content */}
    //   </Box>
  );
}
