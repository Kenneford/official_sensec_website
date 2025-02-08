import { useEffect, useState } from "react";
import "./reports.scss";
import { FileOpen, TaskAlt } from "@mui/icons-material";
import { Box, Button, Grid, MenuItem, Avatar } from "@mui/material";
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
  resetClassReportSearchState,
  searchClassReport,
} from "../../../../features/reports/reportSlice";
import SearchedReportOverviewModal from "../../../modals/SearchedReportOverviewModal";

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
          <p style={{ fontSize: ".8em" }}>Fails %</p>
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
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          <SearchFilter
            value={searchStudent}
            onChange={setSearchStudent}
            placeholder={"Search student by name or ID"}
          />
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
            {dataFetched && searchedClassReportInfo && (
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
            )}
            {dataFetched && searchedClassReportInfo?.length > 0 && (
              <Box
                fontSize={"calc(0.7rem + 1vmin)"}
                // sx={{ border: "1px solid #ccc" }}
              >
                <Box fontSize={"calc(0.7rem + 1vmin)"} mb={1}>
                  <p style={{ fontSize: ".8em", color: "#696969" }}>
                    <span style={{ color: "#292929" }}>Searched By: </span>
                    {currentReportSearch}
                  </p>
                </Box>
                <DataTable
                  className="my-data-table"
                  columns={columns}
                  data={filteredReports}
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
            {dataFetched && !searchedClassReportInfo?.length > 0 && (
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
