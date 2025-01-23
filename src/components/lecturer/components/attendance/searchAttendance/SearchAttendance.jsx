import React, { useEffect, useRef, useState } from "react";
import "../lecturerAttendance.scss";
import {
  AccessTimeFilled,
  CalendarMonth,
  FileOpen,
  Search,
  TaskAlt,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  InputAdornment,
  MenuItem,
  Avatar,
} from "@mui/material";
import { Calendar } from "react-date-range";
import { format } from "date-fns";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import SearchForm from "../../../../searchForm/SearchForm";
import {
  CustomMobileDatePicker,
  CustomSearchField,
  CustomTextField,
} from "../../../../../muiStyling/muiStyling";
import { useParams } from "react-router-dom";
import SmallFooter from "../../../../footer/SmallFooter";
import { ViewAttendance } from "../viewAttendance/ViewAttendance";
import { FetchAllLecturers } from "../../../../../data/lecturers/FetchLecturers";
import { useDispatch, useSelector } from "react-redux";
import { getAuthUser } from "../../../../../features/auth/authSlice";
import TakeAttendance from "../takeAttendance/TakeAttendance";
import NotAuthorized from "../../../../notAuthorized/NotAuthorized";
import { toast } from "react-toastify";
import {
  fetchCurrentClassAttendance,
  getCurrentClassAttendance,
  getSearchedClassAttendance,
  resetSearchState,
  searchClassAttendance,
} from "../../../../../features/academics/attedanceSlice";
import SearchFilter from "../../../../searchForm/SearchFilter";
import { FetchAllClassLevels } from "../../../../../data/class/FetchClassLevel";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Cookies from "js-cookie";
import dayjs from "dayjs";
import DataTable from "react-data-table-component";
import { customAttendanceTableStyle } from "../../../../../usersInfoDataFormat/usersInfoTableStyle";
import { FetchAllAcademicTerms } from "../../../../../data/term.year/FetchAcademicTerms";
import SearchedAttendanceOverviewModal from "../../../../modals/SearchedAttendanceOverviewModal";
import LoadingProgress from "../../../../pageLoading/LoadingProgress";

// Mock data for students and attendance
const students = [
  { id: 1, name: "John Doe", rollNo: "A101", status: "Present" },
  { id: 2, name: "Jane Smith", rollNo: "A102", status: "Absent" },
  { id: 3, name: "Sam Wilson", rollNo: "A103", status: "Present" },
  { id: 4, name: "Kate Johnson", rollNo: "A104", status: "Absent" },
  { id: 5, name: "Chris Evans", rollNo: "A105", status: "Present" },
];

// Calculate attendance statistics
const totalStudents = students.length;
const presentCount = students.filter(
  (student) => student.status === "Present"
).length;
const absentCount = totalStudents - presentCount;

// Data for Pie Chart
const attendanceData = [
  { name: "Present", value: presentCount },
  { name: "Absent", value: absentCount },
];

const COLORS = ["#0088FE", "#FF8042"];

export function SearchAttendance() {
  const currentAttendanceSearch = Cookies?.get("currentAttendanceSearch");
  console.log(currentAttendanceSearch);

  const date = new Date().toDateString();
  const { lecturerCurrentLink, lecturerCurrentAction } = useParams();
  const { searchingStatus, error, successMessage } = useSelector(
    (state) => state.attendance
  );
  // Handle Process State
  const [loadingComplete, setLoadingComplete] = useState(null);
  const [searchAttendance, setSearchAttendance] = useState(false);
  const [dataFetched, setDataFetched] = useState(false);
  const [overviewStudents, setOverviewStudents] = useState({});
  const [openAttendanceOverviewModal, setOpenAttendanceOverviewModal] =
    useState(false);
  const [searchStudent, setSearchStudent] = useState("");
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
  console.log(searchForAttendance);
  console.log(attendanceData);

  const authLecturer = useSelector(getAuthUser);
  const searchedClassAttendance = useSelector(getSearchedClassAttendance);
  console.log(searchedClassAttendance);

  const classLevels = FetchAllClassLevels();
  const allSemesters = FetchAllAcademicTerms();
  const dispatch = useDispatch();
  const currentClassAttendance = useSelector(getCurrentClassAttendance);

  const allLecturers = FetchAllLecturers();
  const allClassLevelSections = [];

  const lecturerFound = allLecturers?.find(
    (lect) => lect?.uniqueId === authLecturer?.uniqueId
  );
  const classLevelSection =
    lecturerFound?.lecturerSchoolData?.classLevelHandling;

  const filteredStudents =
    searchedClassAttendance &&
    searchedClassAttendance?.filter(
      (studentData) =>
        studentData?.dayOfTheWeek
          ?.toLowerCase()
          ?.includes(searchStudent.toLowerCase()) ||
        studentData?.year?.toLowerCase()?.includes(searchStudent.toLowerCase())
    );

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
  console.log(formattedFromDate);
  console.log(formattedToDate);

  const handleSearchAttendance = () => {
    setSearchAttendance(true);
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
        classLevel:
          lecturerFound?.lecturerSchoolData?.classLevelHandling?.classLevelId ||
          "",
        classSection: classLevelSection?._id,
      };
    }
    if (searchForAttendance?.by === "Date") {
      data = {
        date: formattedDate ? formattedDate : "",
        lecturer: authLecturer?.id,
        classLevel:
          lecturerFound?.lecturerSchoolData?.classLevelHandling?.classLevelId ||
          "",
        classSection: classLevelSection?._id,
      };
    }
    if (searchForAttendance?.by === "Date Range") {
      data = {
        dateRange: { from: formattedFromDate, to: formattedToDate },
        lecturer: authLecturer?.id,
        classLevel:
          lecturerFound?.lecturerSchoolData?.classLevelHandling?.classLevelId ||
          "",
        classSection: classLevelSection?._id,
      };
    }
    if (searchForAttendance?.by === "Semester") {
      data = {
        semester: attendanceData?.semester,
        lecturer: authLecturer?.id,
        classLevel:
          lecturerFound?.lecturerSchoolData?.classLevelHandling?.classLevelId ||
          "",
        classSection: classLevelSection?._id,
      };
    }
    console.log(data);
    dispatch(searchClassAttendance(data));
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
    {
      name: (
        <Box fontSize={"calc(0.7rem + 1vmin)"}>
          <p style={{ fontSize: ".8em" }}>Day</p>
        </Box>
      ),
      selector: (row) => <>{row?.dayOfTheWeek}</>,
      // sortable: true,
    },
    {
      name: (
        <Box fontSize={"calc(0.7rem + 1vmin)"}>
          <p style={{ fontSize: ".8em" }}>Date</p>
        </Box>
      ),
      selector: (row) => <>{row?.date}</>,
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
          <p style={{ fontSize: ".8em" }}>Present %</p>
        </Box>
      ),
      selector: (row) => {
        // Calculate attendance statistics
        const totalStudents = row?.students?.length || 0;
        const presentCount =
          row?.students?.filter((student) => student.status === "Present")
            .length || 0;

        const presentPercentage = (
          (presentCount / totalStudents) *
          100
        ).toFixed(1);
        return (
          <Box fontSize={"calc(0.7rem + 1vmin)"}>
            <p
              style={{ fontSize: ".8em" }}
              title={row?.student?.personalInfo?.fullName}
            >
              {presentPercentage}
            </p>
          </Box>
        );
      },
      // sortable: true,
    },
    {
      name: (
        <Box fontSize={"calc(0.7rem + 1vmin)"}>
          <p style={{ fontSize: ".8em" }}>Absent %</p>
        </Box>
      ),
      cell: (row) => {
        // Calculate attendance statistics
        const totalStudents = row?.students?.length || 0;
        const absentCount =
          row?.students?.filter((student) => student.status === "Absent")
            .length || 0;
        const absentPercentage = ((absentCount / totalStudents) * 100).toFixed(
          1
        );
        return (
          <Box fontSize={"calc(0.7rem + 1vmin)"}>
            <p
              style={{ fontSize: ".8em" }}
              title={row?.student?.personalInfo?.fullName}
            >
              {absentPercentage}
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

  useEffect(() => {
    dispatch(fetchCurrentClassAttendance());
  }, [dispatch, formattedDate]);

  // Handle attendance status check
  useEffect(() => {
    if (searchingStatus === "pending") {
      setLoadingComplete(false);
    }
    if (searchingStatus === "rejected") {
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
        setLoadingComplete(null);
        dispatch(resetSearchState());
      }, 3000);
      return;
    }
    if (searchingStatus === "success") {
      Cookies?.set("currentAttendanceSearch", searchForAttendance?.by);
      setTimeout(() => {
        setLoadingComplete(true);
        setDataFetched(true);
      }, 3000);
      setTimeout(() => {
        setLoadingComplete(null);
        dispatch(resetSearchState());
      }, 6000);
      // setTimeout(() => {
      // }, 7000);
    }
  }, [dispatch, searchingStatus, error, searchForAttendance]);

  if (!classLevelSection) {
    return (
      <Box fontSize={"calc(0.7rem + 1vmin)"} mt={3} letterSpacing={1}>
        <h4
          style={{
            textAlign: "center",
            color: "#696969",
            fontSize: "1em",
          }}
        >
          No Students Data!
        </h4>
      </Box>
    );
  }

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
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          <SearchFilter
            value={searchStudent}
            onChange={setSearchStudent}
            placeholder={"Search student by name or ID"}
          />
        </Box>
      </Box>
      {/* Attendance content */}
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
                <h3 className="attTitle">Students Attendance Record Search</h3>
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
            {dataFetched && searchedClassAttendance && (
              <Box className="searchDetails" justifyItems={"flex-start"}>
                {filteredStudents?.length === 0 && searchStudent !== "" && (
                  <p style={{ fontSize: ".8em" }} className="searchInfo">
                    We couldn&apos;t find any matches for &quot;
                    {searchStudent}
                    &quot;
                  </p>
                )}
                {filteredStudents?.length === 0 && searchStudent !== "" && (
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
                    Total Records Found = {filteredStudents?.length}
                  </p>
                )}
                {!searchStudent && (
                  <p style={{ fontSize: ".8em" }} className="searchInfo">
                    Total Records ={" "}
                    {searchedClassAttendance?.length > 0
                      ? searchedClassAttendance?.length
                      : 0}
                  </p>
                )}
              </Box>
            )}
            {dataFetched && searchedClassAttendance?.length > 0 && (
              <Box
                fontSize={"calc(0.7rem + 1vmin)"}
                // sx={{ border: "1px solid #ccc" }}
              >
                <Box fontSize={"calc(0.7rem + 1vmin)"} mb={1}>
                  <p style={{ fontSize: ".8em", color: "#696969" }}>
                    <span style={{ color: "#292929" }}>Searched By: </span>
                    {currentAttendanceSearch}
                  </p>
                </Box>
                <DataTable
                  className="my-data-table"
                  columns={columns}
                  data={filteredStudents}
                  customStyles={customAttendanceTableStyle}
                  pagination
                  // selectableRows
                  // selectableRowsHighlight
                  highlightOnHover
                  // onSelectedRowsChange={handleMultiSelect}
                  // clearSelectedRows={toggleClearRows}
                />
                <SearchedAttendanceOverviewModal
                  open={openAttendanceOverviewModal}
                  onClose={() => setOpenAttendanceOverviewModal(false)}
                  data={overviewStudents}
                />
              </Box>
            )}
            {dataFetched && !searchedClassAttendance?.length > 0 && (
              <Box className="noAttendanceRecord">
                <p style={{ fontSize: ".8em" }}>No Attendance Record Found!</p>
              </Box>
            )}
          </Box>
        </Box>
        <SmallFooter />
      </Box>
    </>
  );
}
