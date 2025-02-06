import {
  Box,
  Button,
  Grid,
  InputAdornment,
  MenuItem,
  Typography,
} from "@mui/material";
import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FetchAllLecturerSubjects } from "../../../../data/subjects/FetchSubjects";
import { getAuthUser } from "../../../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import { customUserTableStyle } from "../../../../usersInfoDataFormat/usersInfoTableStyle";
import { studentsReportColumn } from "../../../../usersInfoDataFormat/UsersInfoDataFormat";
import useSubjectStudents from "../../../../data/subjects/useSubjectStudents";
import { FetchCurrentAcademicTerms } from "../../../../data/term.year/FetchAcademicTerms";
import { CustomTextField } from "../../../../muiStyling/muiStyling";
import {
  FetchAllClassLevels,
  FetchLecturerClassLevels,
} from "../../../../data/class/FetchClassLevel";
import {
  createMultiStudentsReport,
  fetchSubjectMultiStudentsReport,
  getDraftReportInfo,
  getSubjectMultiStudentsReports,
  resetCreateReportState,
  resetFetchElectiveReportState,
  saveDraftReport,
} from "../../../../features/reports/reportSlice";
import { toast } from "react-toastify";
import { TaskAlt } from "@mui/icons-material";
import { resetCreateMultiReportState } from "../../../../features/reports/reportSlice";
import {
  fetchLecturerClassLevels,
  getLecturerClassLevels,
} from "../../../../features/academics/classLevelsSlice";
import PropTypes from "prop-types";
import { fetchElectiveDraftReport } from "../../../../features/reports/reportSlice";
import AssignClassLecturerModal from "../../../modals/AssignClassLecturerModal";
import StudentReportRemarkModal from "../../../modals/StudentReportRemarkModal";
import { styled } from "@mui/system";

export function ElectiveReport() {
  const {
    createStatus,
    createMultiStatus,
    error,
    fetchElectiveDraftStatus,
    fetchCoreDraftStatus,
  } = useSelector((state) => state.report);
  const reportClassLevel = localStorage.getItem("reportClassLevel");
  const reportSubject = localStorage.getItem("reportSubject");
  const authUser = useSelector(getAuthUser);
  console.log(authUser?.id);
  const currentYear = new Date().getFullYear();
  const draftReportInfo = useSelector(getDraftReportInfo);
  const subjectMultiStudentsReports = useSelector(
    getSubjectMultiStudentsReports
  );
  console.log("Fetched Reports in Redux:", draftReportInfo);
  console.log("subjectMultiStudentsReports: ", subjectMultiStudentsReports);

  const { lecturerCurrentAction, lecturerCurrentLink } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allClassLevels = useSelector(getLecturerClassLevels);
  // const allClassLevels = FetchAllClassLevels();
  // console.log(lecturerSubjects);

  const [openRemarkModal, setOpenRemarkModal] = useState(false);
  const [takeCoreSubjectReport, setTakeCoreSubjectReport] = useState(false);
  const [allCoreSubjectStudents, setAllCoreSubjectStudents] = useState([]);
  const [allElectiveSubjectStudents, setAllElectiveSubjectStudents] = useState(
    []
  );
  console.log("allElectiveSubjectStudents: ", allElectiveSubjectStudents);

  const [isElective, setIsElective] = useState(true);
  const [fetchingElectiveLoadingComplete, setFetchingElectiveLoadingComplete] =
    useState(null);

  const lecturerSubjects = FetchAllLecturerSubjects(takeCoreSubjectReport);
  const currentAcademicTerm = FetchCurrentAcademicTerms();
  console.log(currentAcademicTerm);

  // Report saving state
  const [multiLoadingComplete, setMultiLoadingComplete] = useState(null);
  const [loadingComplete, setLoadingComplete] = useState(null);
  const [savingRemarkComplete, setSavingRemarkComplete] = useState(null);
  const [saveDataInProgress, setSaveDataInProgress] = useState(false);

  // Multi select state
  const [multiStudents, setMultiStudents] = useState([]);
  const [toggleClearRows, setToggleClearRows] = useState(false);
  const [currentStudent, setCurrentStudent] = useState("");
  const [studentId, setStudentId] = useState("");

  // Report State
  const [classLevel, setClassLevel] = useState(
    localStorage.getItem("reportClassLevel") || ""
  );
  const [subject, setSubject] = useState(
    localStorage.getItem("reportSubject") || ""
  );
  const [remark, setRemark] = useState("");

  // Find class level
  const foundClassLevel = allClassLevels?.find(
    (cLevel) => cLevel?._id === classLevel
  );
  // Find subject
  const foundSubject = lecturerSubjects?.find(
    (data) => data?.subject?._id === subject
  );
  console.log(foundSubject);

  // Handle score values ✅
  const handleScoreChange = (id, field, value) => {
    const updatedStudents = allElectiveSubjectStudents?.map((student) => {
      if (student.uniqueId === id) {
        const updatedStudent = {
          ...student,
          [field]: Number(value), // Update the specific field
        };
        updatedStudent.totalScore =
          Number(updatedStudent.classScore || 0) +
          Number(updatedStudent.examScore || 0); // Recalculate totalScore
        updatedStudent.grade = calculateGrade(updatedStudent.totalScore || 0);
        updatedStudent.remark = remark;
        return updatedStudent;
      }
      return student;
    });
    const reportObj = {
      semester: currentAcademicTerm?.name,
      classLevel: classLevel,
      subject: subject,
      lecturer: authUser?.id,
      students: updatedStudents,
      // remark: remark,
      year: new Date().getFullYear(),
    };
    console.log(reportObj);

    // Save to localStorage whenever allSubjectStudents changes
    localStorage.setItem("allSubjectStudents", JSON.stringify(reportObj));
    dispatch(saveDraftReport(reportObj));

    setAllElectiveSubjectStudents(reportObj?.students); // Update the correct state
    setAllCoreSubjectStudents([]);
  };
  // Grade calculator
  const calculateGrade = (totalScore) => {
    if (totalScore >= 80) return "A1";
    if (totalScore >= 70) return "B2";
    if (totalScore >= 65) return "B3";
    if (totalScore >= 60) return "C4";
    if (totalScore >= 55) return "C5";
    if (totalScore >= 50) return "C6";
    if (totalScore >= 45) return "D7";
    if (totalScore >= 40) return "E8";
    return "F9"; // For scores below 40
  };
  // Grade background color checker
  const gradeBgColor = (userData) => {
    if (userData === "A1") return "green";
    if (userData === "B2") return "#12b207";
    if (userData === "B3") return "#b9b10d";
    if (userData === "C4") return "#b6ba6a";
    if (userData === "C5") return "#0689a7";
    if (userData === "C6") return "#0e596a";
    if (userData === "D7") return "#584646";
    if (userData === "E8") return "#763c3c";
    return "#c30505"; // For scores below 40
  };
  const foundStudent = allElectiveSubjectStudents?.students?.find(
    (std) => std._id === currentStudent
  );
  // Table column data
  const columnData = {
    subjectMultiStudentsReports,
    authUser,
    handleScoreChange,
    calculateGrade,
    gradeBgColor,
    dispatch,
    selectedSubject: subject,
    classLevel: classLevel,
    currentAcademicTerm,
    setCurrentStudent,
    foundStudent,
    setLoadingComplete,
    loadingComplete,
    setSaveDataInProgress,
    saveDataInProgress,
    createStatus,
    setOpenRemarkModal,
    setStudentId,
    draftReportInfo,
  };
  const studentDataFormat = studentsReportColumn(columnData);

  // Fetch Draft Data
  // useEffect(() => {
  //   if (!takeCoreSubjectReport) {
  //     const data = {
  //       classLevel: localStorage.getItem("reportClassLevel") || classLevel,
  //       semester: currentAcademicTerm?.name,
  //       subject: localStorage.getItem("reportSubject") || subject,
  //       lecturer: authUser?.id,
  //       year: new Date().getFullYear(),
  //     };
  //     dispatch(fetchElectiveDraftReport(data));
  //     dispatch(fetchSubjectMultiStudentsReport(data));
  //     setAllCoreSubjectStudents([]);
  //   } else {
  //     setAllElectiveSubjectStudents([]);
  //   }
  // }, [
  //   takeCoreSubjectReport,
  //   classLevel,
  //   subject,
  //   currentAcademicTerm,
  //   authUser,
  //   dispatch,
  //   setAllElectiveSubjectStudents,
  //   setAllCoreSubjectStudents,
  // ]);
  // Retrieve and set students on page render
  // useEffect(() => {
  //   if (takeCoreSubjectReport) {
  //     setAllElectiveSubjectStudents([]);
  //   } else {
  //     setAllElectiveSubjectStudents(draftReportInfo?.students);
  //     setAllCoreSubjectStudents([]);
  //   }
  // }, [
  //   draftReportInfo,
  //   takeCoreSubjectReport,
  //   setAllElectiveSubjectStudents,
  //   setAllCoreSubjectStudents,
  // ]);

  // Sync localStorage with state
  useEffect(() => {
    localStorage.setItem("reportClassLevel", classLevel || "");
  }, [classLevel]);

  useEffect(() => {
    localStorage.setItem("reportSubject", subject || "");
  }, [subject]);
  useEffect(() => {
    setAllElectiveSubjectStudents(draftReportInfo?.students || []);
  }, [draftReportInfo]);

  // Fetch data when inputs change
  // useEffect(() => {
  //   if (classLevel && subject) {
  //     const data = {
  //       classLevel,
  //       semester: currentAcademicTerm?.name,
  //       subject,
  //       lecturer: authUser?.id,
  //       year: new Date().getFullYear(),
  //     };
  //     console.log(data);

  //     dispatch(fetchElectiveDraftReport(data));
  //     dispatch(fetchSubjectMultiStudentsReport(data));
  //   }
  // }, [classLevel, subject, currentAcademicTerm, authUser, dispatch]);

  useEffect(() => {
    setIsElective(true);
    if (authUser) {
      dispatch(fetchLecturerClassLevels({ lecturerId: authUser?.id }));
    }
  }, [authUser, dispatch]);

  // handle multi approval or rejection
  const handleMultiSelect = (state) => {
    if (!subjectMultiStudentsReports) {
      if (state) {
        const studentObj = state?.selectedRows?.map((user) => {
          const userObject = {
            studentId: user?.uniqueId,
            classScore: user?.classScore,
            examScore: user?.examScore,
            totalScore: user?.totalScore,
            remark: user?.remark,
            grade: user?.grade,
          };
          return userObject;
        });
        setMultiStudents(studentObj);
      } else {
        setMultiStudents([]);
      }
    }
  };
  //   console.log(multiStudents);

  // Multi data create status
  useEffect(() => {
    if (createMultiStatus === "pending") {
      setMultiLoadingComplete(false);
    }
    if (createMultiStatus === "rejected") {
      setTimeout(() => {
        error?.errorMessage?.message?.map((err) =>
          toast.error(err, {
            position: "top-right",
            theme: "light",
            toastId: err,
          })
        );
        setMultiLoadingComplete(null);
        dispatch(resetCreateMultiReportState());
        const data = {
          classLevel: localStorage.getItem("reportClassLevel") || classLevel,
          semester: currentAcademicTerm?.name,
          subject: localStorage.getItem("reportSubject") || subject,
          lecturer: authUser?.id,
          year: new Date().getFullYear(),
        };
        dispatch(fetchElectiveDraftReport(data));
      }, 2000);
      return;
    }
    if (createMultiStatus === "success") {
      setTimeout(() => {
        setMultiLoadingComplete(true);
      }, 3000);
      setTimeout(() => {
        setToggleClearRows(!toggleClearRows);
        setMultiLoadingComplete(null);
        setMultiStudents([]);
        dispatch(resetCreateMultiReportState());
        const data = {
          classLevel: localStorage.getItem("reportClassLevel") || classLevel,
          semester: currentAcademicTerm?.name,
          subject: localStorage.getItem("reportSubject") || subject,
          lecturer: authUser?.id,
        };
        dispatch(fetchElectiveDraftReport(data));
        dispatch(fetchSubjectMultiStudentsReport(data));
        localStorage.removeItem("allSubjectStudents");
        localStorage.removeItem("reportClassLevel");
        localStorage.removeItem("reportSubject");
      }, 6000);
    }
  }, [
    createMultiStatus,
    toggleClearRows,
    error,
    authUser,
    classLevel,
    subject,
    currentAcademicTerm,
    dispatch,
  ]);
  // Single data create status
  useEffect(() => {
    if (foundStudent) {
      if (createStatus === "pending") {
        setLoadingComplete(false);
        setSaveDataInProgress(true);
      }
      if (createStatus === "rejected") {
        setTimeout(() => {
          setLoadingComplete(null);
          dispatch(resetCreateReportState());
        }, 3000);
        setTimeout(() => {
          error.errorMessage.message.map((err) =>
            toast.error(err, {
              position: "top-right",
              theme: "light",
              toastId: "createStudentReportError",
            })
          );
          const data = {
            classLevel: localStorage.getItem("reportClassLevel") || classLevel,
            semester: currentAcademicTerm?.name,
            subject: localStorage.getItem("reportSubject") || subject,
            lecturer: authUser?.id,
            year: new Date().getFullYear(),
          };
          dispatch(fetchElectiveDraftReport(data));
          dispatch(fetchSubjectMultiStudentsReport(data));
        }, 2000);
        return;
      }
      if (createStatus === "success") {
        const data = {
          classLevel: localStorage.getItem("reportClassLevel") || classLevel,
          semester: currentAcademicTerm?.name,
          subject: localStorage.getItem("reportSubject") || subject,
          lecturer: authUser?.id,
          year: new Date().getFullYear(),
        };
        setTimeout(() => {
          setLoadingComplete(true);
        }, 3000);
        setTimeout(() => {
          setLoadingComplete(null);
          setSaveDataInProgress(false);
          dispatch(resetCreateReportState());
          dispatch(fetchElectiveDraftReport(data));
          dispatch(fetchSubjectMultiStudentsReport(data));
        }, 6000);
      }
    }
  }, [
    createStatus,
    foundStudent,
    error,
    classLevel,
    currentAcademicTerm,
    subject,
    authUser,
    dispatch,
  ]);

  // const [isVisible, setIsVisible] = useState(true);
  const [shouldBlink, setShouldBlink] = useState(false);

  useEffect(() => {
    if (subjectMultiStudentsReports) {
      setShouldBlink(true);
      // const interval = setInterval(() => {
      //   setIsVisible((prev) => !prev);
      // }, 500); // Toggle visibility every 500ms
      // return () => clearInterval(interval); // Cleanup on unmount
    }
  }, [subjectMultiStudentsReports]);

  // Fetch students status
  useEffect(() => {
    if (fetchElectiveDraftStatus === "pending") {
      setFetchingElectiveLoadingComplete(false);
    }
    if (fetchElectiveDraftStatus === "rejected") {
      setTimeout(() => {
        setFetchingElectiveLoadingComplete(null);
        dispatch(resetFetchElectiveReportState());
      }, 3000);
      setTimeout(() => {
        error.errorMessage.message.map((err) =>
          toast.error(err, {
            position: "top-right",
            theme: "light",
            toastId: "createStudentReportError",
          })
        );
      }, 2000);
      return;
    }
    if (fetchElectiveDraftStatus === "success") {
      setTimeout(() => {
        setFetchingElectiveLoadingComplete(true);
      }, 3000);
      setTimeout(() => {
        setFetchingElectiveLoadingComplete(null);
        dispatch(resetFetchElectiveReportState());
      }, 6000);
    }
  }, [fetchElectiveDraftStatus, error, dispatch]);

  const allStd =
    subjectMultiStudentsReports &&
    subjectMultiStudentsReports?.subject !== draftReportInfo?.subject ? (
      `Students / Total = ${
        allElectiveSubjectStudents?.length > 0
          ? allElectiveSubjectStudents?.length
          : 0
      }`
    ) : (
      <Box fontSize={"calc( 0.7rem + 1vmin)"}>
        {/* {isVisible && ( */}
        {/* <BlinkingText
          shouldBlink={shouldBlink}
          sx={{
            color: "#de1f1f",
            fontSize: ".9em",
            fontWeight: 100,
            textAlign: "center",
          }}
        >
          Report for {foundClassLevel?.name === "Level 100" && "Form 1"}
          {foundClassLevel?.name === "Level 200" && "Form 2"}
          {foundClassLevel?.name === "Level 300" && "Form 3"}{" "}
          {foundSubject?.subject?.subjectName} already taking!
        </BlinkingText> */}
        {shouldBlink && (
          <Typography
            variant="h6"
            color="#de1f1f"
            textAlign={"center"}
            mt={0}
            fontSize={".9em"}
            fontWeight={100}
            sx={{
              animation: shouldBlink ? "blink 1s step-start infinite" : "none",
              "@keyframes blink": {
                "5%": {
                  visibility: "hidden",
                },
              },
            }}
          >
            Report for {foundClassLevel?.name === "Level 100" && "Form 1"}
            {foundClassLevel?.name === "Level 200" && "Form 2"}
            {foundClassLevel?.name === "Level 300" && "Form 3"}{" "}
            {foundSubject?.subject?.subjectName} already taken!
          </Typography>
        )}
        {/* )} */}
      </Box>
    );

  return (
    <>
      <Box
        id="adminDashboardHeaderWrap"
        sx={{
          position: "sticky",
          top: 0,
          backgroundColor: "#fff",
          padding: 0,
          // zIndex: 1,
        }}
      >
        <h1 className="dashAction">
          {lecturerCurrentAction?.replace(/_/g, " ")} /{" "}
          <span>{lecturerCurrentLink?.replace(/_/g, " Elective ")}</span>
        </h1>
      </Box>
      <Box
        padding={{ xs: 1, sm: 2 }}
        bgcolor={"#383838"}
        fontSize={"calc(0.7rem + 1vmin)"}
      >
        <Box bgcolor={"#fff"} padding={{ xs: 1, sm: 2 }} borderRadius={".4rem"}>
          <p
            style={{
              fontSize: ".8em",
              marginBottom: "2rem",
              color: "#fff",
              backgroundColor: "#383838",
              padding: ".5rem",
              borderRadius: ".4rem",
            }}
          >
            Click{" "}
            <button
              onClick={() => {
                // setTakeCoreSubjectReport(!takeCoreSubjectReport);
                navigate(
                  `/sensec/users/${authUser?.uniqueId}/lecturer/academic_report/create_report/core`
                );
              }}
              style={{
                backgroundColor: "transparent",
                fontSize: "1em",
                cursor: "pointer",
                color: "#1ec8f7",
              }}
            >
              here
            </button>{" "}
            to take report for your core subjects.
          </p>
          <Grid container spacing={1} display={"flex"} alignItems={"center"}>
            <Grid item xs={12} sm={6} md={3}>
              <CustomTextField
                select
                fullWidth
                name="classLevel"
                label="Form"
                value={classLevel || ""}
                size="small"
                onChange={(e) => {
                  setClassLevel(e.target.value);
                }}
                //   onChange={(e) => {
                //     setReportData({
                //       ...reportData,
                //       classLevel: e.target.value,
                //     });
                //     localStorage.setItem("reportClassLevel", e.target.value);
                //   }}
                sx={{
                  "& .MuiInputBase-input": {
                    // height: "1.3rem",
                    fontSize: ".7em",
                  },
                  "& .MuiInputLabel-root": {
                    fontSize: ".7em", // Default label size
                    transition: "font-size 0.2s, color 0.2s",
                  },
                  mb: 1,
                }}
              >
                {allClassLevels?.map((cLevel) => (
                  <MenuItem key={cLevel?._id} value={cLevel?._id}>
                    {cLevel?.name === "Level 100" && "Form 1"}
                    {cLevel?.name === "Level 200" && "Form 2"}
                    {cLevel?.name === "Level 300" && "Form 3"}
                  </MenuItem>
                ))}
              </CustomTextField>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <CustomTextField
                select
                fullWidth
                name="subject"
                label="Subject"
                value={subject || ""}
                size="small"
                onChange={(e) => {
                  setSubject(e.target.value);
                }}
                //   onChange={(e) => {
                //     setReportData({
                //       ...reportData,
                //       subject: e.target.value,
                //     });
                //     localStorage.setItem("reportSubject", e.target.value);
                //   }}
                sx={{
                  "& .MuiInputBase-input": {
                    // height: "1.3rem",
                    fontSize: ".7em",
                  },
                  "& .MuiInputLabel-root": {
                    fontSize: ".7em", // Default label size
                    transition: "font-size 0.2s, color 0.2s",
                  },
                  mb: 1,
                }}
              >
                {/* <MenuItem>M</MenuItem> */}
                {lecturerSubjects?.map((subj) => (
                  <MenuItem key={subj?.subject?._id} value={subj?.subject?._id}>
                    {subj?.subject?.subjectName}
                  </MenuItem>
                ))}
              </CustomTextField>
            </Grid>
            <Grid item xs={12} sm={12} md={2}>
              <Button
                disabled={!classLevel || !subject}
                variant="contained"
                fullWidth
                size="small"
                sx={{
                  backgroundColor:
                    classLevel && subject ? "green" : "#adacaccc !important",
                  borderRadius: ".4rem",
                  color: "#fff !important",
                  "&.Mui-disabled": {
                    cursor: "not-allowed", // Show not-allowed cursor
                    pointerEvents: "auto",
                  },
                  alignItems: "center",
                  height: { xs: "2.5rem", sm: "2.65rem", md: "2.75rem" },
                  textTransform: "capitalize",
                  fontSize: ".7em",
                  mb: 1,
                }}
                onClick={(e) => {
                  e?.preventDefault();
                  const data = {
                    classLevel: classLevel,
                    semester: currentAcademicTerm?.name,
                    subject: subject,
                    lecturer: authUser?.id,
                    year: new Date().getFullYear(),
                  };
                  if (classLevel && subject) {
                    dispatch(fetchElectiveDraftReport(data));
                    dispatch(fetchSubjectMultiStudentsReport(data));
                  }
                }}
              >
                {fetchingElectiveLoadingComplete === false && (
                  <Box className="promotionSpinner" sx={{ padding: "unset" }}>
                    <p>Fetching</p>
                    <span
                      className="dot-ellipsis"
                      // style={{ marginTop: "-.1rem" }}
                    >
                      <span className="dot">.</span>
                      <span className="dot">.</span>
                      <span className="dot">.</span>
                    </span>
                  </Box>
                )}
                {fetchingElectiveLoadingComplete &&
                  fetchElectiveDraftStatus === "success" && (
                    <>
                      <span>Fetched</span>{" "}
                      <TaskAlt style={{ fontSize: "1.1rem" }} />
                    </>
                  )}
                {fetchingElectiveLoadingComplete === null && "Fetch"}
              </Button>
            </Grid>
          </Grid>
        </Box>
        <>
          {draftReportInfo &&
            draftReportInfo?.students?.length > 0 &&
            draftReportInfo?.subject === subject &&
            draftReportInfo?.classLevel === classLevel &&
            fetchingElectiveLoadingComplete === null && (
              <Box fontSize={"calc(0.7rem + 1vmin)"} position={"relative"}>
                <Box className="studentDataTable">
                  <Box mt={3} mb={1.5}>
                    <Button
                      disabled={
                        !subjectMultiStudentsReports &&
                        !multiStudents?.length > 0
                      }
                      variant="contained"
                      sx={{
                        backgroundColor:
                          multiStudents?.length > 0
                            ? "green"
                            : "#adacaccc !important",
                        borderRadius: ".4rem",
                        color: "#fff !important",
                        "&.Mui-disabled": {
                          cursor: "not-allowed", // Show not-allowed cursor
                          pointerEvents: "auto",
                        },
                        alignItems: "center",
                      }}
                      onClick={() => {
                        const data = {
                          semester: currentAcademicTerm?.name,
                          classLevel: classLevel,
                          subject: subject,
                          lecturer: authUser?.id,
                          year: currentYear,
                          remark,
                          students: multiStudents,
                        };
                        if (multiStudents?.length > 0) {
                          dispatch(createMultiStudentsReport(data));
                        }
                      }}
                    >
                      {isElective &&
                        multiStudents?.length > 0 &&
                        multiLoadingComplete === false && (
                          <Box className="promotionSpinner">
                            <p>Saving</p>
                            <span
                              className="dot-ellipsis"
                              style={{ marginTop: "-.1rem" }}
                            >
                              <span className="dot">.</span>
                              <span className="dot">.</span>
                              <span className="dot">.</span>
                            </span>
                          </Box>
                        )}
                      {isElective &&
                        multiStudents?.length > 0 &&
                        multiLoadingComplete &&
                        createMultiStatus === "success" && (
                          <>
                            <span>All Saved</span> <TaskAlt />
                          </>
                        )}
                      {isElective &&
                        multiLoadingComplete === null &&
                        "Save All Reports"}
                    </Button>
                  </Box>
                  <>
                    <DataTable
                      title={allStd}
                      columns={studentDataFormat}
                      data={allElectiveSubjectStudents || []}
                      customStyles={customUserTableStyle}
                      pagination
                      selectableRows
                      fixedHeader
                      selectableRowsHighlight
                      highlightOnHover
                      responsive
                      onSelectedRowsChange={handleMultiSelect}
                      clearSelectedRows={toggleClearRows}
                    />
                  </>
                  <StudentReportRemarkModal
                    open={openRemarkModal}
                    onClose={() => setOpenRemarkModal(false)}
                    setRemark={setRemark}
                    remark={remark}
                    handleScoreChange={handleScoreChange}
                    studentId={studentId}
                    setLoadingComplete={setSavingRemarkComplete}
                    loadingComplete={savingRemarkComplete}
                    fetchDraft={fetchElectiveDraftReport({
                      classLevel:
                        localStorage.getItem("reportClassLevel") || classLevel,
                      semester: currentAcademicTerm?.name,
                      subject: localStorage.getItem("reportSubject") || subject,
                      lecturer: authUser?.id,
                    })}
                    dispatch={dispatch}
                  />
                </Box>
              </Box>
            )}
          {!classLevel &&
            !subject &&
            fetchingElectiveLoadingComplete === null && (
              <Box>
                <Typography
                  variant="h6"
                  color="#fff"
                  textAlign={"center"}
                  mt={2}
                  fontSize={".9em"}
                >
                  Select form and subject to begin...
                </Typography>
              </Box>
            )}
          {classLevel &&
            subject &&
            !draftReportInfo &&
            fetchingElectiveLoadingComplete === null && (
              <Box>
                <Typography
                  variant="h6"
                  color="#fff"
                  textAlign={"center"}
                  mt={2}
                  fontSize={".9em"}
                >
                  No data fetched!
                </Typography>
              </Box>
            )}
          {classLevel &&
            subject &&
            draftReportInfo?.students?.length === 0 &&
            fetchingElectiveLoadingComplete === null && (
              <Box>
                <Typography
                  variant="h6"
                  color="#fff"
                  textAlign={"center"}
                  mt={2}
                  fontSize={".9em"}
                >
                  No student data found!
                </Typography>
              </Box>
            )}
        </>
      </Box>
    </>
  );
}

ElectiveReport.propTypes = {
  setTakeCoreSubjectReport: PropTypes.func,
  takeCoreSubjectReport: PropTypes.bool,
  allCoreSubjectStudents: PropTypes.array,
  setAllCoreSubjectStudents: PropTypes.func,
  allElectiveSubjectStudents: PropTypes.array,
  setAllElectiveSubjectStudents: PropTypes.func,
};
