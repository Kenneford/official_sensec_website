import React, { useEffect, useRef, useState } from "react";
import "./adminAttendance.scss";
import { AccessTimeFilled, CalendarMonth, Search } from "@mui/icons-material";
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
} from "@mui/material";
import { Calendar } from "react-date-range";
import { format } from "date-fns";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { ViewAttendance } from "../../../lazyLoading/admin/AdminLazyLoadingComponents";
import TakeAttendance from "./takeAttendance/TakeAttendance";
import SearchForm from "../../../searchForm/SearchForm";
import { CustomSearchField } from "../../../../muiStyling/muiStyling";
import { useParams } from "react-router-dom";

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

export function AdminAttendance() {
  const date = new Date().toDateString();
  const { adminCurrentLink, adminCurrentAction } = useParams();
  const [takeAttendance, setTakeAttendance] = useState(false);
  const [viewAttendance, setViewAttendance] = useState(true);
  const [searchAttendance, setSearchAttendance] = useState(false);
  const [calendar, setCalendar] = useState("");
  const [openCalendar, setOpenCalendar] = useState(false);
  const [searchedAttendance, setSearchedAttendance] = useState("");
  const authTeacherInfo = {};
  const currentClassAttendance = false;
  const allClassLevelSections = [];
  const handleSearchAttendance = () => {};

  const selectedClassLevelSection = allClassLevelSections?.find(
    (classSection) =>
      classSection._id ===
      authTeacherInfo?.teacherSchoolData?.classLevelHandling?._id
  );

  const handleSelect = (date) => {
    console.log(date.toLocaleDateString());
    // console.log(format(date, "dd/MM/yyyy"));
    setCalendar(format(date, "dd/MM/yyyy"));
    // dispatch(studentSearch()); // native Date object
  };

  const handleOnChange = (onChangeValue) => {
    setSearchedAttendance(onChangeValue);
  };

  //Open attendance input function
  const handleOpenAttendanceSearchInput = (e) => {
    e.preventDefault();
    setSearchAttendance(!searchAttendance);
  };

  const outSideClickRef = useRef(null);
  const hideOnClickOutside = (e) => {
    // console.log(outSideClickRef.current);
    if (
      outSideClickRef.current &&
      !outSideClickRef.current.contains(e.target)
    ) {
      setOpenCalendar(false);
    }
  };

  const hideOnEscape = (e) => {
    if (e.key === "Escape") {
      setOpenCalendar(false);
    }
  };
  useEffect(() => {
    // setCalendar(format(new Date(), "dd/MM/yyyy"));
    document.addEventListener("keydown", hideOnEscape, true);
    document.addEventListener("click", hideOnClickOutside, true);
  }, []);

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
        minHeight={"4rem"}
      >
        <h1 className="dashAction">
          {adminCurrentAction?.replace(/_/g, "-")} /{" "}
          <span>{adminCurrentLink?.replace(/_/g, " ")}</span>
        </h1>
        {/* Main search bar */}
        {/* <Box sx={{ display: { xs: "none", sm: "block" } }}>
          <SearchForm
            value={searchedAttendance}
            onChange={handleOnChange}
            placeholder={"Search student attendance"}
          />
        </Box> */}
      </Box>
      {/* Attendance content */}
      <Box
        className="adminAttendanceWrap"
        sx={{
          position: "relative",
        }}
      >
        {/* Toggle between viewing and taking attendance */}
        <Box
          className="attendanceTogglingWrap"
          p={{ xs: " 1rem .5rem", sm: "1rem" }}
          sx={{
            position: "relative",
          }}
        >
          <Box
            className="attendanceTogglingBtn"
            sx={{
              width: { xs: "100%", sm: "70%", md: "55%" },
            }}
          >
            {takeAttendance ? (
              <Box className="attendanceTogglingText">
                <AccessTimeFilled className="attIcons" />
                <Typography className="text">Take Attendance</Typography>
              </Box>
            ) : (
              <Box className="attendanceTogglingText">
                <CalendarMonth className="attIcons" />
                <Typography className="actionBtnView">
                  View Attendance
                </Typography>
              </Box>
            )}
            {!takeAttendance ? (
              <Box
                className="attendanceTogglingAction"
                onClick={() =>
                  setTakeAttendance(true, setViewAttendance(false))
                }
              >
                <AccessTimeFilled className="attIcons" />
                <Typography className="text">Take Attendance</Typography>
              </Box>
            ) : (
              <Box
                className="attendanceTogglingAction"
                onClick={() =>
                  setViewAttendance(true, setTakeAttendance(false))
                }
              >
                <CalendarMonth className="attIcons" />
                <Typography className="actionBtnView">
                  View Attendance
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
        {/* Class info */}
        <Box m={".5rem"}>
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
                <h3 className="attTitle">
                  Daily Students Attendance Recordings
                </h3>
              </Box>
              <Grid container spacing={2} className="flex4" p={"1rem 0"}>
                <Grid item xs={6} sm={3} className="classlevelInfo">
                  <h4>Class Level:</h4>
                  <p>100</p>
                  <p>
                    {selectedClassLevelSection?.classLevelName ===
                      "Level 100" && "Level 100"}
                  </p>
                  <p>
                    {selectedClassLevelSection?.classLevelName ===
                      "Level 200" && "Level 200"}
                  </p>
                  <p>
                    {selectedClassLevelSection?.classLevelName ===
                      "Level 300" && "Level 300"}
                  </p>
                </Grid>
                <Grid item xs={6} sm={3} className="classlevelInfo">
                  <h4>Class Section:</h4>
                  <p>General Science</p>
                  <p>{selectedClassLevelSection?.sectionName}</p>
                </Grid>
                <Grid item xs={6} sm={3} className="classlevelInfo">
                  <h4>Class Teacher:</h4>
                  <p>Patrick Kenneford Annan</p>
                  <p>
                    {authTeacherInfo?.personalInfo?.gender === "Male" && "Mr."}
                    {authTeacherInfo?.personalInfo?.gender === "Female" &&
                      "Mrs."}{" "}
                    {
                      selectedClassLevelSection?.currentTeacher.personalInfo
                        ?.fullName
                    }
                  </p>
                </Grid>
                <Grid item xs={6} sm={3} className="attendanceDate">
                  <h4>Date:</h4>
                  <p>{date}</p>
                </Grid>
              </Grid>
              {searchAttendance && (
                <Button
                  // type="submit"
                  className="searchAttBtn"
                  sx={{
                    width: "100%",
                    // margin: { xs: " 1rem .5rem", sm: "1rem" },
                  }}
                >
                  Search
                </Button>
              )}
            </Box>
          </Box>
        </Box>
        {/* Display take attendance or view attendance component */}
        <Box m={".5rem"}>
          <Box
            sx={{
              width: { xs: "100%", sm: "95%", md: "90%", lg: "90%", xl: "75%" },
            }}
            margin={"auto"}
          >
            {/* Table to display student attendance details */}
            {!takeAttendance && <ViewAttendance />}
            {takeAttendance && <TakeAttendance />}
            {/* Pie Chart to display attendance statistics */}
            {/* <Typography variant="h5" gutterBottom>
            Attendance Summary
          </Typography>
          <PieChart width={400} height={400}>
            <Pie
              data={attendanceData}
              cx={200}
              cy={200}
              innerRadius={60}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {attendanceData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart> */}
            {!currentClassAttendance && (
              <Box className="noAttendanceRecord">
                <p>No Current Record!</p>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
}
