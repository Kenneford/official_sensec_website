import React, { useEffect, useState } from "react";
import "../ntStaffsData.scss";
import SearchIcon from "@mui/icons-material/Search";
import DataTable from "react-data-table-component";
import { useNavigate, useParams } from "react-router-dom";
import NewEmploymentModal from "../../../../modals/NewEmploymentModal";
import { customUserTableStyle } from "../../../../../usersInfoDataFormat/usersInfoTableStyle";
import { Box, Grid } from "@mui/material";
import { AllEmployedNTStaffsPageQuickLinks } from "../../../../../linksFormat/LinksFormat";
import { useDispatch, useSelector } from "react-redux";
import { getAuthUser } from "../../../../../features/auth/authSlice";
import { nTStaffsColumn } from "../../../../../usersInfoDataFormat/UsersInfoDataFormat";
import { FetchAllEmployedNTStaffs } from "../../../../../data/nt.staffs/FetchNT-Staffs";
import SearchFilter from "../../../../searchForm/SearchFilter";

export function NTStaffsData() {
  const authAdmin = useSelector(getAuthUser);
  const allEmployedNTStaffs = FetchAllEmployedNTStaffs();
  const navigate = useNavigate();
  const actionBtns = AllEmployedNTStaffsPageQuickLinks();
  const dispatch = useDispatch();
  const { adminCurrentAction, adminCurrentLink, class_level, employees_link } =
    useParams();
  const [searchTeacher, setSearchTeacher] = useState("");
  const teachersEmployed = allEmployedNTStaffs?.filter(
    (tch) =>
      (tch &&
        tch?.personalInfo?.firstName?.toLowerCase()?.includes(searchTeacher)) ||
      tch?.personalInfo?.firstName?.includes(searchTeacher) ||
      tch?.personalInfo?.lastName?.toLowerCase()?.includes(searchTeacher) ||
      tch?.personalInfo?.lastName?.includes(searchTeacher)
  );

  const [redirecting, setRedirecting] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [uncompletedEmploymentTask, setUncompletedEmploymentTask] =
    useState("");

  const ntStaffsData = nTStaffsColumn(adminCurrentLink, authAdmin);
  const handleStudentSearch = (e) => {
    e.preventDefault();
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

  // useEffect(() => {
  //   dispatch(fetchClassLevels());
  //   dispatch(fetchTeachers());
  // }, [dispatch]);

  const allStd = `All Employed NT-Staffs / Total = ${teachersEmployed?.length}`;
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
          {teachersEmployed?.length === 0 && searchTeacher !== "" && (
            <p className="searchInfo">
              We couldn&apos;t find any matches for &apos;{searchTeacher}&apos;
            </p>
          )}
          {teachersEmployed?.length === 0 && searchTeacher !== "" && (
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
              Search Result = {teachersEmployed.length}
            </p>
          )}
          {!searchTeacher && (
            <p className="searchInfo">
              Total NT-Staffs = {allEmployedNTStaffs?.length}
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
        <Box className="lecturerDataTable">
          <DataTable
            title={allStd}
            columns={ntStaffsData}
            data={teachersEmployed}
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
