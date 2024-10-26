import React, { useEffect, useState } from "react";
import "../allStudentsData.scss";
// import SearchIcon from "@mui/icons-material/Search";
import DataTable from "react-data-table-component";
import { useNavigate, useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
// import {
//   promotingMultipleStudentsToLevel200,
//   promotingToLevel200,
//   promotingToLevel300,
// } from "../../../../features/student/promotionSlice";
import { HashLink } from "react-router-hash-link";
import { customUserTableStyle } from "../../../../../usersInfoDataFormat/usersInfoTableStyle";
import { Box, Grid } from "@mui/material";
import NewEmploymentModal from "../../../../actionModal/ActionModal";
import { AllStudentsPageQuickLinks } from "../../../../../linksFormat/LinksFormat";
import ActionModal from "../../../../actionModal/ActionModal";

export function AllEnrolledStudents() {
  const actionBtns = AllStudentsPageQuickLinks();
  //Get state data
  const userInfo = {};
  const allStudents = [];
  console.log(allStudents);
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
  console.log(allClassLevels);

  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    adminCurrentLink,
    adminCurrentAction,
    class_level,
    student_category,
  } = useParams();
  console.log(class_level);

  //Promotion status values
  // const {
  //   level100PromotionStatus,
  //   level200PromotionStatus,
  //   level300PromotionStatus,
  //   level100Error,
  //   level200Error,
  //   level300Error,
  //   level100SuccessMessage,
  //   level200SuccessMessage,
  //   level300SuccessMessage,
  //   level100MultiPromotionStatus,
  //   level100MultiSuccessMessage,
  // } = useSelector((state) => state.promotion);

  //State hooks
  const [currentStudentId, setCurrentStudentId] = useState("");
  const [level100loadingComplete, setLevel100LoadingComplete] = useState(null);
  const [level200loadingComplete, setLevel200LoadingComplete] = useState(null);
  const [level300loadingComplete, setLevel300LoadingComplete] = useState(null);
  const [searchStudent, setSearchStudent] = useState("");
  const [multiStudents, setMultiStudents] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const [uncompletedEmploymentTask, setUncompletedEmploymentTask] =
    useState("");

  //Find selected student to approve/promote/reject
  const foundStudent = allStudents?.find(
    (std) => std?._id === currentStudentId
  );

  //Filter students during search
  const filteredStudents = allStudents?.filter(
    (std) =>
      std?.personalInfo?.firstName?.toLowerCase()?.includes(searchStudent) ||
      std?.personalInfo?.firstName?.includes(searchStudent) ||
      std?.personalInfo?.lastName?.toLowerCase()?.includes(searchStudent) ||
      std?.personalInfo?.lastName?.includes(searchStudent)
  );

  console.log(multiStudents);
  console.log(allStudents);
  console.log(allClassLevels);

  // const studentDataFormat = studentsColumn(
  //   userInfo,
  //   foundStudent,
  //   adminCurrentAction,
  //   adminCurrentLink,
  //   setCurrentStudentId,
  //   setLevel100LoadingComplete,
  //   setLevel200LoadingComplete,
  //   setLevel300LoadingComplete,
  //   level100loadingComplete,
  //   level200loadingComplete,
  //   level300loadingComplete,
  //   level100PromotionStatus,
  //   level200PromotionStatus,
  //   level300PromotionStatus,
  //   dispatch
  // );

  const handleMultiSelect = (state) => {
    setMultiStudents(state.selectedRows);
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
  //Student Promotion Level 100 Status Check
  // useEffect(() => {
  //   if (level100PromotionStatus === "pending") {
  //     setTimeout(() => {
  //       setLevel100LoadingComplete(true);
  //     }, 3000);
  //   }
  //   if (level100PromotionStatus === "rejected") {
  //     setTimeout(() => {
  //       setLevel100LoadingComplete(null);
  //     }, 3000);
  //     setTimeout(() => {
  //       level100Error?.errorMessage?.message?.map((err) =>
  //         toast.error(err, {
  //           position: "top-right",
  //           theme: "light",
  //         })
  //       );
  //     }, 2000);
  //     return;
  //   }
  //   if (level100loadingComplete && level100PromotionStatus === "success") {
  //     setTimeout(() => {
  //       toast.success(level100SuccessMessage, {
  //         position: "top-right",
  //         theme: "dark",
  //       });
  //     }, 1000);
  //     setTimeout(() => {
  //       dispatch(fetchAllUsers());
  //       dispatch(fetchClassLevels());
  //     }, 6000);
  //   }
  // }, [
  //   level100PromotionStatus,
  //   level100SuccessMessage,
  //   level100Error,
  //   level100loadingComplete,
  //   dispatch,
  // ]);

  //Multi Students Promotion Level 100 Status Check
  // useEffect(() => {
  //   if (level100MultiPromotionStatus === "pending") {
  //     setTimeout(() => {
  //       setLevel100LoadingComplete(true);
  //     }, 3000);
  //   }
  //   if (level100MultiPromotionStatus === "rejected") {
  //     setTimeout(() => {
  //       setLevel100LoadingComplete(null);
  //     }, 3000);
  //     setTimeout(() => {
  //       level100Error?.errorMessage?.message?.map((err) =>
  //         toast.error(err, {
  //           position: "top-right",
  //           theme: "light",
  //         })
  //       );
  //     }, 2000);
  //     return;
  //   }
  //   if (level100loadingComplete && level100MultiPromotionStatus === "success") {
  //     setTimeout(() => {
  //       toast.success(level100MultiSuccessMessage, {
  //         position: "top-right",
  //         theme: "dark",
  //       });
  //     }, 1000);
  //     setTimeout(() => {
  //       dispatch(fetchAllUsers());
  //       dispatch(fetchClassLevels());
  //     }, 6000);
  //   }
  // }, [
  //   level100PromotionStatus,
  //   level100SuccessMessage,
  //   level100Error,
  //   level100loadingComplete,
  //   level100MultiSuccessMessage,
  //   level100MultiPromotionStatus,
  //   dispatch,
  // ]);

  //Student Promotion Level 200 Status Check
  // useEffect(() => {
  //   if (level200PromotionStatus === "pending") {
  //     setTimeout(() => {
  //       setLevel200LoadingComplete(true);
  //     }, 3000);
  //   }
  //   if (level200PromotionStatus === "rejected") {
  //     setTimeout(() => {
  //       setLevel200LoadingComplete(null);
  //     }, 3000);
  //     setTimeout(() => {
  //       level200Error?.errorMessage?.message?.map((err) =>
  //         toast.error(err, {
  //           position: "top-right",
  //           theme: "light",
  //           // toastId: successId,
  //         })
  //       );
  //     }, 2000);
  //     return;
  //   }
  //   if (level200loadingComplete && level200PromotionStatus === "success") {
  //     setTimeout(() => {
  //       toast.success(level200SuccessMessage, {
  //         position: "top-right",
  //         theme: "dark",
  //       });
  //     }, 1000);
  //     setTimeout(() => {
  //       dispatch(fetchAllUsers());
  //       dispatch(fetchClassLevels());
  //     }, 6000);
  //   }
  // }, [
  //   level200PromotionStatus,
  //   level200SuccessMessage,
  //   level200Error,
  //   level200loadingComplete,
  //   dispatch,
  // ]);

  //Student Promotion Level 300 Status Check
  // useEffect(() => {
  //   if (level300PromotionStatus === "pending") {
  //     setTimeout(() => {
  //       setLevel300LoadingComplete(true);
  //     }, 3000);
  //   }
  //   if (level300PromotionStatus === "rejected") {
  //     setTimeout(() => {
  //       setLevel300LoadingComplete(null);
  //     }, 3000);
  //     setTimeout(() => {
  //       level300Error?.errorMessage?.message?.map((err) =>
  //         toast.error(err, {
  //           position: "top-right",
  //           theme: "light",
  //           // toastId: successId,
  //         })
  //       );
  //     }, 2000);
  //     return;
  //   }
  //   if (level300loadingComplete && level300PromotionStatus === "success") {
  //     setTimeout(() => {
  //       toast.success(level300SuccessMessage, {
  //         position: "top-right",
  //         theme: "dark",
  //       });
  //     }, 1000);
  //     setTimeout(() => {
  //       dispatch(fetchAllUsers());
  //       dispatch(fetchClassLevels());
  //     }, 6000);
  //   }
  // }, [
  //   level300PromotionStatus,
  //   level300SuccessMessage,
  //   level300Error,
  //   level300loadingComplete,
  //   dispatch,
  // ]);

  const allStd = `All Enrolled Students / Total = ${allStudents?.length}`;
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
        className="allStudentsData"
        id="allStudents"
        padding={{ xs: " 1rem .5rem", sm: " 1rem" }}
      >
        <Box className="searchDetails">
          {filteredStudents?.length === 0 && searchStudent !== "" && (
            <p className="searchInfo">
              We couldn't find any matches for "{searchStudent}"
            </p>
          )}
          {filteredStudents?.length === 0 && searchStudent !== "" && (
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
          {searchStudent && (
            <p className="searchInfo">
              Total Enrolled Students Found = {filteredStudents?.length}
            </p>
          )}
          {!searchStudent && (
            <p className="searchInfo">Total Students = {allStudents?.length}</p>
          )}
        </Box>
        <Box>
          <Grid
            container
            spacing={3}
            className="addNewStudentBtnsWrap"
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
                  if (action.label === "Add New Student +") {
                    setOpenModal(true);
                  } else {
                    navigate(
                      `/sensec/users/admin/${adminCurrentAction}/${adminCurrentLink}/${action.label.replace(
                        / /g,
                        "_"
                      )}`
                    );
                  }
                }}
                className={
                  student_category?.replace(/_/g, " ") === action.label
                    ? "studentDashBtn isActive"
                    : action?.label === "Add New Student +"
                    ? "studentDashAddBtn"
                    : "studentDashBtn"
                }
                // className={changeBackgroundColor}
              >
                {/* {action.label !== "All" && action.label} */}
                {action.label === "Enrolled"
                  ? "All Enrolled Students"
                  : action.label}
              </Grid>
            ))}
            <ActionModal
              open={openModal}
              onClose={() => setOpenModal(false)}
              handleNewEmployment={handleNewEmployment}
              redirecting={redirecting}
              uncompletedEmploymentTask={uncompletedEmploymentTask}
              question={"Are you sure you would like to enroll a new student?"}
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
            className="classLevelStudents"
          >
            <>
              {allClassLevels.map((cLevel) => (
                <Grid
                  component={"span"}
                  item
                  xs={2.9}
                  sm={2}
                  key={cLevel.name}
                  onClick={() =>
                    navigate(
                      `/sensec/users/admin/${adminCurrentAction}/${adminCurrentLink}/${student_category}/${cLevel.name.replace(
                        / /g,
                        "_"
                      )}`
                    )
                  }
                  className={
                    cLevel?.name === class_level?.replace(/_/g, " ")
                      ? "classLevelStudentsBtn isActive"
                      : "classLevelStudentsBtn"
                  }
                >
                  {cLevel.name}
                </Grid>
              ))}
              <Grid
                component={"span"}
                item
                xs={2.9}
                sm={2}
                onClick={() =>
                  navigate(
                    `/sensec/users/admin/${adminCurrentAction}/${adminCurrentLink}/Graduates`
                  )
                }
                // to={`/sensec/users/admin/${adminCurrentAction}/${adminCurrentLink}/old_students/graduates`}
                className="classLevelStudentsBtn"
              >
                Graduates
              </Grid>
            </>
          </Grid>
        </Box>
        <Box>
          <DataTable
            title={allStd}
            // columns={studentDataFormat}
            data={filteredStudents}
            customStyles={customUserTableStyle}
            pagination
            selectableRows
            fixedHeader
            selectableRowsHighlight
            highlightOnHover
            responsive
            onSelectedRowsChange={handleMultiSelect}
          />
        </Box>
      </Box>
    </>
  );
}
