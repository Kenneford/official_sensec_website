import React, { useEffect, useState } from "react";
import "./enrollmentSuccessPage.scss";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
// import PageLoading from "../../pageLoading/PageLoading";
import { saveAs } from "file-saver";
import { pdf } from "@react-pdf/renderer";
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
  FetchAllDivisionProgrammes,
  FetchAllProgrammes,
} from "../../../data/programme/FetchProgrammeData";
import SmallFooter from "../../../components/footer/SmallFooter";
import { fetchAllDivisionProgrammes } from "../../../features/academics/programmeSlice";

export function EnrollmentSuccessOverview({
  setEnroledStudent,
  setCurrentEnrolmentSuccessLink,
  currentEnrolmentSuccessLink,
}) {
  const studentUniqueId = localStorage.getItem("studentUniqueId");
  const { studentId, adminCurrentAction } = useParams();

  const currentYear = new Date().getFullYear();
  const allStudents = FetchAllStudents();
  const allProgrammes = FetchAllProgrammes();
  const enrolledStudent = allStudents?.find(
    (std) => std?.uniqueId === studentId
  );
  const allDivisionProgrammes = FetchAllDivisionProgrammes({
    programId: enrolledStudent?.studentSchoolData?.program,
  });
  // const allDivisionProgrammes = useSelector(getAllDivisionProgrammes);
  const [studentProgramme, setStudentProgramme] = useState("");
  console.log(allDivisionProgrammes);

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
  const downloadProspectusPDF = () => {
    pdf(<ProspectusPDF enrolledStudent={enrolledStudent} />)
      .toBlob()
      .then(
        (blob) => {
          try {
            const save = saveAs(blob, "Senya Senior High School Prospectus");
            if (save) {
              return save;
            }
          } catch (error) {
            toast.error("Failed to download PDF!", {
              position: "top-right",
              theme: "light",
              // toastId: successId,
            });
            console.log(error);
          }
        }
        // setTimeout(() => {
        // }, 1000)
      );
    // .then(() =>
    //   navigate(
    //     `/sensec/students/enrollment/online/info/${studentId}/admission_pdf`
    //   )
    // );
  };
  const downloadAdmissionPDF = () => {
    pdf(<AdmissionPDF enrolledStudent={enrolledStudent} />)
      .toBlob()
      .then(
        (blob) => {
          try {
            const save = saveAs(blob, "Senya Senior High School Admission");
            if (save) {
              return save;
            }
          } catch (error) {
            toast.error("Failed to download PDF!", {
              position: "top-right",
              theme: "light",
              // toastId: successId,
            });
            console.log(error);
          }
        }
        // setTimeout(() => {
        // }, 1000)
      );
    // .then(() =>
    //   navigate(
    //     `/sensec/students/enrollment/online/info/${studentId}/admission_pdf`
    //   )
    // );
  };
  const downloadStudentProfilePDF = () => {
    pdf(<StudentProfilePDF enrolledStudent={enrolledStudent} />)
      .toBlob()
      .then(
        (blob) => {
          try {
            const save = saveAs(
              blob,
              "Senya Senior High School Student's Profile"
            );
            if (save) {
              return save;
            }
          } catch (error) {
            toast.error("Failed to download PDF!", {
              position: "top-right",
              theme: "light",
              // toastId: successId,
            });
            console.log(error);
          }
        }
        // setTimeout(() => {
        // }, 1000)
      );
    // .then(() =>
    //   navigate(
    //     `/sensec/students/enrollment/online/info/${studentId}/admission_pdf`
    //   )
    // );
  };
  const downloadProgrammesPDF = () => {
    pdf(<ProgrammesPDF enrolledStudent={enrolledStudent} />)
      .toBlob()
      .then(
        (blob) => {
          try {
            const save = saveAs(blob, "Senya Senior High School Programmes");
            if (save) {
              return save;
            }
          } catch (error) {
            toast.error("Failed to download PDF!", {
              position: "top-right",
              theme: "light",
              // toastId: successId,
            });
            console.log(error);
          }
        }
        // setTimeout(() => {
        // }, 1000)
      );
    // .then(() =>
    //   navigate(
    //     `/sensec/students/enrollment/online/info/${studentId}/admission_pdf`
    //   )
    // );
  };
  const downloadUndertakingPDF = () => {
    pdf(<UndertakingPDF enrolledStudent={enrolledStudent} />)
      .toBlob()
      .then(
        (blob) => {
          try {
            const save = saveAs(blob, "Senya Senior High School Undertaking");
            if (save) {
              return save;
            }
          } catch (error) {
            toast.error("Failed to download PDF!", {
              position: "top-right",
              theme: "light",
              // toastId: successId,
            });
            console.log(error);
          }
        }
        // setTimeout(() => {
        // }, 1000)
      );
    // .then(() =>
    //   navigate(
    //     `/sensec/students/enrollment/online/info/${studentId}/admission_pdf`
    //   )
    // );
  };
  console.log(studentProgramme);

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
  useEffect(() => {
    // dispatch(
    //   fetchAllDivisionProgrammes({
    //     programId: enrolledStudent?.studentSchoolData?.program?._id,
    //   })
    // );
    setDisappear(false);
  }, [dispatch, enrolledStudent]);
  // useEffect(() => {
  //   setEnroledStudent(enroledStudent);
  // }, [setEnroledStudent, enroledStudent]);

  useEffect(() => {
    if (
      currentEnrolmentSuccessLink &&
      currentEnrolmentSuccessLink === "DASHBOARD"
    ) {
      setCurrentEnrolmentSuccessLink("DASHBOARD");
    }
  }, [currentEnrolmentSuccessLink, setCurrentEnrolmentSuccessLink]);

  // if (!enroledStudent && !studentUniqueId) {
  //   navigate("/");
  // }
  // if (!enroledStudent) {
  //   return <PageLoading />;
  // } else if (enroledStudent?.studentStatusExtend?.isGraduated) {
  //   return <StudentHasGraduated />;
  // }

  return (
    <Box
      display={"flex"}
      // justifyContent={"space-between"}
      // alignItems={"center"}
    >
      {/* <ContainerBox
        sx={{
          width: { xs: "100%", sm: "95%", md: "90%", lg: "90%", xl: "75%" },
          margin: "auto",
          paddingTop: "2rem",
        }}
      > */}
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
          </Drawer>
        )}
      </Box>
      <Box
        className="rightWrap"
        width={!isMobile ? "calc(100% - 160px)" : "100%"}
        ml={!isMobile ? "160px" : 0}
        flexShrink={!adminCurrentAction ? 1 : 0}
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
                  <p style={{ color: "#696969", fontWeight: "500" }}>
                    You are expected to come along with the following on the
                    reporting date:
                  </p>
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
            <Box p={"1rem"}>
              <Box className="docDownloadWrap">
                <h3>
                  DOCUMENTS FOR DOWNLOAD (PLEASE DOWNLOAD AND PRINT ALL
                  DOCUMENTS)
                </h3>
                <Box className="docList">
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={4} md={3} lg={3}>
                      <Button
                        // variant="outlined"
                        onClick={() => {
                          downloadProspectusPDF();
                          navigate(
                            "#"
                            // `/sensec/students/enrollment/online/info/${studentId}/prospectus/pdf`
                          );
                        }}
                        className="docItem"
                      >
                        <FileDownloadIcon className="downloadIcon" />
                        <span>Prospectus</span>
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={4} md={3} lg={3}>
                      <Button
                        onClick={() => {
                          downloadAdmissionPDF();
                          navigate(
                            "#"
                            // `/sensec/students/enrollment/online/info/${studentId}/admission/pdf`
                          );
                        }}
                        className="docItem"
                      >
                        <FileDownloadIcon className="downloadIcon" />
                        <span>Admission Letter</span>
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={4} md={3} lg={3}>
                      <Button
                        onClick={() => {
                          downloadStudentProfilePDF();
                          navigate(
                            "#"
                            // `/sensec/students/enrollment/online/info/${studentId}/student_profile/pdf`
                          );
                        }}
                        className="docItem"
                      >
                        <FileDownloadIcon className="downloadIcon" />
                        <span>Personal Profile</span>
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={4} md={3} lg={3}>
                      <Button
                        onClick={() => {
                          downloadProgrammesPDF();
                          navigate(
                            "#"
                            // `/sensec/students/enrollment/online/info/${studentId}/programmes/pdf`
                          );
                        }}
                        className="docItem"
                      >
                        <FileDownloadIcon className="downloadIcon" />
                        <span>Programme/Subject</span>
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={4} md={3} lg={3}>
                      <Button
                        onClick={() => {
                          downloadUndertakingPDF();
                          navigate(
                            "#"
                            // `/sensec/students/enrollment/online/info/${studentId}/undertaken/pdf`
                          );
                        }}
                        className="docItem"
                      >
                        <FileDownloadIcon className="downloadIcon" />
                        <span>Undertaking/Medical</span>
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
                {/* <Box className="comeAlongDocsWrap">
                      <p>
                        You are expected to come along with the following on the
                        reporting date:
                      </p>
                      <ul>
                        <li>
                          Printed copy of your admission letter and a printed copy of
                          your personal profile form.
                        </li>
                        <li>Undertaking and medical status form.</li>
                        <li>Fully filled placement form.</li>
                        <li>A copy of your BECE result slip.</li>
                        <li>Birth/Baptism certificate (Photo-copy)</li>
                      </ul>
                      <p>Your admission is NOT complete without these Documents.</p>
                    </Box> */}
              </Box>
            </Box>
          </Box>
        </Box>
        <SmallFooter />
      </Box>
      {/* </ContainerBox> */}
    </Box>
  );
}
