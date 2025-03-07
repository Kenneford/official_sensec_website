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
  Gallery,
  Home,
  PageNotFound,
  PrivacyPolicy,
  TermsOfService,
} from "../../../components/lazyLoading/LazyComponents";
import {
  ForgotPassword,
  Login,
  LoginOptions,
  SignUpContainer,
  SignUpSuccessPage,
} from "../../../components/lazyLoading/auth/AuthLazyComponents";
import SearchForm from "../../../components/searchForm/SearchForm";
import { NavigationBar } from "../../../components/navbar/NavigationBar";
import { Blogs } from "../../../components/lazyLoading/admin/AdminLazyLoadingComponents";
import SchoolFacilities from "../../facilities/SchoolFacilities";

export function GuestPageLayout() {
  const { currentGuestPage, uniqueId } = useParams();
  const signUpAction = localStorage.getItem("loginAction");
  const signUpId = localStorage.getItem("signUpId");

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
          // height: "4.5rem",
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
            alt="Sensec Logo"
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
          // height: "1rem",
          position: "sticky",
          top: 0,
          // backgroundColor: "#fff",
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
      {location?.pathname === "/sensec/sign_up/staffs" && <SignUpContainer />}
      {location?.pathname === "/sensec/sign_up/students" && <SignUpContainer />}
      {location?.pathname === "/sensec/login" && <Login />}
      {location?.pathname === "/sensec/login_options" && <LoginOptions />}
      {location?.pathname === "/sensec/new_employment" && <EmploymentForm />}
      {location?.pathname === "/sensec/facilities" && <SchoolFacilities />}
      {location?.pathname === "/sensec/blogs" && <Blogs />}
      {location?.pathname === "/sensec/forgot_password" && <ForgotPassword />}
      {location?.pathname === "/sensec/gallery" && <Gallery />}
      {location?.pathname === "/sensec/terms_of_service" && <TermsOfService />}
      {location?.pathname === "/sensec/privacy_policy" && <PrivacyPolicy />}
      {/* {location?.pathname ===
        `/sensec/sign_up/partners/${signUpId}/successful` && (
        <SignUpSuccessPage />
      )} */}
    </Box>
  );
}
