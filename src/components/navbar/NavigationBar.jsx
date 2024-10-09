import { useEffect, useState } from "react";
import "./navigationBar.scss";
import PropTypes from "prop-types";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import { useLocation, useNavigate } from "react-router-dom";
import { HashLink, NavHashLink } from "react-router-hash-link";
import { AppBar, Avatar, Box, Button, Stack, Typography } from "@mui/material";
import { StyledNavbar } from "../../muiStyling/muiStyling";

const loginOptions = [
  {
    name: "Admins Login",
    path: "/sensec/admin/login",
  },
  {
    name: "NT Staffs Login",
    path: "/sensec/nt_staff/login",
  },
  {
    name: "Lecturers Login",
    path: "/sensec/lecturer/login",
  },
  {
    name: "Students Login",
    path: "/sensec/student/login",
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
    path: "/sensec/blog",
  },
  {
    name: "Others",
    path: "#",
  },
];

const otherLinks = [
  {
    name: "Check Placement",
    path: "/sensec/students/placement_check",
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
      admin: "/sensec/admin#admin",
      teacher: "/sensec/teacher#teacher",
      nt_Staff: "/sensec/nt_staff#staff",
      student: "/sensec/student#student",
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
    path: "/sensec/users/dashboard",
  },
  {
    name: "Check Placement",
    path: "/sensec/students/placement_check",
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
      admin: "/sensec/admin#admin",
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
  setOpenMenuLinks,
  openMenuLinks,
}) {
  const currentNavLink = localStorage.getItem("currentNavLink");
  const currentOtherNavLink = localStorage.getItem("currentOtherNavLink");
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const userInfo = false;
  //   const userInfo = { adminStatusExtend: { isAdmin: true } };
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

  console.log(isMobile && "isMobile");
  console.log(isTablet && "isTablet");
  console.log(isLaptop && "isLaptop");
  console.log(isDesktop && "isDesktop");
  console.log(isLargeScreen && "isLargeScreen");

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
    if (window.scrollY >= 165) {
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
    <AppBar position={navbar ? "relative" : ""} className="navbarWrap">
      <Stack
        direction="column"
        //   spacing={2}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
          padding: ".3rem 0",
          cursor: "pointer",
        }}
        onClick={() => {
          // Click handler
          localStorage.removeItem("currentNavLink");
          navigate("/sensec/homepage");
        }}
      >
        <Avatar src="/assets/sensec-logo1.png" sx={{ alignItems: "center" }} />
        <Box sx={{ display: "flex", height: "1.5rem" }}>
          <Typography variant="h6" color="green">
            Sen
          </Typography>
          <Typography variant="h6" color="#aeae0d">
            sec
          </Typography>
        </Box>
      </Stack>
      <StyledNavbar.Navbar
        sx={{
          bgcolor: navbar ? "#292929" : "green",
          borderBottom: navbar ? "3px solid yellow" : "3px solid #fff",
          height: "4rem",
          position: navbar ? "fixed" : "",
          zIndex: 1,
          width: "100%",
        }}
      >
        <Box
          sx={{
            flex: "1",
            display: {
              sm: "none",
              md: "block",
              lg: "block",
            },
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
        {/* <Box> */}
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
                      currentNavLink && link?.name === currentNavLink
                        ? "yellow"
                        : "white"
                    }`,
                  }}
                  onClick={() => {
                    // Click handler
                    localStorage.setItem("currentNavLink", link?.name);
                    if (link?.name === "Others") {
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
                  {link?.name}
                  {link?.name == "Others" && (
                    <>
                      {!openUserLinks ? (
                        <ExpandMoreIcon className="expandMoreIcon" />
                      ) : (
                        <ExpandLessIcon className="expandMoreIcon" />
                      )}
                    </>
                  )}
                </Button>
                {link?.name === "Others" && (
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
                    <div className="subNav">
                      {openSubNavLinks && (
                        <div
                          className={
                            openUserLinks
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
                                onClick={() =>
                                  localStorage.setItem(
                                    "currentOtherNavLink",
                                    link?.name
                                  )
                                }
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
        {/* </Box> */}
        <Box
          sx={{
            flex: "1",
            xs: { paddingLeft: "0", paddingRight: "0" },
          }}
        >
          {userInfo && (
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
          {!userInfo && (
            // <StyledNavbar.CurrentUser>
            <div className="login">
              <button onClick={() => setOpenUserActions(!openUserActions)}>
                Login
              </button>
              <button onClick={() => navigate("sensec/sign_up")}>
                Sign-Up
              </button>
              {openUserActions && (
                <div className="loginOptions">
                  {loginOptions?.map((option) => (
                    <div
                      key={option?.name}
                      className="loginWrap"
                      onClick={() => navigate(option?.path)}
                    >
                      <p>{option?.name}</p>
                      <LoginIcon className="loginIcon" />
                    </div>
                  ))}
                </div>
              )}
            </div>
            // </StyledNavbar.CurrentUser>
          )}
        </Box>
      </StyledNavbar.Navbar>
    </AppBar>
  );
}

NavigationBar.propTypes = {
  setOpenSubNavLinks: PropTypes.func,
  openSubNavLinks: PropTypes.bool,
  setOpenMenuLinks: PropTypes.func,
  openMenuLinks: PropTypes.bool,
  setOpenUserActions: PropTypes.func,
  openUserActions: PropTypes.bool,
};
