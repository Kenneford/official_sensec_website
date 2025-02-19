import { useEffect, useState } from "react";
import "./reports.scss";
import { FileOpen, TaskAlt } from "@mui/icons-material";
import { Box, Button, Grid, MenuItem, Avatar, Typography } from "@mui/material";
import {
  CustomMenuProps,
  CustomMobileDatePicker,
  CustomTextField,
} from "../../../../muiStyling/muiStyling";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Cookies from "js-cookie";
import dayjs from "dayjs";
import DataTable from "react-data-table-component";
import SmallFooter from "../../../footer/SmallFooter";
import LoadingProgress from "../../../pageLoading/LoadingProgress";
import { customAttendanceTableStyle } from "../../../../usersInfoDataFormat/usersInfoTableStyle";
import {
  dateFormatter,
  getLastNMonthsData,
  getLastNWeeksData,
} from "../../../../dateFormatter/DateFormatter";
import { getAuthUser } from "../../../../features/auth/authSlice";
import { FetchAllAcademicTerms } from "../../../../data/term.year/FetchAcademicTerms";
import SearchFilter from "../../../searchForm/SearchFilter";
import {
  getSearchedClassReportInfo,
  getSearchedStudentReportInfo,
  resetClassReportData,
  resetClassReportSearchState,
  resetStudentReportSearchState,
  searchClassReport,
  searchSingleStudentReport,
} from "../../../../features/reports/reportSlice";
import SearchedReportOverviewModal from "../../../modals/SearchedReportOverviewModal";
import { FetchAllStudents } from "../../../../data/students/FetchAllStudents";

export function SearchReport() {
  const currentReportSearch = Cookies?.get("currentReportSearch");

  const { lecturerCurrentLink, lecturerCurrentAction } = useParams();
  const { searchingStatus, searchClassReportError } = useSelector(
    (state) => state.report
  );
  // State to track the selected month
  const [selectedMonth, setSelectedMonth] = useState("");
  // State to track the selected week
  const [selectedWeek, setSelectedWeek] = useState("");

  // Handle Process State
  const [loadingComplete, setLoadingComplete] = useState(null);
  const [dataFetched, setDataFetched] = useState(false);
  const [overviewStudents, setOverviewStudents] = useState({});
  const [openAttendanceOverviewModal, setOpenAttendanceOverviewModal] =
    useState(false);
  const [searchStudent, setSearchStudent] = useState("");
  const [student, setStudent] = useState("");
  const [attendanceData, setAttendanceData] = useState({
    classLevel: "",
    date: "",
    year: "",
    semester: "",
    dateRange: { from: null, to: null },
  });
  const [searchForAttendance, setSearchForAttendance] = useState({
    by: "",
  });

  const authLecturer = useSelector(getAuthUser);
  const searchedClassReportInfo = useSelector(getSearchedClassReportInfo);
  const searchedStudentReportInfo = useSelector(getSearchedStudentReportInfo);
  console.log("searchedStudentReportInfo: ", searchedStudentReportInfo);

  const allStudents = FetchAllStudents();
  const allSemesters = FetchAllAcademicTerms();
  const dispatch = useDispatch();

  const filteredReports =
    searchedClassReportInfo &&
    searchedClassReportInfo?.filter(
      (studentData) =>
        studentData?.dayOfTheWeek
          ?.toLowerCase()
          ?.includes(searchStudent.toLowerCase()) ||
        studentData?.year?.toLowerCase()?.includes(searchStudent.toLowerCase())
    );
  const filteredStudents =
    allStudents &&
    allStudents?.filter(
      (studentData) =>
        studentData?.personalInfo?.fullName
          ?.toLowerCase()
          ?.includes(searchStudent.toLowerCase()) ||
        studentData?.uniqueId
          ?.toLowerCase()
          ?.includes(searchStudent.toLowerCase())
    );
  console.log(filteredStudents);

  // Calculate attendance statistics
  const totalStudents = filteredReports?.students?.length || 0;
  const passCount =
    filteredReports?.students?.filter((student) => student?.grade !== "F9")
      .length || 0;
  const failCount = totalStudents - passCount;

  const passPercentage = ((passCount / totalStudents) * 100).toFixed(1);
  const failPercentage = ((failCount / totalStudents) * 100).toFixed(1);

  console.log("totalStudents: ", totalStudents);
  console.log("passPercentage: ", passPercentage);
  console.log("failPercentage: ", failPercentage);

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
  // Handle selection change
  const handleMonthChange = (event) => {
    const selected = monthData.find(
      (month) => month.label === event.target.value
    );
    setSelectedMonth(selected);
  };
  // Handle selection change
  const handleWeekChange = (event) => {
    const selected = weekData.find((week) => week.label === event.target.value);
    setSelectedWeek(selected);
  };
  // Generate the last 6 months' labels
  const monthData = getLastNMonthsData(12);
  // Generate the last 6 weeks' data
  const weekData = getLastNWeeksData(6);
  // Convert it to the desired format:
  const day = String(attendanceData?.date?.$D).padStart(2, "0"); // Adds leading zero if needed
  const month = String(attendanceData?.date?.$M + 1).padStart(2, "0"); // Month is 0-based, so +1
  const year = attendanceData?.date?.$y;

  const formattedDate = `${day}/${month}/${year}`;

  const fromDay = String(attendanceData?.dateRange?.from?.$D).padStart(2, "0"); // Adds leading zero if needed
  const fromMonth = String(attendanceData?.dateRange?.from?.$M + 1).padStart(
    2,
    "0"
  ); // Month is 0-based, so +1
  const fromYear = attendanceData?.dateRange?.from?.$y;

  const formattedFromDate = `${fromDay}/${fromMonth}/${fromYear}`;

  const toDay = String(attendanceData?.dateRange?.to?.$D).padStart(2, "0"); // Adds leading zero if needed
  const toMonth = String(attendanceData?.dateRange?.to?.$M + 1).padStart(
    2,
    "0"
  ); // Month is 0-based, so +1
  const toYear = attendanceData?.dateRange?.to?.$y;

  const formattedToDate = `${toDay}/${toMonth}/${toYear}`;

  const handleSearchAttendance = () => {
    if (searchedStudentReportInfo) {
      dispatch(resetStudentReportSearchState());
    }
    if (dataFetched) {
      setDataFetched(false);
    }
    if (searchStudent) {
      setSearchStudent("");
    }
    let data;
    if (searchForAttendance?.by === "Year") {
      data = {
        year: attendanceData?.year,
        lecturer: authLecturer?.id,
      };
    }
    if (searchForAttendance?.by === "Month") {
      data = {
        monthRange: { start: selectedMonth?.start, end: selectedMonth?.end },
        lecturer: authLecturer?.id,
      };
    }
    if (searchForAttendance?.by === "Week") {
      data = {
        weekRange: { start: selectedWeek?.start, end: selectedWeek?.end },
        lecturer: authLecturer?.id,
      };
    }
    if (searchForAttendance?.by === "Date") {
      data = {
        date: formattedDate ? formattedDate : "",
        lecturer: authLecturer?.id,
      };
    }
    if (searchForAttendance?.by === "Date Range") {
      data = {
        dateRange: { from: formattedFromDate, to: formattedToDate },
        lecturer: authLecturer?.id,
      };
    }
    if (searchForAttendance?.by === "Semester") {
      data = {
        semester: attendanceData?.semester,
        lecturer: authLecturer?.id,
      };
    }
    console.log(data);
    dispatch(searchClassReport(data));
  };

  const handleStudentReportFetch = () => {
    if (student) {
      dispatch(resetClassReportData());
      dispatch(searchSingleStudentReport(student));
    }
  };
  const handleDateChange = (date) => {
    if (dayjs(date).isValid()) {
      setAttendanceData((prev) => ({
        ...prev,
        date: date, // Store the Date object directly
      }));
    }
  };
  const handleFromDateChange = (date) => {
    if (dayjs(date).isValid()) {
      setAttendanceData((prev) => ({
        ...prev,
        dateRange: {
          ...prev.dateRange, // Retain the "to" value
          from: date, // Update "from"
        },
      }));
    }
  };
  const handleToDateChange = (date) => {
    if (dayjs(date).isValid()) {
      setAttendanceData((prev) => ({
        ...prev,
        dateRange: {
          ...prev.dateRange, // Retain the "from" value
          to: date, // Update "to"
        },
      }));
    }
  };

  // Define columns for the data table
  const columns = [
    // {
    //   name: (
    //     <Box fontSize={"calc(0.7rem + 1vmin)"}>
    //       <p style={{ fontSize: ".8em" }}>Lecturer</p>
    //     </Box>
    //   ),
    //   selector: (row) => (
    //     <>
    //       <Avatar
    //         // className="studentImg"
    //         src={row?.lecturer?.personalInfo?.profilePicture?.url}
    //         sx={{
    //           width: "1.5em",
    //           height: "1.5em",
    //           borderRadius: ".4rem",
    //           objectFit: "cover",
    //         }}
    //         alt=""
    //       />
    //     </>
    //   ),
    //   // sortable: true,
    // },
    {
      name: (
        <Box fontSize={"calc(0.7rem + 1vmin)"}>
          <p style={{ fontSize: ".8em" }}>Date</p>
        </Box>
      ),
      selector: (row) => (
        <>
          {row?.createdAt
            ? dateFormatter?.format(new Date(row?.createdAt))
            : "---"}
        </>
      ),
      // sortable: true,
    },
    {
      name: (
        <Box fontSize={"calc(0.7rem + 1vmin)"}>
          <p style={{ fontSize: ".8em" }}>Students</p>
        </Box>
      ),
      selector: (row) => (
        <Box fontSize={"calc(0.7rem + 1vmin)"}>
          <p style={{ fontSize: ".8em" }} title={row?.students?.length}>
            {row?.students?.length}
          </p>
        </Box>
      ),
      // sortable: true,
    },
    {
      name: (
        <Box fontSize={"calc(0.7rem + 1vmin)"}>
          <p style={{ fontSize: ".8em" }}>Subject</p>
        </Box>
      ),
      selector: (row) => (
        <Box fontSize={"calc(0.7rem + 1vmin)"}>
          <p style={{ fontSize: ".8em" }} title={row?.subject?.subjectName}>
            {row?.subject?.subjectName}
          </p>
        </Box>
      ),
      // sortable: true,
    },
    {
      name: "Level",
      selector: (row) =>
        row.classLevel && (
          <Box className="tableClassLevel">
            {row.classLevel?.name === "Level 100" && (
              <p
                // style={{
                //   fontSize: ".7em",
                //   backgroundColor: "#da076d",
                //   width: "1em",
                //   height: "1em",
                //   display: "flex",
                //   justifyContent: "center",
                //   alignItems: "center",
                //   padding: ".7em",
                //   borderRadius: "50%",
                //   color: "#fff",
                // }}
                className="firstYearTag"
                title="1st Year"
              >
                1
              </p>
            )}
            {row.classLevel?.name === "Level 200" && (
              <p className="secondYearTag" title="2nd Year">
                2
              </p>
            )}
            {row.classLevel?.name === "Level 300" && !row.isGraduated && (
              <p className="thirdYearTag" title="3rd Year">
                3
              </p>
            )}
          </Box>
        ),
    },
    {
      name: (
        <Box fontSize={"calc(0.7rem + 1vmin)"}>
          <p style={{ fontSize: ".8em" }}>Passes %</p>
        </Box>
      ),
      selector: (row) => {
        // Calculate attendance statistics
        const totalStudents = row?.students?.length || 0;
        const passCount =
          row?.students?.filter((student) => student.grade !== "F9").length ||
          0;

        const passPercentage = ((passCount / totalStudents) * 100).toFixed(1);
        return (
          <Box fontSize={"calc(0.7rem + 1vmin)"}>
            <p
              style={{ fontSize: ".8em" }}
              title={`${passCount} student(s) passed!`}
            >
              {passPercentage}
            </p>
          </Box>
        );
      },
      // sortable: true,
    },
    {
      name: (
        <Box fontSize={"calc(0.7rem + 1vmin)"}>
          <p style={{ fontSize: ".8em" }}>Fails %</p>
        </Box>
      ),
      cell: (row) => {
        // Calculate attendance statistics
        const totalStudents = row?.students?.length || 0;
        const failCount =
          row?.students?.filter((student) => student.grade === "F9").length ||
          0;
        const failPercentage = ((failCount / totalStudents) * 100).toFixed(1);
        return (
          <Box fontSize={"calc(0.7rem + 1vmin)"}>
            <p
              style={{ fontSize: ".8em" }}
              title={`${failCount} student(s) failed!`}
            >
              {failPercentage}
            </p>
          </Box>
        );
      },
    },
    {
      name: (
        <Box fontSize={"calc(0.7rem + 1vmin)"}>
          <p style={{ fontSize: ".8em" }}>Overview</p>
        </Box>
      ),
      selector: (row) => (
        <Box fontSize={"calc(0.7rem + 1vmin)"}>
          <p
            // style={{ fontSize: ".8em" }}
            title={""}
          >
            <FileOpen
              sx={{ fontSize: "1em", color: "#0aa30a", cursor: "pointer" }}
              titleAccess="View Data"
              onClick={() => {
                setOverviewStudents(row);
                // if (!row?.currentTeacher) {
                setOpenAttendanceOverviewModal(true);
                // }
              }}
            />
          </p>
        </Box>
      ),
      // sortable: true,
    },
  ];
  const reportOverviewColumn = [
    {
      name: (
        <Box fontSize={"calc(0.7rem + 1vmin)"}>
          <p style={{ fontSize: ".8em" }}>Date</p>
        </Box>
      ),
      selector: (row) => (
        <p
          title={
            row?.createdAt
              ? dateFormatter?.format(new Date(row?.createdAt))
              : "---"
          }
        >
          {row?.createdAt
            ? dateFormatter?.format(new Date(row?.createdAt))
            : "---"}
        </p>
      ),
      // sortable: true,
    },
    // {
    //   name: "Image",
    //   selector: (row) =>
    //     row?.student?.personalInfo?.profilePicture?.url ? (
    //       <Box>
    //         <Avatar
    //           // className="studentImg"
    //           src={row?.student?.personalInfo?.profilePicture?.url}
    //           sx={{
    //             width: "1.5em",
    //             height: "1.5em",
    //             borderRadius: ".4rem",
    //             objectFit: "cover",
    //           }}
    //           alt=""
    //         />
    //       </Box>
    //     ) : (
    //       <Box className="noImgLink" title="View Student Info">
    //         {row?.student?.personalInfo?.gender === "Male" && (
    //           <Avatar
    //             // className="studentImg"
    //             src={"/assets/maleAvatar.png"}
    //             sx={{
    //               width: "1.5em",
    //               height: "1.5em",
    //               borderRadius: ".4rem",
    //               objectFit: "cover",
    //             }}
    //             alt=""
    //           />
    //         )}
    //         {row?.student?.personalInfo?.gender === "Female" && (
    //           <Avatar
    //             // className="studentImg"
    //             src={"/assets/femaleAvatar.png"}
    //             sx={{
    //               width: "1.5em",
    //               height: "1.5em",
    //               borderRadius: ".4rem",
    //               objectFit: "cover",
    //             }}
    //             alt=""
    //           />
    //         )}
    //         {!row?.student?.personalInfo?.gender && (
    //           <Avatar
    //             // className="studentImg"
    //             src={"/assets/noAvatar.png"}
    //             sx={{
    //               width: "1.5em",
    //               height: "1.5em",
    //               borderRadius: ".4rem",
    //               objectFit: "cover",
    //             }}
    //             alt=""
    //           />
    //         )}
    //       </Box>
    //     ),
    // },
    {
      name: (
        <Box fontSize={"calc(0.7rem + 1vmin)"}>
          <p style={{ fontSize: ".8em" }}>Name</p>
        </Box>
      ),
      selector: (row) => <Box>{row?.student?.personalInfo?.fullName}</Box>,
      sortable: true,
    },
    {
      name: (
        <Box fontSize={"calc(0.7rem + 1vmin)"}>
          <p style={{ fontSize: ".8em" }}>Semester</p>
        </Box>
      ),
      selector: (row) => (
        <Box fontSize={"calc(0.7rem + 1vmin)"}>
          <p style={{ fontSize: ".8rem" }} title={row?.semester}>
            {row?.semester}
          </p>
        </Box>
      ),
      // sortable: true,
    },
    {
      name: (
        <Box fontSize={"calc(0.7rem + 1vmin)"}>
          <p style={{ fontSize: ".8em" }}>Subject</p>
        </Box>
      ),
      selector: (row) => (
        <Box fontSize={"calc(0.7rem + 1vmin)"}>
          <p style={{ fontSize: ".8rem" }} title={row?.subject?.subjectName}>
            {row?.subject?.subjectName}
          </p>
        </Box>
      ),
      // sortable: true,
    },
    {
      name: (
        <Box fontSize={"calc(0.7rem + 1vmin)"}>
          <p style={{ fontSize: ".8em" }}>Class Score</p>
        </Box>
      ),
      selector: (row) => (
        <Box display={"flex"} sx={{ alignItems: "center" }}>
          <Typography
            sx={{
              //   width: ".5rem",
              fontSize: ".75rem", // Adjust font size of the adornment
              //   marginLeft: "0.2rem", // Prevent overlap with input
              color: "#555",
            }}
          >
            {row.classScore}
            {/* <span style={{}}>/30</span> */}
          </Typography>
          <Typography
            sx={{ fontSize: "0.75rem", color: "#af0bd8", ml: ".5rem" }}
          >
            /30
          </Typography>
        </Box>
      ),
    },
    {
      name: (
        <Box fontSize={"calc(0.7rem + 1vmin)"}>
          <p style={{ fontSize: ".8em" }}>Exam Score</p>
        </Box>
      ),
      selector: (row) => (
        <Box display={"flex"} sx={{ alignItems: "center" }}>
          <Typography
            sx={{
              //   width: ".5rem",
              fontSize: ".75rem", // Adjust font size of the adornment
              //   marginLeft: "0.2rem", // Prevent overlap with input
              color: "#555",
            }}
          >
            {row.examScore}
            {/* <span style={{}}>/30</span> */}
          </Typography>
          <Typography
            sx={{ fontSize: "0.75rem", color: "#0b94d8", ml: ".5rem" }}
          >
            /70
          </Typography>
        </Box>
      ),
    },
    {
      name: (
        <Box fontSize={"calc(0.7rem + 1vmin)"}>
          <p style={{ fontSize: ".8em" }}>Total Score</p>
        </Box>
      ),
      selector: (row) => <Box fontSize={".9em"}>{row.totalScore || 0}</Box>,
      // sortable: true,
    },
    {
      name: (
        <Box fontSize={"calc(0.7rem + 1vmin)"}>
          <p style={{ fontSize: ".8em" }}>Grade</p>
        </Box>
      ),
      selector: (row) => {
        const getGrade = row?.grade || 0;
        return (
          <Box
            bgcolor={gradeBgColor(getGrade)}
            sx={{
              padding: ".2rem",
              borderRadius: ".4rem",
              color: "#fff",
              fontSize: ".9em",
            }}
          >
            {getGrade || 0}
          </Box>
        );
      },
    },
    {
      name: (
        <Box fontSize={"calc(0.7rem + 1vmin)"}>
          <p style={{ fontSize: ".8em" }}>Remark</p>
        </Box>
      ),
      selector: (row) => {
        const getGrade = calculateGrade(row?.totalScore || 0);
        return (
          <Box
            sx={{
              padding: ".2rem",
              borderRadius: ".4rem",
              // color: "#fff",
              fontSize: ".9em",
              fontWeight: "bold",
              color: gradeBgColor(getGrade),
              letterSpacing: 1,
            }}
          >
            {gradeRemark(row.totalScore || 0)}
          </Box>
        );
      },
    },
    // {
    //   name: "Remark",
    //   selector: (row) => {
    //     return (
    //       <>
    //         {/* {!columnData?.subjectMultiStudentsReports ? (
    //           <Button
    //             size="small"
    //             sx={{
    //               padding: ".2rem",
    //               borderRadius: ".4rem",
    //               color: "#0ab312",
    //               fontSize: ".9em",
    //               textTransform: "capitalize",
    //               ":hover": {
    //                 backgroundColor: "transparent",
    //               },
    //             }}
    //             onClick={() => {
    //              setStudentId(row?.uniqueId);
    //               columnData?.setOpenRemarkModal(true);
    //             }}
    //           >
    //             {!row?.remark ? (
    //               <>
    //                 Add <Add fontSize=".8em" />
    //               </>
    //             ) : (
    //               <Edit style={{ color: "#696969" }} />
    //             )}
    //           </Button>
    //         ) : (
    //           "---"
    //         )} */}
    //       </>
    //     );
    //   },
    // },
    // {
    //   name: "Save",
    //   selector: (row) => {
    //     const disableBtn = Boolean(
    //       columnData?.subjectMultiStudentsReports &&
    //         columnData?.subjectMultiStudentsReports?.subject ===
    //           columnData?.draftReportInfo?.subject
    //     );
    //     return (
    //       <Button
    //         disabled={disableBtn}
    //         // sx={{
    //         //   // color: "#fff !important",
    //         //   "&.Mui-disabled": {
    //         //     cursor: "not-allowed", // Show not-allowed cursor
    //         //     pointerEvents: "auto",
    //         //   },
    //         // }}
    //         sx={{
    //           textTransform: "capitalize",
    //           ":hover": {
    //             backgroundColor: "transparent",
    //           },
    //           color:
    //             columnData?.subjectMultiStudentsReports &&
    //             columnData?.subjectMultiStudentsReports?.subject ===
    //               columnData?.draftReportInfo?.subject
    //               ? ""
    //               : "#03950a !important",
    //           "&.Mui-disabled": {
    //             cursor: "not-allowed", // Show not-allowed cursor
    //             pointerEvents: "auto",
    //           },
    //         }}
    //         // className="editLink"
    //         onClick={async () => {
    //           // Only set current student if data saving is not in progress
    //           if (!columnData?.saveDataInProgress) {
    //             columnData?.setCurrentStudent(row._id);
    //           }
    //         }}
    //       >
    //         {columnData?.foundStudent &&
    //           columnData?.foundStudent._id === row._id && (
    //             <>
    //               {columnData?.loadingComplete === false && (
    //                 <Box
    //                   className="promotionSpinner"
    //                   sx={{
    //                     // marginTop: ".8rem",
    //                     fontSize: "calc( 0.7rem 1vmin)",
    //                   }}
    //                 >
    //                   <span style={{ fontSize: "1em" }}>Saving</span>
    //                   <span className="dot-ellipsis">
    //                     <span className="dot">.</span>
    //                     <span className="dot">.</span>
    //                     <span className="dot">.</span>
    //                   </span>
    //                 </Box>
    //               )}
    //               {columnData?.loadingComplete &&
    //                 columnData?.createStatus === "success" && (
    //                   <Box
    //                     sx={{ display: "flex", alignItems: "center" }}
    //                     fontSize={".8em"}
    //                   >
    //                     <span>Saved</span> <TaskAlt />
    //                   </Box>
    //                 )}
    //             </>
    //           )}
    //         <>
    //           {columnData?.loadingComplete === null && (
    //             <Save
    //               titleAccess="Save"
    //               onClick={() => {
    //                 const data = {
    //                   studentId: row?.uniqueId,
    //                   classScore: row?.classScore,
    //                   examScore: row?.examScore,
    //                   totalScore: row?.totalScore,
    //                   remark: row?.remark,
    //                   semester: columnData?.currentAcademicTerm?.name,
    //                   classLevel: columnData?.classLevel,
    //                   subject: columnData?.selectedSubject,
    //                   lecturer: columnData?.authUser?.id,
    //                   year: new Date().getFullYear(),
    //                   isDraftSave: true,
    //                 };
    //                 if (!disableBtn) {
    //                   columnData?.dispatch(createStudentReport(data));
    //                 }
    //               }}
    //             />
    //           )}
    //           {row?._id !== columnData?.foundStudent?._id &&
    //             columnData?.loadingComplete !== null && (
    //               <Save
    //                 titleAccess="Save"
    //                 onClick={() => {
    //                   const data = {
    //                     studentId: row?.uniqueId,
    //                     classScore: row?.classScore,
    //                     examScore: row?.examScore,
    //                     totalScore: row?.totalScore,
    //                     semester: columnData?.currentAcademicTerm?.name,
    //                     classLevel: columnData?.classLevel,
    //                     subject: columnData?.selectedSubject,
    //                     lecturer: columnData?.authUser?.id,
    //                     year: new Date().getFullYear(),
    //                     isDraftSave: true,
    //                   };
    //                   if (!disableBtn) {
    //                     columnData?.dispatch(createStudentReport(data));
    //                   }
    //                 }}
    //               />
    //             )}
    //         </>
    //       </Button>
    //     );
    //   },
    // },
  ];

  // Handle attendance status check
  useEffect(() => {
    if (searchingStatus === "pending") {
      setLoadingComplete(false);
    }
    if (searchingStatus === "rejected") {
      setTimeout(() => {
        searchClassReportError?.errorMessage?.message?.map((err) =>
          toast.error(err, {
            position: "top-right",
            theme: "light",
            toastId: err,
          })
        );
      }, 1000);
      setTimeout(() => {
        setLoadingComplete(null);
        dispatch(resetClassReportSearchState());
      }, 3000);
      return;
    }
    if (searchingStatus === "success") {
      Cookies?.set("currentReportSearch", searchForAttendance?.by);
      setTimeout(() => {
        setLoadingComplete(true);
        setDataFetched(true);
      }, 3000);
      setTimeout(() => {
        setLoadingComplete(null);
        dispatch(resetClassReportSearchState());
      }, 6000);
    }
  }, [dispatch, searchingStatus, searchClassReportError, searchForAttendance]);

  return (
    <>
      {/* Current dashboard title */}
      <Box
        component={"div"}
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
          {lecturerCurrentAction?.replace(/_/g, "-")} /{" "}
          <span>{lecturerCurrentLink?.replace(/_/g, " ")}</span>
        </h1>
        {/* Main search bar */}
        <Box
          sx={{ display: { xs: "none", sm: "flex" }, flexDirection: "column" }}
          position={"absolute"}
          top={".5rem"}
          right={"2rem"}
        >
          <SearchFilter
            value={searchStudent}
            onChange={setSearchStudent}
            placeholder={"Search student by name or ID"}
            // ToDo ===>>> Dispatch function to fetch student report
            handleDataFetch={handleStudentReportFetch}
          />
          {searchStudent && filteredStudents && (
            <Box
              sx={{
                marginTop: 1,
                bgcolor: "#7f7e7e",
                padding: "0 .5rem",
                borderRadius: ".4rem",
              }}
              id="reportSearchList"
            >
              {filteredStudents?.map((std) => (
                <Box
                  key={std?.uniqueId}
                  onClick={() => {
                    setSearchStudent(std?.personalInfo?.fullName);
                    setStudent(std?.uniqueId);
                  }}
                  sx={{
                    display: "flex",
                    gap: 1,
                    alignItems: "center",
                    margin: ".5rem 0",
                    cursor: "pointer",
                  }}
                >
                  <Avatar
                    // className="studentImg"
                    src={std?.personalInfo?.profilePicture?.url}
                    sx={{
                      width: "1.5em",
                      height: "1.5em",
                      borderRadius: ".4rem",
                      objectFit: "cover",
                    }}
                    alt=""
                  />
                  <Typography
                    variant="h6"
                    sx={{ fontSize: ".9rem", color: "#fff" }}
                  >
                    {std?.personalInfo?.fullName}
                  </Typography>
                </Box>
              ))}
            </Box>
          )}
        </Box>
      </Box>
      {/* Report content */}
      <Box
        className="lecturerAttendanceWrap"
        sx={{
          position: "relative",
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs} m={".5rem"}>
          <Box
            className="middleAttendance"
            sx={{
              width: { xs: "100%", sm: "95%", md: "90%", lg: "90%", xl: "75%" },
            }}
            // p={{ xs: " 1rem .5rem", sm: "0 1rem" }}
          >
            <Box
              component={"form"}
              onSubmit={handleSearchAttendance}
              className="attendanceForm"
              p={{ xs: " 1rem .5rem", sm: "1rem" }}
            >
              <Box className="attendanceSearch" p={"1rem 0"}>
                <h3 className="attTitle">Academic Report Search</h3>
                <Box width={"15rem"}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12}>
                      <h4
                        style={{
                          fontSize: ".8em",
                          fontWeight: 400,
                          color: "#696969",
                          marginBottom: ".5rem",
                        }}
                      >
                        Search By:
                      </h4>
                      <Box fontSize={"calc(0.7rem + 1vmin)"}>
                        <CustomTextField
                          fullWidth
                          select
                          slotProps={{
                            select: { MenuProps: CustomMenuProps },
                          }}
                          // label="Search By"
                          size="small"
                          value={searchForAttendance?.by || ""}
                          onChange={(e) =>
                            setSearchForAttendance({
                              ...searchForAttendance,
                              by: e.target.value,
                            })
                          }
                          sx={{
                            width: "100%",
                            "& .MuiOutlinedInput-input": {
                              paddingTop: ".3rem",
                              paddingBottom: ".3rem",
                              fontSize: ".8em",
                            },
                          }}
                        >
                          <MenuItem value={"Year"} sx={{ fontSize: ".8em" }}>
                            Year
                          </MenuItem>
                          <MenuItem value={"Month"} sx={{ fontSize: ".8em" }}>
                            Month
                          </MenuItem>
                          <MenuItem value={"Week"} sx={{ fontSize: ".8em" }}>
                            Week
                          </MenuItem>
                          <MenuItem value={"Date"} sx={{ fontSize: ".8em" }}>
                            Date
                          </MenuItem>
                          <MenuItem
                            value={"Date Range"}
                            sx={{ fontSize: ".8em" }}
                          >
                            Date Range
                          </MenuItem>
                          <MenuItem
                            value={"Semester"}
                            sx={{ fontSize: ".8em" }}
                          >
                            Semester
                          </MenuItem>
                        </CustomTextField>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
              <Grid container spacing={2} className="flex4" p={"1rem 0"}>
                {searchForAttendance?.by === "Year" && (
                  <>
                    <Grid
                      item
                      xs={12}
                      sm={3}
                      className="attendanceDate"
                      // sx={{ pt: 1 }}
                    >
                      <h4>Year:</h4>
                      <Box fontSize={"calc(0.7rem + 1vmin)"}>
                        <CustomTextField
                          fullWidth
                          size="small"
                          name="year"
                          value={attendanceData?.year}
                          onChange={(e) =>
                            setAttendanceData({
                              ...attendanceData,
                              year: e.target.value,
                            })
                          }
                          sx={{
                            width: "100%",
                            "& .MuiOutlinedInput-input": {
                              paddingTop: ".5rem",
                              paddingBottom: ".5rem",
                              fontSize: ".8em",
                            },
                          }}
                        />
                      </Box>
                    </Grid>
                  </>
                )}
                {searchForAttendance?.by === "Month" && (
                  <>
                    <Grid
                      item
                      xs={12}
                      sm={3}
                      className="attendanceDate"
                      // sx={{ pt: 1 }}
                    >
                      <h4>Month:</h4>
                      <Box fontSize={"calc(0.7rem + 1vmin)"}>
                        <CustomTextField
                          fullWidth
                          select
                          slotProps={{
                            select: { MenuProps: CustomMenuProps },
                          }}
                          size="small"
                          name="selectedMonth"
                          value={selectedMonth?.label || ""}
                          onChange={handleMonthChange}
                          sx={{
                            width: "100%",
                            "& .MuiOutlinedInput-input": {
                              paddingTop: ".5rem",
                              paddingBottom: ".5rem",
                              fontSize: ".8em",
                            },
                          }}
                        >
                          {monthData.map((month) => (
                            <MenuItem key={month.label} value={month.label}>
                              {month.label}
                            </MenuItem>
                          ))}
                        </CustomTextField>
                      </Box>
                    </Grid>
                  </>
                )}
                {searchForAttendance?.by === "Week" && (
                  <>
                    <Grid
                      item
                      xs={12}
                      sm={3}
                      className="attendanceDate"
                      // sx={{ pt: 1 }}
                    >
                      <h4>Week:</h4>
                      <Box fontSize={"calc(0.7rem + 1vmin)"}>
                        <CustomTextField
                          fullWidth
                          select
                          slotProps={{
                            select: { MenuProps: CustomMenuProps },
                          }}
                          size="small"
                          name="selectedWeek"
                          value={selectedWeek?.label || ""}
                          onChange={handleWeekChange}
                          sx={{
                            width: "100%",
                            "& .MuiOutlinedInput-input": {
                              paddingTop: ".5rem",
                              paddingBottom: ".5rem",
                              fontSize: ".8em",
                            },
                          }}
                        >
                          {weekData.map((week) => (
                            <MenuItem key={week.label} value={week.label}>
                              {week.label}
                            </MenuItem>
                          ))}
                        </CustomTextField>
                      </Box>
                    </Grid>
                  </>
                )}
                {searchForAttendance?.by === "Semester" && (
                  <Grid
                    item
                    xs={12}
                    sm={3}
                    className="attendanceDate"
                    // sx={{ pt: 1 }}
                  >
                    <h4>Semester:</h4>
                    <Box fontSize={"calc(0.7rem + 1vmin)"}>
                      <CustomTextField
                        fullWidth
                        select
                        slotProps={{
                          select: { MenuProps: CustomMenuProps },
                        }}
                        size="small"
                        name="semester"
                        value={attendanceData?.semester || ""}
                        onChange={(e) =>
                          setAttendanceData({
                            ...attendanceData,
                            semester: e.target.value,
                          })
                        }
                        sx={{
                          width: "100%",
                          "& .MuiOutlinedInput-input": {
                            paddingTop: ".35rem",
                            paddingBottom: ".35rem",
                            fontSize: ".8em",
                          },
                        }}
                      >
                        {allSemesters?.map((semester) => (
                          <MenuItem key={semester?._id} value={semester?.name}>
                            {semester?.name}
                          </MenuItem>
                        ))}
                      </CustomTextField>
                    </Box>
                  </Grid>
                )}
                {searchForAttendance?.by === "Date Range" && (
                  <>
                    <Grid
                      item
                      xs={12}
                      sm={3}
                      className="attendanceDate"
                      // sx={{ pt: 1 }}
                    >
                      <h4>From:</h4>
                      <Box fontSize={"calc(0.7rem + 1vmin)"}>
                        <CustomMobileDatePicker
                          name="dateRange.from"
                          value={
                            attendanceData?.dateRange?.from ||
                            dayjs("MM/DD/YYYY")
                          }
                          onChange={handleFromDateChange}
                          maxDate={dayjs()}
                          slotProps={{
                            input: (params) => (
                              <CustomTextField {...params} fullWidth />
                            ),
                          }}
                          required
                          error={false} // Make sure this is false
                          helperText="" // Optionally clear helper text
                          sx={{
                            width: "100%",
                            "& .MuiOutlinedInput-input": {
                              paddingTop: ".6rem",
                              paddingBottom: ".6rem",
                            },
                          }}
                        />
                      </Box>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={3}
                      className="attendanceDate"
                      // sx={{ pt: 1 }}
                    >
                      <h4>To:</h4>
                      <Box fontSize={"calc(0.7rem + 1vmin)"}>
                        <CustomMobileDatePicker
                          name="dateRange.to"
                          value={
                            attendanceData?.dateRange?.to || dayjs("MM/DD/YYYY")
                          }
                          onChange={handleToDateChange}
                          minDate={
                            attendanceData.dateRange.from
                              ? dayjs(attendanceData.dateRange.from)
                              : null
                          } // Optional: prevent "to" from being earlier than "from"
                          maxDate={dayjs()}
                          slotProps={{
                            input: (params) => (
                              <CustomTextField {...params} fullWidth />
                            ),
                          }}
                          required
                          error={false} // Make sure this is false
                          helperText="" // Optionally clear helper text
                          sx={{
                            width: "100%",
                            "& .MuiOutlinedInput-input": {
                              paddingTop: ".6rem",
                              paddingBottom: ".6rem",
                            },
                          }}
                        />
                      </Box>
                    </Grid>
                  </>
                )}
                {searchForAttendance?.by === "Date" && (
                  <>
                    <Grid
                      item
                      xs={6}
                      sm={3}
                      className="attendanceDate"
                      // sx={{ pt: 1 }}
                    >
                      <h4>Date:</h4>
                      <Box fontSize={"calc(0.7rem + 1vmin)"}>
                        <CustomMobileDatePicker
                          name="date"
                          value={attendanceData?.date || dayjs("MM/DD/YYYY")}
                          onChange={handleDateChange}
                          maxDate={dayjs()}
                          slotProps={{
                            input: (params) => (
                              <CustomTextField {...params} fullWidth />
                            ),
                          }}
                          required
                          error={false} // Make sure this is false
                          helperText="" // Optionally clear helper text
                          sx={{
                            width: "100%",
                            "& .MuiOutlinedInput-input": {
                              paddingTop: ".6rem",
                              paddingBottom: ".6rem",
                            },
                          }}
                        />
                      </Box>
                    </Grid>
                  </>
                )}
              </Grid>
              <Button
                // type="submit"
                className="searchAttBtn"
                sx={{
                  width: "100%",
                  minHeight: "3rem",
                  // margin: { xs: " 1rem .5rem", sm: "1rem" },
                }}
                onClick={handleSearchAttendance}
              >
                {loadingComplete === false && (
                  <LoadingProgress color={"#fff"} size={"1.5rem"} />
                )}
                {loadingComplete && searchingStatus === "success" && (
                  <>
                    <span>Successful</span> <TaskAlt />
                  </>
                )}
                {loadingComplete === null && "Search"}
              </Button>
            </Box>
          </Box>
        </LocalizationProvider>
        {/* Display take attendance or view attendance component */}
        <Box m={".5rem 0"}>
          <Box
            sx={{
              width: { xs: "100%", sm: "95%", md: "90%", lg: "90%", xl: "75%" },
            }}
            margin={"auto"}
          >
            {/* {dataFetched && searchedClassReportInfo && (
              <Box className="searchDetails" justifyItems={"flex-start"}>
                {filteredReports?.length === 0 && searchStudent !== "" && (
                  <p style={{ fontSize: ".8em" }} className="searchInfo">
                    We couldn&apos;t find any matches for &quot;
                    {searchStudent}
                    &quot;
                  </p>
                )}
                {filteredReports?.length === 0 && searchStudent !== "" && (
                  <p
                    style={{
                      paddingLeft: "1.5rem",
                      display: "flex",
                      alignItems: "center",
                      color: "red",
                      fontSize: ".8em",
                    }}
                  >
                    ||
                  </p>
                )}
                {searchStudent && (
                  <p style={{ fontSize: ".8em" }} className="searchInfo">
                    Total Records Found = {filteredReports?.length}
                  </p>
                )}
                {!searchStudent && (
                  <p style={{ fontSize: ".8em" }} className="searchInfo">
                    Total Records ={" "}
                    {searchedClassReportInfo?.length > 0
                      ? searchedClassReportInfo?.length
                      : 0}
                  </p>
                )}
              </Box>
            )} */}
            {dataFetched && (
              <>
                {searchedClassReportInfo?.length > 0 &&
                  !searchedStudentReportInfo && (
                    <Box
                      fontSize={"calc(0.7rem + 1vmin)"}
                      // sx={{ border: "1px solid #ccc" }}
                    >
                      <Box fontSize={"calc(0.7rem + 1vmin)"} mb={1}>
                        <p style={{ fontSize: ".8em", color: "#696969" }}>
                          <span style={{ color: "#292929" }}>
                            Searched By:{" "}
                          </span>
                          {currentReportSearch}
                        </p>
                      </Box>
                      <DataTable
                        className="my-data-table"
                        columns={columns}
                        data={searchedClassReportInfo}
                        customStyles={customAttendanceTableStyle}
                        pagination
                        highlightOnHover
                      />
                      <SearchedReportOverviewModal
                        open={openAttendanceOverviewModal}
                        onClose={() => setOpenAttendanceOverviewModal(false)}
                        data={overviewStudents}
                      />
                    </Box>
                  )}
                {!searchedClassReportInfo &&
                  searchedStudentReportInfo?.length > 0 && (
                    <Box
                      fontSize={"calc(0.7rem + 1vmin)"}
                      // sx={{ border: "1px solid #ccc" }}
                    >
                      <Box fontSize={"calc(0.7rem + 1vmin)"} mb={1}>
                        <p style={{ fontSize: ".8em", color: "#696969" }}>
                          <span style={{ color: "#292929" }}>
                            Searched By:{" "}
                          </span>
                          Student&apos;s Data
                        </p>
                      </Box>
                      <DataTable
                        className="my-data-table"
                        columns={reportOverviewColumn}
                        data={searchedStudentReportInfo}
                        customStyles={customAttendanceTableStyle}
                        pagination
                        highlightOnHover
                      />
                    </Box>
                  )}
              </>
            )}
            {dataFetched &&
              !searchedClassReportInfo?.length > 0 &&
              !searchedStudentReportInfo?.length > 0 && (
                <Box className="noAttendanceRecord">
                  <p style={{ fontSize: ".8em" }}>No Report Record Found!</p>
                </Box>
              )}
          </Box>
        </Box>
        <SmallFooter />
      </Box>
    </>
  );
}
