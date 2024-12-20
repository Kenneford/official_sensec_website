import { useMemo, useState } from "react";
import "./previewPDF.scss";
import { useNavigate, useParams } from "react-router-dom";
import { FetchAllStudents } from "../../../../../data/students/FetchAllStudents";
import { useDispatch } from "react-redux";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { FetchCurrentAcademicTerms } from "../../../../../data/term.year/FetchAcademicTerms";
import { FetchCurrentAcademicYear } from "../../../../../data/term.year/FetchAcademicYears";
import EnrollmentSuccessSidebar from "../../sidebar/EnrollmentSuccessSidebar";
import { AdmissionPdfViewer } from "../view/AdmissionPdfViewer";
import ProspectusPdfViewer from "../view/ProspectusPdfViewer";
import StudentProfilePdfViewer from "../view/StudentProfilePdfViewer";
import UndertakingPdfViewer from "../view/UndertakingPdfViewer";
import ProgrammesPdfViewer from "../view/ProgrammesPdfViewer";
import { FetchAllCoreSubjects } from "../../../../../data/subjects/FetchSubjects";

export function PreviewPDF() {
  const { studentId, adminCurrentAction, current_link, pdf } = useParams();
  const allStudents = FetchAllStudents();
  const allCoreSubjects = FetchAllCoreSubjects();
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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  const drawerWidthCollapsed = 160; // Collapsed width
  const drawerWidthExpanded = 300; // Expanded width
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("1024")); // 'md' is typically 900px
  const currentTerm = FetchCurrentAcademicTerms();
  const currentAcademicYear = FetchCurrentAcademicYear();

  const memoizedCoreSubjects = useMemo(
    () => allCoreSubjects,
    [allCoreSubjects]
  );
  const memoizedStudent = useMemo(() => enrolledStudent, [enrolledStudent]);
  const memoizedTerm = useMemo(() => currentTerm, [currentTerm]);
  const memoizedYear = useMemo(
    () => currentAcademicYear,
    [currentAcademicYear]
  );

  return (
    <Box display={"flex"}>
      <EnrollmentSuccessSidebar
        currentTerm={memoizedTerm}
        currentAcademicYear={memoizedYear}
        enrolledStudent={memoizedStudent}
      />
      <Box
        mt={"unset"}
        // className="rightWrap"
        width={!isMobile ? "calc(100% - 160px)" : "100%"}
        ml={!isMobile ? "160px" : 0}
        flexShrink={!adminCurrentAction ? 1 : 0}
      >
        {pdf === "admission_pdf" && (
          <AdmissionPdfViewer
            enrolledStudent={enrolledStudent}
            currentTerm={currentTerm}
            currentAcademicYear={currentAcademicYear}
          />
        )}
        {pdf === "prospectus_pdf" && (
          <ProspectusPdfViewer enrolledStudent={enrolledStudent} />
        )}
        {pdf === "student_profile" && (
          <StudentProfilePdfViewer enrolledStudent={enrolledStudent} />
        )}
        {pdf === "undertaking_&_medical_status_pdf" && (
          <UndertakingPdfViewer enrolledStudent={enrolledStudent} />
        )}
        {pdf === "programmes_subjects_pdf" && (
          <ProgrammesPdfViewer
            enrolledStudent={enrolledStudent}
            allCoreSubjects={memoizedCoreSubjects}
          />
        )}
      </Box>
    </Box>
  );
}
