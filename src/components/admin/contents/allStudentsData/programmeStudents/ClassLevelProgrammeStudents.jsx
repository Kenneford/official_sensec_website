import "../allStudentsData.scss";
import React, { useEffect, useLayoutEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { customUserTableStyle } from "../../../../../usersInfoDataFormat/usersInfoTableStyle";
import { Box, Grid } from "@mui/material";
import ActionModal from "../../../../actionModal/ActionModal";
import { AllStudentsPageQuickLinks } from "../../../../../linksFormat/LinksFormat";
import { getAuthUser } from "../../../../../features/auth/authSlice";
import {
  FetchAllApprovedStudents,
  FetchApprovedClassLevelStudents,
  FetchClassLevelProgrammeStudents,
} from "../../../../../data/students/FetchAllStudents";
import { FetchAllClassLevels } from "../../../../../data/class/FetchClassLevel";
import { studentsColumn } from "../../../../../usersInfoDataFormat/UsersInfoDataFormat";
import SearchFilter from "../../../../searchForm/SearchFilter";
import { FetchAllClassSections } from "../../../../../data/class/FetchClassSections";
import { FetchAllProgrammes } from "../../../../../data/programme/FetchProgrammeData";

export function ClassLevelProgrammeStudents() {
  const authAdmin = useSelector(getAuthUser);
  const actionBtns = AllStudentsPageQuickLinks();
  // console.log(userInfo);
  // const {
  //   fetchingStudentStatus,
  //   searchStatus,
  //   searchStudentStatus,
  //   studentError,
  //   studentSuccessMessage,
  // } = useSelector((state) => state.student);
  // const {
  //   level100PromotionStatus,
  //   level200PromotionStatus,
  //   level300PromotionStatus,
  //   level100Error,
  //   level200Error,
  //   level300Error,
  //   level100SuccessMessage,
  //   level200SuccessMessage,
  //   level300SuccessMessage,
  //   level100MultiPromotionStatus,
  //   level100MultiSuccessMessage,
  // } = useSelector((state) => state.promotion);
  // const { fetchingSingleStatus, error, successMessage } = useSelector(
  //   (state) => state.classLevel
  // );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    program,
    class_level,
    adminCurrentLink,
    adminCurrentAction,
    student_category,
    programme,
  } = useParams();
  console.log(adminCurrentAction, adminCurrentLink);
  console.log(class_level, program);
  const [openModal, setOpenModal] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const [classLevel, setClassLevel] = useState("");
  const [programmeFound, setProgrammeFound] = useState("");
  const [uncompletedEmploymentTask, setUncompletedEmploymentTask] =
    useState("");
  const allProgrammes = FetchAllProgrammes();
  const allClassLevels = FetchAllClassLevels();
  const approvedStudents = FetchAllApprovedStudents();
  const classLevelStudents = FetchApprovedClassLevelStudents(classLevel?._id);
  const programmeStudents = FetchClassLevelProgrammeStudents(
    classLevel?._id,
    programmeFound?._id
  );
  const allClassLevelSections = FetchAllClassSections();
  const singleClassLevel = {
    students: [],
  };

  console.log(programmeStudents);
  console.log(allClassLevelSections);

  const [currentStudentId, setCurrentStudentId] = useState("");
  const [level100loadingComplete, setLevel100LoadingComplete] = useState(null);
  const [level200loadingComplete, setLevel200LoadingComplete] = useState(null);
  const [level300loadingComplete, setLevel300LoadingComplete] = useState(null);
  const [searchStudent, setSearchStudent] = useState("");

  const filteredStudents = programmeStudents?.filter(
    (std) =>
      std?.personalInfo?.firstName?.toLowerCase()?.includes(searchStudent) ||
      std?.personalInfo?.firstName?.includes(searchStudent) ||
      std?.personalInfo?.lastName?.toLowerCase()?.includes(searchStudent) ||
      std?.personalInfo?.lastName?.includes(searchStudent)
  );
  const foundStudent = programmeStudents?.find(
    (std) => std._id === currentStudentId
  );
  console.log(filteredStudents);

  const handleNewEnrollment = () => {
    setRedirecting(true);
    setUncompletedEmploymentTask("You're being redirected");
    setTimeout(() => {
      navigate(
        `/sensec/users/${authAdmin?.uniqueId}/admin/${adminCurrentAction}/${adminCurrentLink}/new_enrollment/placement_verification`
      );
    }, 3000);
  };
  const studentDataFormat = studentsColumn(
    authAdmin,
    foundStudent,
    adminCurrentAction,
    adminCurrentLink,
    setCurrentStudentId,
    setLevel100LoadingComplete,
    setLevel200LoadingComplete,
    setLevel300LoadingComplete,
    level100loadingComplete,
    level200loadingComplete,
    level300loadingComplete,
    // level100PromotionStatus,
    // level200PromotionStatus,
    // level300PromotionStatus,
    dispatch
  );

  //Student Promotion Level 100 Status Check
  // useEffect(() => {
  //   if (level100PromotionStatus === "pending") {
  //     setTimeout(() => {
  //       setLevel100LoadingComplete(true);
  //     }, 3000);
  //   }
  //   if (level100PromotionStatus === "rejected") {
  //     setTimeout(() => {
  //       setLevel100LoadingComplete(null);
  //     }, 3000);
  //     setTimeout(() => {
  //       level100Error?.errorMessage?.message?.map((err) =>
  //         toast.error(err, {
  //           position: "top-right",
  //           theme: "light",
  //         })
  //       );
  //     }, 2000);
  //     return;
  //   }
  //   if (level100loadingComplete && level100PromotionStatus === "success") {
  //     setTimeout(() => {
  //       toast.success(level100SuccessMessage, {
  //         position: "top-right",
  //         theme: "dark",
  //       });
  //     }, 1000);
  //     setTimeout(() => {
  //       dispatch(fetchAllClassLevelSections());
  //       dispatch(fetchClassLevels());
  //     }, 6000);
  //   }
  // }, [
  //   level100PromotionStatus,
  //   level100SuccessMessage,
  //   level100Error,
  //   level100loadingComplete,
  //   class_level,
  //   dispatch,
  // ]);

  //Student Promotion Level 200 Status Check
  // useEffect(() => {
  //   if (level200PromotionStatus === "pending") {
  //     setTimeout(() => {
  //       setLevel200LoadingComplete(true);
  //     }, 3000);
  //   }
  //   if (level200PromotionStatus === "rejected") {
  //     setTimeout(() => {
  //       setLevel200LoadingComplete(null);
  //     }, 3000);
  //     setTimeout(() => {
  //       level200Error?.errorMessage?.message?.map((err) =>
  //         toast.error(err, {
  //           position: "top-right",
  //           theme: "light",
  //           // toastId: successId,
  //         })
  //       );
  //     }, 2000);
  //     return;
  //   }
  //   if (level200loadingComplete && level200PromotionStatus === "success") {
  //     setTimeout(() => {
  //       toast.success(level200SuccessMessage, {
  //         position: "top-right",
  //         theme: "dark",
  //       });
  //     }, 1000);
  //     setTimeout(() => {
  //       dispatch(fetchAllClassLevelSections());
  //       dispatch(fetchClassLevels());
  //     }, 6000);
  //   }
  // }, [
  //   level200PromotionStatus,
  //   level200SuccessMessage,
  //   class_level,
  //   level200Error,
  //   level200loadingComplete,
  //   dispatch,
  // ]);

  //Student Promotion Level 300 Status Check
  // useEffect(() => {
  //   if (level300PromotionStatus === "pending") {
  //     setTimeout(() => {
  //       setLevel300LoadingComplete(true);
  //     }, 3000);
  //   }
  //   if (level300PromotionStatus === "rejected") {
  //     setTimeout(() => {
  //       setLevel300LoadingComplete(null);
  //     }, 3000);
  //     setTimeout(() => {
  //       level300Error?.errorMessage?.message?.map((err) =>
  //         toast.error(err, {
  //           position: "top-right",
  //           theme: "light",
  //           // toastId: successId,
  //         })
  //       );
  //     }, 2000);
  //     return;
  //   }
  //   if (level300loadingComplete && level300PromotionStatus === "success") {
  //     setTimeout(() => {
  //       toast.success(level300SuccessMessage, {
  //         position: "top-right",
  //         theme: "dark",
  //       });
  //     }, 1000);
  //     setTimeout(() => {
  //       dispatch(fetchAllClassLevelSections());
  //       dispatch(fetchClassLevels());
  //     }, 6000);
  //   }
  // }, [
  //   level300PromotionStatus,
  //   level300SuccessMessage,
  //   level300Error,
  //   level300loadingComplete,
  //   class_level,
  //   dispatch,
  // ]);

  useLayoutEffect(() => {
    const classLevelFound = allClassLevels?.find(
      (cLevel) => cLevel?.name === class_level?.replace(/_/g, " ")
    );
    const studentProgramme = allProgrammes?.find(
      (program) => program?.name === programme?.replace(/_/g, " ")
    );
    setClassLevel(classLevelFound);
    setProgrammeFound(studentProgramme);
  }, [allClassLevels, class_level, allProgrammes, programme]);

  const currentClassLevelStd = `${class_level?.replace(
    /_/g,
    " "
  )} ${programme?.replace(/_/g, " ")} Students / Total = 
              ${programmeStudents?.length}`;
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
        minHeight={"4rem"}
      >
        <h1 className="dashAction">
          {adminCurrentAction?.replace(/_/g, "-")} /{" "}
          <span>{adminCurrentLink?.replace(/_/g, " ")}</span>
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
              We couldn't find any matches for "{searchStudent}"
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
              Total Enrolled Students Found = {filteredStudents?.length}
            </p>
          )}
          {!searchStudent && (
            <p className="searchInfo">
              Total Students = {approvedStudents?.length}
            </p>
          )}
        </Box>
        <Box>
          <Grid
            container
            spacing={3}
            className="addNewStudentBtnsWrap"
            width={"100%"}
            m={"0 auto"}
          >
            {actionBtns.map((action) => (
              <Grid
                component={"span"}
                item
                xs={2.9}
                sm={2}
                key={action.label}
                onClick={() => {
                  // setCurrentActionBtn(action.label);
                  if (action.label === "Add New Student +") {
                    setOpenModal(true);
                  } else {
                    navigate(
                      `/sensec/users/${
                        authAdmin?.uniqueId
                      }/admin/${adminCurrentAction}/${adminCurrentLink}/${action.label.replace(
                        / /g,
                        "_"
                      )}`
                    );
                  }
                }}
                className={
                  student_category?.replace(/_/g, " ") === action.label
                    ? "studentDashBtn isActive"
                    : action?.label === "Add New Student +"
                    ? "studentDashAddBtn"
                    : "studentDashBtn"
                }
                // className={changeBackgroundColor}
              >
                {/* {action.label !== "All" && action.label} */}
                {action.label === "Enrolled"
                  ? "All Enrolled Students"
                  : action.label}
              </Grid>
            ))}
            <ActionModal
              open={openModal}
              onClose={() => setOpenModal(false)}
              handleNewEnrollment={handleNewEnrollment}
              redirecting={redirecting}
              uncompletedEmploymentTask={uncompletedEmploymentTask}
              question={"Are you sure you would like to enroll a new student?"}
            />
          </Grid>
        </Box>
        <Box>
          <Grid
            container
            spacing={3}
            // className="addNewAdminBtnsWrap"
            width={"100%"}
            m={"0 auto"}
            className="classLevelStudents"
          >
            {allClassLevels?.map((cLevel) => (
              <Grid
                component={"span"}
                item
                xs={2.9}
                sm={2}
                key={cLevel._id}
                onClick={() =>
                  navigate(
                    `/sensec/users/${
                      authAdmin?.uniqueId
                    }/admin/${adminCurrentAction}/${adminCurrentLink}/${student_category}/${cLevel.name.replace(
                      / /g,
                      "_"
                    )}`
                  )
                }
                className={
                  cLevel?.name === class_level?.replace(/_/g, " ")
                    ? "classLevelStudentsBtn isActive"
                    : "classLevelStudentsBtn"
                }
              >
                {cLevel.name}
              </Grid>
            ))}
          </Grid>
        </Box>
        <div className="classLeveSections">
          <div className="levelSections">
            {allClassLevelSections?.map((cLevel) => (
              <span key={cLevel?._id}>
                {cLevel?.classLevelName?.replace(/ /g, "_") === class_level && (
                  <HashLink
                    className={
                      cLevel?.classLevelName?.replace(/ /g, "_") ===
                        class_level &&
                      cLevel?.sectionName === programme?.replace(/_/g, " ")
                        ? "backgroundGreen"
                        : "backgroundYellow"
                    }
                    to={`/sensec/users/${
                      authAdmin?.uniqueId
                    }/admin/${adminCurrentAction}/${adminCurrentLink}/${student_category}/${cLevel?.classLevelName?.replace(
                      / /g,
                      "_"
                    )}/${cLevel.sectionName?.replace(/ /g, "_")}`}
                  >
                    {cLevel?.label}
                  </HashLink>
                )}
              </span>
            ))}
          </div>
        </div>
        <Box className="studentDataTable">
          <DataTable
            title={currentClassLevelStd}
            columns={studentDataFormat}
            data={filteredStudents}
            customStyles={customUserTableStyle}
            pagination
            selectableRows
            selectableRowsHighlight
            highlightOnHover
          />
        </Box>
      </Box>
    </>
  );
}
