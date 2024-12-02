import { Outlet, useOutletContext } from "react-router-dom";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { SideBar } from "../../components/sidebar/SideBar";

export function UserDashboardLayout() {
  const {
    postOptions,
    setPostOptions,
    setOpenSubNavLinks,
    openSubNavLinks,
    setOpenUserActions,
    openUserActions,
    setOpenSignUpActions,
    openSignUpActions,
    setOpenMenuLinks,
    openMenuLinks,
    openSearchModal,
    setOpenSearchModal,
  } = useOutletContext();
  // State to control sidebar open/close
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [currentAction, setCurrentAction] = useState("");
  const [currentLink, setCurrentLink] = useState("");
  const [hovered, setHovered] = useState(false);
  const drawerWidthCollapsed = 160; // Collapsed width
  const drawerWidthExpanded = 300; // Expanded width

  // Media query to detect screen size (breakpoint for tablet is 900px)
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("1024")); // 'md' is typically 900px

  // Toggle sidebar function
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    if (window.innerWidth <= 1024) {
      setSidebarOpen(false);
    }
  }, [setSidebarOpen]);

  return (
    <Box id="userDashboardWrap" display={"flex"}>
      <Box>
        {!isMobile && (
          <SideBar
            isSidebarOpen={isSidebarOpen}
            setSidebarOpen={setSidebarOpen}
            toggleSidebar={toggleSidebar}
            currentAction={currentAction}
            setCurrentAction={setCurrentAction}
            currentLink={currentLink}
            setCurrentLink={setCurrentLink}
            hovered={hovered}
            setHovered={setHovered}
            drawerWidthCollapsed={drawerWidthCollapsed}
            drawerWidthExpanded={drawerWidthExpanded}
          />
        )}
      </Box>
      <Box
        width={!isMobile ? "calc(100% - 160px)" : "100%"}
        ml={!isMobile ? "160px" : 0}
        flexShrink={1}
      >
        <Outlet
          context={{
            isSidebarOpen,
            isMobile,
            currentAction,
            setCurrentAction,
            postOptions,
            setPostOptions,
            setOpenSubNavLinks,
            openSubNavLinks,
            setOpenUserActions,
            openUserActions,
            setOpenSignUpActions,
            openSignUpActions,
            setOpenMenuLinks,
            openMenuLinks,
            openSearchModal,
            setOpenSearchModal,
            hovered,
            setHovered,
            drawerWidthCollapsed,
            drawerWidthExpanded,
          }}
        />
      </Box>
    </Box>
  );
}
