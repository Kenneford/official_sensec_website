import React, { useEffect, useState } from "react";
import "../adminsData.scss";
import SearchIcon from "@mui/icons-material/Search";
import DataTable from "react-data-table-component";
import { useNavigate, useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchAllHangingEmployments } from "../../../features/admin/adminsSlice";
// import { hangingEmploymentsColumn } from "../../usersInfoDataFormat/UsersInfoDataFormat";
import NewEmploymentModal from "../../../../actionModal/NewEmploymentModal";
import { customUserTableStyle } from "../../../../../usersInfoDataFormat/usersInfoTableStyle";
import { Box, Grid } from "@mui/material";
import { AllEmployedAdminsPageQuickLinks } from "../../../../../linksFormat/LinksFormat";
import { getAuthUser } from "../../../../../features/auth/authSlice";
import { useSelector } from "react-redux";

const actionBtns = [
  { label: "All" },
  { label: "Pending Admins" },
  { label: "Hanging Employments" },
];

export function HangingAdmins() {
  const authAdmin = useSelector(getAuthUser);
  const actionBtns = AllEmployedAdminsPageQuickLinks();
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const { adminCurrentAction, adminCurrentLink, employees_link } = useParams();

  const [searchAdmin, setSearchAdmin] = useState("");
  const userInfo = {};
  const allHangingEmployments = [];

  const allFoundHangingAdmins = allHangingEmployments?.filter((admin) => {
    return (
      admin.personalInfo.firstName.toLowerCase().includes(searchAdmin) ||
      admin.personalInfo.firstName.includes(searchAdmin) ||
      admin.personalInfo.lastName.toLowerCase().includes(searchAdmin) ||
      admin.personalInfo.lastName.includes(searchAdmin)
    );
  });

  const [currentActionBtn, setCurrentActionBtn] = useState(
    "Hanging Employments"
  );
  // const [searchAdmin, setSearchAdmin] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const [loadingComplete, setLoadingComplete] = useState(null);
  const [redirecting, setRedirecting] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [uncompletedEmploymentTask, setUncompletedEmploymentTask] =
    useState("");

  // const adminsData = hangingEmploymentsColumn(
  //   setCurrentUser,
  //   currentUser,
  //   loadingComplete,
  //   setLoadingComplete,
  //   redirecting
  // );
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
  };
  //If admin to update has no status, navigate to admin new employment status
  useEffect(() => {
    setLoadingComplete(false);
    if (currentUser && !currentUser?.status) {
      localStorage.setItem("newAdminUniqueId", currentUser?.uniqueId);
      setTimeout(() => {
        setLoadingComplete(true);
        setRedirecting(true);
      }, 2000);
      setTimeout(() => {
        navigate(
          `/sensec/admin/${adminCurrentAction}/${adminCurrentLink}/new_employment/status`
        );
      }, 5000);
    } else if (currentUser && !currentUser?.contactAddress) {
      localStorage.setItem("newAdminUniqueId", currentUser?.uniqueId);
      setTimeout(() => {
        setLoadingComplete(true);
        setRedirecting(true);
      }, 2000);
      setTimeout(() => {
        navigate(
          `/sensec/admin/${adminCurrentAction}/${adminCurrentLink}/new_employment/contact_address`
        );
      }, 5000);
    }
  }, [currentUser, adminCurrentAction, adminCurrentLink, navigate]);

  const allStd = `All Hanging Admins Employments / Total = ${allHangingEmployments?.length}`;
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
          {allFoundHangingAdmins?.length === 0 && searchAdmin !== "" && (
            <p className="searchInfo">
              We couldn't find any matches for " {searchAdmin} "
            </p>
          )}
          {allFoundHangingAdmins?.length === 0 && searchAdmin !== "" && (
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
              Search Result = {allFoundHangingAdmins.length}
            </p>
          )}
          {!searchAdmin && (
            <p className="searchInfo">
              Total Admins = {allHangingEmployments.length}
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
            data={allFoundHangingAdmins}
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
