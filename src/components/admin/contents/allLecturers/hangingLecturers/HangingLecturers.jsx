import React, { useEffect, useState } from "react";
import "../lecturersData.scss";
import SearchIcon from "@mui/icons-material/Search";
import DataTable from "react-data-table-component";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import NewEmploymentModal from "../../../../actionModal/NewEmploymentModal";
import { customUserTableStyle } from "../../../../../usersInfoDataFormat/usersInfoTableStyle";
import { Box, Grid } from "@mui/material";
import { AllEmployedLecturersPageQuickLinks } from "../../../../../linksFormat/LinksFormat";
import { getAuthUser } from "../../../../../features/auth/authSlice";

export function HangingLecturers() {
  const authAdmin = useSelector(getAuthUser);
  const navigate = useNavigate();
  const actionBtns = AllEmployedLecturersPageQuickLinks();
  const dispatch = useDispatch();
  // const userInfo = useSelector(getUser);
  const allUsers = [];
  const allHangingEmployments = [];
  console.log(allUsers);
  const { adminCurrentAction, adminCurrentLink, employees_link } = useParams();
  console.log(adminCurrentLink);

  const [searchTeacher, setSearchTeacher] = useState("");

  //Filter teacher during search
  const hangingEmployments = allHangingEmployments?.filter(
    (tch) =>
      tch?.personalInfo?.firstName?.toLowerCase()?.includes(searchTeacher) ||
      tch?.personalInfo?.firstName?.includes(searchTeacher) ||
      tch?.personalInfo?.lastName?.toLowerCase()?.includes(searchTeacher) ||
      tch?.personalInfo?.lastName?.includes(searchTeacher)
  );
  const [currentActionBtn, setCurrentActionBtn] = useState(
    "Hanging Employments"
  );
  console.log(currentActionBtn);
  const [currentUser, setCurrentUser] = useState("");
  const [loadingComplete, setLoadingComplete] = useState(null);
  const [redirecting, setRedirecting] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [uncompletedEmploymentTask, setUncompletedEmploymentTask] =
    useState("");
  console.log(currentUser);

  // const teachersData = hangingEmploymentsColumn(
  //   setCurrentUser,
  //   currentUser,
  //   loadingComplete,
  //   setLoadingComplete,
  //   redirecting
  // );

  const handleNewEmployment = () => {
    setRedirecting(true);
    setUncompletedEmploymentTask("You're being redirected");
    setTimeout(() => {
      navigate(
        `/sensec/admin/${adminCurrentAction}/${adminCurrentLink}/new_employment/personal_info`
      );
    }, 3000);
  };
  const handleStudentSearch = (e) => {
    e.preventDefault();
    if (searchTeacher) {
      // dispatch(studentSearch(searchTeacher));
    } else {
      toast.error("Search field is empty!", {
        position: "top-right",
        theme: "light",
        // toastId: successId,
      });
    }
  };

  //If admin to update has no status, navigate to admin new employment status
  useEffect(() => {
    setLoadingComplete(false);
    if (currentUser && !currentUser?.teacherSchoolData) {
      localStorage.setItem("newTeacherUniqueId", currentUser?.uniqueId);
      setTimeout(() => {
        setLoadingComplete(true);
        setRedirecting(true);
      }, 2000);
      setTimeout(() => {
        navigate(
          `/sensec/admin/${adminCurrentAction}/${adminCurrentLink}/new_employment/school_data`
        );
      }, 5000);
    } else if (currentUser && !currentUser?.status) {
      localStorage.setItem("newTeacherUniqueId", currentUser?.uniqueId);
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
      localStorage.setItem("newTeacherUniqueId", currentUser?.uniqueId);
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

  const allStd = `All Hanging Admins Employments / Total = ${hangingEmployments?.length}`;
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
          {hangingEmployments?.length === 0 && searchTeacher !== "" && (
            <p className="searchInfo">
              We couldn't find any matches for "{searchTeacher}"
            </p>
          )}
          {hangingEmployments?.length === 0 && searchTeacher !== "" && (
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
              Search Result = {hangingEmployments?.length}
            </p>
          )}
          {!searchTeacher && (
            <p className="searchInfo">
              Total Lecturers = {allHangingEmployments?.length}
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
                // className={changeBackgroundColor}
              >
                {/* {action.label !== "All" && action.label} */}
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
        <Box>
          <DataTable
            title={allStd}
            // columns={adminsData}
            data={hangingEmployments}
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
