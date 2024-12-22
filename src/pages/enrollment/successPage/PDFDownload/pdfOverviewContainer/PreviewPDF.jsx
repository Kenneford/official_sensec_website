import { useEffect, useMemo, useState } from "react";
import "./previewPDF.scss";
import { useParams } from "react-router-dom";
import { FetchAllStudents } from "../../../../../data/students/FetchAllStudents";
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
import {
  FetchAllCreatedDivisionProgrammes,
  FetchAllProgrammes,
} from "../../../../../data/programme/FetchProgrammeData";

export function PreviewPDF() {
  const { studentId, adminCurrentAction, current_link, pdf } = useParams();
  const allStudents = FetchAllStudents();
  const allCoreSubjects = FetchAllCoreSubjects();
  const enrolledStudent = allStudents?.find(
    (std) => std?.uniqueId === studentId
  );
  const allProgrammes = FetchAllProgrammes();
  const allDivisionProgrammes = FetchAllCreatedDivisionProgrammes();

  const [studentProgramme, setStudentProgramme] = useState({});
  console.log(studentProgramme);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("1024")); // 'md' is typically 900px
  const currentTerm = FetchCurrentAcademicTerms();
  const currentAcademicYear = FetchCurrentAcademicYear();

  // Set student's programme
  useEffect(() => {
    if (enrolledStudent?.studentSchoolData?.divisionProgram) {
      const studentProgramme = allDivisionProgrammes?.find(
        (programme) =>
          programme?._id ===
          enrolledStudent?.studentSchoolData?.divisionProgram?._id
      );
      setStudentProgramme(studentProgramme);
    } else {
      const studentProgramme = allProgrammes?.find(
        (programme) =>
          programme?._id === enrolledStudent?.studentSchoolData?.program?._id
      );
      setStudentProgramme(studentProgramme);
    }
  }, [enrolledStudent, allProgrammes, allDivisionProgrammes]);

  const memoizedCoreSubjects = useMemo(
    () => allCoreSubjects,
    [allCoreSubjects]
  );
  const memoizedStudent = useMemo(() => enrolledStudent, [enrolledStudent]);
  const memoizedStudentProgramme = useMemo(
    () => studentProgramme,
    [studentProgramme]
  );
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
        current_link={current_link}
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
            studentProgramme={memoizedStudentProgramme}
          />
        )}
        {pdf === "prospectus_pdf" && (
          <ProspectusPdfViewer enrolledStudent={enrolledStudent} />
        )}
        {pdf === "student_profile" && (
          <StudentProfilePdfViewer enrolledStudent={enrolledStudent} />
        )}
        {pdf === "programmes_subjects_pdf" && (
          <ProgrammesPdfViewer
            enrolledStudent={enrolledStudent}
            allCoreSubjects={memoizedCoreSubjects}
            allProgrammes={allProgrammes}
          />
        )}
        {pdf === "undertaking_&_medical_status_pdf" && (
          <UndertakingPdfViewer enrolledStudent={enrolledStudent} />
        )}
      </Box>
    </Box>
  );
}
