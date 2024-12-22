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
import { StudentEnrollmentUpdateForm } from "../../../components/lazyLoading/student/StudentsLazyLoadingComponents";
import EnrollmentSuccessSidebar from "./sidebar/EnrollmentSuccessSidebar";

export default function UpdateEnrollmentData() {
  const { studentId, adminCurrentAction, current_link } = useParams();
  const allStudents = FetchAllStudents();
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
        <StudentEnrollmentUpdateForm />
      </Box>
    </Box>
  );
}
