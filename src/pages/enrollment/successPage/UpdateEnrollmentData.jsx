import {
  Box,
  Collapse,
  Drawer,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { FetchCurrentAcademicTerms } from "../../../data/term.year/FetchAcademicTerms";
import { FetchCurrentAcademicYear } from "../../../data/term.year/FetchAcademicYears";
import { useParams } from "react-router-dom";
import { FetchAllStudents } from "../../../data/students/FetchAllStudents";
import { HashLink } from "react-router-hash-link";
import { StudentDataUpdateForm } from "../studentEnrollment/StudentDataUpdateForm";

export default function UpdateEnrollmentData() {
  const { studentId, adminCurrentAction, current_link } = useParams();
  const allStudents = FetchAllStudents();
  const enrolledStudent = allStudents?.find(
    (std) => std?.uniqueId === studentId
  );

  const links = [
    {
      name: "Overview",
      ulr: `/sensec/students/enrollment/online/${enrolledStudent?.uniqueId}/success/Overview`,
    },
    {
      name: "View Profile",
      ulr: `/sensec/students/enrollment/online/${enrolledStudent?.uniqueId}/success/View_Profile`,
    },
    {
      name: "Update",
      ulr: `/sensec/students/enrollment/online/${enrolledStudent?.uniqueId}/success/Update`,
    },
  ];
  const [hovered, setHovered] = useState(false);
  const drawerWidthCollapsed = 160; // Collapsed width
  const drawerWidthExpanded = 300; // Expanded width
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("1024")); // 'md' is typically 900px
  const currentTerm = FetchCurrentAcademicTerms();
  const currentAcademicYear = FetchCurrentAcademicYear();

  return (
    <Box display={"flex"}>
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
              {links?.map((link) => (
                <HashLink
                  to={link?.ulr}
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
            </Box>
          </Drawer>
        )}
      </Box>
      <Box
        className="rightWrap"
        width={!isMobile ? "calc(100% - 160px)" : "100%"}
        ml={!isMobile ? "160px" : 0}
        flexShrink={!adminCurrentAction ? 1 : 0}
      >
        <StudentDataUpdateForm />
      </Box>
    </Box>
  );
}
