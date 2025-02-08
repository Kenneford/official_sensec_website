import React, { useEffect, useRef, useState } from "react";
import "./lecturerAttendance.scss";
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
import SearchForm from "../../../searchForm/SearchForm";
import { CustomSearchField } from "../../../../muiStyling/muiStyling";
import { useParams } from "react-router-dom";
import SmallFooter from "../../../footer/SmallFooter";
import { ViewAttendance } from "./viewAttendance/ViewAttendance";
import { FetchAllLecturers } from "../../../../data/lecturers/FetchLecturers";
import { useDispatch, useSelector } from "react-redux";
import { getAuthUser } from "../../../../features/auth/authSlice";
import TakeAttendance from "./takeAttendance/TakeAttendance";
import NotAuthorized from "../../../notAuthorized/NotAuthorized";
import { toast } from "react-toastify";
import {
  fetchCurrentClassAttendance,
  getCurrentClassAttendance,
} from "../../../../features/academics/attendanceSlice";
import SearchFilter from "../../../searchForm/SearchFilter";

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

export function LecturerAttendance() {
  const date = new Date().toDateString();
  const { lecturerCurrentLink, lecturerCurrentAction } = useParams();
  const [takeAttendance, setTakeAttendance] = useState(false);
  const [viewAttendance, setViewAttendance] = useState(true);
  const [searchAttendance, setSearchAttendance] = useState(false);
  const [calendar, setCalendar] = useState("");
  const [openCalendar, setOpenCalendar] = useState(false);
  const [searchedAttendance, setSearchedAttendance] = useState("");
  const [searchStudent, setSearchStudent] = useState("");
  const authLecturer = useSelector(getAuthUser);
  const dispatch = useDispatch();
  const currentClassAttendance = useSelector(getCurrentClassAttendance);

  const { createStatus, error, successMessage } = useSelector(
    (state) => state.attendance
  );
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const isSmallScreen = screenWidth && screenWidth < 1024;
  console.log(isSmallScreen);

  const allLecturers = FetchAllLecturers();
  const allClassLevelSections = [];
  const handleSearchAttendance = () => {};

  const lecturerFound = allLecturers?.find(
    (lect) => lect?.uniqueId === authLecturer?.uniqueId
  );
  const classLevelSection =
    lecturerFound?.lecturerSchoolData?.classLevelHandling;

  const filteredStudents = currentClassAttendance?.students?.filter(
    (studentData) =>
      studentData?.student?.personalInfo?.fullName
        ?.toLowerCase()
        ?.includes(searchStudent.toLowerCase()) ||
      studentData?.student?.uniqueId
        ?.toLowerCase()
        ?.includes(searchStudent.toLowerCase())
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

  useEffect(() => {
    if (createStatus === "success") {
      setTimeout(() => {
        dispatch(fetchCurrentClassAttendance());
        setTakeAttendance(false);
        setViewAttendance(true);
      }, 6000);
      // setTimeout(() => {
      // }, 7000);
    } else {
      dispatch(fetchCurrentClassAttendance());
    }
  }, [dispatch, createStatus]);

  // Find current device in use
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    // Add event listener to detect window resizing
    window.addEventListener("resize", handleResize);
  });

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
  // if (isSmallScreen) {
  //   return (
  //     <Box fontSize={"calc(0.7rem + 1vmin)"} mt={3} letterSpacing={1}>
  //       <h4
  //         style={{
  //           textAlign: "center",
  //           color: "#696969",
  //           fontSize: "1em",
  //         }}
  //       >
  //         Login on a desktop or laptop to continue...!
  //       </h4>
  //     </Box>
  //   );
  // }

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
                <Typography className="text">Taking Attendance</Typography>
              </Box>
            ) : (
              <Box className="attendanceTogglingText">
                <CalendarMonth className="attIcons" />
                <Typography className="actionBtnView">
                  Viewing Attendance
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
                  {takeAttendance
                    ? "Daily Students Attendance Recordings"
                    : "Current Students Attendance Record"}
                </h3>
              </Box>
              <Grid container spacing={2} className="flex4" p={"1rem 0"}>
                <Grid item xs={6} sm={3} className="classlevelInfo">
                  <h4>Class Level:</h4>
                  <p>
                    {classLevelSection?.classLevelName === "Level 100" &&
                      "Level 100"}
                  </p>
                  <p>
                    {classLevelSection?.classLevelName === "Level 200" &&
                      "Level 200"}
                  </p>
                  <p>
                    {classLevelSection?.classLevelName === "Level 300" &&
                      "Level 300"}
                  </p>
                </Grid>
                <Grid item xs={6} sm={3} className="classlevelInfo">
                  <h4>Class Section:</h4>
                  <p>{classLevelSection?.sectionName}</p>
                </Grid>
                <Grid item xs={6} sm={3} className="classlevelInfo">
                  <h4>Class Teacher:</h4>
                  <p>
                    {authLecturer?.personalInfo?.gender === "Male"
                      ? "Mr."
                      : "Mrs."}{" "}
                    {authLecturer.personalInfo?.fullName}
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
            {takeAttendance && !isSmallScreen && (
              <Box>
                {filteredStudents && (
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
                        Total Class Students Found ={" "}
                        {filteredStudents?.length > 0
                          ? filteredStudents?.length
                          : 0}
                      </p>
                    )}
                    {!searchStudent && (
                      <p style={{ fontSize: ".8em" }} className="searchInfo">
                        Total Students ={" "}
                        {currentClassAttendance?.students?.length > 0
                          ? currentClassAttendance?.students?.length
                          : 0}
                      </p>
                    )}
                  </Box>
                )}
              </Box>
            )}
            {viewAttendance && (
              <Box>
                {filteredStudents && (
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
                        Total Class Students Found ={" "}
                        {filteredStudents?.length > 0
                          ? filteredStudents?.length
                          : 0}
                      </p>
                    )}
                    {!searchStudent && (
                      <p style={{ fontSize: ".8em" }} className="searchInfo">
                        Total Students ={" "}
                        {currentClassAttendance?.students?.length > 0
                          ? currentClassAttendance?.students?.length
                          : 0}
                      </p>
                    )}
                  </Box>
                )}
              </Box>
            )}
            {/* Table to display student attendance details */}
            {!takeAttendance && currentClassAttendance && (
              <ViewAttendance filteredStudents={filteredStudents} />
            )}
            {takeAttendance && <TakeAttendance />}
            {!currentClassAttendance && !takeAttendance && (
              <Box className="noAttendanceRecord">
                <p style={{ fontSize: ".8em" }}>No Current Record!</p>
              </Box>
            )}
          </Box>
        </Box>
        <SmallFooter />
      </Box>
    </>
  );
}
