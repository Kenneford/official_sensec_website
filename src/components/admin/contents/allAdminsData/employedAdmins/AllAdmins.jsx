import React, { useState } from "react";
import "../adminsData.scss";
import SearchIcon from "@mui/icons-material/Search";
import DataTable from "react-data-table-component";
import { useNavigate, useParams } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { adminsColumn } from "../../usersInfoDataFormat/UsersInfoDataFormat";
// import PageLoading from "../../pageLoading/PageLoading";
// import { FetchEmployedAdmins } from "../../../dataFetching/fetchAdmins/FetchAdminsCategories";
import { AllEmployedAdminsPageQuickLinks } from "../../../../../linksFormat/LinksFormat";
import NewEmploymentModal from "../../../../NewEmploymentModal/NewEmploymentModal";
// import PageLoading from "../../../pageLoading/PageLoading";
// import { adminsColumn } from "../../../../usersInfoDataFormat/UsersInfoDataFormat";
import { customUserTableStyle } from "../../../../../usersInfoDataFormat/usersInfoTableStyle";
import { Box, Grid } from "@mui/material";

export function AllAdmins() {
  const navigate = useNavigate();
  //   const dispatch = useDispatch();
  const { adminCurrentAction, adminCurrentLink, employees_link } = useParams();
  // Fetch All Employed Admins
  const allAdmins = [];

  const actionBtns = AllEmployedAdminsPageQuickLinks();

  const [searchAdmin, setSearchAdmin] = useState("");
  const allFoundAdmins = allAdmins?.filter((admin) => {
    return (
      admin.personalInfo.firstName.toLowerCase().includes(searchAdmin) ||
      admin.personalInfo.firstName.includes(searchAdmin) ||
      admin.personalInfo.lastName.toLowerCase().includes(searchAdmin) ||
      admin.personalInfo.lastName.includes(searchAdmin)
    );
  });
  //   const adminsData = adminsColumn();
  const [currentActionBtn, setCurrentActionBtn] = useState("");
  // const [searchAdmin, setSearchAdmin] = useState("");
  const [redirecting, setRedirecting] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [uncompletedEmploymentTask, setUncompletedEmploymentTask] =
    useState("");

  //THIS REMOVES THE HASHLINK TAG FROM THE URL
  if (window.location.hash) {
    window.history.replaceState("", document.title, window.location.pathname);
  }

  const handleAdminSearch = (e) => {
    e.preventDefault();
  };

  const handleNewEmployment = () => {
    setRedirecting(true);
    setUncompletedEmploymentTask("You're being redirected");
    setTimeout(() => {
      navigate(
        `/sensec/admin/${adminCurrentAction}/${adminCurrentLink}/new_employment/personal_info`
      );
    }, 3000);
  };

  const backgroundColor = (actionBtn) => {
    if (employees_link?.replace(/_/g, " ") === actionBtn) {
      return "greenBackground";
    } else {
      return "allStdBtn";
    }
  };
  const changeBackgroundColor = backgroundColor(currentActionBtn);
  //   if (!allAdmins) {
  //     return <PageLoading />;
  //   }

  const allStd = `All Employed Admins / Total = ${allAdmins?.length}`;
  return (
    <Box
      className="allAdminsData"
      id="allAdmins"
      padding={{ xs: " 1rem .5rem", sm: " 1rem" }}
    >
      <Box className="searchDetails">
        {allFoundAdmins?.length === 0 && searchAdmin !== "" && (
          <p className="searchInfo">
            We couldn't find any matches for `&quot;`{searchAdmin}`&quot;`
          </p>
        )}
        {allFoundAdmins?.length === 0 && searchAdmin !== "" && (
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
          <p className="searchInfo">Search Result = {allFoundAdmins.length}</p>
        )}
        {!searchAdmin && (
          <p className="searchInfo">Total Admins = {allAdmins.length}</p>
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
                    `/sensec/users/admin/${adminCurrentAction}/${adminCurrentLink}/employees/${action.label.replace(
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
          data={allFoundAdmins}
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
  );
}
