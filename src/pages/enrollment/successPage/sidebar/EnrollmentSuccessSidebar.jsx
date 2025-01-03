import { Box, Collapse, Drawer, useMediaQuery, useTheme } from "@mui/material";
import { HashLink } from "react-router-hash-link";
import PropTypes from "prop-types";
import { useState } from "react";

export default function EnrollmentSuccessSidebar({
  currentTerm,
  currentAcademicYear,
  enrolledStudent,
  current_link,
}) {
  const scrollWithOffset = (el) => {
    const yCoordinate = el.getBoundingClientRect().top + window.scrollY;
    const yOffset = 150;
    window.scrollTo({ top: yCoordinate + yOffset, behavior: "smooth" });
  };
  //THIS REMOVES THE HASHLINK TAG FROM THE URL
  if (window.location.hash) {
    window.history.replaceState("", document.title, window.location.pathname);
  }
  const links = [
    {
      name: "Overview",
      ulr: `/sensec/students/enrollment/online/${enrolledStudent?.uniqueId}/success/Overview#enrollmentOverview`,
    },
    {
      name: "View Profile",
      ulr: `/sensec/students/enrollment/online/${enrolledStudent?.uniqueId}/success/View_Profile#enrollmentProfile`,
    },
    {
      name: "Update",
      ulr: `/sensec/students/enrollment/online/${enrolledStudent?.uniqueId}/success/Update#enrollmentDataUpdate`,
    },
  ];
  const [hovered, setHovered] = useState(false);
  const drawerWidthCollapsed = 160; // Collapsed width
  const drawerWidthExpanded = 300; // Expanded width
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("1024"));

  return (
    <Box>
      {!isMobile && (
        <Drawer
          variant="permanent"
          anchor="left"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="sidebar"
          sx={{
            "& .MuiDrawer-paper": {
              position: "fixed", // Fix the drawer to the viewport
              top: 0,
              left: 0,
              height: "100vh",
              width: hovered ? drawerWidthExpanded : drawerWidthCollapsed, // Expand on hover
              transition: "width 0.3s", // Smooth width transition
              overflowX: "hidden", // Prevent content from spilling
              backgroundColor: "#292929", // Optional background color
            },
          }}
        >
          {/* Button to toggle sidebar */}
          <Box
            sx={{
              backgroundColor: "#292929",
              padding: ".5rem",
              borderBottom: "2px solid #fff",
            }}
          >
            <Box
              sx={{
                textAlign: "center",
                color: "#696969",
                pt: 1,
                fontSize: "1rem",
              }}
            >
              <span>{currentTerm?.name}</span>
              {"-"}
              <span>{currentAcademicYear?.yearRange}</span>
            </Box>
            {/* User Info */}
            <Box className="userInfo">
              <img
                src={enrolledStudent?.personalInfo?.profilePicture?.url}
                alt=""
              />
              {hovered && (
                <Collapse
                  in={hovered}
                  className="infoText"
                  //   sx={{
                  //     transition: "0.5s ease", // Smooth transition when toggling
                  //   }}
                >
                  <span>{enrolledStudent?.personalInfo?.fullName}</span>
                </Collapse>
              )}
            </Box>
          </Box>
          <Box className="links">
            {!enrolledStudent?.studentStatusExtend?.isGraduated &&
              enrolledStudent?.studentStatusExtend?.enrollmentStatus !==
                "approved" && (
                <>
                  {links?.map((link) => (
                    <HashLink
                      to={link?.ulr}
                      smooth
                      // scroll={scrollWithOffset}
                      key={link?.name}
                      className={
                        current_link &&
                        current_link?.replace(/_/g, " ") !== link?.name
                          ? "link"
                          : "link active"
                      }
                    >
                      {link?.name}
                    </HashLink>
                  ))}
                </>
              )}
            {enrolledStudent?.studentStatusExtend?.enrollmentStatus ===
              "approved" ||
              (enrolledStudent?.studentStatusExtend?.isGraduated && (
                <>
                  {links?.map((link) => (
                    <HashLink
                      to={link?.ulr}
                      smooth
                      // scroll={scrollWithOffset}
                      key={link?.name}
                      className={
                        current_link &&
                        current_link?.replace(/_/g, " ") !== link?.name
                          ? "link"
                          : "link active"
                      }
                    >
                      {link?.name}
                    </HashLink>
                  ))}
                </>
              ))}
          </Box>
        </Drawer>
      )}
    </Box>
  );
}

EnrollmentSuccessSidebar.propTypes = {
  isMobile: PropTypes.bool,
  setHovered: PropTypes.func,
  hovered: PropTypes.bool,
  drawerWidthExpanded: PropTypes.number,
  drawerWidthCollapsed: PropTypes.number,
  currentTerm: PropTypes.object,
  currentAcademicYear: PropTypes.object,
  enrolledStudent: PropTypes.object,
  links: PropTypes.array,
  current_link: PropTypes.string,
};
