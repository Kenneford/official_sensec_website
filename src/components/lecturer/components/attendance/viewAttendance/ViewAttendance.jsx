import React, { useEffect } from "react";
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
  Avatar,
} from "@mui/material";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import DataTable from "react-data-table-component";
import { customAttendanceTableStyle } from "../../../../../usersInfoDataFormat/usersInfoTableStyle";
import {
  fetchCurrentClassAttendance,
  fetchWeeklyClassAttendances,
  getCurrentClassAttendance,
  getWeeklyClassAttendance,
} from "../../../../../features/academics/attendanceSlice";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import CustomPieChartLegend from "../../../../custom/CustomPieChartLegend";

// Mock data for students and attendance
const students = [
  { id: 1, name: "John Doe", rollNo: "A101", status: "Present" },
  { id: 2, name: "Jane Smith", rollNo: "A102", status: "Absent" },
  { id: 3, name: "Sam Wilson", rollNo: "A103", status: "Present" },
  { id: 4, name: "Kate Johnson", rollNo: "A104", status: "Absent" },
  { id: 5, name: "Chris Evans", rollNo: "A105", status: "Present" },
];

export function ViewAttendance({ filteredStudents }) {
  const dispatch = useDispatch();
  const currentClassAttendance = useSelector(getCurrentClassAttendance);
  const weeklyClassAttendance = useSelector(getWeeklyClassAttendance);
  // Calculate attendance statistics
  const totalStudents = currentClassAttendance?.students?.length || 0;
  const presentCount =
    currentClassAttendance?.students?.filter(
      (student) => student.status === "Present"
    ).length || 0;
  const absentCount = totalStudents - presentCount;

  const presentPercentage = ((presentCount / totalStudents) * 100).toFixed(2);
  const absentPercentage = ((absentCount / totalStudents) * 100).toFixed(2);
  console.log(presentPercentage);

  // Calculate total present and absent counts
  const { totalPresent, totalAbsent } =
    weeklyClassAttendance &&
    weeklyClassAttendance.reduce(
      (totals, record) => {
        record?.students?.forEach((student) => {
          if (student.status === "Present") {
            totals.totalPresent += 1;
          } else if (student.status === "Absent") {
            totals.totalAbsent += 1;
          }
        });
        return totals;
      },
      { totalPresent: 0, totalAbsent: 0 }
    );

  // Calculate percentages
  const totalRecords = totalPresent + totalAbsent;
  const weeklyPresentPercentage = ((totalPresent / totalRecords) * 100).toFixed(
    1
  );
  const weeklyAbsentPercentage = ((totalAbsent / totalRecords) * 100).toFixed(
    1
  );
  console.log(totalPresent, presentPercentage);
  console.log(totalAbsent, absentPercentage);
  // Data for Pie Chart
  const attendanceData = [
    { name: "Present", value: presentCount },
    { name: "Absent", value: absentCount },
  ];
  const weeklyAttendanceData = [
    { name: "Present", value: totalPresent },
    { name: "Absent", value: totalAbsent },
  ];
  // console.log("attendanceData:", attendanceData);

  const COLORS = ["#0088FE", "#FF8042"];

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
          {row?.student?.personalInfo?.profilePicture?.url && (
            <Avatar
              sx={{ width: "2rem", height: "2rem" }}
              src={row?.student?.personalInfo?.profilePicture?.url}
            />
          )}
          {!row?.student?.personalInfo?.profilePicture?.url &&
            row?.student?.personalInfo?.gender === "Male" && (
              <Avatar src={"/assets/maleAvatar.png"} alt="" />
            )}
          {!row?.student?.personalInfo?.profilePicture?.url &&
            row?.student?.personalInfo?.gender === "Female" && (
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
          <p style={{ fontSize: ".8em" }} title={row?.student?.uniqueId}>
            {row?.student?.uniqueId?.slice(0, 3)}*****
            {row?.student?.uniqueId?.slice(-2)}
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
          <p
            style={{ fontSize: ".8em" }}
            title={row?.student?.personalInfo?.fullName}
          >
            {row?.student?.personalInfo?.fullName}
          </p>
        </Box>
      ),
      sortable: true,
    },
    {
      name: (
        <Box fontSize={"calc(0.7rem + 1vmin)"}>
          <p style={{ fontSize: ".8em" }}>Status</p>
        </Box>
      ),
      cell: (row) => (
        <Box fontSize={"calc(0.7rem + 1vmin)"}>
          <p style={{ fontSize: ".8em" }}>{row?.status}</p>
        </Box>
      ),
    },
  ];

  useEffect(() => {
    dispatch(fetchCurrentClassAttendance());
    dispatch(fetchWeeklyClassAttendances());
  }, [dispatch]);

  const renderCustomLegend = (props) => {
    const { payload } = props;
    const totalValue = payload?.reduce(
      (acc, cur) => acc + (cur.payload.value || 0),
      0
    ); // Fallback to 0 for undefined values

    return (
      <ul
        style={{
          listStyleType: "none",
          padding: 0,
          margin: 0,
          justifyContent: "space-around",
          alignItems: "center",
          display: "flex",
        }}
      >
        {payload?.map((entry, index) => (
          <li
            key={`item-${index}`}
            style={{
              color: entry.color,
              fontSize: ".8em",
              // marginBottom: "4px",
              textAlign: "center",
            }}
          >
            {entry.value}: {entry.payload.value || 0} (
            {totalValue > 0
              ? ((entry.payload.value / totalValue) * 100).toFixed(1)
              : 0}
            %)
          </li>
        ))}
      </ul>
    );
  };

  return (
    <Box>
      <Box fontSize={"calc(0.7rem + 1vmin)"} sx={{ border: "1px solid #ccc" }}>
        <DataTable
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
      </Box>
      {/* Pie Chart to display attendance statistics */}
      <Typography
        variant="h5"
        gutterBottom
        fontSize={"1em"}
        color="#696969"
        fontWeight={500}
        mt={2}
      >
        Attendance Summary
      </Typography>
      <Box display={"flex"} flexWrap={"wrap"} justifyContent={"space-around"}>
        <Box
          display={"flex"}
          flexDirection={{ xs: "column", sm: "row" }}
          justifyContent={"center"}
          alignItems={"center"}
          mb={5}
        >
          <Typography
            variant="h6"
            gutterBottom
            fontSize={".8em"}
            color="#0088FE"
            mt={2}
          >
            Current Record
          </Typography>
          {attendanceData?.every((item) => item?.value === 0) ? (
            <Typography variant="h6" fontSize={".8em"} color="#696969">
              No attendance data available
            </Typography>
          ) : (
            <PieChart width={200} height={250}>
              <Pie
                data={attendanceData}
                // cx={200}
                // cy={200}
                innerRadius={30}
                outerRadius={50}
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
              {/* <Tooltip /> */}
              <Legend
                content={(props) => <CustomPieChartLegend {...props} />}
              />
            </PieChart>
          )}
        </Box>
        <Box
          display={"flex"}
          flexDirection={{ xs: "column", sm: "row" }}
          justifyContent={"center"}
          alignItems={"center"}
          mb={5}
        >
          <Typography variant="h6" fontSize={".8em"} mt={2} color="#FF8042">
            Weekly Record
          </Typography>
          {weeklyAttendanceData?.every((item) => item?.value === 0) ? (
            <Typography variant="h6" fontSize={".8em"} color="#696969">
              No attendance data available
            </Typography>
          ) : (
            <PieChart width={200} height={250}>
              <Pie
                data={weeklyAttendanceData}
                // cx={200}
                // cy={200}
                innerRadius={30}
                outerRadius={50}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {weeklyAttendanceData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              {/* <Tooltip /> */}
              <Legend
                content={(props) => <CustomPieChartLegend {...props} />}
              />
            </PieChart>
          )}
        </Box>
      </Box>
    </Box>
  );
}

ViewAttendance.propTypes = {
  filteredStudents: PropTypes.array,
};
