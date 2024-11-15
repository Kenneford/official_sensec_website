import "../allStudentsData.scss";
import SearchIcon from "@mui/icons-material/Search";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useNavigate, useParams } from "react-router-dom";
import { customUserTableStyle } from "../../../../../usersInfoDataFormat/usersInfoTableStyle";
import { Box, Grid } from "@mui/material";
import { AllStudentsPageQuickLinks } from "../../../../../linksFormat/LinksFormat";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllUsers,
  getAuthUser,
} from "../../../../../features/auth/authSlice";
import { FetchAllPendingStudents } from "../../../../../data/students/FetchAllStudents";
import { FetchAllClassLevels } from "../../../../../data/class/FetchClassLevel";
import { pendingStudentsColumn } from "../../../../../usersInfoDataFormat/UsersInfoDataFormat";
import { toast } from "react-toastify";
import NewEnrollmentModal from "../../../../modals/NewEnrollmentModal";
// import { toast } from "react-toastify";

export function PendingStudents() {
  const authAdmin = useSelector(getAuthUser);
  const actionBtns = AllStudentsPageQuickLinks();
  const allPendingStudents = FetchAllPendingStudents();
  const navigate = useNavigate();
  const {
    class_level,
    adminCurrentLink,
    adminCurrentAction,
    student_category,
  } = useParams();
  const {
    enrollmentApprovalStatus,
    successMessage,
    error,
    // approveMultiEnrollmentStatus,
    rejectEnrollmentStatus,
  } = useSelector((state) => state.student);
  const [searchStudent, setSearchStudent] = useState("");
  const [loadingComplete, setLoadingComplete] = useState(null);
  const [openApproveEnrollmentModal, setOpenApproveEnrollmentModal] =
    useState(false);
  const [openRejectModal, setOpenRejectModal] = useState(false);
  console.log(loadingComplete);
  const [currentStudent, setCurrentStudent] = useState("");
  const [rejectStudent, setRejectStudent] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const [uncompletedEmploymentTask, setUncompletedEmploymentTask] =
    useState("");
  const dispatch = useDispatch();
  const userInfo = {};

  const allClassLevels = FetchAllClassLevels();

  //Filter Students During Search
  const pendingStudents = allPendingStudents?.filter(
    (std) =>
      std?.personalInfo?.firstName?.toLowerCase()?.includes(searchStudent) ||
      std?.personalInfo?.firstName?.includes(searchStudent) ||
      std?.personalInfo?.lastName?.toLowerCase()?.includes(searchStudent) ||
      (std?.personalInfo?.lastName?.includes(searchStudent) && std)
  );

  const foundStudent = allPendingStudents?.find(
    (std) => std._id === currentStudent
  );
  console.log(foundStudent);

  const studentToReject = allPendingStudents?.find(
    (std) => std._id === rejectStudent
  );
  console.log(studentToReject);

  const pendingStudentsDataFormat = pendingStudentsColumn(
    authAdmin,
    setCurrentStudent,
    loadingComplete,
    setLoadingComplete,
    toast,
    dispatch,
    foundStudent,
    enrollmentApprovalStatus,
    openApproveEnrollmentModal,
    setOpenApproveEnrollmentModal,
    setRejectStudent,
    studentToReject,
    openRejectModal,
    setOpenRejectModal,
    rejectEnrollmentStatus,
    adminCurrentAction,
    adminCurrentLink
  );

  //THIS REMOVES THE HASHLINK TAG FROM THE URL
  if (window.location.hash) {
    window.history.replaceState("", document.title, window.location.pathname);
  }

  const handleNewEnrollment = () => {
    setRedirecting(true);
    setUncompletedEmploymentTask("You're being redirected");
    setTimeout(() => {
      navigate(
        `/sensec/users/${authAdmin?.uniqueId}/admin/${adminCurrentAction}/${adminCurrentLink}/new_enrollment/placement_verification`
      );
    }, 3000);
  };
  const handleStudentSearch = (e) => {
    e.preventDefault();
  };

  //Student Enrolment Approval Status Check
  useEffect(() => {
    if (foundStudent) {
      if (enrollmentApprovalStatus === "pending") {
        setLoadingComplete(false);
        setTimeout(() => {
          setLoadingComplete(true);
        }, 3000);
      }
      if (enrollmentApprovalStatus === "rejected") {
        setTimeout(() => {
          setLoadingComplete(null);
        }, 3000);
        setTimeout(() => {
          error?.errorMessage?.message?.map((err) =>
            toast.error(err, {
              position: "top-right",
              theme: "light",
              // toastId: successId,
            })
          );
        }, 2000);
        return;
      }
      if (loadingComplete && enrollmentApprovalStatus === "success") {
        setTimeout(() => {
          toast.success(successMessage, {
            position: "top-right",
            theme: "dark",
          });
        }, 1000);
        setTimeout(() => {
          //Fetch all users again when successfully approved
          dispatch(fetchAllUsers());
        }, 6000);
      }
    }
    if (studentToReject) {
      if (rejectEnrollmentStatus === "pending") {
        setLoadingComplete(false);
        setTimeout(() => {
          setLoadingComplete(true);
        }, 3000);
      }
      if (rejectEnrollmentStatus === "rejected") {
        setTimeout(() => {
          setLoadingComplete(null);
        }, 3000);
        setTimeout(() => {
          error?.errorMessage?.message?.map((err) =>
            toast.error(err, {
              position: "top-right",
              theme: "light",
              // toastId: successId,
            })
          );
        }, 2000);
        return;
      }
      if (loadingComplete && rejectEnrollmentStatus === "success") {
        setTimeout(() => {
          toast.success(successMessage, {
            position: "top-right",
            theme: "dark",
          });
        }, 1000);
        setTimeout(() => {
          //Fetch all users again when successfully approved
          dispatch(fetchAllUsers());
        }, 6000);
      }
    }
  }, [
    enrollmentApprovalStatus,
    successMessage,
    error,
    dispatch,
    loadingComplete,
    foundStudent,
    rejectEnrollmentStatus,
    studentToReject,
  ]);

  const title = `All Pending Students / Total = ${allPendingStudents?.length}`;

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
        {/* <Box sx={{ display: { xs: "none", sm: "block" } }}>
          <SearchForm
            value={searchedBlog}
            onChange={handleOnChange}
            placeholder={"Search"}
          />
        </Box> */}
      </Box>
      <Box
        className="allStudentsData"
        id="allStudents"
        padding={{ xs: " 1rem .5rem", sm: " 1rem" }}
      >
        <Box className="searchDetails">
          {allPendingStudents?.length === 0 && searchStudent !== "" && (
            <p className="searchInfo">
              We couldn't find any matches for "{searchStudent}"
            </p>
          )}
          {allPendingStudents?.length === 0 && searchStudent !== "" && (
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
              Search Result = {pendingStudents.length}
            </p>
          )}
          {!searchStudent && (
            <p className="searchInfo">
              Total Pending Students = {allPendingStudents?.length}
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
          </Grid>
        </Box>
        <Box className="studentDataTable">
          <DataTable
            title={title}
            columns={pendingStudentsDataFormat}
            data={pendingStudents}
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
