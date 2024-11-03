import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import { useState } from "react";

export function PageLayout() {
  const [openSubNavLinks, setOpenSubNavLinks] = useState(false);
  const [openMenuLinks, setOpenMenuLinks] = useState(false);
  const [openUserActions, setOpenUserActions] = useState(false);
  const [openSignUpActions, setOpenSignUpActions] = useState(false);
  const [postOptions, setPostOptions] = useState(false);
  const [currentAction, setCurrentAction] = useState("Dashboard");
  const [currentLink, setCurrentLink] = useState("Overview");

  const clearLogOptions = () => {
    if (openSubNavLinks) {
      setOpenSubNavLinks(false);
    }
    if (openMenuLinks) {
      setOpenMenuLinks(false);
    }
    if (openUserActions) {
      setOpenUserActions(false);
    }
    if (openSignUpActions) {
      setOpenSignUpActions(false);
    }
    if (postOptions) {
      setPostOptions(false);
    }
  };

  return (
    <Box onClick={clearLogOptions}>
      <Outlet
        context={{
          currentAction,
          setCurrentAction,
          currentLink,
          setCurrentLink,
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
        }}
      />
    </Box>
  );
}
