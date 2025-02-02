import {
  Autocomplete,
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
  getDraftReportInfo,
  resetCreateReportState,
  resetFetchCoreReportState,
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
import { fetchCoreDraftReport } from "../../../../features/reports/reportSlice";
import PageLoading from "../../../pageLoading/PageLoading";
import { FetchAllFlattenedProgrammes } from "../../../../data/programme/FetchProgrammeData";

export function CoreReport() {
  const {
    createStatus,
    createMultiStatus,
    error,
    successMessage,
    fetchCoreDraftStatus,
  } = useSelector((state) => state.report);
  const reportClassLevel = localStorage.getItem("reportClassLevel");
  const reportSubject = localStorage.getItem("reportSubject");
  const savedSelectedProgrammes = JSON.parse(
    localStorage?.getItem("savedSelectedProgrammes")
  );
  console.log(savedSelectedProgrammes);

  const authUser = useSelector(getAuthUser);
  console.log(authUser?.id);
  const currentYear = new Date().getFullYear();
  const draftReportInfo = useSelector(getDraftReportInfo);
  console.log(draftReportInfo);

  const { lecturerCurrentAction, lecturerCurrentLink } = useParams();
  const [takeCoreSubjectReport, setTakeCoreSubjectReport] = useState(false);
  const [allCoreSubjectStudents, setAllCoreSubjectStudents] = useState([]);
  const [allElectiveSubjectStudents, setAllElectiveSubjectStudents] = useState(
    []
  );
  const [isCore, setIsCore] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(takeCoreSubjectReport);
  const lecturerSubjects = FetchAllLecturerSubjects(isCore);
  const allFlattenedProgrammes = FetchAllFlattenedProgrammes();
  const allClassLevels = useSelector(getLecturerClassLevels);
  // const allClassLevels = FetchAllClassLevels();
  console.log(allCoreSubjectStudents);

  const currentAcademicTerm = FetchCurrentAcademicTerms();
  // Report saving state
  const [multiLoadingComplete, setMultiLoadingComplete] = useState(null);
  const [loadingComplete, setLoadingComplete] = useState(null);
  const [fetchingCoreLoadingComplete, setFetchingCoreLoadingComplete] =
    useState(null);
  const [saveDataInProgress, setSaveDataInProgress] = useState(false);

  // Multi select state
  const [multiStudents, setMultiStudents] = useState([]);
  const [toggleClearRows, setToggleClearRows] = useState(false);
  const [currentStudent, setCurrentStudent] = useState("");

  // Report State
  const [coreClassLevel, setCoreClassLevel] = useState(
    localStorage.getItem("coreReportClassLevel") || null
  );
  const [coreSubject, setCoreSubject] = useState(
    localStorage.getItem("coreReportSubject") || null
  );
  const [selectedProgrammes, setSelectedProgrammes] = useState([]);
  //   const [allCoreSubjectStudents, setAllCoreSubjectStudents] = useState(
  //     draftReportInfo?.students ? draftReportInfo?.students : []
  //   );
  console.log(selectedProgrammes);

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
        return updatedStudent;
      }
      return student;
    });
    // Format the selected items into the desired structure
    const formattedProgrammes = selectedProgrammes.map((program) => ({
      program: program._id, // Map _id to id
      type: program.hasDivision ? "ProgramDivision" : "Program", // Map label to name
    }));
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
    setAllElectiveSubjectStudents([]);
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
  const foundStudent = allCoreSubjectStudents?.find(
    (std) => std._id === currentStudent
  );
  // Table column data
  const columnData = {
    authUser,
    handleScoreChange,
    calculateGrade,
    gradeBgColor,
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
  };
  const studentDataFormat = studentsReportColumn(columnData);

  // Fetch Draft Data
  useEffect(() => {
    if (!selectedProgrammes?.length > 0) {
      setAllCoreSubjectStudents([]);
    }
    // if (takeCoreSubjectReport && selectedProgrammes?.length > 0) {
    //   // Format the selected items into the desired structure
    //   const formattedProgrammes = selectedProgrammes.map((program) => ({
    //     program: program._id, // Map _id to id
    //     type: program.hasDivision ? "ProgramDivision" : "Program", // Map label to name
    //   }));
    //   const data = {
    //     classLevel:
    //       localStorage.getItem("coreReportClassLevel") || coreClassLevel,
    //     semester: currentAcademicTerm?.name,
    //     subject: localStorage.getItem("coreReportSubject") || coreSubject,
    //     lecturer: authUser?.id,
    //     programmes: formattedProgrammes || [],
    //   };
    //   dispatch(fetchCoreDraftReport(data));
    //   setAllElectiveSubjectStudents([]);
    // } else {
    //   setAllCoreSubjectStudents([]);
    // }
  }, [
    // takeCoreSubjectReport,
    // coreClassLevel,
    // coreSubject,
    // currentAcademicTerm,
    // authUser,
    // dispatch,
    // setAllElectiveSubjectStudents,
    setAllCoreSubjectStudents,
    selectedProgrammes,
  ]);
  // Retrieve and set students on page render
  useEffect(() => {
    if (draftReportInfo?.students?.length > 0) {
      setAllCoreSubjectStudents(draftReportInfo?.students);
    } else {
      setAllCoreSubjectStudents([]);
    }
  }, [
    draftReportInfo,
    takeCoreSubjectReport,
    setAllElectiveSubjectStudents,
    setAllCoreSubjectStudents,
  ]);

  useEffect(() => {
    setIsCore(true);
    if (authUser) {
      dispatch(fetchLecturerClassLevels({ lecturerId: authUser?.id }));
    }
  }, [authUser, dispatch]);

  // handle multi approval or rejection
  const handleMultiSelect = (state) => {
    if (state) {
      const studentObj = state?.selectedRows?.map((user) => {
        const userObject = {
          studentId: user?.uniqueId,
          classScore: user?.classScore,
          examScore: user?.examScore,
          totalScore: user?.totalScore,
          grade: user?.grade,
        };
        return userObject;
      });
      setMultiStudents(studentObj);
    } else {
      setMultiStudents([]);
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
        // Format the selected items into the desired structure
        const formattedProgrammes = selectedProgrammes.map((program) => ({
          program: program._id, // Map _id to id
          type: program.hasDivision ? "ProgramDivision" : "Program", // Map label to name
        }));
        const data = {
          classLevel:
            localStorage.getItem("coreReportClassLevel") || coreClassLevel,
          semester: currentAcademicTerm?.name,
          subject: localStorage.getItem("coreReportSubject") || coreSubject,
          programmes: formattedProgrammes || [],
          lecturer: authUser?.id,
        };
        dispatch(fetchCoreDraftReport(data));
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
    selectedProgrammes,
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
            classLevel:
              localStorage.getItem("coreReportClassLevel") || coreClassLevel,
            semester: currentAcademicTerm?.name,
            subject: localStorage.getItem("coreReportSubject") || coreSubject,
            lecturer: authUser?.id,
          };
          dispatch(fetchCoreDraftReport(data));
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
      }, 6000);
    }
  }, [fetchCoreDraftStatus, error, dispatch]);

  const allStd = `Students / Total = ${
    allCoreSubjectStudents?.length > 0 ? allCoreSubjectStudents?.length : 0
  }`;

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
          <span>{lecturerCurrentLink?.replace(/_/g, ` Core `)}</span>
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
            <Grid item xs={12} sm={2}>
              <CustomTextField
                select
                fullWidth
                name="coreClassLevel"
                label="Form"
                value={coreClassLevel || ""}
                size="small"
                onChange={(e) => {
                  setCoreClassLevel(e.target.value);
                  localStorage.setItem("coreReportClassLevel", e.target.value);
                }}
                sx={{
                  "& .MuiInputBase-input": {
                    height: "1.3rem",
                    fontSize: ".7em",
                  },
                  "& .MuiInputLabel-root": {
                    fontSize: ".7em", // Default label size
                    transition: "font-size 0.2s, color 0.2s",
                  },
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
            <Grid item xs={12} sm={2}>
              <CustomTextField
                select
                fullWidth
                name="coreSubject"
                label="Subject"
                value={coreSubject || ""}
                size="small"
                onChange={(e) => {
                  setCoreSubject(e.target.value);
                  localStorage.setItem("coreReportSubject", e.target.value);
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
                    height: "1.3rem",
                    fontSize: ".7em",
                  },
                  "& .MuiInputLabel-root": {
                    fontSize: ".7em", // Default label size
                    transition: "font-size 0.2s, color 0.2s",
                  },
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
            <Grid item xs={12} sm={5}>
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
                    //   label="Select Options"
                    placeholder="Choose Programmes"
                    size="small"
                    //   onChange={(e) => {
                    //     setReportData({
                    //       ...reportData,
                    //       subject: e.target.value,
                    //     });
                    //     localStorage.setItem("reportSubject", e.target.value);
                    //   }}
                    sx={{
                      "& .MuiInputBase-input": {
                        height: "1.3rem",
                        fontSize: ".7em",
                      },
                      "& .MuiInputLabel-root": {
                        fontSize: ".7em", // Default label size
                        transition: "font-size 0.2s, color 0.2s",
                      },
                    }}
                  ></CustomTextField>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={1.7} md={1.3}>
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
                  height: "2.35rem",
                  textTransform: "capitalize",
                }}
                onClick={(e) => {
                  e?.preventDefault();
                  // Format the selected items into the desired structure
                  const formattedProgrammes = selectedProgrammes.map(
                    (program) => ({
                      _id: program._id || null, // Map _id to id
                      program: program._id || null, // Map _id to id
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
                  };
                  if (selectedProgrammes?.length > 0) {
                    localStorage?.setItem(
                      "savedSelectedProgrammes",
                      JSON.stringify(formattedProgrammes)
                    );
                    dispatch(fetchCoreDraftReport(data));
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
                    <>
                      <span>Fetched</span> <TaskAlt />
                    </>
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
                        // Format the selected items into the desired structure
                        const formattedProgrammes = selectedProgrammes.map(
                          (program) => ({
                            program: program._id, // Map _id to id
                            type: program.isDivisionProgram
                              ? "ProgramDivision"
                              : "Program", // Map label to name
                          })
                        );
                        const data = {
                          semester: currentAcademicTerm?.name,
                          classLevel: coreClassLevel,
                          subject: coreSubject,
                          lecturer: authUser?.id,
                          students: multiStudents,
                          programmes: formattedProgrammes || [],
                          year: currentYear,
                        };
                        if (isCore && multiStudents?.length > 0) {
                          dispatch(createMultiStudentsReport(data));
                        }
                      }}
                    >
                      {isCore &&
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
                      {isCore &&
                        multiStudents?.length > 0 &&
                        multiLoadingComplete &&
                        createMultiStatus === "success" && (
                          <>
                            <span>All Saved</span> <TaskAlt />
                          </>
                        )}
                      {isCore &&
                        multiLoadingComplete === null &&
                        "Save All Reports"}
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
                  fontSize={".9em"}
                >
                  Select Form and Subject to begin...
                </Typography>
              </Box>
            )}
          {coreClassLevel &&
            coreSubject &&
            !draftReportInfo &&
            fetchingCoreLoadingComplete === null && (
              <Box>
                <Typography
                  variant="h6"
                  color="#fff"
                  textAlign={"center"}
                  mt={2}
                  fontSize={".9em"}
                >
                  No data found!
                </Typography>
              </Box>
            )}
        </>
      </Box>
    </>
  );
}

CoreReport.propTypes = {
  setTakeCoreSubjectReport: PropTypes.func,
  takeCoreSubjectReport: PropTypes.bool,
  allCoreSubjectStudents: PropTypes.array,
  setAllCoreSubjectStudents: PropTypes.func,
  allElectiveSubjectStudents: PropTypes.array,
  setAllElectiveSubjectStudents: PropTypes.func,
};
