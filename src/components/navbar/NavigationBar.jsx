import { useEffect, useState } from "react";
import "./navigationBar.scss";
import PropTypes from "prop-types";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import LogoutIcon from "@mui/icons-material/Logout";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { HashLink, NavHashLink } from "react-router-hash-link";
import { AppBar, Avatar, Box, Button, Stack, Typography } from "@mui/material";
import { StyledNavbar } from "../../muiStyling/muiStyling";
import { Login, PersonAddAlt } from "@mui/icons-material";

const signUpOptions = [
  {
    name: "Students Sign-up",
    path: "/sensec/sign_up/students",
  },
  {
    name: "Others",
    path: "/sensec/sign_up/partners",
  },
];
const loginOptions = [
  {
    name: "Admins Login",
    path: "/sensec/login",
  },
  {
    name: "Lecturers Login",
    path: "/sensec/login",
  },
  {
    name: "Students Login",
    path: "/sensec/login",
  },
  {
    name: "NT-Staffs Login",
    path: "/sensec/login",
  },
];

const userActions = [
  {
    label: "View Profile",
    value: "View Profile",
  },
  {
    label: "Admins Chamber",
    value: "Admins Chamber",
  },
  {
    label: "Settings",
    value: "Settings",
  },
  {
    label: "Logout",
    value: "Logout",
  },
];

const navbarLinks = [
  {
    name: "homepage",
    path: "/sensec/homepage",
  },
  {
    name: "about",
    path: "/sensec/about",
  },
  {
    name: "courses",
    path: "/sensec/courses",
  },
  {
    name: "contact",
    path: "/sensec/contact",
  },
  {
    name: "blog",
    path: "/sensec/blog",
  },
  {
    name: "others",
    path: "#",
  },
];

const otherLinks = [
  {
    name: "Check Placement",
    path: "/sensec/students/enrollment/placement_check",
  },
  {
    name: "Apply",
    path: "/sensec/students/application",
  },
  {
    name: "Enrollment",
    path: "/sensec/students/enrollment",
  },
  {
    name: "Dashboard",
    path: {
      admin: "/sensec/users/admin/Dashboard/Overview",
      teacher: "/sensec/users/teacher#teacher",
      nt_Staff: "/sensec/users/nt_staff#staff",
      student: "/sensec/users/student#student",
    },
  },
  {
    name: "Join Sensosa",
    path: "/sensec/users/Dashboard",
    // path: "/sensec/sensosa/application_process",
  },
];

const menuLinks = [
  {
    name: "Home",
    path: "/sensec/homepage",
  },
  {
    name: "About",
    path: "/sensec/about",
  },
  {
    name: "Courses",
    path: "/sensec/courses",
  },
  {
    name: "Contact",
    path: "/sensec/contact",
  },
  {
    name: "Blog",
    path: "/sensec/blogs",
  },
  {
    name: "Check Placement",
    path: "/sensec/students/enrollment/placement_check",
  },
  {
    name: "Apply",
    path: "/sensec/students/application",
  },
  {
    name: "Enrolment",
    path: "/sensec/students/enrollment",
  },
  {
    name: "Dashboard",
    path: {
      admin: "/sensec/users/admin/Dashboard/Overview",
      teacher: "/sensec/teacher#teacher",
      nt_Staff: "/sensec/nt_staff#staff",
      student: "/sensec/student#student",
    },
  },
  {
    name: "Join Sensosa",
    path: "/sensec/sensosa/application_process",
  },
];

export function NavigationBar({
  setOpenSubNavLinks,
  openSubNavLinks,
  setOpenUserActions,
  openUserActions,
  setOpenSignUpActions,
  openSignUpActions,
  setOpenMenuLinks,
  openMenuLinks,
  setCurrentAction,
  setCurrentLink,
  isSidebarOpen,
}) {
  const currentNavLink = localStorage.getItem("currentNavLink");
  const currentOtherNavLink = localStorage.getItem("currentOtherNavLink");
  const navigate = useNavigate();
  const location = useLocation();
  const { currentGuestPage } = useParams();

  const { pathname } = location;
  // const userInfo = true;
  const userInfo = { adminStatusExtend: { isAdmin: true } };
  // console.log(pathname);

  const [navbar, setNavbar] = useState(false);
  const [openUserLinks, setOpenUserLinks] = useState(false);

  const filteredOtherLinks = otherLinks?.filter(
    (links) => links && !userInfo && links?.name !== "Dashboard"
  );

  const filteredMenuLinks = menuLinks?.filter(
    (links) => links && !userInfo && links?.name !== "Dashboard"
  );

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const isMobile = screenWidth && screenWidth <= 600;
  const isTablet = screenWidth && screenWidth > 600 && screenWidth <= 900;
  const isLaptop = screenWidth && screenWidth > 900 && screenWidth <= 1024;
  const isDesktop = screenWidth && screenWidth > 1024 && screenWidth <= 1200;
  const isLargeScreen = screenWidth && screenWidth > 1200;

  // console.log(isMobile && "isMobile");
  // console.log(isTablet && "isTablet");
  // console.log(isLaptop && "isLaptop");
  // console.log(isDesktop && "isDesktop");
  // console.log(isLargeScreen && "isLargeScreen");

  const [isLandscape, setIsLandscape] = useState(
    window.innerWidth > window.innerHeight
  );
  // console.log(isLandscape ? "Landscape Mode" : "Portrait Mode");

  // Find current device in use
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    // Add event listener to detect window resizing
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Check for landscape orientation mode
  useEffect(() => {
    const handleResize = () => {
      setIsLandscape(window.innerWidth > window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  //THIS REMOVES THE NavLINK TAG FROM THE URL
  if (window.location.hash) {
    window.history.replaceState("", document.title, window.location.pathname);
  }

  //FUNCTION TO CHANGE THE NAVBAR BACKGROUND COLOR ON SCROLL
  const changeBackground = () => {
    if (window.scrollY >= 25) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };
  window.addEventListener("scroll", changeBackground);

  //   const changeNavLinksPosition = () => {
  //     if (window.scrollY >= 165) {
  //       setNavLinks(true);
  //     } else {
  //       setNavLinks(false);
  //     }
  //   };
  //   window.addEventListener("scroll", changeNavLinksPosition);

  const handleLogout = (e) => {
    e.preventDefault();
    // if (userInfo) {
    //   dispatch(userLogout());
    //   navigate("/sensec/homepage");
    //   toast.success("You logged out Successfully...", {
    //     position: "top-right",
    //     theme: "dark",
    //   });
    //   localStorage.removeItem("currentNavLink");
    // }
  };

  // Clear popup links
  useEffect(() => {
    if (!openSubNavLinks) {
      setOpenUserLinks(false);
    }
    if (!openMenuLinks) {
      setOpenMenuLinks(false);
    }
    if (!openUserActions) {
      setOpenUserActions(false);
    }
  }, [
    openSubNavLinks,
    openMenuLinks,
    setOpenMenuLinks,
    setOpenUserActions,
    openUserActions,
  ]);

  return (
    <Box width={"100%"} className="navbarWrap">
      <Box>
        <StyledNavbar.Navbar>
          {/* Menu Icons */}
          <Box
            sx={{
              flex: "1",
              display: {
                sm: "none",
                md: "block",
                lg: "block",
              },
              color: "#fff",
            }}
          >
            {!openMenuLinks ? (
              <MenuIcon
                onClick={() => setOpenMenuLinks(!openMenuLinks)}
                sx={{
                  display: { xs: "block", sm: "none" },
                  fontSize: { xs: "1.5", md: "2rem" },
                }}
              />
            ) : (
              <CloseIcon
                sx={{
                  display: { xs: "block", sm: "none" },
                  fontSize: { xs: "1.5", md: "2rem" },
                }}
              />
            )}
            {openMenuLinks && (
              <Box id="smallScreenMenu">
                <li>
                  {userInfo &&
                    menuLinks?.map((link) => (
                      <HashLink
                        key={link?.name}
                        className={
                          currentNavLink && link?.name === currentNavLink
                            ? "menuListSelected active"
                            : "menuListSelected"
                        }
                        to={
                          link?.name === "Dashboard" &&
                          userInfo?.adminStatusExtend?.isAdmin
                            ? link?.path?.admin
                            : link?.name === "Dashboard" &&
                              userInfo?.teacherStatusExtend?.isTeacher
                            ? link?.path?.teacher
                            : link?.name === "Dashboard" &&
                              userInfo?.nTStaffStatusExtend?.isNTStaff
                            ? link?.path?.nt_Staff
                            : link?.name === "Dashboard" &&
                              userInfo?.studentStatusExtend?.isStudent
                            ? link?.path?.student
                            : link?.path
                        }
                        onClick={() => {
                          localStorage.setItem("currentNavLink", link?.name);
                        }}
                      >
                        {link?.name}
                      </HashLink>
                    ))}
                  {!userInfo &&
                    filteredMenuLinks?.map((link) => (
                      <NavHashLink
                        key={link?.name}
                        className={
                          currentNavLink && link?.name === currentNavLink
                            ? "menuListSelected active"
                            : "menuListSelected"
                        }
                        to={
                          link?.name === "Dashboard" &&
                          userInfo?.adminStatusExtend?.isAdmin
                            ? link?.path?.admin
                            : link?.name === "Dashboard" &&
                              userInfo?.teacherStatusExtend?.isTeacher
                            ? link?.path?.teacher
                            : link?.name === "Dashboard" &&
                              userInfo?.nTStaffStatusExtend?.isNTStaff
                            ? link?.path?.nt_Staff
                            : link?.name === "Dashboard" &&
                              userInfo?.studentStatusExtend?.isStudent
                            ? link?.path?.student
                            : link?.path
                        }
                        onClick={() =>
                          localStorage.setItem("currentNavLink", link?.name)
                        }
                      >
                        {link?.name}
                      </NavHashLink>
                    ))}
                </li>
              </Box>
            )}
          </Box>
          {/* Navbar Link */}
          <Box
            sx={{
              display: {
                xs: "none",
                sm: "block",
              },
              flex: "2.5",
            }}
          >
            <Box
              component={"div"}
              id="navLinksWrap"
              sx={{
                display: { xs: "none", sm: "flex" },
                justifyContent: "center",
              }}
            >
              {navbarLinks.map((link) => (
                <Box
                  component={"div"}
                  key={link?.name}
                  // sx={{
                  //   display: "flex",
                  //   justifyContent: "center",
                  //   alignItems: "center",
                  // }}
                >
                  <Button
                    id="navLinks"
                    key={link?.name}
                    // onClick={handleCloseNavMenu}
                    sx={{
                      // my: 2,
                      color: `${
                        currentGuestPage && link?.name === currentGuestPage
                          ? "yellow"
                          : "white"
                      }`,
                    }}
                    onClick={() => {
                      // Click handler
                      localStorage.setItem("currentNavLink", link?.name);
                      if (link?.name === "others") {
                        setOpenUserLinks(
                          !openUserLinks,
                          setOpenSubNavLinks(!openSubNavLinks)
                        );
                      } else {
                        localStorage.removeItem("currentOtherNavLink");
                      }
                      navigate(link?.path);
                    }}
                  >
                    {link?.name === "homepage" ? "Home" : link?.name}
                    {link?.name == "others" && (
                      <>
                        {!openUserLinks ? (
                          <ExpandMoreIcon className="expandMoreIcon" />
                        ) : (
                          <ExpandLessIcon className="expandMoreIcon" />
                        )}
                      </>
                    )}
                  </Button>
                  {link?.name === "others" && (
                    <div id="otherLinks">
                      <button
                        className={
                          //   Change text color on button click
                          openUserLinks
                            ? "otherLinksWrap active"
                            : "otherLinksWrap"
                        }
                        onClick={() => setOpenSubNavLinks(!openSubNavLinks)}
                      >
                        {/* <span className="otherLinksText">Others</span>{" "} */}
                        {/* {!openUserLinks ? (
                            <ExpandMoreIcon className="expandMoreIcon" />
                          ) : (
                            <ExpandLessIcon className="expandMoreIcon" />
                          )} */}
                      </button>
                      <div className="subNav" style={{ zIndex: 3 }}>
                        {openSubNavLinks && (
                          <div
                            className={
                              openSubNavLinks
                                ? "openSubNavLinks"
                                : "closeSubNavLinks"
                            }
                          >
                            {userInfo &&
                              otherLinks?.map((link) => (
                                <HashLink
                                  key={link?.name}
                                  className={
                                    currentOtherNavLink &&
                                    link?.name === currentOtherNavLink
                                      ? "otherLinkSelected active"
                                      : "otherLinkSelected"
                                  }
                                  to={
                                    link?.name === "Dashboard" &&
                                    userInfo?.adminStatusExtend?.isAdmin
                                      ? link?.path?.admin
                                      : link?.name === "Dashboard" &&
                                        userInfo?.teacherStatusExtend?.isTeacher
                                      ? link?.path?.teacher
                                      : link?.name === "Dashboard" &&
                                        userInfo?.nTStaffStatusExtend?.isNTStaff
                                      ? link?.path?.nt_Staff
                                      : link?.name === "Dashboard" &&
                                        userInfo?.studentStatusExtend?.isStudent
                                      ? link?.path?.student
                                      : link?.path
                                  }
                                  onClick={() => {
                                    localStorage.setItem(
                                      "currentOtherNavLink",
                                      link?.name
                                    );
                                    if (
                                      link?.name === "Dashboard" &&
                                      userInfo?.adminStatusExtend?.isAdmin
                                    ) {
                                      setCurrentAction("Dashboard");
                                      setCurrentLink("Overview");
                                    }
                                  }}
                                >
                                  {link?.name}
                                </HashLink>
                              ))}
                            {!userInfo &&
                              filteredOtherLinks?.map((link) => (
                                <NavHashLink
                                  key={link?.name}
                                  className={
                                    currentOtherNavLink &&
                                    link?.name === currentOtherNavLink
                                      ? "otherLinkSelected active"
                                      : "otherLinkSelected"
                                  }
                                  to={
                                    link?.name === "Dashboard" &&
                                    userInfo?.adminStatusExtend?.isAdmin
                                      ? link?.path?.admin
                                      : link?.name === "Dashboard" &&
                                        userInfo?.teacherStatusExtend?.isTeacher
                                      ? link?.path?.teacher
                                      : link?.name === "Dashboard" &&
                                        userInfo?.nTStaffStatusExtend?.isNTStaff
                                      ? link?.path?.nt_Staff
                                      : link?.name === "Dashboard" &&
                                        userInfo?.studentStatusExtend?.isStudent
                                      ? link?.path?.student
                                      : link?.path
                                  }
                                  onClick={() =>
                                    localStorage.setItem(
                                      "currentOtherNavLink",
                                      link?.name
                                    )
                                  }
                                >
                                  {link?.name}
                                </NavHashLink>
                              ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </Box>
              ))}
            </Box>
          </Box>
          {/* Current User */}
          <Box
            sx={{
              flex: "1",
              xs: { paddingLeft: "0", paddingRight: "0" },
            }}
          >
            {!userInfo && (
              <StyledNavbar.CurrentUser>
                <Typography sx={{ display: { xs: "none", md: "block" } }}>
                  Welcome, @{userInfo?.personalInfo?.firstName}
                </Typography>
                <Box>
                  {userInfo?.personalInfo?.profilePicture ? (
                    <Avatar
                      onClick={() => setOpenUserActions(!openUserActions)}
                      src={userInfo?.personalInfo?.profilePicture?.url}
                      alt=""
                      sx={{
                        cursor: "pointer",
                      }}
                    />
                  ) : (
                    <Avatar
                      onClick={() => setOpenUserActions(!openUserActions)}
                      src={
                        userInfo?.personalInfo?.gender === "Male"
                          ? "/assets/maleAvatar.png"
                          : "/assets/femaleAvatar.png"
                      }
                      alt=""
                      sx={{
                        cursor: "pointer",
                      }}
                    />
                  )}
                </Box>
                {openUserActions && (
                  <div id="navLogout">
                    {userActions?.map((action) => (
                      <>
                        {action?.value !== "Logout" && (
                          <span key={action?.label} className="profileView">
                            {action?.value}
                          </span>
                        )}
                        {action?.label === "Logout" && (
                          <span className="logUserOutWrap">
                            <p className="logUserOut" onClick={handleLogout}>
                              Logout
                            </p>
                            <LogoutIcon className="logoutIcon" />
                          </span>
                        )}
                      </>
                    ))}
                  </div>
                )}
              </StyledNavbar.CurrentUser>
            )}
            {userInfo && (
              // <StyledNavbar.CurrentUser>
              <div className="login">
                <button onClick={() => setOpenUserActions(!openUserActions)}>
                  Login
                </button>
                <button
                  // onClick={() => navigate("/sensec/sign_up")}
                  onClick={() => setOpenSignUpActions(!openSignUpActions)}
                >
                  Sign-Up
                </button>
                {openUserActions && (
                  <div className="loginOptions" style={{ zIndex: 3 }}>
                    {loginOptions?.map((option) => (
                      <div
                        key={option?.name}
                        className="loginWrap"
                        onClick={() => {
                          localStorage.setItem("loginAction", option?.name),
                            localStorage.removeItem("currentOtherNavLink"),
                            navigate(option?.path);
                        }}
                      >
                        <p>{option?.name}</p>
                        <Login className="loginIcon" />
                      </div>
                    ))}
                  </div>
                )}
                {openSignUpActions && (
                  <div className="signUpOptions" style={{ zIndex: 3 }}>
                    {signUpOptions?.map((option) => (
                      <div
                        key={option?.name}
                        className="signUpWrap"
                        onClick={() => {
                          localStorage.setItem("signUpAction", option?.name),
                            localStorage.removeItem("currentOtherNavLink"),
                            navigate(option?.path);
                        }}
                      >
                        <p>{option?.name}</p>
                        <PersonAddAlt className="signUpIcon" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
              // </StyledNavbar.CurrentUser>
            )}
          </Box>
        </StyledNavbar.Navbar>
      </Box>
    </Box>
  );
}

NavigationBar.propTypes = {
  setOpenSubNavLinks: PropTypes.func,
  openSubNavLinks: PropTypes.bool,
  setOpenMenuLinks: PropTypes.func,
  openMenuLinks: PropTypes.bool,
  setOpenUserActions: PropTypes.func,
  setCurrentAction: PropTypes.func,
  setCurrentLink: PropTypes.func,
  openUserActions: PropTypes.bool,
  setOpenSignUpActions: PropTypes.func,
  openSignUpActions: PropTypes.bool,
  isSidebarOpen: PropTypes.bool,
};
