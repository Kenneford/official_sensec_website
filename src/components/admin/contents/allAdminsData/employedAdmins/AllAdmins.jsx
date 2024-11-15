import { useState } from "react";
import "../adminsData.scss";
import DataTable from "react-data-table-component";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AllEmployedAdminsPageQuickLinks } from "../../../../../linksFormat/LinksFormat";
import NewEmploymentModal from "../../../../actionModal/NewEmploymentModal";
import { customUserTableStyle } from "../../../../../usersInfoDataFormat/usersInfoTableStyle";
import { Box, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { getAuthUser } from "../../../../../features/auth/authSlice";
import { FetchAllEmployedAdmins } from "../../../../../data/admins/FetchAdmins";
import { adminsColumn } from "../../../../../usersInfoDataFormat/UsersInfoDataFormat";
import SearchFilter from "../../../../searchForm/SearchFilter";

export function AllAdmins() {
  const authAdmin = useSelector(getAuthUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { adminCurrentAction, adminCurrentLink, employees_link } = useParams();
  // Fetch All Employed Admins
  const allEmployedAdmins = FetchAllEmployedAdmins();

  const actionBtns = AllEmployedAdminsPageQuickLinks();

  const [searchAdmin, setSearchAdmin] = useState("");
  const allFoundAdmins = allEmployedAdmins?.filter((admin) => {
    return (
      admin.personalInfo.firstName.toLowerCase().includes(searchAdmin) ||
      admin.personalInfo.firstName.includes(searchAdmin) ||
      admin.personalInfo.lastName.toLowerCase().includes(searchAdmin) ||
      admin.personalInfo.lastName.includes(searchAdmin)
    );
  });
  const adminsData = adminsColumn(authAdmin);
  const [currentActionBtn, setCurrentActionBtn] = useState("");
  // const [searchAdmin, setSearchAdmin] = useState("");
  const [redirecting, setRedirecting] = useState(false);
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
        `/sensec/users/${authAdmin?.uniqueId}/admin/${adminCurrentAction}/new_employment`
      );
    }, 3000);
  };

  const allStd = `All Employed Admins / Total = ${allEmployedAdmins?.length}`;
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
          {allFoundAdmins?.length === 0 && searchAdmin !== "" && (
            <p className="searchInfo">
              We couldn&apos;t find any matches for &quot;{searchAdmin}
              &quot;
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
            <p className="searchInfo">
              Search Result = {allFoundAdmins?.length}
            </p>
          )}
          {!searchAdmin && (
            <p className="searchInfo">
              Total Admins = {allEmployedAdmins?.length}
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
                key={action?.label}
                // minWidth={{ xs: "8rem", sm: "10rem" }}
                // maxWidth={{ xs: "10rem", sm: "15rem" }}
                // minWidth={"15rem"}
                onClick={() => {
                  setCurrentActionBtn(action?.label);
                  if (action?.label === "Add New Admin +") {
                    setOpenModal(true);
                  } else {
                    navigate(
                      `/sensec/users/${
                        authAdmin?.uniqueId
                      }/admin/${adminCurrentAction}/${adminCurrentLink}/employees/${action?.label?.replace(
                        / /g,
                        "_"
                      )}`
                    );
                  }
                }}
                className={
                  employees_link?.replace(/_/g, " ") === action?.label
                    ? "adminDashBtn isActive"
                    : action?.label === "Add New Admin +"
                    ? "adminDashAddBtn"
                    : "adminDashBtn"
                }
                // className={changeBackgroundColor}
              >
                {/* {action.label !== "All" && action.label} */}
                {action?.label === "All"
                  ? "All Employed Admins"
                  : action?.label}
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
        <Box className="adminDataTable">
          <DataTable
            title={allStd}
            columns={adminsData}
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
    </>
  );
}
