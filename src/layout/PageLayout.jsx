import { Outlet, useLocation, useNavigate } from "react-router-dom";
// import NavigationBar from "../components/navbar/NavigationBar";
import "./pageLayout.scss";
import lazyWithSuspense from "../components/lazyLoading/LazyLoading";
import PageLoading from "../components/pageLoading/PageLoading";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { NavigationBar } from "../components/lazyLoading/LazyComponents";

export function PageLayout() {
  const [openSubNavLinks, setOpenSubNavLinks] = useState(false);
  const [openMenuLinks, setOpenMenuLinks] = useState(false);
  const [openUserActions, setOpenUserActions] = useState(false);
  const [postOptions, setPostOptions] = useState(false);
  const [currentAction, setCurrentAction] = useState("Dashboard");
  const [currentLink, setCurrentLink] = useState("Overview");
  console.log(currentAction);

  const location = useLocation();
  const navigate = useNavigate();
  const userInfo = { adminStatusExtend: { isAdmin: true } };

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
    if (postOptions) {
      setPostOptions(false);
    }
  };

  return (
    <Box onClick={clearLogOptions}>
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
      <Outlet
        context={{
          currentAction,
          setCurrentAction,
          currentLink,
          setCurrentLink,
          postOptions,
          setPostOptions,
        }}
      />
    </Box>
  );
}

// const NavigationBar = lazyWithSuspense(
//   () =>
//     import("../components/navbar/NavigationBar").then((module) => {
//       return { default: module.NavigationBar };
//     }),
//   <PageLoading />,
//   "NavigationBar"
// );
