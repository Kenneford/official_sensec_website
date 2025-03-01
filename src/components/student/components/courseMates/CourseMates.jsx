import "./courseMates.scss";
import { useState } from "react";
import DataTable from "react-data-table-component";
import { Box } from "@mui/material";
import { getAuthUser } from "../../../../features/auth/authSlice";
import {
  FetchAllApprovedStudents,
  FetchStudentsCourseMates,
} from "../../../../data/students/FetchAllStudents";
import {
  courseMatesColumn,
  studentsColumn,
} from "../../../../usersInfoDataFormat/UsersInfoDataFormat";
import SearchFilter from "../../../searchForm/SearchFilter";
import { customUserTableStyle } from "../../../../usersInfoDataFormat/usersInfoTableStyle";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export function CourseMates() {
  const authStudent = useSelector(getAuthUser);
  console.log(authStudent);

  const { studentCurrentAction, studentCurrentLink } = useParams();

  const approvedStudents = FetchAllApprovedStudents();

  const programmeStudents = FetchStudentsCourseMates({
    authStudent,
    programme: authStudent?.programme,
    classLevelFound: authStudent?.currentClassLevel,
  });

  console.log(programmeStudents);

  const [searchStudent, setSearchStudent] = useState("");

  const filteredStudents = programmeStudents?.filter(
    (std) =>
      std?.personalInfo?.fullName?.toLowerCase()?.includes(searchStudent) ||
      std?.personalInfo?.fullName?.includes(searchStudent)
  );

  const columnData = {
    authStudent,
    studentCurrentAction,
    studentCurrentLink,
  };
  const studentDataFormat = courseMatesColumn(columnData);

  const courseMates = `Coursemates / Total = 
              ${programmeStudents?.length}`;
  return (
    <>
      {/* Current dashboard title */}
      <Box
        component={"div"}
        id="studentDashboardHeaderWrap"
        sx={{
          position: "sticky",
          top: 0,
          backgroundColor: "#fff",
          padding: 0,
          // zIndex: 1,
        }}
      >
        <h1 className="dashAction">
          {studentCurrentAction?.replace(/_/g, "-")} /{" "}
          <span>{studentCurrentLink?.replace(/_/g, " ")}</span>
        </h1>
        {/* Main search bar */}
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          <SearchFilter
            value={searchStudent}
            onChange={setSearchStudent}
            placeholder={"Search"}
          />
        </Box>
      </Box>
      <Box
        className="allStudentsData"
        id="allStudents"
        padding={{ xs: " 1rem .5rem", sm: " 1rem" }}
      >
        <Box className="searchDetails">
          {filteredStudents?.length === 0 && searchStudent !== "" && (
            <p className="searchInfo">
              We couldn&apos;t find any matches for &quot;{searchStudent}&quot;
            </p>
          )}
          {filteredStudents?.length === 0 && searchStudent !== "" && (
            <p
              style={{
                paddingLeft: "1.5rem",
                display: "flex",
                alignItems: "center",
                color: "red",
              }}
            >
              ||
            </p>
          )}
          {searchStudent && (
            <p className="searchInfo">
              Total Coursemates Found = {filteredStudents?.length}
            </p>
          )}
          {!searchStudent && (
            <p className="searchInfo">
              Total Students = {approvedStudents?.length}
            </p>
          )}
        </Box>
        <Box className="studentDataTable">
          <DataTable
            title={courseMates}
            columns={studentDataFormat}
            data={filteredStudents}
            customStyles={customUserTableStyle}
            pagination
            highlightOnHover
          />
        </Box>
      </Box>
    </>
  );
}
