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
  getDraftReportInfo,
  resetCreateReportState,
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
import StudentReportRemarkModal from "../../../modals/studentReportRemarkModal";

export function ElectiveReport() {
  const { createStatus, createMultiStatus, error, successMessage } =
    useSelector((state) => state.report);
  const reportClassLevel = localStorage.getItem("reportClassLevel");
  const reportSubject = localStorage.getItem("reportSubject");
  const authUser = useSelector(getAuthUser);
  console.log(authUser?.id);
  const currentYear = new Date().getFullYear();
  const draftReportInfo = useSelector(getDraftReportInfo);
  console.log(draftReportInfo);

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
  const [isElective, setIsElective] = useState(true);
  console.log(takeCoreSubjectReport);

  const lecturerSubjects = FetchAllLecturerSubjects(takeCoreSubjectReport);
  const currentAcademicTerm = FetchCurrentAcademicTerms();
  // Report saving state
  const [multiLoadingComplete, setMultiLoadingComplete] = useState(null);
  const [loadingComplete, setLoadingComplete] = useState(null);
  const [saveDataInProgress, setSaveDataInProgress] = useState(false);

  // Multi select state
  const [multiStudents, setMultiStudents] = useState([]);
  const [toggleClearRows, setToggleClearRows] = useState(false);
  const [currentStudent, setCurrentStudent] = useState("");
  const [studentId, setStudentId] = useState("");

  // Report State
  const [classLevel, setClassLevel] = useState(
    localStorage.getItem("reportClassLevel") || null
  );
  const [subject, setSubject] = useState(
    localStorage.getItem("reportSubject") || null
  );
  const [remark, setRemark] = useState("");
  // Maintain a local state for editing scores
  const fetchedStudents = useSubjectStudents({
    classLevel: classLevel ? classLevel : reportClassLevel,
    subject: subject ? subject : reportSubject,
    programmes: [],
    // draftReportInfo,
  });
  //   const [allSubjectStudents, setAllSubjectStudents] = useState(
  //     draftReportInfo?.students ? draftReportInfo?.students : []
  //   );
  //   console.log(allSubjectStudents);

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
  const foundStudent = allElectiveSubjectStudents?.find(
    (std) => std._id === currentStudent
  );
  // Table column data
  const columnData = {
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
  };
  const studentDataFormat = studentsReportColumn(columnData);

  // Fetch Draft Data
  useEffect(() => {
    if (!takeCoreSubjectReport) {
      const data = {
        classLevel: localStorage.getItem("reportClassLevel") || classLevel,
        semester: currentAcademicTerm?.name,
        subject: localStorage.getItem("reportSubject") || subject,
        lecturer: authUser?.id,
      };
      dispatch(fetchElectiveDraftReport(data));
      setAllCoreSubjectStudents([]);
    } else {
      setAllElectiveSubjectStudents([]);
    }
  }, [
    takeCoreSubjectReport,
    classLevel,
    subject,
    currentAcademicTerm,
    authUser,
    dispatch,
    setAllElectiveSubjectStudents,
    setAllCoreSubjectStudents,
  ]);
  // Retrieve and set students on page render
  useEffect(() => {
    if (takeCoreSubjectReport) {
      setAllElectiveSubjectStudents([]);
    } else {
      setAllElectiveSubjectStudents(draftReportInfo?.students);
      setAllCoreSubjectStudents([]);
    }
  }, [
    draftReportInfo,
    takeCoreSubjectReport,
    setAllElectiveSubjectStudents,
    setAllCoreSubjectStudents,
  ]);
  console.log(allElectiveSubjectStudents);

  useEffect(() => {
    setIsElective(true);
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
          remark: user?.remark,
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
        setMultiLoadingComplete(null);
        dispatch(resetCreateMultiReportState());
        const data = {
          classLevel: localStorage.getItem("reportClassLevel") || classLevel,
          semester: currentAcademicTerm?.name,
          subject: localStorage.getItem("reportSubject") || subject,
          lecturer: authUser?.id,
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
        localStorage.removeItem("allSubjectStudents");
        localStorage.removeItem("reportClassLevel");
        localStorage.removeItem("reportSubject");
        setMultiStudents([]);
        dispatch(resetCreateMultiReportState());
        const data = {
          classLevel: localStorage.getItem("reportClassLevel") || classLevel,
          semester: currentAcademicTerm?.name,
          subject: localStorage.getItem("reportSubject") || subject,
          lecturer: authUser?.id,
        };
        dispatch(fetchElectiveDraftReport(data));
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
          };
          dispatch(fetchElectiveDraftReport(data));
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
    classLevel,
    currentAcademicTerm,
    subject,
    authUser,
    dispatch,
  ]);

  const allStd = `Students / Total = ${
    allElectiveSubjectStudents?.length > 0
      ? allElectiveSubjectStudents?.length
      : 0
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
          <span>{lecturerCurrentLink?.replace(/_/g, " Elective ")}</span>
        </h1>
      </Box>
      <Box padding={{ xs: 1, sm: 2 }} bgcolor={"#383838"}>
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
          <Grid container spacing={1}>
            <Grid item xs={12} sm={2}>
              <CustomTextField
                select
                fullWidth
                name="classLevel"
                label="Form"
                value={classLevel || ""}
                size="small"
                onChange={(e) => {
                  setClassLevel(e.target.value);
                  localStorage.setItem("reportClassLevel", e.target.value);
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
                    height: "1rem",
                    fontSize: ".8em",
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
                name="subject"
                label="Subject"
                value={subject || ""}
                size="small"
                onChange={(e) => {
                  setSubject(e.target.value);
                  localStorage.setItem("reportSubject", e.target.value);
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
                    height: "1rem",
                    fontSize: ".8em",
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
          </Grid>
        </Box>
        {!takeCoreSubjectReport && allElectiveSubjectStudents?.length > 0 ? (
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
              {isElective && (
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
              )}
              <StudentReportRemarkModal
                open={openRemarkModal}
                onClose={() => setOpenRemarkModal(false)}
                setRemark={setRemark}
                remark={remark}
                handleScoreChange={handleScoreChange}
                studentId={studentId}
                setLoadingComplete={setLoadingComplete}
                loadingComplete={loadingComplete}
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
        ) : (
          <Box>
            <Typography
              variant="h6"
              color="#fff"
              textAlign={"center"}
              mt={5}
              fontSize={".9em"}
            >
              {!classLevel && !subject
                ? "Select Form and Subject to begin..."
                : "No data found!"}
            </Typography>
          </Box>
        )}
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
