import { Box } from "@mui/material";
import React from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import { NavigationBar } from "../../components/lazyLoading/LazyComponents";

export function EnrollmentPage() {
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
  } = useOutletContext();
  return (
    <Box>
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
      />
      <Outlet />
    </Box>
  );
}
