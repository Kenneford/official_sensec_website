import { Avatar, Box, Stack, Typography } from "@mui/material";
import React, { useLayoutEffect, useState } from "react";
import {
  Outlet,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import {
  About,
  Contact,
  Courses,
  Home,
  NavigationBar,
} from "../../../components/lazyLoading/LazyComponents";
import { Blogs } from "../../../components/lazyLoading/admin/AdminLazyLoadingComponents";
import {
  Login,
  LoginOptions,
  SignUpContainer,
  UserSignUp,
} from "../../../components/lazyLoading/auth/AuthLazyComponents";
import { getAuthUser } from "../../../features/auth/authSlice";
import { useSelector } from "react-redux";

export function GuestPageLayout() {
  const authUser = useSelector(getAuthUser);
  const { currentGuestPage } = useParams();
  const navigate = useNavigate();
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
  } = useOutletContext();

  const [fixedNavbar, setFixedNavbar] = useState(false);
  //FUNCTION TO CHECK PAGE SCROLL
  const detectPageScroll = () => {
    if (window.scrollY >= 25) {
      setFixedNavbar(true);
    } else {
      setFixedNavbar(false);
    }
  };
  window.addEventListener("scroll", detectPageScroll);

  return (
    <Box>
      {/* School Logo */}
      <Box
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
      </Box>
      {/* Main navbar links */}
      <Box
        sx={{
          position: "sticky",
          top: 0,
          backgroundColor: "#fff",
          padding: 0,
          zIndex: 1,
        }}
      >
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
        />
      </Box>
      {currentGuestPage === "homepage" && <Home />}
      {currentGuestPage === "about" && <About />}
      {currentGuestPage === "courses" && <Courses />}
      {currentGuestPage === "contact" && <Contact />}
      {currentGuestPage === "sign_up" && <SignUpContainer />}
      {currentGuestPage === "login" && <Login />}
      {currentGuestPage === "login_options" && <LoginOptions />}
    </Box>
  );
}
