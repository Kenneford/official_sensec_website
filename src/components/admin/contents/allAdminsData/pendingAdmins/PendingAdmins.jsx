import React, { useEffect, useState } from "react";
import "../adminsData.scss";
import SearchIcon from "@mui/icons-material/Search";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import EditIcon from "@mui/icons-material/Edit";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import DataTable from "react-data-table-component";
import { useLocation, useNavigate, useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { toast } from "react-toastify";
import axios from "axios";
import NewEmploymentModal from "../../../../actionModal/ActionModal";
import { customUserTableStyle } from "../../../../../usersInfoDataFormat/usersInfoTableStyle";
import { AllEmployedAdminsPageQuickLinks } from "../../../../../linksFormat/LinksFormat";
import { Box, Grid } from "@mui/material";
import { getAuthUser } from "../../../../../features/auth/authSlice";
import { useSelector } from "react-redux";

export function PendingAdmins() {
  const authAdmin = useSelector(getAuthUser);
  const navigate = useNavigate();
  const actionBtns = AllEmployedAdminsPageQuickLinks();
  // const dispatch = useDispatch();
  const userInfo = {};
  const allUsers = [];
  // const { approveAdminStatus, approveAdminSuccessMessage, approveAdminError } =
  //   useSelector((state) => state.admin);
  console.log(allUsers);
  const { adminCurrentAction, adminCurrentLink, employees_link } = useParams();
  console.log(adminCurrentLink);
  const [currentAdmin, setCurrentAdmin] = useState("");
  const [loadingComplete, setLoadingComplete] = useState(null);
  const [searchAdmin, setSearchAdmin] = useState("");
  const [adminFound, setAdminFound] = useState("");
  const [openApproveEmploymentModal, setOpenApproveEmploymentModal] =
    useState(false);

  const allPendingAdmins = [];
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
  console.log(allFoundPendingAdmins);
  const [currentActionBtn, setCurrentActionBtn] = useState(
    "Hanging Employments"
  );
  // const adminsData = pendingAdminsColumn(
  //   setCurrentAdmin,
  //   loadingComplete,
  //   setLoadingComplete,
  //   toast,
  //   dispatch,
  //   userInfo,
  //   foundAdmin,
  //   approveAdminStatus,
  //   openApproveEmploymentModal,
  //   setOpenApproveEmploymentModal
  // );
  const [redirecting, setRedirecting] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [uncompletedEmploymentTask, setUncompletedEmploymentTask] =
    useState("");

  //THIS REMOVES THE HASHLINK TAG FROM THE URL
  if (window.location.hash) {
    window.history.replaceState("", document.title, window.location.pathname);
  }

  const handleNewEmployment = () => {
    setRedirecting(true);
    setUncompletedEmploymentTask("You're being redirected");
    setTimeout(() => {
      navigate(
        `/sensec/admin/${adminCurrentAction}/${adminCurrentLink}/new_employment/personal_info`
      );
    }, 3000);
  };
  const handleAdminSearch = (e) => {
    e.preventDefault();
    if (searchAdmin) {
      // dispatch(searchForAdmin(searchAdmin));
    } else {
      toast.error("Search field is empty!", {
        position: "top-right",
        theme: "light",
        // toastId: successId,
      });
    }
  };

  //Fetch all pending Admins again when successfully approved
  // useEffect(() => {
  //   if (foundAdmin) {
  //     setLoadingComplete(false);
  //     if (approveAdminStatus === "pending") {
  //       setTimeout(() => {
  //         setLoadingComplete(true);
  //       }, 3000);
  //     }
  //     if (approveAdminStatus === "rejected") {
  //       setTimeout(() => {
  //         setLoadingComplete(null);
  //       }, 3000);
  //       setTimeout(() => {
  //         approveAdminError.errorMessage.message.map((err) =>
  //           toast.error(err, {
  //             position: "top-right",
  //             theme: "dark",
  //             // toastId: successId,
  //           })
  //         );
  //       }, 2000);
  //       return;
  //     }
  //     if (approveAdminStatus === "success") {
  //       setTimeout(() => {
  //         //Fetch all users again when successfully approved
  //         dispatch(fetchAllUsers());
  //       }, 6000);
  //     }
  //   }
  // }, [dispatch, approveAdminStatus, approveAdminError, foundAdmin]);

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
        {/* <Box sx={{ display: { xs: "none", sm: "block" } }}>
          <SearchForm
            value={searchedBlog}
            onChange={handleOnChange}
            placeholder={"Search"}
          />
        </Box> */}
      </Box>
      <Box
        className="allAdminsData"
        id="allAdmins"
        padding={{ xs: " 1rem .5rem", sm: " 1rem" }}
      >
        <Box className="searchDetails">
          {allFoundPendingAdmins?.length === 0 && searchAdmin !== "" && (
            <p className="searchInfo">
              We couldn't find any matches for " {searchAdmin} "
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
                // md={2}
                // lg={2}
                key={action.label}
                // minWidth={{ xs: "8rem", sm: "10rem" }}
                // maxWidth={{ xs: "10rem", sm: "15rem" }}
                // minWidth={"15rem"}
                onClick={() => {
                  setCurrentActionBtn(action.label);
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
        <Box>
          <DataTable
            title={allStd}
            // columns={adminsData}
            data={allFoundPendingAdmins}
            customStyles={customUserTableStyle}
            pagination
            selectableRows
            fixedHeader
            selectableRowsHighlight
            highlightOnHover
            responsive
          />
        </Box>
      </Box>
    </>
  );
}
