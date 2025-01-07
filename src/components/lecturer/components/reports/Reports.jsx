import { Box, Button, Grid, MenuItem } from "@mui/material";
import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { FetchAllLecturerSubjects } from "../../../../data/subjects/FetchSubjects";
import { getAuthUser } from "../../../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import { customUserTableStyle } from "../../../../usersInfoDataFormat/usersInfoTableStyle";
import { studentsReportColumn } from "../../../../usersInfoDataFormat/UsersInfoDataFormat";
import useSubjectStudents from "../../../../data/subjects/useSubjectStudents";
import { FetchCurrentAcademicTerms } from "../../../../data/term.year/FetchAcademicTerms";
import { CustomTextField } from "../../../../muiStyling/muiStyling";
import { FetchAllClassLevels } from "../../../../data/class/FetchClassLevel";
import {
  createMultiStudentsReport,
  fetchDraftReport,
  getDraftReportInfo,
  saveDraftReport,
} from "../../../../features/reports/reportSlice";
import { toast } from "react-toastify";

export default function Reports() {
  const { createStatus, error, successMessage } = useSelector(
    (state) => state.report
  );
  const reportClassLevel = localStorage.getItem("reportClassLevel");
  const reportSubject = localStorage.getItem("reportSubject");
  const authUser = useSelector(getAuthUser);
  const currentYear = new Date().getFullYear();
  const draftReportInfo = useSelector(getDraftReportInfo);
  console.log(draftReportInfo);

  const { lecturerCurrentAction, lecturerCurrentLink } = useParams();
  const dispatch = useDispatch();
  const lecturerSubjects = FetchAllLecturerSubjects(authUser?.id);
  const allClassLevels = FetchAllClassLevels();
  const currentAcademicTerm = FetchCurrentAcademicTerms();

  // Report State
  const [classLevel, setClassLevel] = useState(
    localStorage.getItem("reportClassLevel") || ""
  );
  const [subject, setSubject] = useState(
    localStorage.getItem("reportSubject") || ""
  );
  //   const [reportData, setReportData] = useState({
  //     classLevel: "",
  //     subject: "",
  //     year: currentYear,
  //     lecturer: authUser?.id,
  //   });
  // Maintain a local state for editing scores
  const [allSubjectStudents, setAllSubjectStudents] = useState([]);
  const [normalStudentList, setNormalStudentList] = useState([]);

  const fetchedStudents = useSubjectStudents({
    classLevel: classLevel ? classLevel : reportClassLevel,
    subject: subject ? subject : reportSubject,
    // draftReportInfo,
  });

  // Handle score values ✅
  const handleScoreChange = (id, field, value) => {
    const updatedStudents = allSubjectStudents?.map((student) => {
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
    const reportObj = {
      semester: currentAcademicTerm?.name,
      classLevel: classLevel,
      subject: subject,
      lecturer: authUser?.id,
      students: updatedStudents,
      year: new Date().getFullYear(),
    };
    // Save to localStorage whenever allSubjectStudents changes
    localStorage.setItem("allSubjectStudents", JSON.stringify(reportObj));
    dispatch(saveDraftReport(reportObj));

    // setAllSubjectStudents(reportObj?.students); // Update the correct state
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
  };
  const studentDataFormat = studentsReportColumn(columnData);

  // Fetch Draft Data
  useEffect(() => {
    // if (classLevel && subject) {
    const data = {
      classLevel: localStorage.getItem("reportClassLevel") || classLevel,
      semester: currentAcademicTerm?.name,
      subject: localStorage.getItem("reportSubject") || subject,
      lecturer: authUser?.id,
    };
    console.log("Dispatching fetchDraftReport with data:", data); // Debug here
    dispatch(fetchDraftReport(data));
    // }
  }, [classLevel, subject, currentAcademicTerm, authUser, dispatch]);

  useEffect(() => {
    if (!draftReportInfo?.students?.length > 0) {
      setAllSubjectStudents(fetchedStudents);
    } else {
      setAllSubjectStudents(draftReportInfo?.students);
    }
  }, [draftReportInfo, fetchedStudents]);

  console.log(draftReportInfo);
  // Fetch draft data if exist
  //   useLayoutEffect(() => {
  //     const savedStudents = localStorage.getItem("allSubjectStudents");
  //     const reportObject = JSON.parse(savedStudents);

  //     if (
  //       reportObject &&
  //       reportObject?.classLevel === subjectStudents?.classLevel &&
  //       reportObject?.subject === subjectStudents?.subject
  //     ) {
  //       dispatch(fetchDraftReport(reportObject));
  //     }
  //   }, [dispatch, subjectStudents]);

  // Retrieve saved data from localStorage on component mount
  useLayoutEffect(() => {
    const savedStudents = localStorage.getItem("allSubjectStudents");

    const reportObject = JSON.parse(savedStudents);
    //   Fetch draft report data
    if (
      reportObject &&
      reportObject?.classLevel === classLevel &&
      reportObject?.subject === subject
    ) {
      setAllSubjectStudents(reportObject?.students);
    }
    //   else {
    //     setAllSubjectStudents(fetchedStudents);
    //   }
  }, [
    //   fetchedStudents,
    dispatch,
    classLevel,
    subject,
  ]);

  // handle multi approval or rejection
  const [multiStudents, setMultiStudents] = useState([]);
  const [toggleClearRows, setToggleClearRows] = useState(false);
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

  useEffect(() => {
    if (createStatus === "success") {
      localStorage.removeItem("allSubjectStudents");
      localStorage.removeItem("reportClassLevel");
      localStorage.removeItem("reportSubject");
    }
    if (createStatus === "rejected") {
      setTimeout(() => {
        error?.errorMessage?.message?.map((err) =>
          toast.error(err, {
            position: "top-right",
            theme: "light",
            toastId: err,
          })
        );
      }, 2000);
      return;
    }
  }, [dispatch, createStatus, error]);

  const allStd = `Students / Total = ${allSubjectStudents?.length}`;

  return (
    <>
      {/* Current dashboard title */}
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
          <span>{lecturerCurrentLink?.replace(/_/g, " ")}</span>
        </h1>
      </Box>
      <Box padding={2}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={2}>
            <CustomTextField
              select
              fullWidth
              name="classLevel"
              label="Class Level"
              value={classLevel}
              //   size="small"
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
                },
              }}
            >
              {allClassLevels?.map((cLevel) => (
                <MenuItem key={cLevel?._id} value={cLevel?._id}>
                  {cLevel?.name}
                </MenuItem>
              ))}
            </CustomTextField>
          </Grid>
          <Grid item xs={12} sm={2}>
            <CustomTextField
              select
              fullWidth
              name="subject"
              label="Select Subject"
              value={subject}
              //   size="medium"
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
                },
              }}
            >
              {lecturerSubjects?.map((subj) => (
                <MenuItem key={subj?._id} value={subj?._id}>
                  {subj?.subjectName}
                </MenuItem>
              ))}
            </CustomTextField>
          </Grid>
        </Grid>
        <Box fontSize={"calc(0.7rem + 1vmin)"} position={"relative"}>
          <Box className="studentDataTable">
            <Box>
              <Button
                onClick={() => {
                  const data = {
                    semester: currentAcademicTerm?.name,
                    classLevel: classLevel,
                    subject: subject,
                    lecturer: authUser?.id,
                    year: currentYear,
                    students: multiStudents,
                  };
                  dispatch(createMultiStudentsReport(data));
                }}
              >
                Save All Reports
              </Button>
            </Box>
            <DataTable
              title={allStd}
              columns={studentDataFormat}
              data={allSubjectStudents}
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
      </Box>
    </>
  );
}
