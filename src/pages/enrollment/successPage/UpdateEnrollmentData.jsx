import {
  Avatar,
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
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { FetchAllStudents } from "../../../data/students/FetchAllStudents";
import { HashLink } from "react-router-hash-link";
import { StudentDataUpdateForm } from "../studentEnrollment/StudentDataUpdateForm";
import { StudentEnrollmentUpdateForm } from "../../../components/lazyLoading/student/StudentsLazyLoadingComponents";
import EnrollmentSuccessSidebar from "./sidebar/EnrollmentSuccessSidebar";
import { NavigationBar } from "../../../components/navbar/NavigationBar";

export default function UpdateEnrollmentData() {
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
  const { studentId, adminCurrentAction, current_link } = useParams();
  const allStudents = FetchAllStudents();
  const navigate = useNavigate();
  const enrolledStudent = allStudents?.find(
    (std) => std?.uniqueId === studentId
  );

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
  const isMobile = useMediaQuery(theme.breakpoints.down("1024")); // 'md' is typically 900px
  const currentTerm = FetchCurrentAcademicTerms();
  const currentAcademicYear = FetchCurrentAcademicYear();

  return (
    <Box display={"flex"}>
      <EnrollmentSuccessSidebar
        isMobile={isMobile}
        setHovered={setHovered}
        hovered={hovered}
        drawerWidthExpanded={drawerWidthExpanded}
        drawerWidthCollapsed={drawerWidthCollapsed}
        currentTerm={currentTerm}
        currentAcademicYear={currentAcademicYear}
        enrolledStudent={enrolledStudent}
        links={links}
        current_link={current_link}
      />
      <Box
        className="rightWrap"
        width={!isMobile ? "calc(100% - 160px)" : "100%"}
        ml={!isMobile ? "160px" : 0}
        flexShrink={!adminCurrentAction ? 1 : 0}
        id="enrollmentDataUpdate"
      >
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
            // display: isScrolled ? "none" : "block",
            top: 0,
            backgroundColor: "#fff",
            padding: 0,
            // zIndex: 5,
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
        <StudentEnrollmentUpdateForm />
      </Box>
    </Box>
  );
}
