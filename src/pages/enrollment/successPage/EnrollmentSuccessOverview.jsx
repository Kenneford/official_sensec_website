import React, { useEffect, useMemo, useState } from "react";
import "./enrollmentSuccessPage.scss";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
// import PageLoading from "../../pageLoading/PageLoading";
import { saveAs } from "file-saver";
import { pdf, PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import AdmissionPDF from "./PDFDownload/pdfs/AdmissionPDF";
import { toast } from "react-toastify";
// import StudentRecordDetails from "./StudentRecords/StudentRecordDetails";
// import UpdateStudentRecords from "./Update/UpdateStudentRecords";
import ProspectusPDF from "./PDFDownload/pdfs/ProspectusPDF";
import StudentProfilePDF from "./PDFDownload/pdfs/StudentProfilePDF";
import ProgrammesPDF from "./PDFDownload/pdfs/ProgrammesPDF";
import UndertakingPDF from "./PDFDownload/pdfs/UndertakingPDF";
import { dateFormatter } from "../../../dateFormatter/DateFormatter";
// import { FetchSingleStudent } from "../../../dataFetching/fetchStudents/FetchStudentsCategories";
// import StudentHasGraduated from "./graduatedStudent/StudentHasGraduated";
import { FetchAllStudents } from "../../../data/students/FetchAllStudents";
import { SideBar } from "../../../components/lazyLoading/auth/AuthLazyComponents";
import {
  Box,
  Button,
  Collapse,
  Drawer,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { FetchCurrentAcademicTerms } from "../../../data/term.year/FetchAcademicTerms";
import { FetchCurrentAcademicYear } from "../../../data/term.year/FetchAcademicYears";
import { ContainerBox } from "../../../muiStyling/muiStyling";
import {
  FetchAllCreatedDivisionProgrammes,
  FetchAllDivisionProgrammes,
  FetchAllProgrammes,
} from "../../../data/programme/FetchProgrammeData";
import SmallFooter from "../../../components/footer/SmallFooter";
import { fetchAllDivisionProgrammes } from "../../../features/academics/programmeSlice";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { FetchAllCoreSubjects } from "../../../data/subjects/FetchSubjects";
import EnrollmentSuccessSidebar from "./sidebar/EnrollmentSuccessSidebar";
import PDFButtons from "./PDFDownload/pdfButtons/PDFButtons";

export function EnrollmentSuccessOverview({
  setEnroledStudent,
  setCurrentEnrolmentSuccessLink,
  currentEnrolmentSuccessLink,
}) {
  const studentUniqueId = localStorage.getItem("studentUniqueId");
  const { studentId, adminCurrentAction, current_link } = useParams();
  console.log(current_link);

  const currentYear = new Date().getFullYear();
  const allStudents = FetchAllStudents();
  const allCoreSubjects = FetchAllCoreSubjects();
  const allProgrammes = FetchAllProgrammes();
  const allDivisionProgrammes = FetchAllCreatedDivisionProgrammes();
  console.log(allDivisionProgrammes);

  const nonDivisionPrograms = allProgrammes?.find(
    (program) => !program?.hasDivisions && program
  );
  console.log(nonDivisionPrograms);

  const enrolledStudent = allStudents?.find(
    (std) => std?.uniqueId === studentId
  );
  console.log(enrolledStudent?.studentSchoolData?.program?._id);
  const stdProgram = allProgrammes?.find(
    (prgrm) => prgrm?._id === enrolledStudent?.studentSchoolData?.program?._id
  );

  // const allDivisionProgrammes = FetchAllDivisionProgrammes({
  //   programId: stdProgram?._id,
  // });
  // const allDivisionProgrammes = useSelector(getAllDivisionProgrammes);
  const [studentProgramme, setStudentProgramme] = useState({});
  const [programId, setProgramId] = useState({});
  // console.log(allDivisionProgrammes);

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

  const [disappear, setDisappear] = useState(false);

  const memoizedCoreSubjects = useMemo(
    () => allCoreSubjects,
    [allCoreSubjects]
  );
  useEffect(() => {
    if (enrolledStudent?.studentSchoolData?.divisionProgram) {
      const studentProgramme = allDivisionProgrammes?.find(
        (programme) =>
          programme?._id ===
          enrolledStudent?.studentSchoolData?.divisionProgram?._id
      );
      setStudentProgramme(studentProgramme);
      setProgramId(studentProgramme?.programId);
    } else {
      const studentProgramme = allProgrammes?.find(
        (programme) =>
          programme?._id === enrolledStudent?.studentSchoolData?.program?._id
      );
      setStudentProgramme(studentProgramme);
      setProgramId(studentProgramme?._id);
    }
  }, [enrolledStudent, allProgrammes, allDivisionProgrammes]);

  useEffect(() => {
    setDisappear(false);
  }, [dispatch, enrolledStudent]);

  useEffect(() => {
    if (
      currentEnrolmentSuccessLink &&
      currentEnrolmentSuccessLink === "DASHBOARD"
    ) {
      setCurrentEnrolmentSuccessLink("DASHBOARD");
    }
  }, [currentEnrolmentSuccessLink, setCurrentEnrolmentSuccessLink]);

  return (
    <Box display={"flex"}>
      <EnrollmentSuccessSidebar
        currentTerm={currentTerm}
        currentAcademicYear={currentAcademicYear}
        enrolledStudent={enrolledStudent}
        current_link={current_link}
      />
      <Box
        className="rightWrap"
        width={!isMobile ? "calc(100% - 160px)" : "100%"}
        ml={!isMobile ? "160px" : 0}
        flexShrink={!adminCurrentAction ? 1 : 0}
        id="enrollmentOverview"
      >
        {!enrolledStudent?.studentSchoolData?.house && !disappear && (
          <Box className="houseAlert">
            <p>
              No house found with free room. Kindly contact the house master to
              assign a house for you.
            </p>
            <span className="alertCloseBtn" title="Close">
              <button onClick={() => setDisappear(true)}>
                <CloseIcon className="closeIcon" />
              </button>
            </span>
          </Box>
        )}
        <Box className="applicationInfoTitle" textAlign={"center"}>
          {/* <h2>Senya Senior High School</h2> {"===>>>"} */}
          <span>
            Admission Year: {currentYear}/{currentYear + 1}
          </span>
        </Box>
        <Box p={{ xs: "1rem" }}>
          <Box className="applicationContent">
            <Box className="wellDone">
              <p>
                CONGRATULATIONS,{" "}
                {/* {enrolledStudent?.personalInfo?.firstName}{" "}
                {enrolledStudent?.personalInfo?.otherName !== "" &&
                  enrolledStudent?.personalInfo?.otherName}{" "}
                {enrolledStudent?.personalInfo?.lastName} , */}
                YOU HAVE COMPLETED YOUR ENROLLMENT SUCCESSFULLY. KINDLY DOWNLOAD
                ALL THE NECESSARY DOCUMENTS. THANK YOU!
              </p>
            </Box>
            <Box
              className="studentDataCont"
              display={{ xs: "block", sm: "block", md: "flex" }}
              p={{ xs: "1rem" }}
              gap={"1rem"}
            >
              <Box className="studentData">
                <Box className="studentDataWrap">
                  <Box className="student">
                    <p className="studentName">
                      {enrolledStudent?.personalInfo?.firstName}{" "}
                      {enrolledStudent?.personalInfo?.otherName !== "" &&
                        enrolledStudent?.personalInfo?.otherName}{" "}
                      {enrolledStudent?.personalInfo?.lastName}
                    </p>
                    <p className="studentId">( {enrolledStudent?.uniqueId} )</p>
                    <Box className="studentImg">
                      <img
                        src={
                          enrolledStudent?.personalInfo?.profilePicture
                            ? enrolledStudent?.personalInfo?.profilePicture?.url
                            : enrolledStudent?.personalInfo?.profilePicture
                        }
                        alt=""
                      />
                    </Box>
                  </Box>
                </Box>
                <Box className="enrollmentInfoWrap" p={"1rem"}>
                  <Box
                    className="enrolledDate"
                    m={{ xs: "1rem 0 .5rem", sm: ".5rem 0 .5rem" }}
                  >
                    <h3>
                      Enrolled On:{" "}
                      <span>
                        {enrolledStudent?.studentStatusExtend?.dateEnrolled
                          ? dateFormatter.format(
                              new Date(
                                enrolledStudent?.studentStatusExtend?.dateEnrolled
                              )
                            )
                          : "Unknown"}
                        .
                      </span>
                    </h3>
                  </Box>
                  {/* <Box className="studentEnrolmentInfo"> */}
                  <Box>
                    <Grid container>
                      <Grid item xs={12} sm={6} md={4} lg={4}>
                        <Box className="infoCard">
                          <h3>
                            {enrolledStudent?.studentSchoolData?.program?.name}
                          </h3>
                          <span>(Programme)</span>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={6} md={4} lg={4}>
                        <Box className="infoCard">
                          <h3
                            title={
                              enrolledStudent?.studentSchoolData
                                ?.currentClassLevelSection?.sectionName || ""
                            }
                          >
                            {enrolledStudent?.studentSchoolData
                              ?.currentClassLevelSection
                              ? enrolledStudent?.studentSchoolData
                                  ?.currentClassLevelSection?.label
                              : "Not Yet"}
                          </h3>
                          <span>(Class Assigned)</span>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={6} md={4} lg={4}>
                        <Box className="infoCard">
                          <h3>
                            {
                              enrolledStudent?.studentSchoolData
                                ?.currentClassLevel?.name
                            }
                          </h3>
                          <span>(Class Level)</span>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={6} md={4} lg={4}>
                        <Box className="infoCard">
                          <h3>{enrolledStudent?.status?.residentialStatus}</h3>
                          <span>(Residential Status)</span>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={6} md={4} lg={4}>
                        <Box className="infoCard">
                          <h3>{enrolledStudent?.personalInfo?.gender}</h3>
                          <span>(Gender)</span>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={6} md={4} lg={4}>
                        <Box className="infoCard">
                          <h3>
                            {enrolledStudent?.studentSchoolData?.house
                              ? `${enrolledStudent?.studentSchoolData?.house?.name}`
                              : "Not Yet"}
                          </h3>
                          <span>(House Assigned)</span>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={6} md={4} lg={4}>
                        <Box className="infoCard">
                          <h3>
                            {enrolledStudent?.studentSchoolData?.jhsAttended}
                          </h3>
                          <span>(JHS Completed)</span>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={6} md={4} lg={4}>
                        <Box className="infoCard">
                          <h3>
                            {enrolledStudent?.studentSchoolData?.jhsIndexNo}
                          </h3>
                          <span>(JHS Index No.)</span>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={6} md={4} lg={4}>
                        <Box className="infoCard">
                          <h3>{enrolledStudent?.contactAddress?.mobile}</h3>
                          <span>(Contact Number)</span>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                  {/* </Box> */}
                  <Box className="classTeacherWrap">
                    <h4>Your Lecturer:</h4>
                    <Box className="studentLecturerImgWrap">
                      <img
                        className="studentLecturerImg"
                        src={
                          enrolledStudent?.studentSchoolData
                            ?.currentClassTeacher
                            ? enrolledStudent?.studentSchoolData
                                ?.currentClassTeacher?.personalInfo
                                ?.profilePicture?.url
                            : "/assets/noAvatar.png"
                        }
                        alt=""
                      />
                      <p>
                        {enrolledStudent?.studentSchoolData?.currentClassTeacher
                          ?.personalInfo?.gender === "Male" && "Mr."}
                        {enrolledStudent?.studentSchoolData?.currentClassTeacher
                          ?.personalInfo?.gender === "Female" && "Mrs."}{" "}
                        {enrolledStudent?.studentSchoolData?.currentClassTeacher
                          ? enrolledStudent?.studentSchoolData
                              ?.currentClassTeacher?.personalInfo?.fullName
                          : ""}
                      </p>
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box
                className="studentElectiveSubjects"
                pt={{ xs: "1rem", sm: "1rem", md: "unset" }}
              >
                <Box className="comeAlongDocsWrap" p={"1rem"}>
                  <h2>Your Elective Subjects</h2>
                  <Box className="eSubjects">
                    <Box className="generalSubjects">
                      {studentProgramme?.electiveSubjects?.length > 0 ? (
                        <ul>
                          {studentProgramme?.electiveSubjects?.map(
                            (subject) => (
                              <li key={subject._id}>
                                <span
                                  className={
                                    subject?.electiveSubInfo?.isOptional
                                      ? "optionalSub"
                                      : ""
                                  }
                                  title={
                                    subject?.electiveSubInfo?.isOptional
                                      ? "Optional Elective Subject"
                                      : ""
                                  }
                                >
                                  {subject?.subjectName}
                                </span>
                              </li>
                            )
                          )}
                        </ul>
                      ) : (
                        <p
                          style={{
                            color: "#696969",
                            textAlign: "center",
                            width: "100%",
                            paddingBottom: "unset",
                          }}
                        >
                          No data to display!
                        </p>
                      )}
                    </Box>
                  </Box>
                </Box>
                <Box className="comeAlongDocsWrap" p={"1rem"}>
                  <h2 style={{ color: "#696969", fontWeight: "500" }}>
                    You are expected to come along with the following on the
                    reporting date:
                  </h2>
                  <ul>
                    <li>
                      Printed copy of your admission letter and a printed copy
                      of your personal profile form.
                    </li>
                    <li>Undertaking and medical status form.</li>
                    <li>Fully filled placement form.</li>
                    <li>A copy of your BECE result slip.</li>
                    <li>Birth/Baptism certificate (Photo-copy)</li>
                  </ul>
                  <p>
                    Your admission is NOT complete without the documents stated
                    above.
                  </p>
                </Box>
              </Box>
            </Box>
            <PDFButtons
              enrolledStudent={enrolledStudent}
              currentTerm={currentTerm}
              currentAcademicYear={currentAcademicYear}
              studentProgramme={studentProgramme}
              isMobile={isMobile}
              allCoreSubjects={memoizedCoreSubjects}
              allProgrammes={allProgrammes}
              allDivisionProgrammes={allDivisionProgrammes}
            />
            {isMobile && (
              <Box
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
              >
                <p
                  style={{
                    color: "#696969",
                    padding: ".5rem 0",
                  }}
                >
                  Click{" "}
                  <HashLink
                    to={`/sensec/students/enrollment/online/${enrolledStudent?.uniqueId}/success/View_Profile#enrollmentProfile`}
                    style={{
                      maxWidth: "15rem",
                      "&:hover": { backgroundColor: "transparent" },
                      color: "#088dc2",
                      marginBottom: ".5rem",
                    }}
                  >
                    here
                  </HashLink>{" "}
                  to view your enrollment profile.
                </p>
                <p
                  style={{
                    color: "#696969",
                    padding: ".5rem 0",
                  }}
                >
                  Click{" "}
                  <HashLink
                    to={`/sensec/students/enrollment/online/${enrolledStudent?.uniqueId}/success/Update#enrollmentDataUpdate`}
                    style={{
                      maxWidth: "15rem",
                      "&:hover": { backgroundColor: "transparent" },
                      color: "#088dc2",
                    }}
                    // onClick={() =>
                    //   navigate(
                    //   )
                    // }
                  >
                    here
                  </HashLink>{" "}
                  to update your enrollment data
                </p>
              </Box>
            )}
          </Box>
        </Box>
        <SmallFooter />
      </Box>
      {/* </ContainerBox> */}
    </Box>
  );
}
