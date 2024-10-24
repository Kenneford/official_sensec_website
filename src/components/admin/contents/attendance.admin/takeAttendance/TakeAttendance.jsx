import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid,
  Avatar,
} from "@mui/material";
import DataTable from "react-data-table-component";
import {
  customAttendanceTableStyle,
  customUserTableStyle,
} from "../../../../../usersInfoDataFormat/usersInfoTableStyle";

// Mock data for students and attendance
const students = [
  { id: 1, name: "John Doe", rollNo: "A101", status: "" },
  { id: 2, name: "Jane Smith", rollNo: "A102", status: "" },
  { id: 3, name: "Sam Wilson", rollNo: "A103", status: "" },
  { id: 4, name: "Kate Johnson", rollNo: "A104", status: "" },
  { id: 5, name: "Chris Evans", rollNo: "A105", status: "" },
];

const statusValues = [
  { name: "Present" },
  { name: "Absent" },
  //   { name: "Holiday" },
  { name: "Weekend" },
];
// Mock data for attendance statuses
const attendanceStatuses = [
  { value: "Present", label: "Present" },
  { value: "Absent", label: "Absent" },
  { value: "Holiday", label: "Holiday" },
  //   { value: "Weekend", label: "Weekend" },
  // You can add more statuses here if needed
];

export default function TakeAttendance() {
  //   const students = [];
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [allStudents, setAllStudents] = useState(students);
  const [markedStudents, setMarkedStudents] = useState([]);

  //   useEffect(() => {
  //     fetchStudents();
  //   }, []);

  //   const fetchStudents = async () => {
  //     try {
  //       const response = await axios.get("/api/students");
  //       setStudents(response.data);
  //     } catch (error) {
  //       console.error("Error fetching students:", error);
  //     }
  //   };

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
  const handleStatusValues = (e, studentId) => {
    //Set Student attendance state
    let IStudent = {
      uniqueId: "",
      status: "",
    };
    if (e.target.name === "selectAll") {
      students?.forEach((std) => {
        const studentId = std?.uniqueId;
        if (studentId) {
          setMarkedStudents(
            markedStudents.filter((std) => std?.uniqueId !== studentId)
          );
          IStudent = {
            uniqueId: studentId,
            status: e.target.value,
          };
          students?.map((student) =>
            student.uniqueId === studentId ? IStudent : student
          );
          setMarkedStudents((prev) => [...prev, IStudent]);
        }
        // setMarkedStudents((prev) => [...prev, IStudent]);
      });
    }
    if (e) {
      setMarkedStudents(
        markedStudents.filter((std) => std?.uniqueId !== studentId)
      );
      IStudent = {
        uniqueId: studentId,
        status: e.target.value,
      };
      students.map((student) =>
        student.uniqueId === studentId ? IStudent : student
      );
      setMarkedStudents((prev) => [...prev, IStudent]);
    }
  };

  // Handle status change when radio button is clicked
  const handleStatusChange = (studentId, newStatus) => {
    setAllStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === studentId ? { ...student, status: newStatus } : student
      )
    );
  };

  // Define columns for the data table
  const columns = [
    {
      name: "Image",
      selector: (row) => <Avatar />,
      sortable: true,
    },
    {
      name: "Student Name",
      selector: (row) => row.name,
      sortable: true,
    },
    // {
    //   name: "Programme",
    //   selector: (row) => row?.programme,
    //   sortable: true,
    // },
    {
      name: "Status",
      cell: (row) => (
        <RadioGroup
          //   row
          // key={status?.name}
          value={row.status || ""}
          onChange={(e) => handleStatusChange(row?.id, e.target.value)}
          sx={{ display: "flex" }}
        >
          <Box
            className="statusValueWrap"
            display={"flex"}
            alignItems="flex-end"
            flexWrap="wrap"
          >
            {attendanceStatuses?.map((status) => (
              <FormControlLabel
                key={status?.label}
                value={status?.value}
                control={<Radio size=".5rem" />}
                label={status?.label}
                sx={{ minWidth: "7rem" }}
              />
            ))}
          </Box>
        </RadioGroup>
      ),
    },
  ];

  return (
    <Box>
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
          <Grid item xs={12} sm={3}>
            <Button
              variant="contained"
              onClick={() => markAttendance("Present")}
              sx={{ width: "100%", height: "3.5rem" }}
              color="success"
            >
              Mark All Present
            </Button>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Button
              variant="contained"
              onClick={() => markAttendance("Absent")}
              sx={{ width: "100%", height: "3.5rem" }}
              color="error"
            >
              Mark All Absent
            </Button>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Button
              variant="contained"
              onClick={markWeekends}
              color="secondary"
              sx={{ width: "100%", height: "3.5rem" }}
            >
              Mark All Holiday
            </Button>
          </Grid>
        </Grid>
        <DataTable
          columns={columns}
          data={allStudents}
          customStyles={customAttendanceTableStyle}
          pagination
          selectableRows
        />
      </Box>
    </Box>
  );
}
