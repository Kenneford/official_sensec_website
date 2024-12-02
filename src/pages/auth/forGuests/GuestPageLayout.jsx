import { Avatar, Box, Typography } from "@mui/material";
import {
  useLocation,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import {
  About,
  Contact,
  Courses,
  EmploymentForm,
  Home,
  NavigationBar,
  PageNotFound,
} from "../../../components/lazyLoading/LazyComponents";
import {
  Login,
  LoginOptions,
  SignUpContainer,
} from "../../../components/lazyLoading/auth/AuthLazyComponents";
import SearchForm from "../../../components/searchForm/SearchForm";

export function GuestPageLayout() {
  const { currentGuestPage } = useParams();
  const signUpAction = localStorage.getItem("loginAction");
  const navigate = useNavigate();
  const location = useLocation();
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
          zIndex: 3,
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
      {location?.pathname === "/sensec/homepage" && <Home />}
      {location?.pathname === "/sensec/about" && <About />}
      {location?.pathname === "/sensec/courses" && <Courses />}
      {location?.pathname === "/sensec/contact" && <Contact />}
      {location?.pathname?.includes("/sensec/sign_up") && <SignUpContainer />}
      {/* {location?.pathname === "/sensec/sign_up/students" && <SignUpContainer />}
      {location?.pathname === "/sensec/sign_up/partners" && <SignUpContainer />} */}
      {location?.pathname === "/sensec/login" && <Login />}
      {location?.pathname === "/sensec/login_options" && <LoginOptions />}
      {location?.pathname === "/sensec/new_employment" && <EmploymentForm />}
      {location?.pathname === "*" && <PageNotFound />}
    </Box>
  );
}
