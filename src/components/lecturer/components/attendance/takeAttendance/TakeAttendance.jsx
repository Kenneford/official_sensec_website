import { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Box,
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid,
  Avatar,
} from "@mui/material";
import DataTable from "react-data-table-component";
import { customAttendanceTableStyle } from "../../../../../usersInfoDataFormat/usersInfoTableStyle";
import { useDispatch, useSelector } from "react-redux";
import { getAuthUser } from "../../../../../features/auth/authSlice";
import { FetchAllLecturers } from "../../../../../data/lecturers/FetchLecturers";
import { FetchClassSectionStudents } from "../../../../../data/students/FetchAllStudents";
import {
  createClassAttendance,
  resetCreateAttendanceState,
} from "../../../../../features/academics/attedanceSlice";
import { FetchCurrentAcademicTerms } from "../../../../../data/term.year/FetchAcademicTerms";
import { toast } from "react-toastify";
import LoadingProgress from "../../../../pageLoading/LoadingProgress";
import { TaskAlt } from "@mui/icons-material";

// Mock data for attendance statuses
const attendanceStatus = [
  { value: "Present", label: "Present" },
  { value: "Absent", label: "Absent" },
  // { value: "Holiday", label: "Holiday" },
];

export default function TakeAttendance() {
  const authUser = useSelector(getAuthUser);
  const dispatch = useDispatch();
  const allLecturers = FetchAllLecturers();
  const lecturerFound = allLecturers?.find(
    (lect) => lect?.uniqueId === authUser?.uniqueId
  );
  const lecturerClassHandling =
    lecturerFound?.lecturerSchoolData?.classLevelHandling?._id;
  const sectionStudents = FetchClassSectionStudents({
    class_section: lecturerClassHandling,
  });
  console.log(sectionStudents);
  console.log(lecturerFound);
  const currentAcademicTerms = FetchCurrentAcademicTerms();

  const { createStatus, error, successMessage } = useSelector(
    (state) => state.attendance
  );
  // Handle Process State
  const [loadingComplete, setLoadingComplete] = useState(null);
  //   const students = [];
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [allStudents, setAllStudents] = useState(sectionStudents);
  const [markedStudents, setMarkedStudents] = useState([]);
  const [toggleClearRows, setToggleClearRows] = useState(false);
  console.log(markedStudents);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const isSmallScreen = screenWidth && screenWidth < 1024;
  console.log(isSmallScreen);

  const markAttendance = async (status) => {
    try {
      const attendanceData = students?.map((student) => ({
        id: student._id,
        status,
      }));
      await axios.put("/api/students/attendance", {
        date,
        students: attendanceData,
      });
      //   fetchStudents();
    } catch (error) {
      console.error("Error marking attendance:", error);
    }
  };

  const markWeekends = async () => {
    try {
      await axios.post("/api/students/mark-weekends", {
        startDate: "2023-01-01",
        endDate: "2023-12-31", // Example: marking weekends for a full year
      });
      //   fetchStudents();
    } catch (error) {
      console.error("Error marking weekends:", error);
    }
  };

  //Attendance status Value
  const handleStatusValues = (studentId, value) => {
    // Update the status for the specific student
    setAllStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.uniqueId === studentId ? { ...student, status: value } : student
      )
    );

    // Update markedStudents for tracking marked attendance
    setMarkedStudents((prevMarked) => [
      ...prevMarked.filter((std) => std.uniqueId !== studentId),
      { uniqueId: studentId, status: value },
    ]);
  };

  const markAllStudents = (status) => {
    setAllStudents((prevStudents) =>
      prevStudents.map((student) => ({
        ...student,
        status, // Set all students to the provided status
      }))
    );

    // Update markedStudents to reflect the new statuses
    const updatedMarkedStudents = sectionStudents.map((student) => ({
      uniqueId: student.uniqueId,
      status,
    }));
    setMarkedStudents(updatedMarkedStudents);
  };

  const handleMultiSelect = (state) => {
    if (state) {
      const selectedStudentIds = state.selectedRows.map((row) => row.uniqueId);
      const updatedMarkedStudents = allStudents.filter((student) =>
        selectedStudentIds.includes(student.uniqueId)
      );
      setMarkedStudents(updatedMarkedStudents);
    } else {
      setMarkedStudents([]);
    }
  };
  const saveNewAttendance = () => {
    const data = {
      students: markedStudents,
      lecturerId: authUser?.id,
      classLevelSection:
        lecturerFound?.lecturerSchoolData?.classLevelHandling?._id,
      semester: currentAcademicTerms?.name,
    };
    dispatch(createClassAttendance(data));
  };

  // Find current device in use
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    // Add event listener to detect window resizing
    window.addEventListener("resize", handleResize);
  });

  // Define columns for the data table
  const columns = [
    {
      name: (
        <Box fontSize={"calc(0.7rem + 1vmin)"}>
          <p style={{ fontSize: ".8em" }}>Image</p>
        </Box>
      ),
      selector: (row) => (
        <>
          {row?.personalInfo?.profilePicture?.url && (
            <Avatar
              sx={{ width: "2rem", height: "2rem" }}
              src={row?.personalInfo?.profilePicture?.url}
            />
          )}
          {!row?.personalInfo?.profilePicture?.url &&
            row?.personalInfo?.gender === "Male" && (
              <Avatar src={"/assets/maleAvatar.png"} alt="" />
            )}
          {!row?.personalInfo?.profilePicture?.url &&
            row?.personalInfo?.gender === "Female" && (
              <Avatar src={"/assets/femaleAvatar.png"} alt="" />
            )}
        </>
      ),
      // sortable: true,
    },
    {
      name: (
        <Box fontSize={"calc(0.7rem + 1vmin)"}>
          <p style={{ fontSize: ".8em" }}>Unique ID</p>
        </Box>
      ),
      selector: (row) => (
        <Box fontSize={"calc(0.7rem + 1vmin)"}>
          <p style={{ fontSize: ".8em" }} title={row?.uniqueId}>
            {row?.uniqueId?.slice(0, 3)}*****
            {row?.uniqueId?.slice(-2)}
          </p>
        </Box>
      ),
      // sortable: true,
    },
    {
      name: (
        <Box fontSize={"calc(0.7rem + 1vmin)"}>
          <p style={{ fontSize: ".8em" }}>Full Name</p>
        </Box>
      ),
      selector: (row) => (
        <Box fontSize={"calc(0.7rem + 1vmin)"}>
          <p style={{ fontSize: ".8em" }}>{row?.personalInfo?.fullName}</p>
        </Box>
      ),
      sortable: true,
    },
    // {
    //   name: "Programme",
    //   selector: (row) => row?.programme,
    //   sortable: true,
    // },
    {
      name: (
        <Box fontSize={"calc(0.7rem + 1vmin)"}>
          <p style={{ fontSize: ".8em" }}>Status</p>
        </Box>
      ),
      cell: (row) => (
        <Box fontSize={"calc(0.7rem + 1vmin)"}>
          <RadioGroup
            //   row
            // key={status?.name}
            value={row?.status || ""}
            onChange={(e) => handleStatusValues(row?.uniqueId, e.target.value)}
            // sx={{ display: "flex" }}
          >
            <Box
              className="statusValueWrap"
              display={"flex"}
              alignItems="flex-end"
              flexWrap="wrap"
            >
              {attendanceStatus?.map((status) => (
                <FormControlLabel
                  key={status?.label}
                  value={status?.value}
                  control={
                    <Radio
                      size="small"
                      sx={{
                        "& .MuiSvgIcon-root": {
                          fontSize: "1em", // Adjust the size of the radio icon
                        },
                        "&.Mui-checked": {
                          color:
                            status?.label === "Present" ? "#04a214" : "red",
                        },
                        display: "flex",
                        color: status?.label === "Present" ? "green" : "red",
                      }}
                    />
                  }
                  label={status?.label}
                  sx={{ minWidth: "6rem", fontSize: ".8em" }}
                />
              ))}
            </Box>
          </RadioGroup>
        </Box>
      ),
    },
  ];

  // Handle attendance status check
  useEffect(() => {
    if (createStatus === "pending") {
      setLoadingComplete(false);
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
      }, 1000);
      setTimeout(() => {
        setLoadingComplete(null);
        dispatch(resetCreateAttendanceState());
      }, 3000);
      return;
    }
    if (createStatus === "success") {
      setTimeout(() => {
        setLoadingComplete(true);
      }, 3000);
      setTimeout(() => {
        setLoadingComplete(null);
        dispatch(resetCreateAttendanceState());
      }, 6000);
    }
  }, [dispatch, createStatus, error]);

  if (isSmallScreen) {
    return (
      <Box fontSize={"calc(0.7rem + 1vmin)"} mt={3} mb={3} letterSpacing={1}>
        <h4
          style={{
            textAlign: "center",
            color: "#696969",
            fontSize: "1em",
          }}
        >
          Login on a desktop or laptop to continue...!
        </h4>
      </Box>
    );
  }

  return (
    <Box mb={5}>
      <Box
        sx={{
          width: "100%",
        }}
        margin={"0 auto"}
        border={"1px solid #ccc"}
      >
        <Grid
          container
          spacing={2}
          //   padding={"0 .5rem 1rem"}
          display={"flex"}
          p={{ xs: " 1rem .5rem", sm: "1rem" }}
        >
          <Grid item xs={6} sm={3}>
            <Button
              fullWidth
              variant="contained"
              onClick={() => markAllStudents("Present")}
              sx={{
                textTransform: "capitalize",
                paddingX: ".2rem",
                fontSize: ".8em",
                bgcolor: "transparent",
                color: "#068ec0",
                outline: "1px solid #068ec0",
                transition: ".5s ease",
                ":hover": {
                  bgcolor: "#068ec0",
                  color: "#fff",
                },
              }}
              color="info"
            >
              Mark All Present
            </Button>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Button
              fullWidth
              variant="contained"
              onClick={() => markAllStudents("Absent")}
              sx={{
                textTransform: "capitalize",
                paddingX: ".2rem",
                fontSize: ".8em",
                bgcolor: "transparent",
                color: "red",
                outline: "1px solid red",
                transition: ".5s ease",
                ":hover": {
                  bgcolor: "red",
                  color: "#fff",
                },
              }}
              color="error"
            >
              Mark All Absent
            </Button>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Button
              fullWidth
              variant="contained"
              sx={{
                textTransform: "capitalize",
                fontSize: ".8em",
                minHeight: "2.5rem",
                outline:
                  markedStudents?.length === sectionStudents?.length
                    ? "1px solid green"
                    : "2px solid #adacaccc !important",
                backgroundColor:
                  markedStudents?.length === sectionStudents?.length
                    ? "green"
                    : "#adacaccc !important",
                borderRadius: ".4rem",
                color: "#fff !important",
                "&.Mui-disabled": {
                  cursor: "not-allowed", // Show not-allowed cursor
                  pointerEvents: "auto",
                },
              }}
              color="success"
              disabled={markedStudents?.length !== sectionStudents?.length}
              onClick={saveNewAttendance}
            >
              {loadingComplete === false && (
                <LoadingProgress color={"#fff"} size={"1.5rem"} />
              )}
              {loadingComplete && createStatus === "success" && (
                <>
                  <span>Successful</span> <TaskAlt />
                </>
              )}
              {loadingComplete === null && "Save"}
            </Button>
          </Grid>
          {/* <Grid item xs={12} sm={3}>
            <Button
              fullWidth
              variant="contained"
              // onClick={markWeekends}
              onClick={() => markAllStudents("Holiday")}
              color="secondary"
              sx={{
                textTransform: "capitalize",
                paddingX: ".2rem",
                fontSize: ".8em",
              }}
            >
              Mark All Holiday
            </Button>
          </Grid> */}
        </Grid>
        <Box fontSize={"calc(0.7rem + 1vmin)"}>
          <DataTable
            columns={columns}
            data={allStudents}
            customStyles={customAttendanceTableStyle}
            pagination
            // selectableRows
            selectableRowsHighlight
            highlightOnHover
            onSelectedRowsChange={handleMultiSelect}
            clearSelectedRows={toggleClearRows}
          />
        </Box>
      </Box>
    </Box>
  );
}
