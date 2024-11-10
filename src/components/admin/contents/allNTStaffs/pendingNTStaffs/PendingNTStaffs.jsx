import { useEffect, useState } from "react";
import "../ntStaffsData.scss";
import DataTable from "react-data-table-component";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import NewEmploymentModal from "../../../../actionModal/ActionModal";
import { customUserTableStyle } from "../../../../../usersInfoDataFormat/usersInfoTableStyle";
import { AllEmployedNTStaffsPageQuickLinks } from "../../../../../linksFormat/LinksFormat";
import { Box, Grid } from "@mui/material";
import { getAuthUser } from "../../../../../features/auth/authSlice";
import { pendingNTStaffsColumn } from "../../../../../usersInfoDataFormat/UsersInfoDataFormat";
import { FetchAllPendingNTStaffs } from "../../../../../data/nt.staffs/FetchNT-Staffs";
import SearchFilter from "../../../../searchForm/SearchFilter";

export function PendingNTStaffs() {
  const authAdmin = useSelector(getAuthUser);
  const allPendingNTStaffs = FetchAllPendingNTStaffs();
  const navigate = useNavigate();
  const actionBtns = AllEmployedNTStaffsPageQuickLinks();
  const dispatch = useDispatch();
  const userInfo = {};
  const allClassLevels = [
    {
      name: "Level 100",
    },
    {
      name: "Level 200",
    },
    {
      name: "Level 300",
    },
  ];
  // const { approveTeacherEmploymentStatus, approveTeacherEmploymentError } =
  //   useSelector((state) => state.teacher);
  const {
    adminCurrentAction,
    adminCurrentLink,
    // currentEmployeeLink,
    class_level,
    employees_link,
  } = useParams();
  console.log(employees_link);
  const [currentNTStaff, setCurrentNTStaff] = useState("");
  const [rejectNTStaff, setRejectNTStaff] = useState("");
  const [currentLecturer, setCurrentLecturer] = useState("");
  const [loadingComplete, setLoadingComplete] = useState(null);
  const [searchTeacher, setSearchTeacher] = useState("");

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
  const [redirecting, setRedirecting] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [openRejectModal, setOpenRejectModal] = useState(false);
  const [uncompletedEmploymentTask, setUncompletedEmploymentTask] =
    useState("");
  const [openApproveEmploymentModal, setOpenApproveEmploymentModal] =
    useState(false);

  const teachersData = pendingNTStaffsColumn(
    setCurrentNTStaff,
    loadingComplete,
    setLoadingComplete,
    toast,
    dispatch,
    userInfo,
    foundNTStaff,
    // approveNTStaffEmploymentStatus,
    openApproveEmploymentModal,
    setOpenApproveEmploymentModal,
    setRejectNTStaff,
    nTStaffToReject,
    openRejectModal,
    setOpenRejectModal
  );

  const handleNewEmployment = () => {
    setRedirecting(true);
    setUncompletedEmploymentTask("You're being redirected");
    setTimeout(() => {
      navigate(
        `/sensec/admin/${adminCurrentAction}/${adminCurrentLink}/new_employment/personal_info`
      );
    }, 3000);
  };

  //Approve Teacher status check
  // useEffect(() => {
  //   if (foundLecturer) {
  //     setLoadingComplete(false);
  //     if (approveTeacherEmploymentStatus === "pending") {
  //       setTimeout(() => {
  //         setLoadingComplete(true);
  //       }, 3000);
  //     }
  //     if (approveTeacherEmploymentStatus === "rejected") {
  //       setTimeout(() => {
  //         setLoadingComplete(null);
  //       }, 3000);
  //       setTimeout(() => {
  //         approveTeacherEmploymentError?.errorMessage?.message?.map((err) =>
  //           toast.error(err, {
  //             position: "top-right",
  //             theme: "light",
  //             // toastId: successId,
  //           })
  //         );
  //       }, 2000);
  //       return;
  //     }
  //     if (approveTeacherEmploymentStatus === "success") {
  //       setTimeout(() => {
  //         //Fetch all users again when successfully approved
  //         dispatch(fetchAllUsers());
  //       }, 6000);
  //     }
  //   }
  // }, [
  //   dispatch,
  //   approveTeacherEmploymentStatus,
  //   approveTeacherEmploymentError,
  //   foundLecturer,
  // ]);

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
        <Box>
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
                  cLevel?.name === class_level?.replace(/_/g, " ")
                    ? "classLevelLecturersBtn isActive"
                    : "classLevelLecturersBtn"
                }
              >
                {cLevel.name}
              </Grid>
            ))}
          </Grid>
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
          />
        </Box>
      </Box>
    </>
  );
}
