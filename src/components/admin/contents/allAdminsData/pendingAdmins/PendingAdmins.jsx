import { useEffect, useState } from "react";
import "../adminsData.scss";
import DataTable from "react-data-table-component";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import NewEmploymentModal from "../../../../modals/NewEmploymentModal";
import { customUserTableStyle } from "../../../../../usersInfoDataFormat/usersInfoTableStyle";
import { AllEmployedAdminsPageQuickLinks } from "../../../../../linksFormat/LinksFormat";
import { Box, Grid } from "@mui/material";
import {
  fetchAllUsers,
  getAuthUser,
} from "../../../../../features/auth/authSlice";
import { FetchAllPendingAdmins } from "../../../../../data/admins/FetchAdmins";
import SearchFilter from "../../../../searchForm/SearchFilter";
import { pendingAdminsColumn } from "../../../../../usersInfoDataFormat/UsersInfoDataFormat";
import {
  MultiApprovalBtn,
  MultiRejectionBtn,
} from "../../../../lazyLoading/LazyComponents";
import {
  approveMultiEmployees,
  rejectMultiEmployees,
  resetEmploymentApprovalState,
  resetEmploymentRejectionState,
  resetMultiApprovalState,
  resetMultiRejectionState,
} from "../../../../../features/employments/employmentSlice";

export function PendingAdmins() {
  const authAdmin = useSelector(getAuthUser);
  const navigate = useNavigate();
  const actionBtns = AllEmployedAdminsPageQuickLinks();
  const dispatch = useDispatch();
  const {
    approveEmploymentStatus,
    approveMultiEmploymentStatus,
    rejectEmploymentStatus,
    rejectMultiEmploymentStatus,
    successMessage,
    error,
  } = useSelector((state) => state.employment);
  const { adminCurrentAction, adminCurrentLink, employees_link } = useParams();
  const [currentAdmin, setCurrentAdmin] = useState("");
  const [loadingComplete, setLoadingComplete] = useState(null);
  const [rejectLoadingComplete, setRejectLoadingComplete] = useState(null);
  const [approveMultiLoadingComplete, setApproveMultiLoadingComplete] =
    useState(null);
  const [approvalInProgress, setApprovalInProgress] = useState(false);
  const [rejectionInProgress, setRejectionInProgress] = useState(false);
  console.log(approvalInProgress);

  const [multiApprovalInProgress, setMultiApprovalInProgress] = useState(false);
  const [multiRejectionInProgress, setMultiRejectionInProgress] =
    useState(false);
  const [rejectMultiLoadingComplete, setRejectMultiLoadingComplete] =
    useState(null);
  const [searchAdmin, setSearchAdmin] = useState("");
  const [adminFound, setAdminFound] = useState("");
  const [openRejectModal, setOpenRejectModal] = useState(false);
  const [openApproveEmploymentModal, setOpenApproveEmploymentModal] =
    useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [rejectAdmin, setRejectAdmin] = useState("");
  const [uncompletedEmploymentTask, setUncompletedEmploymentTask] =
    useState("");

  const allPendingAdmins = FetchAllPendingAdmins();
  const allFoundPendingAdmins = allPendingAdmins.filter((admin) => {
    return (
      admin?.personalInfo?.firstName?.toLowerCase().includes(searchAdmin) ||
      admin?.personalInfo?.firstName?.includes(searchAdmin) ||
      admin?.personalInfo?.lastName?.toLowerCase().includes(searchAdmin) ||
      admin?.personalInfo?.lastName?.includes(searchAdmin)
    );
  });

  const foundAdmin = allPendingAdmins?.find(
    (user) => user._id === currentAdmin
  );
  const adminToReject = allPendingAdmins?.find(
    (user) => user._id === rejectAdmin
  );

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

  const columnObjData = {
    setCurrentAdmin,
    loadingComplete,
    setLoadingComplete,
    rejectLoadingComplete,
    setRejectLoadingComplete,
    authAdmin,
    foundAdmin,
    approveEmploymentStatus,
    rejectEmploymentStatus,
    openApproveEmploymentModal,
    setOpenApproveEmploymentModal,
    setRejectAdmin,
    adminToReject,
    setOpenRejectModal,
    openRejectModal,
    setApprovalInProgress,
    approvalInProgress,
    rejectionInProgress,
    setRejectionInProgress,
  };
  const adminsData = pendingAdminsColumn(columnObjData);

  //THIS REMOVES THE HASHLINK TAG FROM THE URL
  if (window.location.hash) {
    window.history.replaceState("", document.title, window.location.pathname);
  }

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
    if (foundAdmin && !adminToReject) {
      if (approveEmploymentStatus === "pending") {
        setLoadingComplete(false);
        setApprovalInProgress(true);
      }
      if (approveEmploymentStatus === "rejected") {
        setTimeout(() => {
          setLoadingComplete(null);
          setApprovalInProgress(false);
          dispatch(resetEmploymentApprovalState());
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
      if (approveEmploymentStatus === "success") {
        setTimeout(() => {
          setLoadingComplete(true);
        }, 3000);
        setTimeout(() => {
          //Fetch all users again when successfully approved
          dispatch(resetEmploymentApprovalState());
          dispatch(fetchAllUsers());
          setApprovalInProgress(false);
          setLoadingComplete(null);
        }, 6000);
      }
    }
  }, [dispatch, approveEmploymentStatus, error, foundAdmin, adminToReject]);
  //Fetch all pending Admins again when successfully rejected
  useEffect(() => {
    if (adminToReject && !foundAdmin) {
      if (rejectEmploymentStatus === "pending") {
        setRejectLoadingComplete(false);
        setRejectionInProgress(true);
      }
      if (rejectEmploymentStatus === "rejected") {
        setTimeout(() => {
          setRejectLoadingComplete(null);
          setRejectionInProgress(false);
          dispatch(resetEmploymentRejectionState());
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
      if (rejectEmploymentStatus === "success") {
        setTimeout(() => {
          setRejectLoadingComplete(true);
        }, 3000);
        setTimeout(() => {
          //Fetch all users again when successfully rejected
          setRejectLoadingComplete(null);
          setRejectionInProgress(false);
          dispatch(fetchAllUsers());
          dispatch(resetEmploymentRejectionState());
        }, 6000);
      }
    }
  }, [dispatch, rejectEmploymentStatus, error, adminToReject, foundAdmin]);
  // Multi approval status check
  useEffect(() => {
    if (approveMultiEmploymentStatus === "pending") {
      setApproveMultiLoadingComplete(false);
    }
    if (approveMultiEmploymentStatus === "rejected") {
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
    if (approveMultiEmploymentStatus === "success") {
      setTimeout(() => {
        setApproveMultiLoadingComplete(true);
        setMultiEmployees([]);
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
    approveMultiEmploymentStatus,
    error,
    multiEmployees,
    toggleClearRows,
  ]);
  // Multi rejection status check
  useEffect(() => {
    if (rejectMultiEmploymentStatus === "pending") {
      setRejectMultiLoadingComplete(false);
    }
    if (rejectMultiEmploymentStatus === "rejected") {
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
    if (rejectMultiEmploymentStatus === "success") {
      setTimeout(() => {
        setRejectMultiLoadingComplete(true);
        setMultiEmployees([]);
      }, 3000);
      setTimeout(() => {
        //Fetch all users again when successfully rejected
        setRejectMultiLoadingComplete(null);
        // Toggle clear rows to reset selection
        setToggleClearRows(!toggleClearRows);
        dispatch(fetchAllUsers());
        setMultiRejectionInProgress(false);
        dispatch(resetMultiRejectionState());
      }, 6000);
    }
  }, [
    dispatch,
    rejectMultiEmploymentStatus,
    error,
    multiEmployees,
    toggleClearRows,
  ]);

  const allStd = `All Pending Admins / Total = ${allPendingAdmins?.length}`;
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
            value={searchAdmin}
            onChange={setSearchAdmin}
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
          {allFoundPendingAdmins?.length === 0 && searchAdmin !== "" && (
            <p className="searchInfo">
              We couldn&apos;t find any matches for &quot; {searchAdmin} &quot;
            </p>
          )}
          {allFoundPendingAdmins?.length === 0 && searchAdmin !== "" && (
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
          {searchAdmin && (
            <p className="searchInfo">
              Search Result = {allFoundPendingAdmins.length}
            </p>
          )}
          {!searchAdmin && (
            <p className="searchInfo">
              Total Admins = {allPendingAdmins.length}
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
                key={action.label}
                onClick={() => {
                  if (action.label === "Add New Admin +") {
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
                    : action?.label === "Add New Admin +"
                    ? "adminDashAddBtn"
                    : "adminDashBtn"
                }
                // className={changeBackgroundColor}
              >
                {/* {action.label !== "All" && action.label} */}
                {action.label === "All" ? "All Employed Admins" : action.label}
              </Grid>
            ))}
            <NewEmploymentModal
              open={openModal}
              onClose={() => setOpenModal(false)}
              handleNewEmployment={handleNewEmployment}
              redirecting={redirecting}
              uncompletedEmploymentTask={uncompletedEmploymentTask}
              question={"Are you sure you would like to employ a new Admin?"}
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
            approveMultiUsersDataStatus={approveMultiEmploymentStatus}
            approveMultiUsersDataLoadingComplete={approveMultiLoadingComplete}
            multiUsersDataRejectionInProgress={multiRejectionInProgress}
            setMultiUsersDataApprovalInProgress={setMultiApprovalInProgress}
            multiUsersDataApprovalFunction={approveMultiEmployees({
              employees: multiEmployees,
              employmentApprovedBy: `${authAdmin?.id}`,
            })}
          />
          <MultiRejectionBtn
            rejectMultiUsersDataStatus={rejectMultiEmploymentStatus}
            rejectMultiUsersDataLoadingComplete={rejectMultiLoadingComplete}
            multiUsersDataApprovalInProgress={multiApprovalInProgress}
            setMultiUsersDataRejectionInProgress={setMultiRejectionInProgress}
            multiUsersDataApprovalFunction={rejectMultiEmployees({
              employees: multiEmployees,
              employmentRejectedBy: `${authAdmin?.id}`,
            })}
          />
        </Box>
        <Box className="adminDataTable">
          <DataTable
            title={allStd}
            columns={adminsData}
            data={allFoundPendingAdmins}
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
