import { Outlet, useOutletContext } from "react-router-dom";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { SideBar } from "../../components/lazyLoading/auth/AuthLazyComponents";

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
        }}
      />
    </Box>
  );
}
