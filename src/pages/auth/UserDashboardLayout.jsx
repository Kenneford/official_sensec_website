import "./userDashboardLayout.scss";
import SideBar from "../../components/sidebar/SideBar";
import { Outlet } from "react-router-dom";
import {
  Box,
  Button,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";

export function UserDashboardLayout() {
  // State to control sidebar open/close
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [currentAction, setCurrentAction] = useState("");
  const [currentLink, setCurrentLink] = useState("");
  console.log(currentAction);

  // Media query to detect screen size (breakpoint for tablet is 900px)
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("1024")); // 'md' is typically 900px

  // Toggle sidebar function
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  return (
    <Box id="userDashboardWrap">
      {!isMobile && (
        <SideBar
          isSidebarOpen={isSidebarOpen}
          setSidebarOpen={setSidebarOpen}
          toggleSidebar={toggleSidebar}
          currentAction={currentAction}
          setCurrentAction={setCurrentAction}
          currentLink={currentLink}
          setCurrentLink={setCurrentLink}
        />
      )}
      <Outlet
        context={{ isSidebarOpen, isMobile, currentAction, setCurrentAction }}
      />
    </Box>
  );
}
