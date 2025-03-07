import { useEffect, useRef, useState } from "react";
import "./navigationBar.scss";
import PropTypes from "prop-types";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate, useParams } from "react-router-dom";
import { HashLink, NavHashLink } from "react-router-hash-link";
import { Avatar, Box, Button, Typography } from "@mui/material";
import { StyledNavbar } from "../../muiStyling/muiStyling";
import { Login, PersonAddAlt, Search } from "@mui/icons-material";
import {
  fetchAllUsers,
  getAllUsers,
  getAuthUser,
  userLogout,
} from "../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { motion, useAnimation } from "framer-motion";

const signUpOptions = [
  {
    name: "Students Sign-up",
    path: "/sensec/sign_up/students",
  },
  {
    name: "Staffs Sign-up",
    path: "/sensec/sign_up/staffs",
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
    name: "Home",
    path: "/sensec/homepage#homePage",
  },
  {
    name: "About",
    path: "/sensec/about#aboutPage",
  },
  {
    name: "Courses",
    path: "/sensec/courses#allProgrammes",
  },
  {
    name: "Contact",
    path: "/sensec/contact#contactPage",
  },
  {
    name: "Blogs",
    path: "/sensec/blogs#blogsPage",
  },
  {
    name: "Gallery",
    path: "/sensec/gallery#galleryPage",
  },
  {
    name: "Others",
    path: "#",
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
  openSearchModal,
  setOpenSearchModal,
}) {
  const currentNavLink = localStorage.getItem("currentNavLink");
  const currentOtherNavLink = localStorage.getItem("currentOtherNavLink");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authUser = useSelector(getAuthUser);
  const allUsers = useSelector(getAllUsers);
  const { currentGuestPage, enrollment } = useParams();
  console.log(currentGuestPage);

  const otherLinks = [
    {
      name: "Check Placement",
      path: "/sensec/students/enrollment/placement_check",
    },
    // {
    //   name: "Apply",
    //   path: "/sensec/students/application",
    // },
    {
      name: "Enrollment",
      path: "/sensec/students/enrollment",
    },
    {
      name: "Employment",
      path: {
        admin: `/sensec/users/${authUser?.uniqueId}/admin/User_Types/new_employment`,
        others: "/sensec/new_employment",
      },
      // path: "/sensec/sensosa/application_process",
    },
    {
      name: "Dashboard",
      path: {
        admin: `/sensec/users/${authUser?.uniqueId}/admin/Dashboard/Overview`,
        lecturer: `/sensec/users/${authUser?.uniqueId}/lecturer/Dashboard/Overview`,
        nt_Staff: `/sensec/users/${authUser?.uniqueId}/nt_staff/Dashboard/Overview`,
        student: `/sensec/users/${authUser?.uniqueId}/student/Dashboard/Overview`,
      },
    },
    // {
    //   name: "Pay Fees",
    //   path: "/sensec/pay_fees#paymentPage",
    // },
    // {
    //   name: "Join Sensosa",
    //   path: "/sensec/users/Dashboard",
    //   // path: "/sensec/sensosa/application_process",
    // },
  ];
  const menuLinks = [
    {
      name: "Home",
      path: "/sensec/homepage#homePage",
    },
    {
      name: "About",
      path: "/sensec/about#aboutPage",
    },
    {
      name: "Courses",
      path: "/sensec/courses#allProgrammes",
    },
    {
      name: "Contact",
      path: "/sensec/contact#contactPage",
    },
    {
      name: "Blogs",
      path: "/sensec/blogs#blogsPage",
    },
    {
      name: "Gallery",
      path: "/sensec/gallery#galleryPage",
    },
    {
      name: "Check Placement",
      path: "/sensec/students/enrollment/placement_check",
    },
    // {
    //   name: "Apply",
    //   path: "/sensec/students/application",
    // },
    {
      name: "Enrollment",
      path: "/sensec/students/enrollment",
    },
    {
      name: "Employment",
      path: {
        admin: `/sensec/users/${authUser?.uniqueId}/admin/User_Types/new_employment`,
        others: "/sensec/new_employment",
      },
    },
    {
      name: "Dashboard",
      path: {
        admin: `/sensec/users/${authUser?.uniqueId}/admin/Dashboard/Overview`,
        lecturer: `/sensec/users/${authUser?.uniqueId}/lecturer/Dashboard/Overview`,
        nt_Staff: `/sensec/users/${authUser?.uniqueId}/nt_staff#staff`,
        student: `/sensec/users/${authUser?.uniqueId}/student#student`,
      },
    },
    // {
    //   name: "Join Sensosa",
    //   path: "/sensec/sensosa/application_process",
    // },
  ];
  const isDashboard =
    location.pathname?.includes("Dashboard") ||
    location.pathname?.includes("Actions") ||
    location.pathname?.includes("User_Types") ||
    location.pathname?.includes("Attendance") ||
    location.pathname?.includes("Assessment") ||
    location.pathname?.includes("Account");
  // Find logged in user
  const userInfo = allUsers?.find(
    (user) => user?.uniqueId === authUser?.uniqueId
  );

  const [openUserLinks, setOpenUserLinks] = useState(false);

  const filteredOtherLinks = otherLinks?.filter(
    (links) => links && !userInfo && links?.name !== "Dashboard"
  );

  const filteredMenuLinks = menuLinks?.filter(
    (links) => links && !userInfo && links?.name !== "Dashboard"
  );

  const scrollWithOffset = (el) => {
    const yCoordinate = el.getBoundingClientRect().top + window.scrollY;
    const yOffset = -150;
    window.scrollTo({ top: yCoordinate + yOffset, behavior: "smooth" });
  };
  //THIS REMOVES THE NavLINK TAG FROM THE URL
  if (window.location.hash) {
    window.history.replaceState("", document.title, window.location.pathname);
  }

  const [isScrolled, setIsScrolled] = useState(false);
  // Announcement
  const [announcements, setAnnouncements] = useState([
    {
      message:
        "We would like to inform you about important updates regarding the current semester and the schedule for the upcoming semester.",
    },
    {
      message: "This current semester is scheduled to end on 28th March, 2025.",
    },
    {
      message:
        "The next semester is scheduled to begin on 23rd April, 2025. Please ensure that you are prepared for registration, course selection, and any other necessary preparations.",
    },
    {
      message:
        "For any questions or further details, you can please visit www.senyashs.com/sensec/contact, call +233 508 670 598 or contact our support team via email senya.shs.1991@gmail.com.",
    },
    {
      message:
        "Thank you for your attention, and we appreciate your cooperation.",
    },
  ]);
  const [textWidth, setTextWidth] = useState(0);
  const [containerWidth, setContainerWidth] = useState(window.innerWidth); // Store viewport width
  const textWidthRef = useRef(null);
  const controls = useAnimation();

  // Create a single scrolling string by joining all messages
  // const announcementText = announcements.map((a) => a.message).join("  |  ");

  // Default text if announcements are empty
  const announcementText =
    announcements.length > 0
      ? announcements.map((a) => a.message).join("  |  ")
      : "Welcome to our school website! Stay tuned for updates.";

  // Measure the width of the text dynamically
  useEffect(() => {
    if (textWidthRef.current) {
      setTextWidth(textWidthRef.current.scrollWidth);
    }
  }, [announcementText]);

  // Update container width on window resize
  useEffect(() => {
    const updateWidth = () => setContainerWidth(window.innerWidth);
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // Function to restart animation smoothly from right
  // useEffect(() => {
  //   const animateMarquee = async () => {
  //     while (true) {
  //       await controls.start({ x: window.innerWidth }); // Start from right
  //       await controls.start({
  //         x: `-${window.innerWidth}px`,
  //         transition: { ease: "linear", duration: 20 },
  //       }); // Move to left
  //     }
  //   };
  //   if (textWidth > 0) animateMarquee();
  // }, [textWidth, controls]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 140) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    if (authUser) {
      dispatch(userLogout());
      navigate("/sensec/homepage");
      toast.success("You logged out Successfully!", {
        position: "top-right",
        theme: "dark",
        toastId: "loggedOut",
      });
    }
  };

  const handleEscapeKey = (e) => {
    e.preventDefault();
    () => setOpenSearchModal(false);
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

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  return (
    <>
      <Box width={"100%"} className="navbarWrap">
        <StyledNavbar.Navbar>
          {/* Menu Icons */}
          <Box
            display={{ xs: "block", sm: "none" }}
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
              <Box display={"flex"} alignItems={"center"}>
                <MenuIcon
                  onClick={() => setOpenMenuLinks(!openMenuLinks)}
                  sx={{
                    display: { xs: "block", sm: "none" },
                    fontSize: { xs: "1.5", md: "2rem" },
                    cursor: "pointer",
                  }}
                />
                {/* {authUser ? (
                <Box
                  component={"button"}
                  onClick={() => setOpenSearchModal(true)}
                  bgcolor={"transparent"}
                  sx={{ cursor: "pointer" }}
                  mt={".3rem"}
                >
                  <Search
                    sx={{
                      display: { xs: "block", sm: "none" },
                      color: "#fff",
                      fontSize: "1.6rem",
                      marginLeft: "1rem",
                    }}
                  />
                  <SearchModal
                    open={openSearchModal}
                    onClose={() => setOpenSearchModal(false)}
                    handleEscapeKey={handleEscapeKey}
                  />
                </Box>
              ) : (
                <Box
                  component={"button"}
                  onClick={() => setOpenSearchModal(true)}
                  bgcolor={"transparent"}
                  sx={{ cursor: "pointer" }}
                  mt={".3rem"}
                >
                  <Search
                    sx={{
                      display: { xs: "block", sm: "none" },
                      color: "#fff",
                      fontSize: "1.6rem",
                      marginLeft: "1rem",
                    }}
                  />
                  <SearchModal
                    open={openSearchModal}
                    onClose={() => setOpenSearchModal(false)}
                    handleEscapeKey={handleEscapeKey}
                  />
                </Box>
              )} */}
              </Box>
            ) : (
              <Box display={"flex"} alignItems={"center"}>
                <CloseIcon
                  onClick={() => setOpenMenuLinks(!openMenuLinks)}
                  sx={{
                    display: { xs: "block", sm: "none" },
                    fontSize: { xs: "1.5", md: "2rem" },
                    cursor: "pointer",
                  }}
                />
                {/* {!authUser ? (
                <Box
                  component={"button"}
                  onClick={() => setOpenSearchModal(true)}
                  bgcolor={"transparent"}
                  sx={{ cursor: "pointer" }}
                  mt={".3rem"}
                >
                  <Search
                    sx={{
                      display: { xs: "block", sm: "none" },
                      color: "#fff",
                      fontSize: "1.6rem",
                      marginLeft: "1rem",
                    }}
                  />
                  <SearchModal
                    open={openSearchModal}
                    onClose={() => setOpenSearchModal(false)}
                    handleEscapeKey={handleEscapeKey}
                  />
                </Box>
              ) : (
                <Box
                  component={"button"}
                  onClick={() => setOpenSearchModal(true)}
                  bgcolor={"transparent"}
                  sx={{ cursor: "pointer" }}
                  mt={".3rem"}
                >
                  <Search
                    sx={{
                      display: { xs: "block", sm: "none" },
                      color: "#fff",
                      fontSize: "1.6rem",
                      marginLeft: "1rem",
                    }}
                  />
                  <SearchModal
                    open={openSearchModal}
                    onClose={() => setOpenSearchModal(false)}
                    handleEscapeKey={handleEscapeKey}
                  />
                </Box>
              )} */}
              </Box>
            )}
            {/* <Box display={isScrolled && isDashboard ? "none" : "block"}> */}
            <Box display={{ xs: "block", sm: "none" }}>
              {openMenuLinks && (
                <Box id="smallScreenMenu">
                  <Box>
                    {userInfo &&
                      menuLinks?.map((link) => (
                        <HashLink
                          key={link?.name}
                          className={
                            currentNavLink && link?.name === currentNavLink
                              ? "menuList selected"
                              : "menuList"
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
                              : link?.name === "Employment" &&
                                userInfo?.adminStatusExtend?.isAdmin
                              ? link?.path?.admin
                              : link?.name === "Employment" && !userInfo
                              ? link?.path?.others
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
                              ? "menuList selected"
                              : "menuList"
                          }
                          to={
                            link?.name === "Dashboard" &&
                            userInfo?.adminStatusExtend?.isAdmin
                              ? link?.path?.admin
                              : link?.name === "Dashboard" &&
                                userInfo?.lecturerStatusExtend?.isLecturer
                              ? link?.path?.lecturer
                              : link?.name === "Dashboard" &&
                                userInfo?.nTStaffStatusExtend?.isNTStaff
                              ? link?.path?.nt_Staff
                              : link?.name === "Dashboard" &&
                                userInfo?.studentStatusExtend?.isStudent
                              ? link?.path?.student
                              : link?.name === "Employment" &&
                                userInfo?.adminStatusExtend?.isAdmin
                              ? link?.path?.admin
                              : link?.name === "Employment" && !userInfo
                              ? link?.path?.others
                              : link?.path
                          }
                          onClick={() =>
                            localStorage.setItem("currentNavLink", link?.name)
                          }
                        >
                          {link?.name}
                        </NavHashLink>
                      ))}
                  </Box>
                </Box>
              )}
            </Box>
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
                alignItems: "center",
              }}
            >
              <>
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
                    <HashLink
                      id="navLinks"
                      key={link?.name}
                      // onClick={handleCloseNavMenu}
                      to={link?.path}
                      smooth
                      scroll={scrollWithOffset}
                      style={{
                        // my: 2,
                        color: `${
                          currentNavLink &&
                          currentNavLink !== "Others" &&
                          link?.name === currentNavLink
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
                    </HashLink>
                    {link?.name === "Others" && (
                      <Box id="otherLinks">
                        <button
                          className={
                            //   Change text color on button click
                            openUserLinks
                              ? "otherLinksWrap selected"
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
                        <Box className="subNav" style={{ zIndex: 3 }}>
                          <Box
                            display={
                              isScrolled && isDashboard ? "none" : "block"
                            }
                          >
                            {openSubNavLinks && (
                              <Box
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
                                          ? "otherLinkSelected selected"
                                          : "otherLinkSelected"
                                      }
                                      smooth
                                      scroll={scrollWithOffset}
                                      to={
                                        link?.name === "Dashboard" &&
                                        userInfo?.adminStatusExtend?.isAdmin
                                          ? link?.path?.admin
                                          : link?.name === "Dashboard" &&
                                            userInfo?.lecturerStatusExtend
                                              ?.isLecturer
                                          ? link?.path?.lecturer
                                          : link?.name === "Dashboard" &&
                                            userInfo?.nTStaffStatusExtend
                                              ?.isNTStaff
                                          ? link?.path?.nt_Staff
                                          : link?.name === "Dashboard" &&
                                            userInfo?.studentStatusExtend
                                              ?.isStudent
                                          ? link?.path?.student
                                          : link?.name === "Employment" &&
                                            userInfo?.adminStatusExtend?.isAdmin
                                          ? link?.path?.admin
                                          : link?.name === "Employment" &&
                                            !userInfo
                                          ? link?.path?.others
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
                                        if (
                                          link?.name === "Dashboard" &&
                                          userInfo?.lecturerStatusExtend
                                            ?.isLecturer
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
                                    <HashLink
                                      key={link?.name}
                                      className={
                                        currentOtherNavLink &&
                                        link?.name === currentOtherNavLink
                                          ? "otherLinkSelected selected"
                                          : "otherLinkSelected"
                                      }
                                      smooth
                                      scroll={scrollWithOffset}
                                      to={
                                        link?.name === "Dashboard" &&
                                        userInfo?.adminStatusExtend?.isAdmin
                                          ? link?.path?.admin
                                          : link?.name === "Dashboard" &&
                                            userInfo?.lecturerStatusExtend
                                              ?.isLecturer
                                          ? link?.path?.lecturer
                                          : link?.name === "Dashboard" &&
                                            userInfo?.nTStaffStatusExtend
                                              ?.isNTStaff
                                          ? link?.path?.nt_Staff
                                          : link?.name === "Dashboard" &&
                                            userInfo?.studentStatusExtend
                                              ?.isStudent
                                          ? link?.path?.student
                                          : link?.name === "Employment" &&
                                            userInfo?.adminStatusExtend?.isAdmin
                                          ? link?.path?.admin
                                          : link?.name === "Employment" &&
                                            !userInfo
                                          ? link?.path?.others
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
                              </Box>
                            )}
                          </Box>
                        </Box>
                      </Box>
                    )}
                  </Box>
                ))}
                {/* Search Box */}
                {/* <Box
                component={"button"}
                onClick={() => setOpenSearchModal(true)}
                bgcolor={"transparent"}
                sx={{ cursor: "pointer" }}
              >
                <Search
                  sx={{
                    color: "#fff",
                    fontSize: "1.6rem",
                    marginLeft: "1rem",
                    mt: ".5rem",
                  }}
                />
              </Box>
              <SearchModal
                open={openSearchModal}
                onClose={() => setOpenSearchModal(false)}
                handleEscapeKey={handleEscapeKey}
              /> */}
              </>
            </Box>
          </Box>
          {/* Current User */}
          <Box
            sx={{
              flex: "1",
              xs: { paddingLeft: "0", paddingRight: "0" },
            }}
          >
            {authUser && (
              <StyledNavbar.CurrentUser>
                <Typography
                  sx={{ display: { xs: "none", md: "block" }, color: "#fff" }}
                >
                  @{authUser?.userSignUpDetails?.userName}
                </Typography>
                <Box>
                  {authUser?.personalInfo?.profilePicture ? (
                    <Avatar
                      onClick={() => setOpenUserActions(!openUserActions)}
                      src={authUser?.personalInfo?.profilePicture?.url}
                      alt=""
                      sx={{
                        cursor: "pointer",
                      }}
                    />
                  ) : (
                    <Avatar
                      onClick={() => setOpenUserActions(!openUserActions)}
                      src={
                        authUser?.personalInfo?.gender === "Male"
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
                      <Box key={action?.label} className="profileOptions">
                        {action?.value !== "Logout" && (
                          <Box key={action?.label}>{action?.value}</Box>
                        )}
                        {action?.label === "Logout" && (
                          <Box className="logUserOutWrap">
                            <p className="logUserOut" onClick={handleLogout}>
                              Logout
                            </p>
                            <LogoutIcon className="logoutIcon" />
                          </Box>
                        )}
                      </Box>
                    ))}
                  </div>
                )}
              </StyledNavbar.CurrentUser>
            )}
            {!authUser && (
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
                            localStorage.removeItem("currentNavLink"),
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
                          // localStorage.setItem("signUpAction", option?.name), Now uses url params
                          localStorage.removeItem("currentOtherNavLink"),
                            localStorage.removeItem("currentNavLink"),
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
        {/* <Box
        sx={{
          overflow: "hidden",
          whiteSpace: "nowrap",
          background: "#fff",
          color: "#292929",
          padding: ".2rem",
          display: "flex",
          alignItems: "center",
          boxShadow: "2px 2px 3px 0px #696969",
          width: "100vw",
        }}
      >
        {textWidth > 0 && (
          <motion.div
            ref={textWidthRef}
            style={{
              display: "inline-block",
              whiteSpace: "nowrap",
              position: "relative",
            }}
            initial={{ x: containerWidth }} // Start completely off-screen (right)
            animate={{ x: `-${textWidth}px` }} // Move fully to the left
            transition={{
              ease: "linear",
              duration: 50, // Adjust speed
              repeat: Infinity,
            }}
          >
            <Typography
              variant="h6"
              fontSize={"1rem"}
              fontWeight={300}
              component="span"
            >
              {announcementText}
            </Typography>
          </motion.div>
        )}
      </Box> */}
        {/* <Box
        sx={{
          overflow: "hidden",
          whiteSpace: "nowrap",
          background: "#1976d2",
          color: "white",
          padding: "10px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <motion.div
          ref={textWidthRef}
          style={{
            display: "inline-block",
            whiteSpace: "nowrap",
          }}
          animate={{ x: ["100%", -textWidth] }}
          transition={{
            ease: "linear",
            duration: 50, // Adjust speed by changing duration
            repeat: Infinity,
          }}
        >
          <Typography
            variant="h6"
            component="span"
            sx={{ marginRight: "50px" }}
          >
            {announcementText} &nbsp; {announcementText}
          </Typography>
        </motion.div>
      </Box> */}
      </Box>
      {/* {authUser && ( */}
      <Box
        id={"latestNewsWrap"}
        sx={{
          overflow: "hidden",
          whiteSpace: "nowrap",
          backgroundColor: "#fff",
          color: "#696969",
          padding: "1rem",
          display: "flex",
          alignItems: "center",
          boxShadow: "2px 2px 3px 0px #696969",
          width: "100%",
          position: "relative",
        }}
      >
        <div className="marquee">
          <Typography
            variant="h6"
            component="span"
            className="marquee-text"
            fontSize={"1rem"}
            fontWeight={400}
          >
            {announcementText}
          </Typography>
        </div>
      </Box>
      {/* )} */}
    </>
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
  openSearchModal: PropTypes.bool,
  setOpenSearchModal: PropTypes.func,
};
