import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
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
import { FetchAllLecturerSubjects } from "../../../../data/subjects/FetchSubjects";
import SmallFooter from "../../../footer/SmallFooter";
import Cookies from "js-cookie";

export function Subjects() {
  // const currentSubjectType = localStorage.getItem("currentSubjectType");
  const currentSubjectType = Cookies?.get("currentSubjectType");
  const authUser = useSelector(getAuthUser);
  const { lecturerCurrentLink, lecturerCurrentAction } = useParams();
  const allLecturers = FetchAllLecturers();
  const studentsColumnFormat = classHandlingStudentsColumn();
  const [searchStudent, setSearchStudent] = useState("");
  const [isCore, setIsCore] = useState(null);
  const lecturerFound = allLecturers?.find(
    (lect) => lect?.uniqueId === authUser?.uniqueId
  );
  const sectionStudents = FetchClassSectionStudents({
    class_section: lecturerFound?.lecturerSchoolData?.classLevelHandling?._id,
  });
  const lecturerSubjects = FetchAllLecturerSubjects(isCore);
  console.log(lecturerSubjects);

  console.log(lecturerFound?.lecturerSchoolData?.classLevelHandling?._id);
  console.log(sectionStudents);
  const filteredStudents = sectionStudents?.filter(
    (student) =>
      student?.personalInfo?.fullName
        ?.toLowerCase()
        ?.includes(searchStudent.toLowerCase()) ||
      student?.uniqueId?.toLowerCase()?.includes(searchStudent.toLowerCase())
  );

  useEffect(() => {
    if (currentSubjectType === "cores") {
      setIsCore(true);
    }
    if (currentSubjectType === "electives") {
      setIsCore(false);
    }
  }, [currentSubjectType]);
  const title = `Class Students / Total = ${
    sectionStudents?.length > 0 ? sectionStudents?.length : 0
  }`;

  return (
    <Box bgcolor={"#fff"}>
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
        {/* <Box sx={{ display: { xs: "none", sm: "block" } }}>
          <SearchFilter
            value={searchStudent}
            onChange={setSearchStudent}
            placeholder={"Search"}
          />
        </Box> */}
      </Box>
      <Box padding={{ xs: " 1rem .5rem", sm: " 1rem" }}>
        <Box>
          <Box
            display={"flex"}
            flexWrap={"wrap"}
            gap={2}
            bgcolor={"#383838"}
            padding={".5rem"}
          >
            <Button
              sx={{
                backgroundColor: "transparent",
                color: "#fff",
                fontWeight: 500,
                fontSize: ".8em",
                textTransform: "capitalize",
                borderBottom: isCore === true ? "2px solid #14eb09" : "",
                pt: "unset",
                pb: "unset",
                letterSpacing: "1px",
              }}
              onClick={() => {
                setIsCore(true);
                Cookies?.set("currentSubjectType", "cores", {
                  expires: 1, // 1 day
                  secure: false, // Set to true in production if using HTTPS
                  sameSite: "Strict",
                });
                // localStorage.setItem("currentSubjectType", "cores");
              }}
            >
              Core Subjects
            </Button>
            <Button
              sx={{
                backgroundColor: "transparent",
                color: "#fff",
                fontWeight: 500,
                fontSize: ".8em",
                textTransform: "capitalize",
                borderBottom: isCore === false ? "2px solid #14eb09" : "",
                // textDecoration: !isCore ? "underline" : "",
                // ":hover": {
                //   textDecoration: !isCore ? "underline" : "",
                // },
                pt: "unset",
                pb: "unset",
                letterSpacing: "1px",
              }}
              // textAlign={"left"}
              onClick={() => {
                setIsCore(false);
                Cookies?.set("currentSubjectType", "electives", {
                  expires: 1, // 1 day
                  secure: false, // Set to true in production if using HTTPS
                  sameSite: "Strict",
                });
                // localStorage.setItem("currentSubjectType", "electives");
              }}
            >
              Elective Subjects
            </Button>
          </Box>
          {currentSubjectType && currentSubjectType === "cores" && (
            <Box mb={"2rem"} mt={"1rem"}>
              {lecturerSubjects?.length > 0 ? (
                <>
                  <Typography color="#696969" letterSpacing={1}>
                    Subject(s) you&apos;ve been assigned to:
                  </Typography>
                  <Box ml={{ xs: ".8rem", sm: "2.5rem" }}>
                    <ul
                      style={{
                        marginTop: "1rem",
                      }}
                    >
                      {lecturerSubjects?.map((subjData) => (
                        <li
                          key={subjData?._id}
                          style={{
                            fontSize: ".8em",
                            color: "#696969",
                            letterSpacing: "1px",
                            listStyle: "disc",
                          }}
                        >
                          {subjData?.subject?.subjectName}
                        </li>
                      ))}
                    </ul>
                  </Box>
                </>
              ) : (
                <Typography
                  variant="h6"
                  sx={{ color: "#696969", letterSpacing: "1px" }}
                  textAlign={"center"}
                  fontSize={".8em"}
                >
                  No subject assigned under {isCore ? "core" : "elective"}{" "}
                  subjects
                </Typography>
              )}
            </Box>
          )}
          {currentSubjectType && currentSubjectType === "electives" && (
            <Box mb={"2rem"} mt={"1rem"}>
              {lecturerSubjects?.length > 0 ? (
                <>
                  <Typography color="#696969" letterSpacing={1}>
                    Subject(s) you&apos;ve been assigned to:
                  </Typography>
                  <Box ml={{ xs: ".8rem", sm: "2.5rem" }}>
                    <ul
                      style={{
                        marginTop: "1rem",
                      }}
                    >
                      {lecturerSubjects?.map((subjData) => (
                        <li
                          key={subjData?._id}
                          style={{
                            fontSize: ".8em",
                            color: "#696969",
                            letterSpacing: "1px",
                            listStyle: "disc",
                          }}
                        >
                          {subjData?.subject?.subjectName}
                        </li>
                      ))}
                    </ul>
                  </Box>
                </>
              ) : (
                <Typography
                  variant="h6"
                  sx={{ color: "#696969", letterSpacing: "1px" }}
                  textAlign={"center"}
                  fontSize={".8em"}
                >
                  No subject assigned under {isCore ? "core" : "elective"}{" "}
                  subjects
                </Typography>
              )}
            </Box>
          )}
        </Box>
        {/* <Box className="studentDataTable">
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
        </Box> */}
      </Box>
      <SmallFooter />
    </Box>
  );
}
