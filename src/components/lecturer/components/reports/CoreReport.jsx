import {
  Autocomplete,
  Box,
  Button,
  Grid,
  MenuItem,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FetchLecturerCoreSubjects } from "../../../../data/subjects/FetchSubjects";
import { getAuthUser } from "../../../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import { customUserTableStyle } from "../../../../usersInfoDataFormat/usersInfoTableStyle";
import { studentsReportColumn } from "../../../../usersInfoDataFormat/UsersInfoDataFormat";
import { FetchCurrentAcademicTerms } from "../../../../data/term.year/FetchAcademicTerms";
import {
  CustomMenuProps,
  CustomTextField,
} from "../../../../muiStyling/muiStyling";
import {
  createMultiStudentsReport,
  fetchCoreSubjectMultiStudentsReport,
  getCoreSubjectMultiStudentsReports,
  resetCreateReportState,
  resetFetchCoreReportState,
  resetCoreSubjectMultiStudentsState,
  saveDraftReport,
  getCoreDraftReportInfo,
  resetCoreReportStudentsState,
} from "../../../../features/reports/reportSlice";
import { toast } from "react-toastify";
import { TaskAlt } from "@mui/icons-material";
import { resetCreateMultiReportState } from "../../../../features/reports/reportSlice";
import {
  fetchLecturerClassLevels,
  getLecturerClassLevels,
} from "../../../../features/academics/classLevelsSlice";
// import PropTypes from "prop-types";
import { fetchCoreDraftReport } from "../../../../features/reports/reportSlice";
import { FetchAllFlattenedProgrammes } from "../../../../data/programme/FetchProgrammeData";
import StudentReportRemarkModal from "../../../modals/StudentReportRemarkModal";

export function CoreReport() {
  const currentYear = new Date().getFullYear();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { lecturerCurrentAction, lecturerCurrentLink } = useParams();
  const authUser = useSelector(getAuthUser);
  // Redux state management
  const { createStatus, createMultiStatus, error, fetchCoreDraftStatus } =
    useSelector((state) => state.report);
  // Get selected programmes from local-storage
  const savedSelectedProgrammes = JSON.parse(
    localStorage?.getItem("savedSelectedProgrammes")
  );
  // Getting data from Redux State
  const draftReportInfo = useSelector(getCoreDraftReportInfo);
  const subjectMultiStudentsReports = useSelector(
    getCoreSubjectMultiStudentsReports
  );
  const allClassLevels = useSelector(getLecturerClassLevels);
  const lecturerSubjects = FetchLecturerCoreSubjects();
  const allFlattenedProgrammes = FetchAllFlattenedProgrammes();
  const currentAcademicTerm = FetchCurrentAcademicTerms();

  const [allCoreSubjectStudents, setAllCoreSubjectStudents] = useState([]);
  const [openRemarkModal, setOpenRemarkModal] = useState(false);

  // Report saving state
  const [multiLoadingComplete, setMultiLoadingComplete] = useState(null);
  const [loadingComplete, setLoadingComplete] = useState(null);
  const [fetchingCoreLoadingComplete, setFetchingCoreLoadingComplete] =
    useState(null);
  const [savingRemarkComplete, setSavingRemarkComplete] = useState(null);
  const [saveDataInProgress, setSaveDataInProgress] = useState(false);
  const [noDataFetched, setNoDataFetched] = useState(true);
  const [shouldBlink, setShouldBlink] = useState(false);

  // Multi select state
  const [multiStudents, setMultiStudents] = useState([]);
  const [toggleClearRows, setToggleClearRows] = useState(false);
  const [currentStudent, setCurrentStudent] = useState("");

  // Report State
  const [coreClassLevel, setCoreClassLevel] = useState(
    // Class Level
    localStorage.getItem("coreReportClassLevel") || null
  );
  const [coreSubject, setCoreSubject] = useState(
    // Subject
    localStorage.getItem("coreReportSubject") || null
  );
  const [selectedProgrammes, setSelectedProgrammes] = useState(
    // Selected Programmes
    savedSelectedProgrammes || []
  );
  const [studentId, setStudentId] = useState("");
  const [remark, setRemark] = useState("");

  // Formatting the selected items into a desired structure
  const formattedProgrammes = selectedProgrammes?.map((program) => ({
    programId: program?._id, // Map _id to id
    type: program?.hasDivision ? "ProgramDivision" : "Program", // Map label to name
    nameOfProgram: program?.name ? program?.name : program?.divisionName,
  }));

  // Handle score values ✅
  const handleScoreChange = (id, field, value) => {
    // All Students records
    const updatedStudents = allCoreSubjectStudents?.map((student) => {
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
      classLevel: coreClassLevel,
      subject: coreSubject,
      lecturer: authUser?.id,
      students: updatedStudents,
      programmes: formattedProgrammes || [],
      year: new Date().getFullYear(),
    };
    // Save to localStorage whenever allCoreSubjectStudents changes
    localStorage.setItem("allCoreSubjectStudents", JSON.stringify(reportObj));
    dispatch(saveDraftReport(reportObj));

    setAllCoreSubjectStudents(reportObj?.students); // Update the correct state
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
  // Grade remark
  const gradeRemark = (totalScore) => {
    if (totalScore >= 80) return "Excellent";
    if (totalScore >= 70) return "Very Good";
    if (totalScore >= 65) return "Good";
    if (totalScore >= 60) return "Average";
    if (totalScore >= 55) return "Below Average";
    if (totalScore >= 50) return "Credit";
    if (totalScore >= 45) return "Pass";
    if (totalScore >= 40) return "Weak Pass";
    return "Fail"; // For scores below 40
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
  // Find a student
  const foundStudent = allCoreSubjectStudents?.find(
    (std) => std._id === currentStudent
  );
  // Find class level
  const foundClassLevel = allClassLevels?.find(
    (cLevel) => cLevel?._id === coreClassLevel
  );
  // Find subject
  const foundSubject = lecturerSubjects?.find(
    (data) => data?.subject?._id === coreSubject
  );
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
  // Table column data
  const columnData = {
    subjectMultiStudentsReports,
    authUser,
    handleScoreChange,
    calculateGrade,
    gradeBgColor,
    gradeRemark,
    dispatch,
    selectedSubject: coreSubject,
    classLevel: coreClassLevel,
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

  // Sync localStorage with state
  useEffect(() => {
    localStorage.setItem("coreReportClassLevel", coreClassLevel || "");
  }, [coreClassLevel]);
  useEffect(() => {
    localStorage.setItem("coreReportSubject", coreSubject || "");
  }, [coreSubject]);

  // Fetch Draft Data
  useEffect(() => {
    if (!selectedProgrammes?.length > 0) {
      setAllCoreSubjectStudents([]);
    }
  }, [selectedProgrammes]);
  // Retrieve and set students on page render
  useEffect(() => {
    if (draftReportInfo?.students?.length > 0) {
      setAllCoreSubjectStudents(draftReportInfo?.students);
    } else {
      setAllCoreSubjectStudents([]);
    }
  }, [draftReportInfo, setAllCoreSubjectStudents]);

  useEffect(() => {
    if (authUser) {
      dispatch(fetchLecturerClassLevels({ lecturerId: authUser?.id }));
    }
  }, [authUser, dispatch]);

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
      }, 1000);
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
      }, 3000);
      return;
    }
    if (createMultiStatus === "success") {
      setTimeout(() => {
        setMultiLoadingComplete(true);
        setToggleClearRows(!toggleClearRows);
      }, 3000);
      setTimeout(() => {
        setMultiLoadingComplete(null);
        localStorage.removeItem("allCoreSubjectStudents");
        localStorage.removeItem("coreReportClassLevel");
        localStorage.removeItem("coreReportSubject");
        localStorage.removeItem("savedSelectedProgrammes");
        setMultiStudents([]);
        dispatch(resetCreateMultiReportState());
        const data = {
          classLevel:
            localStorage.getItem("coreReportClassLevel") || coreClassLevel,
          semester: currentAcademicTerm?.name,
          subject: localStorage.getItem("coreReportSubject") || coreSubject,
          programmes: formattedProgrammes || [],
          lecturer: authUser?.id,
          year: new Date().getFullYear(),
        };
        dispatch(fetchCoreDraftReport(data));
        dispatch(fetchCoreSubjectMultiStudentsReport(data));
      }, 6000);
    }
  }, [
    createMultiStatus,
    toggleClearRows,
    error,
    authUser,
    coreClassLevel,
    coreSubject,
    currentAcademicTerm,
    dispatch,
    formattedProgrammes,
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
        }, 2000);
        return;
      }
      if (createStatus === "success") {
        setTimeout(() => {
          setLoadingComplete(true);
        }, 3000);
        setTimeout(() => {
          setLoadingComplete(null);
          setSaveDataInProgress(false);
          dispatch(resetCreateReportState());
        }, 6000);
      }
    }
  }, [
    createStatus,
    foundStudent,
    error,
    coreClassLevel,
    currentAcademicTerm,
    coreSubject,
    authUser,
    dispatch,
  ]);
  // Fetch students status
  useEffect(() => {
    if (fetchCoreDraftStatus === "pending") {
      setFetchingCoreLoadingComplete(false);
    }
    if (fetchCoreDraftStatus === "rejected") {
      setTimeout(() => {
        setFetchingCoreLoadingComplete(null);
        dispatch(resetFetchCoreReportState());
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
    if (fetchCoreDraftStatus === "success") {
      setTimeout(() => {
        setFetchingCoreLoadingComplete(true);
      }, 3000);
      setTimeout(() => {
        setFetchingCoreLoadingComplete(null);
        dispatch(resetFetchCoreReportState());
        setNoDataFetched(false);
      }, 6000);
    }
  }, [fetchCoreDraftStatus, error, dispatch]);

  useEffect(() => {
    if (subjectMultiStudentsReports) {
      setShouldBlink(true);
    }
  }, [subjectMultiStudentsReports]);

  const allStd = !subjectMultiStudentsReports ? (
    `Students / Total = ${
      allCoreSubjectStudents?.length > 0 ? allCoreSubjectStudents?.length : 0
    }`
  ) : (
    <Box fontSize={"calc( 0.7rem + 1vmin)"}>
      <Typography
        variant="h6"
        color="#de1f1f"
        mt={0}
        fontSize={".9rem"}
        fontWeight={100}
      >
        Cannot take new report!
      </Typography>
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
        }}
      >
        <h1 className="dashAction">
          {lecturerCurrentAction?.replace(/_/g, " ")} /{" "}
          <span>{lecturerCurrentLink?.replace(/_/g, ` Core `)}</span>
        </h1>
      </Box>
      {subjectMultiStudentsReports &&
        subjectMultiStudentsReports?.students?.length > 0 &&
        subjectMultiStudentsReports?.subject === coreSubject &&
        subjectMultiStudentsReports?.classLevel === coreClassLevel &&
        fetchingCoreLoadingComplete === null && (
          <Box
            sx={{
              backgroundColor: "#d31515",
              color: "#fff",
              zIndex: 99,
              width: "inherit",
              padding: ".5rem",
            }}
          >
            {shouldBlink && (
              <Typography
                variant="h6"
                textAlign={"center"}
                mt={0}
                fontSize={".9rem"}
                fontWeight={100}
                lineHeight={1}
                sx={{
                  animation: shouldBlink
                    ? "blink 1s step-start infinite"
                    : "none",
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
                {foundSubject?.subject?.subjectName} ({" "}
                <span
                  style={{
                    // color: "#b40a0a",
                    letterSpacing: "1px",
                  }}
                >
                  {`
                          ${
                            subjectMultiStudentsReports?.programmes?.length > 1
                              ? subjectMultiStudentsReports?.programmes
                                  ?.slice(0, -1)
                                  ?.map((program) => program?.nameOfProgram)
                                  .join(", ")
                              : subjectMultiStudentsReports?.programmes
                                  ?.map((program) => program?.nameOfProgram)
                                  .join(", ")
                          },
                          ${
                            subjectMultiStudentsReports?.programmes?.length > 1
                              ? "and"
                              : ""
                          }
                          ${
                            subjectMultiStudentsReports?.programmes?.length > 1
                              ? subjectMultiStudentsReports?.programmes
                                  ?.slice(-1)
                                  ?.map((program) => program?.nameOfProgram)
                                  .join(", ")
                              : ""
                          }${" "}`}
                </span>{" "}
                ) already taken!
              </Typography>
            )}
          </Box>
        )}
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
              onClick={(e) => {
                e?.preventDefault();
                navigate(
                  `/sensec/users/${authUser?.uniqueId}/lecturer/academic_report/create_report/elective`
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
            to take report for your elective subjects.
          </p>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6} md={2.5}>
              <CustomTextField
                select
                slotProps={{
                  select: { MenuProps: CustomMenuProps },
                }}
                fullWidth
                name="coreClassLevel"
                label="Form"
                value={
                  allClassLevels?.some((c) => c?._id === coreClassLevel)
                    ? coreClassLevel
                    : ""
                }
                size="small"
                onChange={(e) => {
                  setCoreClassLevel(e.target.value);
                  // localStorage.setItem("coreReportClassLevel", e.target.value);
                }}
                sx={{
                  "& .MuiInputBase-input": {
                    // height: "2.4rem",
                    height: { xs: "1.3rem", sm: "1.7rem" },
                    fontSize: ".8rem",
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
            <Grid item xs={12} sm={6} md={2.5}>
              <CustomTextField
                select
                slotProps={{
                  select: { MenuProps: CustomMenuProps },
                }}
                fullWidth
                name="coreSubject"
                label="Subject"
                value={
                  lecturerSubjects?.some((c) => c?.subject?._id === coreSubject)
                    ? coreSubject
                    : ""
                }
                size="small"
                onChange={(e) => {
                  setCoreSubject(e.target.value);
                  // localStorage.setItem("coreReportSubject", e.target.value);
                }}
                sx={{
                  "& .MuiInputBase-input": {
                    height: { xs: "1.3rem", sm: "1.7rem" },
                    fontSize: ".8rem",
                  },
                  "& .MuiInputLabel-root": {
                    fontSize: ".7em", // Default label size
                    transition: "font-size 0.2s, color 0.2s",
                  },
                  mb: 1,
                }}
              >
                {lecturerSubjects?.map((subj) => (
                  <MenuItem key={subj?.subject?._id} value={subj?.subject?._id}>
                    {subj?.subject?.subjectName}
                  </MenuItem>
                ))}
              </CustomTextField>
            </Grid>
            <Grid item xs={12} sm={6} md={5}>
              <Autocomplete
                multiple
                options={allFlattenedProgrammes}
                getOptionLabel={(option) =>
                  option.name ? option?.name : option?.divisionName
                }
                value={selectedProgrammes}
                //   value={selectedProgrammes || savedSelectedProgrammes}
                onChange={(event, newValue) => setSelectedProgrammes(newValue)}
                isOptionEqualToValue={(option, value) =>
                  option._id === value._id
                }
                renderInput={(params) => (
                  <CustomTextField
                    {...params}
                    variant="outlined"
                    placeholder="Choose Programmes"
                    size="small"
                    sx={{
                      "& .MuiInputBase-input": {
                        // height: "1.3rem",
                        height: { xs: "1.4rem", sm: "1.55rem", md: "1.7rem" },
                        fontSize: ".7em",
                      },
                      "& .MuiInputLabel-root": {
                        fontSize: ".7em", // Default label size
                        transition: "font-size 0.2s, color 0.2s",
                      },
                      mb: 1,
                    }}
                  ></CustomTextField>
                )}
                slotProps={{
                  popper: {
                    modifiers: [
                      {
                        name: "preventOverflow",
                        options: {
                          boundary: "window",
                        },
                      },
                    ],
                  },
                  paper: {
                    sx: {
                      maxHeight: 200, // Set max height for dropdown
                      "&::-webkit-scrollbar": {
                        width: "6px", // Scrollbar width
                      },
                      "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "#9a9a9a", // Scrollbar thumb color
                        borderRadius: "4px",
                      },
                      "&::-webkit-scrollbar-thumb:hover": {
                        backgroundColor: "#8d8c8c", // Scrollbar thumb hover effect
                      },
                      "&::-webkit-scrollbar-track": {
                        backgroundColor: "#fff", // Scrollbar track color
                      },
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <Button
                disabled={
                  !coreClassLevel ||
                  !coreSubject ||
                  !selectedProgrammes?.length > 0
                }
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor:
                    selectedProgrammes?.length > 0
                      ? "green"
                      : "#adacaccc !important",
                  borderRadius: ".4rem",
                  color: "#fff !important",
                  "&.Mui-disabled": {
                    cursor: "not-allowed", // Show not-allowed cursor
                    pointerEvents: "auto",
                  },
                  alignItems: "center",
                  // height: "2.35rem",
                  height: { xs: "2.5rem", sm: "2.65rem", md: "2.75rem" },
                  textTransform: "capitalize",
                  mb: 1,
                }}
                onClick={(e) => {
                  e?.preventDefault();
                  // Format the selected items into the desired structure
                  const formattedProgrammes = selectedProgrammes.map(
                    (program) => ({
                      _id: program._id || null, // Map _id to id
                      programId: program._id || null, // Map _id to id
                      name: program.name
                        ? program?.name
                        : program?.divisionName, // Map _id to id
                      type: program.isDivisionProgram
                        ? "ProgramDivision"
                        : "Program", // Map label to name
                    })
                  );
                  const data = {
                    classLevel:
                      localStorage.getItem("coreReportClassLevel") ||
                      coreClassLevel,
                    semester: currentAcademicTerm?.name,
                    subject:
                      localStorage.getItem("coreReportSubject") || coreSubject,
                    programmes: formattedProgrammes || savedSelectedProgrammes,
                    lecturer: authUser?.id,
                    year: new Date().getFullYear(),
                  };
                  if (selectedProgrammes?.length > 0) {
                    localStorage?.setItem(
                      "savedSelectedProgrammes",
                      JSON.stringify(formattedProgrammes)
                    );
                    dispatch(resetCoreSubjectMultiStudentsState());
                    dispatch(resetCoreReportStudentsState());
                    dispatch(fetchCoreDraftReport(data));
                    dispatch(fetchCoreSubjectMultiStudentsReport(data));
                  }
                }}
              >
                {fetchingCoreLoadingComplete === false && (
                  <Box className="promotionSpinner">
                    <p>Fetching</p>
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
                {fetchingCoreLoadingComplete &&
                  fetchCoreDraftStatus === "success" && (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <span>Fetched</span>{" "}
                      <TaskAlt style={{ fontSize: "1rem" }} />
                    </Box>
                  )}
                {fetchingCoreLoadingComplete === null && "Fetch"}
              </Button>
            </Grid>
          </Grid>
        </Box>
        <>
          {draftReportInfo &&
            draftReportInfo?.students?.length > 0 &&
            draftReportInfo?.subject === coreSubject &&
            draftReportInfo?.classLevel === coreClassLevel &&
            fetchingCoreLoadingComplete === null && (
              <Box fontSize={"calc(0.7rem + 1vmin)"} position={"relative"}>
                <Box className="studentDataTable">
                  <Box mt={3} mb={1.5}>
                    <Button
                      disabled={!multiStudents?.length > 0}
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
                          classLevel: coreClassLevel,
                          subject: coreSubject,
                          lecturer: authUser?.id,
                          students: multiStudents,
                          programmes: formattedProgrammes || [],
                          year: currentYear,
                        };
                        if (multiStudents?.length > 0) {
                          dispatch(createMultiStudentsReport(data));
                        }
                      }}
                    >
                      {multiStudents?.length > 0 &&
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
                      {multiStudents?.length > 0 &&
                        multiLoadingComplete &&
                        createMultiStatus === "success" && (
                          <>
                            <span>All Saved</span> <TaskAlt />
                          </>
                        )}
                      {multiLoadingComplete === null && "Save All Reports"}
                    </Button>
                  </Box>
                  <DataTable
                    title={allStd}
                    columns={studentDataFormat}
                    data={allCoreSubjectStudents || []}
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
                  <StudentReportRemarkModal
                    open={openRemarkModal}
                    onClose={() => setOpenRemarkModal(false)}
                    setRemark={setRemark}
                    remark={remark}
                    handleScoreChange={handleScoreChange}
                    studentId={studentId}
                    allCoreSubjectStudents={allCoreSubjectStudents}
                    setLoadingComplete={setSavingRemarkComplete}
                    loadingComplete={savingRemarkComplete}
                    fetchDraft={fetchCoreDraftReport({
                      classLevel:
                        localStorage.getItem("coreReportClassLevel") ||
                        coreClassLevel,
                      semester: currentAcademicTerm?.name,
                      subject:
                        localStorage.getItem("coreReportSubject") ||
                        coreSubject,
                      programmes: formattedProgrammes || [],
                      lecturer: authUser?.id,
                    })}
                    dispatch={dispatch}
                  />
                </Box>
              </Box>
            )}
          {!coreClassLevel &&
            !coreSubject &&
            fetchingCoreLoadingComplete === null && (
              <Box>
                <Typography
                  variant="h6"
                  color="#fff"
                  textAlign={"center"}
                  mt={2}
                  fontSize={".8rem"}
                >
                  Select form and subject to begin...
                </Typography>
              </Box>
            )}
          {fetchingCoreLoadingComplete === null &&
            coreClassLevel &&
            coreSubject && (
              <>
                {noDataFetched && !allCoreSubjectStudents?.length > 0 && (
                  <Box>
                    <Typography
                      variant="h6"
                      color="#fff"
                      textAlign={"center"}
                      mt={2}
                      fontSize={".8rem"}
                    >
                      No data fetched!
                    </Typography>
                  </Box>
                )}
                {!draftReportInfo?.students?.length > 0 &&
                  !subjectMultiStudentsReports &&
                  !noDataFetched && (
                    <Typography
                      variant="h6"
                      color="#fff"
                      textAlign={"center"}
                      mt={2}
                      fontSize={".8rem"}
                    >
                      No student data found!
                    </Typography>
                  )}
              </>
            )}
        </>
      </Box>
    </>
  );
}

// CoreReport.propTypes = {
//   setTakeCoreSubjectReport: PropTypes.func,
//   takeCoreSubjectReport: PropTypes.bool,
//   allCoreSubjectStudents: PropTypes.array,
//   setAllCoreSubjectStudents: PropTypes.func,
//   allElectiveSubjectStudents: PropTypes.array,
//   setAllElectiveSubjectStudents: PropTypes.func,
// };
