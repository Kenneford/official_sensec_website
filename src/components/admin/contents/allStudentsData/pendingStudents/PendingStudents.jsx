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
import {
  FetchAllApprovedStudents,
  FetchAllPendingStudents,
} from "../../../../../data/students/FetchAllStudents";
import { FetchAllClassLevels } from "../../../../../data/class/FetchClassLevel";
import { pendingStudentsColumn } from "../../../../../usersInfoDataFormat/UsersInfoDataFormat";
import { toast } from "react-toastify";
import NewEnrollmentModal from "../../../../modals/NewEnrollmentModal";
import {
  MultiApprovalBtn,
  MultiRejectionBtn,
} from "../../../../lazyLoading/LazyComponents";
import {
  approvedMultiStudentEnrollment,
  rejectMultiStudentEnrollment,
  resetEnrolmentApprovalState,
  resetEnrolmentRejectionState,
  resetMultiApprovalState,
  resetMultiRejectionState,
} from "../../../../../features/students/studentsSlice";
import SearchFilter from "../../../../searchForm/SearchFilter";
// import { toast } from "react-toastify";

export function PendingStudents() {
  const authAdmin = useSelector(getAuthUser);
  const actionBtns = AllStudentsPageQuickLinks();
  const allPendingStudents = FetchAllPendingStudents();
  const allApprovedStudents = FetchAllApprovedStudents();
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
    approveMultiEnrollmentStatus,
    rejectEnrollmentStatus,
    rejectMultiEnrollmentStatus,
  } = useSelector((state) => state.student);
  const [searchStudent, setSearchStudent] = useState("");
  const [loadingComplete, setLoadingComplete] = useState(null);
  const [approvalInProgress, setApprovalInProgress] = useState(false);
  const [rejectionInProgress, setRejectionInProgress] = useState(false);
  const [rejectLoadingComplete, setRejectLoadingComplete] = useState(null);
  const [approveMultiLoadingComplete, setApproveMultiLoadingComplete] =
    useState(null);
  const [multiApprovalInProgress, setMultiApprovalInProgress] = useState(false);
  const [multiRejectionInProgress, setMultiRejectionInProgress] =
    useState(false);
  const [rejectMultiLoadingComplete, setRejectMultiLoadingComplete] =
    useState(null);

  const [openApproveEnrollmentModal, setOpenApproveEnrollmentModal] =
    useState(false);
  const [openRejectModal, setOpenRejectModal] = useState(false);
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

  const studentToReject = allPendingStudents?.find(
    (std) => std._id === rejectStudent
  );

  // handle multi approval or rejection
  const [multiStudents, setMultiStudents] = useState([]);
  const [toggleClearRows, setToggleClearRows] = useState(false);
  const handleMultiSelect = (state) => {
    if (state) {
      const studentObj = state?.selectedRows?.map((user) => {
        const userId = {
          uniqueId: user?.uniqueId,
        };
        return userId;
      });
      setMultiStudents(studentObj);
    } else {
      setMultiStudents([]);
    }
  };

  const columnData = {
    authAdmin,
    setCurrentStudent,
    loadingComplete,
    setLoadingComplete,
    rejectLoadingComplete,
    setRejectLoadingComplete,
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
    adminCurrentLink,
    approvalInProgress,
    rejectionInProgress,
  };

  const pendingStudentsDataFormat = pendingStudentsColumn(columnData);

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

  //Student Enrolment Approval Status Check
  useEffect(() => {
    if (foundStudent) {
      if (enrollmentApprovalStatus === "pending") {
        setLoadingComplete(false);
        setApprovalInProgress(false);
      }
      if (enrollmentApprovalStatus === "rejected") {
        setTimeout(() => {
          setLoadingComplete(null);
          setApprovalInProgress(false);
          dispatch(resetEnrolmentApprovalState());
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
      if (enrollmentApprovalStatus === "success") {
        setTimeout(() => {
          toast.success(successMessage, {
            position: "top-right",
            theme: "dark",
            toastId: successMessage,
          });
        }, 1000);
        setTimeout(() => {
          setLoadingComplete(true);
        }, 3000);
        setTimeout(() => {
          //Fetch all users again when successfully approved
          dispatch(fetchAllUsers());
          dispatch(resetEnrolmentApprovalState());
          setApprovalInProgress(false);
          setLoadingComplete(null);
        }, 6000);
      }
    }
  }, [enrollmentApprovalStatus, successMessage, error, dispatch, foundStudent]);
  // Rejection status check
  useEffect(() => {
    if (studentToReject) {
      if (rejectEnrollmentStatus === "pending") {
        setRejectLoadingComplete(false);
        setRejectionInProgress(true);
      }
      if (rejectEnrollmentStatus === "rejected") {
        setTimeout(() => {
          setRejectLoadingComplete(null);
          setRejectionInProgress(false);
          dispatch(resetEnrolmentRejectionState());
        }, 3000);
        setTimeout(() => {
          error.errorMessage.message.map((err) =>
            toast.error(err, {
              position: "top-right",
              theme: "dark",
              // toastId: successId,
            })
          );
        }, 2000);
        return;
      }
      if (rejectEnrollmentStatus === "success") {
        setTimeout(() => {
          setRejectLoadingComplete(true);
        }, 3000);
        setTimeout(() => {
          //Fetch all users again when successfully rejected
          setRejectLoadingComplete(null);
          setRejectionInProgress(false);
          dispatch(fetchAllUsers());
          dispatch(resetEnrolmentRejectionState());
        }, 6000);
      }
    }
  }, [dispatch, rejectEnrollmentStatus, error, studentToReject]);

  // Multi approval status check
  useEffect(() => {
    if (multiStudents && approveMultiEnrollmentStatus === "pending") {
      setApproveMultiLoadingComplete(false);
    }
    if (multiStudents && approveMultiEnrollmentStatus === "rejected") {
      setTimeout(() => {
        setApproveMultiLoadingComplete(null);
        setMultiApprovalInProgress(false);
        dispatch(resetMultiApprovalState());
      }, 3000);
      setTimeout(() => {
        error?.errorMessage?.message?.map((err) =>
          toast.error(err, {
            position: "top-right",
            theme: "dark",
            toastId: "multiStudentApprovalError",
          })
        );
      }, 2000);
      return;
    }
    if (multiStudents && approveMultiEnrollmentStatus === "success") {
      setTimeout(() => {
        setApproveMultiLoadingComplete(true);
      }, 3000);
      setTimeout(() => {
        //Fetch all users again when successfully approved
        dispatch(fetchAllUsers());
        setToggleClearRows(!toggleClearRows);
        dispatch(resetMultiApprovalState());
        setMultiApprovalInProgress(false);
        setApproveMultiLoadingComplete(null);
      }, 6000);
    }
  }, [
    dispatch,
    approveMultiEnrollmentStatus,
    error,
    multiStudents,
    toggleClearRows,
  ]);
  // Multi rejection status check
  useEffect(() => {
    if (multiStudents && rejectMultiEnrollmentStatus === "pending") {
      setRejectMultiLoadingComplete(false);
    }
    if (multiStudents && rejectMultiEnrollmentStatus === "rejected") {
      setTimeout(() => {
        setRejectMultiLoadingComplete(null);
        setMultiApprovalInProgress(false);
        dispatch(resetMultiRejectionState());
      }, 3000);
      setTimeout(() => {
        error?.errorMessage?.message?.map((err) =>
          toast.error(err, {
            position: "top-right",
            theme: "dark",
            toastId: "multiStudentRejectionError",
          })
        );
      }, 2000);
      return;
    }
    if (multiStudents && rejectMultiEnrollmentStatus === "success") {
      setTimeout(() => {
        setRejectMultiLoadingComplete(true);
      }, 3000);
      setTimeout(() => {
        //Fetch all users again when successfully approved
        dispatch(fetchAllUsers());
        setToggleClearRows(!toggleClearRows);
        dispatch(resetMultiRejectionState());
        setMultiApprovalInProgress(false);
        setRejectMultiLoadingComplete(null);
      }, 6000);
    }
  }, [
    dispatch,
    approveMultiEnrollmentStatus,
    error,
    multiStudents,
    toggleClearRows,
    rejectMultiEnrollmentStatus,
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
        <Box className="searchDetails" justifyItems={"flex-start"}>
          {pendingStudents?.length === 0 && searchStudent !== "" && (
            <p className="searchInfo">
              We couldn&apos;t find any matches for &quot;{searchStudent}&quot;
            </p>
          )}
          {pendingStudents?.length === 0 && searchStudent !== "" && (
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
              Total Pending Students Found = {pendingStudents?.length}
            </p>
          )}
          {!searchStudent && (
            <p className="searchInfo">
              Total Students = {allApprovedStudents?.length}
            </p>
          )}
        </Box>
        {/* Student types selection buttons */}
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
                // minWidth={"5.5rem"}
                // mb={".2rem"}
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
        {/* Class-level buttons */}
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
                // minWidth={"5.5rem"}
                mb={".2rem"}
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
        {/* Approval buttons */}
        <Box sx={{ display: "flex", gap: 1 }}>
          <MultiApprovalBtn
            approveMultiUsersDataStatus={approveMultiEnrollmentStatus}
            approveMultiUsersDataLoadingComplete={approveMultiLoadingComplete}
            multiUsersDataRejectionInProgress={multiRejectionInProgress}
            setMultiUsersDataApprovalInProgress={setMultiApprovalInProgress}
            multiUsersDataApprovalFunction={approvedMultiStudentEnrollment({
              students: multiStudents,
              enrollmentApprovedBy: `${authAdmin?.id}`,
            })}
          />
          <MultiRejectionBtn
            rejectMultiUsersDataStatus={rejectMultiEnrollmentStatus}
            rejectMultiUsersDataLoadingComplete={rejectMultiLoadingComplete}
            multiUsersDataApprovalInProgress={multiApprovalInProgress}
            setMultiUsersDataRejectionInProgress={setMultiRejectionInProgress}
            multiUsersDataApprovalFunction={rejectMultiStudentEnrollment({
              students: multiStudents,
              enrollmentRejectedBy: `${authAdmin?.id}`,
            })}
          />
        </Box>
        {/* Table data */}
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
            onSelectedRowsChange={handleMultiSelect}
            clearSelectedRows={toggleClearRows}
          />
        </Box>
      </Box>
    </>
  );
}
