import { useEffect, useState } from "react";
import "../ntStaffsData.scss";
import DataTable from "react-data-table-component";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import NewEmploymentModal from "../../../../actionModal/NewEmploymentModal";
import { customUserTableStyle } from "../../../../../usersInfoDataFormat/usersInfoTableStyle";
import { AllEmployedNTStaffsPageQuickLinks } from "../../../../../linksFormat/LinksFormat";
import { Box, Grid } from "@mui/material";
import {
  fetchAllUsers,
  getAuthUser,
} from "../../../../../features/auth/authSlice";
import { pendingNTStaffsColumn } from "../../../../../usersInfoDataFormat/UsersInfoDataFormat";
import { FetchAllPendingNTStaffs } from "../../../../../data/nt.staffs/FetchNT-Staffs";
import SearchFilter from "../../../../searchForm/SearchFilter";
import { FetchAllClassLevels } from "../../../../../data/class/FetchClassLevel";
import {
  resetMultiApprovalState,
  resetMultiRejectionState,
} from "../../../../../features/employments/employmentSlice";
import {
  MultiApprovalBtn,
  MultiRejectionBtn,
} from "../../../../lazyLoading/LazyComponents";

export function PendingNTStaffs() {
  const authAdmin = useSelector(getAuthUser);
  const allPendingNTStaffs = FetchAllPendingNTStaffs();
  const navigate = useNavigate();
  const actionBtns = AllEmployedNTStaffsPageQuickLinks();
  const dispatch = useDispatch();
  const allClassLevels = FetchAllClassLevels();
  const {
    approveEmploymentStatus,
    approveMultiEmploymentStatus,
    rejectEmploymentStatus,
    rejectMultiEmploymentStatus,
    successMessage,
    error,
  } = useSelector((state) => state.employment);
  const { adminCurrentAction, adminCurrentLink, class_level, employees_link } =
    useParams();
  const [currentNTStaff, setCurrentNTStaff] = useState("");
  const [rejectNTStaff, setRejectNTStaff] = useState("");
  const [currentLecturer, setCurrentLecturer] = useState("");
  const [loadingComplete, setLoadingComplete] = useState(null);
  const [searchTeacher, setSearchTeacher] = useState("");
  const [rejectLoadingComplete, setRejectLoadingComplete] = useState(null);
  const [approveMultiLoadingComplete, setApproveMultiLoadingComplete] =
    useState(null);
  const [multiApprovalInProgress, setMultiApprovalInProgress] = useState(false);
  const [multiRejectionInProgress, setMultiRejectionInProgress] =
    useState(false);
  const [rejectMultiLoadingComplete, setRejectMultiLoadingComplete] =
    useState(null);

  //Filter teacher during search
  const pendingLecturers = allPendingNTStaffs?.filter(
    (tch) =>
      tch.personalInfo.firstName.toLowerCase().includes(searchTeacher) ||
      tch.personalInfo.firstName.includes(searchTeacher) ||
      tch.personalInfo.lastName.toLowerCase().includes(searchTeacher) ||
      tch.personalInfo.lastName.includes(searchTeacher)
  );

  const foundNTStaff = allPendingNTStaffs?.find(
    (user) => user?._id === currentNTStaff
  );

  const nTStaffToReject = allPendingNTStaffs?.find(
    (user) => user?._id === rejectNTStaff
  );
  const [redirecting, setRedirecting] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openRejectModal, setOpenRejectModal] = useState(false);
  const [uncompletedEmploymentTask, setUncompletedEmploymentTask] =
    useState("");
  const [openApproveEmploymentModal, setOpenApproveEmploymentModal] =
    useState(false);
  const columnObjData = {
    setCurrentNTStaff,
    loadingComplete,
    setLoadingComplete,
    rejectLoadingComplete,
    setRejectLoadingComplete,
    authAdmin,
    foundNTStaff,
    approveEmploymentStatus,
    rejectEmploymentStatus,
    openApproveEmploymentModal,
    setOpenApproveEmploymentModal,
    setRejectNTStaff,
    nTStaffToReject,
    openRejectModal,
    setOpenRejectModal,
  };
  const teachersData = pendingNTStaffsColumn(columnObjData);

  // handle multi approval or rejection
  const [multiEmployees, setMultiEmployees] = useState([]);
  const [toggleClearRows, setToggleClearRows] = useState(false);
  console.log(multiEmployees);
  const handleMultiSelect = (state) => {
    if (state) {
      const employeeObj = state?.selectedRows?.map((user) => {
        const userId = {
          uniqueId: user?.uniqueId,
        };
        return userId;
      });
      setMultiEmployees(employeeObj);
    } else {
      setMultiEmployees([]);
    }
  };

  const handleNewEmployment = () => {
    setRedirecting(true);
    setUncompletedEmploymentTask("You're being redirected");
    setTimeout(() => {
      navigate(
        `/sensec/users/${authAdmin?.uniqueId}/admin/${adminCurrentAction}/new_employment`
      );
    }, 3000);
  };

  //Fetch all pending Admins again when successfully approved
  useEffect(() => {
    if (foundNTStaff && !nTStaffToReject) {
      if (approveEmploymentStatus === "pending") {
        setLoadingComplete(false);
      }
      if (approveEmploymentStatus === "rejected") {
        setTimeout(() => {
          setLoadingComplete(null);
        }, 3000);
        setTimeout(() => {
          error?.errorMessage?.message?.map((err) =>
            toast.error(err, {
              position: "top-right",
              theme: "dark",
              // toastId: successId,
            })
          );
        }, 2000);
        return;
      }
      if (approveEmploymentStatus === "success") {
        setTimeout(() => {
          setLoadingComplete(true);
        }, 3000);
        setTimeout(() => {
          //Fetch all users again when successfully approved
          dispatch(fetchAllUsers());
        }, 6000);
      }
    }
  }, [dispatch, approveEmploymentStatus, error, foundNTStaff, nTStaffToReject]);
  //Fetch all pending Admins again when successfully rejected
  useEffect(() => {
    if (nTStaffToReject && !foundNTStaff) {
      if (rejectEmploymentStatus === "pending") {
        setRejectLoadingComplete(false);
      }
      if (rejectEmploymentStatus === "rejected") {
        setTimeout(() => {
          setRejectLoadingComplete(null);
        }, 3000);
        setTimeout(() => {
          error?.errorMessage?.message?.map((err) =>
            toast.error(err, {
              position: "top-right",
              theme: "dark",
              // toastId: successId,
            })
          );
        }, 2000);
        return;
      }
      if (rejectEmploymentStatus === "success") {
        setTimeout(() => {
          setRejectLoadingComplete(true);
        }, 3000);
        setTimeout(() => {
          //Fetch all users again when successfully rejected
          dispatch(fetchAllUsers());
        }, 6000);
      }
    }
  }, [dispatch, rejectEmploymentStatus, error, nTStaffToReject, foundNTStaff]);

  // Multi approval status check
  useEffect(() => {
    if (multiEmployees && approveMultiEmploymentStatus === "pending") {
      setApproveMultiLoadingComplete(false);
    }
    if (multiEmployees && approveMultiEmploymentStatus === "rejected") {
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
            toastId: "multiApprovalError",
          })
        );
      }, 2000);
      return;
    }
    if (multiEmployees && approveMultiEmploymentStatus === "success") {
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
    approveMultiEmploymentStatus,
    error,
    multiEmployees,
    toggleClearRows,
  ]);
  // Multi rejection status check
  useEffect(() => {
    if (multiEmployees && rejectMultiEmploymentStatus === "pending") {
      setRejectMultiLoadingComplete(false);
    }
    if (multiEmployees && rejectMultiEmploymentStatus === "rejected") {
      setTimeout(() => {
        setRejectMultiLoadingComplete(null);
        setMultiRejectionInProgress(false);
        dispatch(resetMultiRejectionState());
      }, 3000);
      setTimeout(() => {
        error?.errorMessage?.message?.map((err) =>
          toast.error(err, {
            position: "top-right",
            theme: "dark",
            toastId: "multiRejectionError",
          })
        );
      }, 2000);
      return;
    }
    if (multiEmployees && rejectMultiEmploymentStatus === "success") {
      setTimeout(() => {
        setRejectMultiLoadingComplete(true);
      }, 3000);
      setTimeout(() => {
        //Fetch all users again when successfully rejected
        setRejectMultiLoadingComplete(null);
        setToggleClearRows(!toggleClearRows);
        dispatch(fetchAllUsers());
        dispatch(resetMultiRejectionState());
        setMultiRejectionInProgress(false);
      }, 6000);
    }
  }, [
    dispatch,
    rejectMultiEmploymentStatus,
    error,
    multiEmployees,
    toggleClearRows,
  ]);

  const allStd = `All Pending NT-Staff / Total = ${pendingLecturers?.length}`;
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
            value={searchTeacher}
            onChange={setSearchTeacher}
            placeholder={"Search"}
          />
        </Box>
      </Box>
      <Box
        className="allAdminsData"
        id="allAdmins"
        padding={{ xs: " 1rem .5rem", sm: " 1rem" }}
      >
        <Box className="searchDetails">
          {pendingLecturers?.length === 0 && searchTeacher !== "" && (
            <p className="searchInfo">
              We couldn&apos;t find any matches for &apos;{searchTeacher}&apos;
            </p>
          )}
          {pendingLecturers?.length === 0 && searchTeacher !== "" && (
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
          {searchTeacher && (
            <p className="searchInfo">
              Search Result = {pendingLecturers?.length}
            </p>
          )}
          {!searchTeacher && (
            <p className="searchInfo">
              Total NT-Staffs = {allPendingNTStaffs?.length}
            </p>
          )}
        </Box>
        <Box>
          <Grid
            container
            spacing={3}
            className="addNewAdminBtnsWrap"
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
                  if (action.label === "Add New NT-Staff +") {
                    setOpenModal(true);
                  } else {
                    navigate(
                      `/sensec/users/${
                        authAdmin?.uniqueId
                      }/admin/${adminCurrentAction}/${adminCurrentLink}/employees/${action.label.replace(
                        / /g,
                        "_"
                      )}`
                    );
                  }
                }}
                className={
                  employees_link?.replace(/_/g, " ") === action.label
                    ? "adminDashBtn isActive"
                    : action?.label === "Add New NT-Staff +"
                    ? "adminDashAddBtn"
                    : "adminDashBtn"
                }
              >
                {action.label === "All"
                  ? "All Employed NT-Staffs"
                  : action.label}
              </Grid>
            ))}
            <NewEmploymentModal
              open={openModal}
              onClose={() => setOpenModal(false)}
              handleNewEmployment={handleNewEmployment}
              redirecting={redirecting}
              uncompletedEmploymentTask={uncompletedEmploymentTask}
              question={"Are you sure you would like to employ a new NT-Staff?"}
            />
          </Grid>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: 1,
            fontSize: "calc(0.7rem + 1vmin)",
          }}
        >
          <MultiApprovalBtn
            employees={multiEmployees}
            approveMultiEmploymentStatus={approveMultiEmploymentStatus}
            approveMultiLoadingComplete={approveMultiLoadingComplete}
            // setApproveMultiLoadingComplete={setApproveMultiLoadingComplete}
            multiRejectionInProgress={multiRejectionInProgress}
            setMultiApprovalInProgress={setMultiApprovalInProgress}
          />
          <MultiRejectionBtn
            employees={multiEmployees}
            rejectMultiEmploymentStatus={rejectMultiEmploymentStatus}
            rejectMultiLoadingComplete={rejectMultiLoadingComplete}
            // setRejectMultiLoadingComplete={setRejectMultiLoadingComplete}
            multiApprovalInProgress={multiApprovalInProgress}
            setMultiRejectionInProgress={setMultiRejectionInProgress}
          />
        </Box>
        <Box className="lecturerDataTable">
          <DataTable
            title={allStd}
            columns={teachersData}
            data={pendingLecturers}
            customStyles={customUserTableStyle}
            pagination
            selectableRows
            fixedHeader
            selectableRowsHighlight
            highlightOnHover
            responsive
            onSelectedRowsChange={handleMultiSelect}
            clearSelectedRows={toggleClearRows}
          />
        </Box>
      </Box>
    </>
  );
}
