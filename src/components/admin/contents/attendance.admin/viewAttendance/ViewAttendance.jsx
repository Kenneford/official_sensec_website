import React from "react";
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
} from "@mui/material";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

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

export function ViewAttendance() {
  return (
    <Box>
      <TableContainer component={Paper} style={{ marginBottom: "20px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Roll No</TableCell>
              <TableCell>Student Name</TableCell>
              <TableCell>Attendance Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students?.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.rollNo}</TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Pie Chart to display attendance statistics */}
      <Typography variant="h5" gutterBottom>
        Attendance Summary
      </Typography>
      <Box display={"flex"} justifyContent={"center"}>
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
        </PieChart>
      </Box>
    </Box>
  );
}
