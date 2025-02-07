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
  FetchAllFlattenedProgrammes,
  FetchAllProgrammes,
} from "../../../../../data/programme/FetchProgrammeData";
import Cookies from "js-cookie";

export function PreviewPDF() {
  const maskedStudentId = Cookies.get("masked_student_id");
  const { studentId, adminCurrentAction, current_link, pdf } = useParams();
  const allStudents = FetchAllStudents();
  const allCoreSubjects = FetchAllCoreSubjects();
  const enrolledStudent = allStudents?.find(
    (std) => std?.uniqueId === maskedStudentId
  );
  const allProgrammes = FetchAllProgrammes();
  const allFlattenedProgrammes = FetchAllFlattenedProgrammes();
  const allDivisionProgrammes = FetchAllCreatedDivisionProgrammes();

  const [studentProgramme, setStudentProgramme] = useState({});
  console.log(studentProgramme);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("1024")); // 'md' is typically 900px
  const currentTerm = FetchCurrentAcademicTerms();
  const currentAcademicYear = FetchCurrentAcademicYear();

  // Set student's programme
  useEffect(() => {
    if (allFlattenedProgrammes) {
      console.log(allFlattenedProgrammes);
      const studentProgramme = allFlattenedProgrammes?.find(
        (programme) =>
          programme?._id ===
          enrolledStudent?.studentSchoolData?.program?.programId
      );
      setStudentProgramme(studentProgramme);
      // setProgramId(studentProgramme?._id);
    }
  }, [
    enrolledStudent,
    // allProgrammes,
    // allDivisionProgrammes,
    allFlattenedProgrammes,
  ]);

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
