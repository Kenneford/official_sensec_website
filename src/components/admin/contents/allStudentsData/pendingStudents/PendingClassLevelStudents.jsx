import "../allStudentsData.scss";
import { useEffect, useLayoutEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { customUserTableStyle } from "../../../../../usersInfoDataFormat/usersInfoTableStyle";
import { Box, Grid } from "@mui/material";
import { AllStudentsPageQuickLinks } from "../../../../../linksFormat/LinksFormat";
import {
  fetchAllUsers,
  getAuthUser,
} from "../../../../../features/auth/authSlice";
import { FetchAllClassLevels } from "../../../../../data/class/FetchClassLevel";
import { FetchPendingClassLevelStudents } from "../../../../../data/students/FetchAllStudents";
import { pendingStudentsColumn } from "../../../../../usersInfoDataFormat/UsersInfoDataFormat";
import NewEnrollmentModal from "../../../../modals/NewEnrollmentModal";
import SearchFilter from "../../../../searchForm/SearchFilter";
import {
  MultiApprovalBtn,
  MultiRejectionBtn,
} from "../../../../lazyLoading/LazyComponents";
import {
  approvedMultiStudentEnrollment,
  rejectMultiStudentEnrollment,
  resetMultiApprovalState,
  resetMultiRejectionState,
} from "../../../../../features/students/studentsSlice";

export function PendingClassLevelStudents() {
  const authAdmin = useSelector(getAuthUser);
  const actionBtns = AllStudentsPageQuickLinks();
  const dispatch = useDispatch();
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
  const [loadingComplete, setLoadingComplete] = useState(null);
  const [openApproveEnrollmentModal, setOpenApproveEnrollmentModal] =
    useState(false);
  const [openRejectModal, setOpenRejectModal] = useState(false);
  const [currentStudent, setCurrentStudent] = useState("");
  const [rejectStudent, setRejectStudent] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const [classLevel, setClassLevel] = useState(false);
  const [uncompletedEmploymentTask, setUncompletedEmploymentTask] =
    useState("");
  const [rejectLoadingComplete, setRejectLoadingComplete] = useState(null);
  const [approveMultiLoadingComplete, setApproveMultiLoadingComplete] =
    useState(null);
  const [multiApprovalInProgress, setMultiApprovalInProgress] = useState(false);
  const [multiRejectionInProgress, setMultiRejectionInProgress] =
    useState(false);
  const [rejectMultiLoadingComplete, setRejectMultiLoadingComplete] =
    useState(null);

  const allClassLevels = FetchAllClassLevels();
  const pendingClassLevelStudents = FetchPendingClassLevelStudents(
    classLevel?._id
  );
  const singleClassLevel = {
    students: [],
  };

  const [searchStudent, setSearchStudent] = useState("");

  const filteredStudents = pendingClassLevelStudents?.filter(
    (std) =>
      std?.personalInfo?.fullName?.toLowerCase()?.includes(searchStudent) ||
      (std?.personalInfo?.fullName?.includes(searchStudent) && std)
  );
  const foundStudent = pendingClassLevelStudents?.find(
    (std) => std._id === currentStudent
  );
  const studentToReject = pendingClassLevelStudents?.find(
    (std) => std._id === rejectStudent
  );

  const handleNewEnrollment = () => {
    setRedirecting(true);
    setUncompletedEmploymentTask("You're being redirected");
    setTimeout(() => {
      navigate(
        `/sensec/users/${authAdmin?.uniqueId}/admin/${adminCurrentAction}/${adminCurrentLink}/new_enrollment/placement_verification`
      );
    }, 3000);
  };
  const pendingStudentsDataFormat = pendingStudentsColumn(
    authAdmin,
    setCurrentStudent,
    loadingComplete,
    setLoadingComplete,
    rejectLoadingComplete,
    setRejectLoadingComplete,
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
  // Find class-level via params
  useLayoutEffect(() => {
    const classLevelFound = allClassLevels?.find(
      (cLevel) => cLevel?.name === class_level?.replace(/_/g, " ")
    );
    // const studentProgramme = allProgrammes?.find(
    //   (program) => program?.name === programme?.replace(/_/g, " ")
    // );
    setClassLevel(classLevelFound);
  }, [allClassLevels, class_level]);

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
      if (rejectEnrollmentStatus === "success") {
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

  const currentClassLevelStd = `${class_level?.replace(
    /_/g,
    " "
  )} Pending Students / Total = 
              ${pendingClassLevelStudents?.length}`;
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
              Total Pending Students Found = {filteredStudents?.length}
            </p>
          )}
          {!searchStudent && (
            <p className="searchInfo">
              Total Students = {singleClassLevel?.sortedStudents?.length}
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
                key={action.label}
                onClick={() => {
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
        <Box
          sx={{
            display: "flex",
            gap: 1,
            fontSize: "calc(0.7rem + 1vmin)",
          }}
        >
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
        <Box className="studentDataTable">
          <DataTable
            title={currentClassLevelStd}
            columns={pendingStudentsDataFormat}
            data={filteredStudents}
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
