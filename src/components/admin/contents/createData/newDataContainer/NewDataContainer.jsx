import React, { useState } from "react";
import "./newDataContainer.scss";
import { Outlet, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import {
  CreateAcademicBatch,
  CreatePlacementBatch,
  CreateAcademicTerm,
  CreateAcademicYear,
  CreateClassLevel,
  CreateProgram,
  CreateClassLevelSection,
  CreateHouse,
  CreateSubject,
  CreateOldStudentsGroup,
  CreateSchoolInfoData,
  CreateTimeTable,
} from "../../../../lazyLoading/admin/AdminLazyLoadingComponents";
// import CreateAcademicYear from "../create/academicYear/CreateAcademicYear";
// import CreateClassLevel from "../create/classLevel/CreateClassLevel";
// import CreateClassSection from "../create/classLevelSection/CreateClassLevelSection";
// import CreateProgram from "../create/programme/CreateProgram";
// import House from "../create/house/House";
// import CreateSubject from "../create/subjects/CreateSubject";
// import CreateElectiveSubject from "../create/subjects/electiveSubjects/CreateElectiveSubject";
// import CreateCoreSubject from "../create/subjects/coreSubjects/CreateCoreSubject";
// import CreateOldStudentsGroup from "../create/oldStudents/CreateOldStudentsGroup";
// import CreateSchoolData from "../create/schoolData/CreateSchoolData";
// import CreateTimeTable from "../create/timeTable/CreateTimeTable";

export function NewDataContainer({
  setCurrentAction,
  setCurrentLink,
  currentAction,
  currentLink,
}) {
  const adminLink = localStorage.getItem("currentAdminLink");
  const adminAction = localStorage.getItem("currentAdminAction");
  const navigate = useNavigate();
  const { adminCurrentAction, adminCurrentLink, data } = useParams();
  console.log(data);
  return (
    <>
      {/* Buttons to create new data */}
      <Box
        sx={{
          borderBottom: "1px solid #cccc",
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", sm: "95%", md: "90%", lg: "90%", xl: "75%" },
            padding: "1rem .5rem",
          }}
          className="newDataContainerWrap"
        >
          <button
            className={
              data === "school_batch" ? "activeCreateBtn" : "createBtn"
            }
            onClick={() => {
              navigate(
                `/sensec/users/admin/${adminCurrentAction}/${adminCurrentLink}/school_batch/new`
              );
            }}
          >
            School Batch
          </button>
          <button
            className={
              data === "placement_batch" ? "activeCreateBtn" : "createBtn"
            }
            onClick={() => {
              navigate(
                `/sensec/users/admin/${adminCurrentAction}/${adminCurrentLink}/placement_batch/new`
              );
            }}
          >
            Placement Batch
          </button>
          <button
            className={
              data === "academic_year" ? "activeCreateBtn" : "createBtn"
            }
            onClick={() =>
              navigate(
                `/sensec/users/admin/${adminCurrentAction}/${adminCurrentLink}/academic_year/new`
              )
            }
          >
            Academic Year
          </button>
          <button
            className={
              data === "academic_term" ? "activeCreateBtn" : "createBtn"
            }
            onClick={() =>
              navigate(
                `/sensec/users/admin/${adminCurrentAction}/${adminCurrentLink}/academic_term/new`
              )
            }
          >
            Academic Term
          </button>
          <button
            className={data === "class_level" ? "activeCreateBtn" : "createBtn"}
            onClick={() =>
              navigate(
                `/sensec/users/admin/${adminCurrentAction}/${adminCurrentLink}/class_level/new`
              )
            }
          >
            Class Level
          </button>
          <button
            className={data === "program" ? "activeCreateBtn" : "createBtn"}
            onClick={() =>
              navigate(
                `/sensec/users/admin/${adminCurrentAction}/${adminCurrentLink}/program/new`
              )
            }
          >
            Program
          </button>
          <button
            className={
              data === "class_section" ? "activeCreateBtn" : "createBtn"
            }
            onClick={() =>
              navigate(
                `/sensec/users/admin/${adminCurrentAction}/${adminCurrentLink}/class_section/new`
              )
            }
          >
            Class Section
          </button>
          <button
            className={data === "house" ? "activeCreateBtn" : "createBtn"}
            onClick={() =>
              navigate(
                `/sensec/users/admin/${adminCurrentAction}/${adminCurrentLink}/house/new`
              )
            }
          >
            House
          </button>
          <button
            className={data === "subject" ? "activeCreateBtn" : "createBtn"}
            onClick={() =>
              navigate(
                `/sensec/users/admin/${adminCurrentAction}/${adminCurrentLink}/subject/new`
              )
            }
          >
            Subject
          </button>
          <button
            className={
              data === "old_students_group" ? "activeCreateBtn" : "createBtn"
            }
            onClick={() =>
              navigate(
                `/sensec/users/admin/${adminCurrentAction}/${adminCurrentLink}/old_students_group/new`
              )
            }
          >
            Graduates Group
          </button>
          <button
            className={data === "school_data" ? "activeCreateBtn" : "createBtn"}
            onClick={() => {
              navigate(
                `/sensec/users/admin/${adminCurrentAction}/${adminCurrentLink}/school_data/new`
              );
            }}
          >
            School Data
          </button>
          <button
            className={data === "time_table" ? "activeCreateBtn" : "createBtn"}
            onClick={() => {
              navigate(
                `/sensec/users/admin/${adminCurrentAction}/${adminCurrentLink}/time_table/new`
              );
            }}
          >
            Time Table
          </button>
        </Box>
      </Box>
      {/* Show form based on button selection */}
      {data === "school_batch" && <CreateAcademicBatch />}
      {data === "placement_batch" && <CreatePlacementBatch />}
      {data === "academic_year" && <CreateAcademicYear />}
      {data === "academic_term" && <CreateAcademicTerm />}
      {data === "class_level" && <CreateClassLevel />}
      {data === "class_section" && <CreateClassLevelSection />}
      {data === "program" && <CreateProgram />}
      {data === "house" && <CreateHouse />}
      {data === "subject" && <CreateSubject />}
      {data === "old_students_group" && <CreateOldStudentsGroup />}
      {data === "school_data" && <CreateSchoolInfoData />}
      {data === "time_table" && <CreateTimeTable />}
    </>
  );
}
