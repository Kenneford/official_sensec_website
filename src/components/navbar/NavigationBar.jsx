import { useEffect, useState } from "react";
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
import { SearchModal } from "../../modals/SearchModal";

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
  console.log(enrollment);

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
        teacher: `/sensec/users/${authUser?.uniqueId}/teacher#teacher`,
        nt_Staff: `/sensec/users/${authUser?.uniqueId}/nt_staff#staff`,
        student: `/sensec/users/${authUser?.uniqueId}/student#student`,
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
        teacher: `/sensec/users/${authUser?.uniqueId}/teacher#teacher`,
        nt_Staff: `/sensec/users/${authUser?.uniqueId}/nt_staff#staff`,
        student: `/sensec/users/${authUser?.uniqueId}/student#student`,
      },
    },
    {
      name: "Join Sensosa",
      path: "/sensec/sensosa/application_process",
    },
  ];
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

  //THIS REMOVES THE NavLINK TAG FROM THE URL
  if (window.location.hash) {
    window.history.replaceState("", document.title, window.location.pathname);
  }

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      console.log("Scroll detected:", window.scrollY);
      if (window.scrollY >= 140) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    console.log(window.scrollY > 10);

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
    <Box width={"100%"} className="navbarWrap">
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
            <Box display={"flex"} alignItems={"center"}>
              <MenuIcon
                onClick={() => setOpenMenuLinks(!openMenuLinks)}
                sx={{
                  display: { xs: "block", sm: "none" },
                  fontSize: { xs: "1.5", md: "2rem" },
                }}
              />
              {authUser ? (
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
              )}
            </Box>
          ) : (
            <Box display={"flex"} alignItems={"center"}>
              <CloseIcon
                onClick={() => setOpenMenuLinks(!openMenuLinks)}
                sx={{
                  display: { xs: "block", sm: "none" },
                  fontSize: { xs: "1.5", md: "2rem" },
                }}
              />
              {!authUser ? (
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
              )}
            </Box>
          )}
          <Box display={isScrolled ? "none" : "block"}>
            {openMenuLinks && (
              <Box id="smallScreenMenu">
                <li>
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
                        <Box display={isScrolled ? "none" : "block"}>
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
                                    to={
                                      link?.name === "Dashboard" &&
                                      userInfo?.adminStatusExtend?.isAdmin
                                        ? link?.path?.admin
                                        : link?.name === "Dashboard" &&
                                          userInfo?.teacherStatusExtend
                                            ?.isTeacher
                                        ? link?.path?.teacher
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
                                    to={
                                      link?.name === "Dashboard" &&
                                      userInfo?.adminStatusExtend?.isAdmin
                                        ? link?.path?.admin
                                        : link?.name === "Dashboard" &&
                                          userInfo?.teacherStatusExtend
                                            ?.isTeacher
                                        ? link?.path?.teacher
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
              <Box
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
                  }}
                />
              </Box>
              <SearchModal
                open={openSearchModal}
                onClose={() => setOpenSearchModal(false)}
                handleEscapeKey={handleEscapeKey}
              />
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
                        // localStorage.setItem("signUpAction", option?.name),
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
  openSearchModal: PropTypes.bool,
  setOpenSearchModal: PropTypes.func,
};
