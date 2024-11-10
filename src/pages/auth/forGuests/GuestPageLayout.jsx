import { Avatar, Box, Typography } from "@mui/material";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import {
  About,
  Contact,
  Courses,
  EmploymentForm,
  Home,
  NavigationBar,
} from "../../../components/lazyLoading/LazyComponents";
import {
  Login,
  LoginOptions,
  SignUpContainer,
} from "../../../components/lazyLoading/auth/AuthLazyComponents";
import SearchForm from "../../../components/searchForm/SearchForm";

export function GuestPageLayout() {
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
    openSearchModal,
    setOpenSearchModal,
  } = useOutletContext();

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
          openSearchModal={openSearchModal}
          setOpenSearchModal={setOpenSearchModal}
        />
      </Box>
      {currentGuestPage === "homepage" && <Home />}
      {currentGuestPage === "about" && <About />}
      {currentGuestPage === "courses" && <Courses />}
      {currentGuestPage === "contact" && <Contact />}
      {currentGuestPage === "sign_up" && <SignUpContainer />}
      {currentGuestPage === "login" && <Login />}
      {currentGuestPage === "login_options" && <LoginOptions />}
      {currentGuestPage === "new_employment" && <EmploymentForm />}
    </Box>
  );
}
