import React, { useEffect, useState } from "react";
import "../lecturersData.scss";
import SearchIcon from "@mui/icons-material/Search";
import DataTable from "react-data-table-component";
import { useNavigate, useParams } from "react-router-dom";
import NewEmploymentModal from "../../../../modals/NewEmploymentModal";
import { customUserTableStyle } from "../../../../../usersInfoDataFormat/usersInfoTableStyle";
import { Box, Grid } from "@mui/material";
import { AllEmployedLecturersPageQuickLinks } from "../../../../../linksFormat/LinksFormat";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllUsers,
  getAuthUser,
} from "../../../../../features/auth/authSlice";
import { FetchAllEmployedLecturers } from "../../../../../data/lecturers/FetchLecturers";
import { teachersColumn } from "../../../../../usersInfoDataFormat/UsersInfoDataFormat";
import SearchFilter from "../../../../searchForm/SearchFilter";
import { FetchAllClassLevels } from "../../../../../data/class/FetchClassLevel";
import { toast } from "react-toastify";
import {
  resetAssignLecturer,
  resetRemoveLecturer,
} from "../../../../../features/academics/classSectionSlice";

export function LecturersData() {
  const authAdmin = useSelector(getAuthUser);
  const allEmployedLecturers = FetchAllEmployedLecturers();
  const navigate = useNavigate();
  const actionBtns = AllEmployedLecturersPageQuickLinks();
  const dispatch = useDispatch();
  const { removeLecturerStatus, error } = useSelector(
    (state) => state.classSection
  );
  const [redirect, setRedirect] = useState(false);
  const [removingLecturer, setRemovingLecturer] = useState(null);
  const [lecturerToAssign, setLecturerToAssign] = useState("");
  const [lecturerToRemove, setLecturerToRemove] = useState("");
  console.log(lecturerToRemove);

  const allClassLevels = FetchAllClassLevels();

  const columnData = {
    authAdmin,
    redirect,
    setRedirect,
    navigate,
    removeLecturerStatus,
    setRemovingLecturer,
    removingLecturer,
    dispatch,
    lecturerToAssign,
    setLecturerToAssign,
    setLecturerToRemove,
    lecturerToRemove,
  };
  const teachersData = teachersColumn(columnData);
  const { adminCurrentAction, adminCurrentLink, class_level, employees_link } =
    useParams();

  const [searchTeacher, setSearchTeacher] = useState("");
  const teachersEmployed = allEmployedLecturers?.filter(
    (tch) =>
      (tch &&
        tch?.personalInfo?.firstName?.toLowerCase()?.includes(searchTeacher)) ||
      tch?.personalInfo?.firstName?.includes(searchTeacher) ||
      tch?.personalInfo?.lastName?.toLowerCase()?.includes(searchTeacher) ||
      tch?.personalInfo?.lastName?.includes(searchTeacher)
  );

  const [redirecting, setRedirecting] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [uncompletedEmploymentTask, setUncompletedEmploymentTask] =
    useState("");

  const handleNewEmployment = () => {
    setRedirecting(true);
    setUncompletedEmploymentTask("You're being redirected");
    setTimeout(() => {
      navigate(
        `/sensec/users/${authAdmin?.uniqueId}/admin/${adminCurrentAction}/new_employment`
      );
    }, 3000);
  };

  // Handle unassign lecturer status check
  useEffect(() => {
    if (removeLecturerStatus === "pending") {
      setRemovingLecturer(false);
    }
    if (removeLecturerStatus === "rejected") {
      setTimeout(() => {
        error?.errorMessage?.message?.map((err) =>
          toast.error(err, {
            position: "top-right",
            theme: "light",
            toastId: err,
          })
        );
      }, 2000);
      setTimeout(() => {
        setRemovingLecturer(null);
        dispatch(resetRemoveLecturer());
      }, 3000);
      return;
    }
    if (removeLecturerStatus === "success") {
      setTimeout(() => {
        setRemovingLecturer(true);
      }, 3000);
      setTimeout(() => {
        dispatch(resetRemoveLecturer());
        setRemovingLecturer(null);
        dispatch(fetchAllUsers());
      }, 6000);
    }
  }, [dispatch, removeLecturerStatus, error]);

  useEffect(() => {
    if (redirect) {
      setTimeout(() => {
        setRedirect(false);
      }, 3000);
    }
  }, [redirect]);

  const allStd = `All Employed Lecturers / Total = ${teachersEmployed?.length}`;
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
              Total Lecturers = {allEmployedLecturers?.length}
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
                  if (action.label === "Add New Lecturer +") {
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
                    : action?.label === "Add New Lecturer +"
                    ? "adminDashAddBtn"
                    : "adminDashBtn"
                }
              >
                {action.label === "All"
                  ? "All Employed Lecturers"
                  : action.label}
              </Grid>
            ))}
            <NewEmploymentModal
              open={openModal}
              onClose={() => setOpenModal(false)}
              handleNewEmployment={handleNewEmployment}
              redirecting={redirecting}
              uncompletedEmploymentTask={uncompletedEmploymentTask}
              question={"Are you sure you would like to employ a new Lecturer?"}
            />
          </Grid>
        </Box>
        <Grid
          container
          spacing={3}
          // className="addNewAdminBtnsWrap"
          width={"100%"}
          m={"0 auto"}
          className="classLevelLecturers"
        >
          {allClassLevels.map((cLevel) => (
            <Grid
              component={"span"}
              item
              xs={2.9}
              sm={2}
              // md={2}
              // lg={2}
              key={cLevel._id}
              onClick={() =>
                navigate(
                  `/sensec/users/${
                    authAdmin?.uniqueId
                  }/admin/${adminCurrentAction}/${adminCurrentLink}/employees/${employees_link}/${cLevel.name.replace(
                    / /g,
                    "_"
                  )}`
                )
              }
              className={
                cLevel.name === class_level
                  ? "classLevelLecturersBtn isActive"
                  : "classLevelLecturersBtn"
              }
            >
              {cLevel.name}
            </Grid>
          ))}
        </Grid>
        <Box className="lecturerDataTable">
          <DataTable
            title={allStd}
            columns={teachersData}
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
