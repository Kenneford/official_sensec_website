import React, { useEffect, useState } from "react";
// import "../allStudentsData.scss";
// import SearchIcon from "@mui/icons-material/Search";
import DataTable from "react-data-table-component";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import {
//   promotingMultipleStudentsToLevel200,
//   promotingToLevel200,
//   promotingToLevel300,
// } from "../../../../features/student/promotionSlice";
import { customUserTableStyle } from "../../../../../usersInfoDataFormat/usersInfoTableStyle";
import { Box, Grid } from "@mui/material";
import { AllStudentsPageQuickLinks } from "../../../../../linksFormat/LinksFormat";
import {
  fetchAllUsers,
  getAuthUser,
} from "../../../../../features/auth/authSlice";
import { FetchAllApprovedStudents } from "../../../../../data/students/FetchAllStudents";
import { studentsColumn } from "../../../../../usersInfoDataFormat/UsersInfoDataFormat";
import SearchFilter from "../../../../searchForm/SearchFilter";
import { FetchAllClassLevels } from "../../../../../data/class/FetchClassLevel";
import NewEnrollmentModal from "../../../../modals/NewEnrollmentModal";
import { resetPromotionState } from "../../../../../features/students/promotionSlice";
import { toast } from "react-toastify";

export function AllEnrolledStudents() {
  const authAdmin = useSelector(getAuthUser);
  const actionBtns = AllStudentsPageQuickLinks();
  const approvedStudents = FetchAllApprovedStudents();
  //Get state data
  const allClassLevels = FetchAllClassLevels();
  const { promotionStatus, successMessage, error } = useSelector(
    (state) => state.promotion
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    adminCurrentLink,
    adminCurrentAction,
    class_level,
    student_category,
  } = useParams();

  //Promotion status values
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

  //State hooks
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

  //Find selected student to promote
  const studentToPromote = approvedStudents?.find(
    (std) => std?._id === currentStudent
  );

  //Find selected student to demote
  const studentToDemote = approvedStudents?.find(
    (std) => std?._id === demoteStudent
  );

  //Filter students during search
  const filteredStudents = approvedStudents?.filter(
    (std) =>
      std?.personalInfo?.firstName?.toLowerCase()?.includes(searchStudent) ||
      std?.personalInfo?.firstName?.includes(searchStudent) ||
      std?.personalInfo?.lastName?.toLowerCase()?.includes(searchStudent) ||
      std?.personalInfo?.lastName?.includes(searchStudent)
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

  const handleMultiSelect = (state) => {
    setMultiStudents(state.selectedRows);
  };

  const handleNewEnrollment = () => {
    setRedirecting(true);
    setUncompletedEmploymentTask("You're being redirected");
    setTimeout(() => {
      navigate(
        `/sensec/users/${authAdmin?.uniqueId}/admin/${adminCurrentAction}/${adminCurrentLink}/new_enrollment/placement_verification`
        // `/sensec/users/${authAdmin?.uniqueId}/admin/${adminCurrentAction}/${adminCurrentLink}/new_enrollment`
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

  const allStd = `All Enrolled Students / Total = ${approvedStudents?.length}`;
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
        // id="allStudents"
        padding={{ xs: " 1rem .5rem", sm: " 1rem" }}
      >
        <Box className="searchDetails" justifyItems={"flex-start"}>
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
                // md={2}
                // lg={2}
                key={action.label}
                // minWidth={{ xs: "8rem", sm: "10rem" }}
                // maxWidth={{ xs: "10rem", sm: "15rem" }}
                // minWidth={"15rem"}
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
            <>
              {allClassLevels.map((cLevel) => (
                <Grid
                  component={"span"}
                  item
                  xs={2.9}
                  sm={2}
                  key={cLevel.name}
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
              <Grid
                component={"span"}
                item
                xs={2.9}
                sm={2}
                onClick={() =>
                  navigate(
                    `/sensec/users/${authAdmin?.uniqueId}/admin/${adminCurrentAction}/${adminCurrentLink}/Graduates`
                  )
                }
                // to={`/sensec/users/admin/${adminCurrentAction}/${adminCurrentLink}/old_students/graduates`}
                className="classLevelStudentsBtn"
              >
                Graduates
              </Grid>
            </>
          </Grid>
        </Box>
        <Box className="studentDataTable">
          <DataTable
            title={allStd}
            columns={studentDataFormat}
            data={filteredStudents}
            customStyles={customUserTableStyle}
            pagination
            selectableRows
            fixedHeader
            selectableRowsHighlight
            highlightOnHover
            responsive
            onSelectedRowsChange={handleMultiSelect}
          />
        </Box>
      </Box>
    </>
  );
}
