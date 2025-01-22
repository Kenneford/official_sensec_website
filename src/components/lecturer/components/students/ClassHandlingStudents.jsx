import { Box } from "@mui/material";
import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { customUserTableStyle } from "../../../../usersInfoDataFormat/usersInfoTableStyle";
import { useParams } from "react-router-dom";
import SearchForm from "../../../searchForm/SearchForm";
import { FetchAllLecturers } from "../../../../data/lecturers/FetchLecturers";
import { FetchClassSectionStudents } from "../../../../data/students/FetchAllStudents";
import { getAuthUser } from "../../../../features/auth/authSlice";
import { useSelector } from "react-redux";
import { classHandlingStudentsColumn } from "../../../../usersInfoDataFormat/UsersInfoDataFormat";
import SearchFilter from "../../../searchForm/SearchFilter";

export function ClassHandlingStudents() {
  const authUser = useSelector(getAuthUser);
  const { lecturerCurrentLink, lecturerCurrentAction } = useParams();
  const allLecturers = FetchAllLecturers();
  const studentsColumnFormat = classHandlingStudentsColumn();
  const [searchStudent, setSearchStudent] = useState("");
  const lecturerFound = allLecturers?.find(
    (lect) => lect?.uniqueId === authUser?.uniqueId
  );
  const sectionStudents = FetchClassSectionStudents({
    class_section: lecturerFound?.lecturerSchoolData?.classLevelHandling?._id,
  });
  console.log(lecturerFound?.lecturerSchoolData?.classLevelHandling?._id);
  console.log(sectionStudents);
  const filteredStudents = sectionStudents?.filter(
    (student) =>
      student?.personalInfo?.fullName
        ?.toLowerCase()
        ?.includes(searchStudent.toLowerCase()) ||
      student?.uniqueId?.toLowerCase()?.includes(searchStudent.toLowerCase())
  );

  const title = `${
    lecturerFound?.lecturerSchoolData?.classLevelHandling?.sectionName
  } / Total = ${sectionStudents?.length > 0 ? sectionStudents?.length : 0}`;
  // const title = `Class Students / Total = ${
  //   sectionStudents?.length > 0 ? sectionStudents?.length : 0
  // }`;

  if (!sectionStudents) {
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
    <Box bgcolor={"#383838"}>
      {/* Current dashboard title */}
      <Box
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
            placeholder={"Search"}
          />
        </Box>
      </Box>
      <Box padding={{ xs: " 1rem .5rem", sm: " 1rem" }}>
        <Box className="searchDetails" justifyItems={"flex-start"}>
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
              Total Class Students Found = {filteredStudents?.length}
            </p>
          )}
          {!searchStudent && (
            <p className="searchInfo">
              Total Students = {sectionStudents?.length}
            </p>
          )}
        </Box>
        <Box className="studentDataTable">
          <DataTable
            title={title}
            columns={studentsColumnFormat}
            data={filteredStudents}
            customStyles={customUserTableStyle}
            pagination
            selectableRows
            selectableRowsHighlight
            highlightOnHover
            // onSelectedRowsChange={handleMultiSelect}
            // clearSelectedRows={toggleClearRows}
          />
        </Box>
      </Box>
    </Box>
  );
}
