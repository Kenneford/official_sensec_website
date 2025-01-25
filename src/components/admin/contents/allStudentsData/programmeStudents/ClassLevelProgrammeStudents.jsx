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
import { AllStudentsPageQuickLinks } from "../../../../../linksFormat/LinksFormat";
import {
  fetchAllUsers,
  getAuthUser,
} from "../../../../../features/auth/authSlice";
import {
  FetchAllApprovedStudents,
  FetchApprovedClassLevelStudents,
  FetchClassSectionStudents,
} from "../../../../../data/students/FetchAllStudents";
import { FetchAllClassLevels } from "../../../../../data/class/FetchClassLevel";
import { studentsColumn } from "../../../../../usersInfoDataFormat/UsersInfoDataFormat";
import SearchFilter from "../../../../searchForm/SearchFilter";
import { FetchAllClassSections } from "../../../../../data/class/FetchClassSections";
import {
  FetchAllDivisionProgrammes,
  FetchAllFlattenedProgrammes,
  FetchAllProgrammes,
} from "../../../../../data/programme/FetchProgrammeData";
import NewEnrollmentModal from "../../../../modals/NewEnrollmentModal";
import { resetPromotionState } from "../../../../../features/students/promotionSlice";

export function ClassLevelProgrammeStudents() {
  const authAdmin = useSelector(getAuthUser);
  const actionBtns = AllStudentsPageQuickLinks();
  const { promotionStatus, successMessage, error } = useSelector(
    (state) => state.promotion
  );

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

  const allProgrammes = FetchAllProgrammes();
  const allClassLevels = FetchAllClassLevels();
  const approvedStudents = FetchAllApprovedStudents();
  const allClassLevelSections = FetchAllClassSections();
  const allFlattenedProgrammes = FetchAllFlattenedProgrammes();
  // Find class section and pass its _id in FetchClassSectionStudents to get students
  const foundProgram = allFlattenedProgrammes?.find(
    (section) =>
      section?.name === programme?.replace(/_/g, " ") ||
      section?.divisionName === programme?.replace(/_/g, " ")
  );

  const programmeStudents = FetchClassSectionStudents({
    class_section: foundProgram?._id,
  });

  // console.log(allClassLevelSections);
  const [currentStudent, setCurrentStudent] = useState("");
  const [demoteStudent, setDemoteStudent] = useState("");
  const [openPromotionModal, setOpenPromotionModal] = useState(false);
  const [openDemotionModal, setOpenDemotionModal] = useState(false);
  const [promotionInProgress, setPromotionInProgress] = useState(false);
  const [demotionInProgress, setDemotionInProgress] = useState(false);
  const [loadingComplete, setLoadingComplete] = useState(null);
  const [demotionLoadingComplete, setDemotionLoadingComplete] = useState(null);
  const [searchStudent, setSearchStudent] = useState("");
  const [multiStudents, setMultiStudents] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const [uncompletedEmploymentTask, setUncompletedEmploymentTask] =
    useState("");

  const filteredStudents = programmeStudents?.filter(
    (std) =>
      std?.personalInfo?.fullName?.toLowerCase()?.includes(searchStudent) ||
      (std?.personalInfo?.fullName?.includes(searchStudent) && std)
  );

  //Find selected student to promote
  const studentToPromote = approvedStudents?.find(
    (std) => std?._id === currentStudent
  );

  //Find selected student to demote
  const studentToDemote = approvedStudents?.find(
    (std) => std?._id === demoteStudent
  );

  const columnData = {
    authAdmin,
    studentToPromote,
    adminCurrentAction,
    adminCurrentLink,
    setOpenPromotionModal,
    openPromotionModal,
    setCurrentStudent,
    setDemoteStudent,
    setLoadingComplete,
    loadingComplete,
    setDemotionLoadingComplete,
    demotionLoadingComplete,
    demotionInProgress,
    promotionInProgress,
    setOpenDemotionModal,
    openDemotionModal,
    promotionStatus,
    studentToDemote,
  };
  const studentDataFormat = studentsColumn(columnData);

  const handleNewEnrollment = () => {
    setRedirecting(true);
    setUncompletedEmploymentTask("You're being redirected");
    setTimeout(() => {
      navigate(
        `/sensec/users/${authAdmin?.uniqueId}/admin/${adminCurrentAction}/${adminCurrentLink}/new_enrollment/placement_verification`
      );
    }, 3000);
  };

  //Student Promotion Status Check
  useEffect(() => {
    if (studentToPromote) {
      if (promotionStatus === "pending") {
        setLoadingComplete(false);
        setPromotionInProgress(false);
      }
      if (promotionStatus === "rejected") {
        setTimeout(() => {
          setLoadingComplete(null);
          setPromotionInProgress(false);
          dispatch(resetPromotionState());
        }, 3000);
        setTimeout(() => {
          error?.errorMessage?.message?.map((err) =>
            toast.error(err, {
              position: "top-right",
              theme: "light",
              toastId: err,
            })
          );
        }, 2000);
        return;
      }
      if (promotionStatus === "success") {
        setTimeout(() => {
          setLoadingComplete(true);
        }, 3000);
        setTimeout(() => {
          toast.success(successMessage, {
            position: "top-right",
            theme: "dark",
            toastId: successMessage,
          });
        }, 1000);
        setTimeout(() => {
          //Fetch all users again when successfully approved
          dispatch(fetchAllUsers());
          dispatch(resetPromotionState());
          setPromotionInProgress(false);
          setLoadingComplete(null);
        }, 6000);
      }
    }
  }, [promotionStatus, successMessage, error, dispatch, studentToPromote]);

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
            <NewEnrollmentModal
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
        <Box className="classLeveSections">
          <Box className="levelSections">
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
          </Box>
        </Box>
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
