import "../allStudentsData.scss";
import React, { useEffect, useLayoutEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { customUserTableStyle } from "../../../../../usersInfoDataFormat/usersInfoTableStyle";
import { Box, Grid } from "@mui/material";
import { AllStudentsPageQuickLinks } from "../../../../../linksFormat/LinksFormat";
import {
  fetchAllUsers,
  getAuthUser,
} from "../../../../../features/auth/authSlice";
import {
  FetchAllApprovedStudents,
  FetchApprovedClassLevelStudents,
} from "../../../../../data/students/FetchAllStudents";
import { FetchAllClassLevels } from "../../../../../data/class/FetchClassLevel";
import { studentsColumn } from "../../../../../usersInfoDataFormat/UsersInfoDataFormat";
import SearchFilter from "../../../../searchForm/SearchFilter";
import { FetchAllClassSections } from "../../../../../data/class/FetchClassSections";
import NewEnrollmentModal from "../../../../modals/NewEnrollmentModal";
import {
  MultiApprovalBtn,
  MultiRejectionBtn,
  MultiStudentsDemotionBtn,
  MultiStudentsPromotionBtn,
} from "../../../../lazyLoading/LazyComponents";
import {
  promoteMultiStudents,
  resetMultiDemotionsState,
  resetMultiPromotionsState,
} from "../../../../../features/students/promotionSlice";

export function ClassLevelStudents() {
  const authAdmin = useSelector(getAuthUser);
  const actionBtns = AllStudentsPageQuickLinks();
  // console.log(userInfo);
  const {
    multiStudentsPromotionStatus,
    multiStudentsDemotionStatus,
    successMessage,
    error,
  } = useSelector((state) => state.promotion);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    program,
    class_level,
    adminCurrentLink,
    adminCurrentAction,
    student_category,
  } = useParams();
  console.log(adminCurrentAction, adminCurrentLink);
  console.log(class_level, program);
  const [openModal, setOpenModal] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const [classLevel, setClassLevel] = useState("");
  const [uncompletedEmploymentTask, setUncompletedEmploymentTask] =
    useState("");
  const allClassLevels = FetchAllClassLevels();
  const approvedStudents = FetchAllApprovedStudents();
  const classLevelStudents = FetchApprovedClassLevelStudents(classLevel?._id);
  const allClassLevelSections = FetchAllClassSections();
  const singleClassLevel = {
    students: [],
  };

  const classLevelFound = allClassLevels?.find(
    (cLevel) => cLevel?.name === class_level?.replace(/_/g, " ")
  );
  console.log(classLevelFound);

  const [currentStudentId, setCurrentStudentId] = useState("");
  const [level100loadingComplete, setLevel100LoadingComplete] = useState(null);
  const [level200loadingComplete, setLevel200LoadingComplete] = useState(null);
  const [level300loadingComplete, setLevel300LoadingComplete] = useState(null);
  const [promoteMultiLoadingComplete, setPromoteMultiLoadingComplete] =
    useState(null);
  const [multiPromotionsInProgress, setMultiPromotionsInProgress] =
    useState(false);
  const [multiDemotionsInProgress, setMultiDemotionsInProgress] =
    useState(false);
  const [demoteMultiLoadingComplete, setDemoteMultiLoadingComplete] =
    useState(null);
  const [searchStudent, setSearchStudent] = useState("");

  const filteredStudents = classLevelStudents?.filter(
    (std) =>
      std?.personalInfo?.firstName?.toLowerCase()?.includes(searchStudent) ||
      std?.personalInfo?.firstName?.includes(searchStudent) ||
      std?.personalInfo?.lastName?.toLowerCase()?.includes(searchStudent) ||
      std?.personalInfo?.lastName?.includes(searchStudent)
  );
  const foundStudent = classLevelStudents?.find(
    (std) => std._id === currentStudentId
  );
  console.log(filteredStudents);

  const handleNewEnrollment = () => {
    setRedirecting(true);
    setUncompletedEmploymentTask("You're being redirected");
    setTimeout(() => {
      navigate(
        `/sensec/users/${authAdmin?.uniqueId}/admin/${adminCurrentAction}/${adminCurrentLink}/new_enrollment/placement_verification`
      );
    }, 3000);
  };
  const studentDataFormat = studentsColumn(
    authAdmin,
    foundStudent,
    adminCurrentAction,
    adminCurrentLink,
    setCurrentStudentId,
    setLevel100LoadingComplete,
    setLevel200LoadingComplete,
    setLevel300LoadingComplete,
    level100loadingComplete,
    level200loadingComplete,
    level300loadingComplete,
    // level100PromotionStatus,
    // level200PromotionStatus,
    // level300PromotionStatus,
    dispatch
  );

  // handle multi approval or rejection
  const [multiStudents, setMultiStudents] = useState([]);
  const [toggleClearRows, setToggleClearRows] = useState(false);
  console.log(multiStudents);
  const handleMultiSelect = (state) => {
    if (state) {
      const studentObj = state?.selectedRows?.map((user) => {
        const userId = {
          uniqueId: user?.uniqueId,
        };
        return userId;
      });
      setMultiStudents(studentObj);
    } else {
      setMultiStudents([]);
    }
  };
  //Student Promotion Status Check
  // useEffect(() => {
  //   if (studentToPromote) {
  //     if (promotionStatus === "pending") {
  //       setLoadingComplete(false);
  //       setPromotionInProgress(false);
  //     }
  //     if (promotionStatus === "rejected") {
  //       setTimeout(() => {
  //         setLoadingComplete(null);
  //         setPromotionInProgress(false);
  //         dispatch(resetPromotionState());
  //       }, 3000);
  //       setTimeout(() => {
  //         error?.errorMessage?.message?.map((err) =>
  //           toast.error(err, {
  //             position: "top-right",
  //             theme: "light",
  //             toastId: err,
  //           })
  //         );
  //       }, 2000);
  //       return;
  //     }
  //     if (promotionStatus === "success") {
  //       setTimeout(() => {
  //         setLoadingComplete(true);
  //       }, 3000);
  //       setTimeout(() => {
  //         toast.success(successMessage, {
  //           position: "top-right",
  //           theme: "dark",
  //           toastId: successMessage,
  //         });
  //       }, 1000);
  //       setTimeout(() => {
  //         //Fetch all users again when successfully approved
  //         dispatch(fetchAllUsers());
  //         dispatch(resetPromotionState());
  //         setPromotionInProgress(false);
  //         setLoadingComplete(null);
  //       }, 6000);
  //     }
  //   }
  // }, [promotionStatus, successMessage, error, dispatch, studentToPromote]);

  // Multi promotions status check
  useEffect(() => {
    if (multiStudentsPromotionStatus === "pending") {
      setPromoteMultiLoadingComplete(false);
    }
    if (multiStudentsPromotionStatus === "rejected") {
      setTimeout(() => {
        setPromoteMultiLoadingComplete(null);
        setMultiPromotionsInProgress(false);
        dispatch(resetMultiPromotionsState());
      }, 3000);
      setTimeout(() => {
        error?.errorMessage?.message?.map((err) =>
          toast.error(err, {
            position: "top-right",
            theme: "dark",
            toastId: "multiStudentPromotionsError",
          })
        );
      }, 2000);
      return;
    }
    if (multiStudentsPromotionStatus === "success") {
      setTimeout(() => {
        setPromoteMultiLoadingComplete(true);
      }, 3000);
      setTimeout(() => {
        //Fetch all users again when successfully promoted
        dispatch(fetchAllUsers());
        setToggleClearRows(!toggleClearRows);
        dispatch(resetMultiPromotionsState());
        setMultiPromotionsInProgress(false);
        setPromoteMultiLoadingComplete(null);
      }, 6000);
    }
  }, [
    dispatch,
    multiStudentsPromotionStatus,
    error,
    multiStudents,
    toggleClearRows,
  ]);
  // Multi demotions status check
  useEffect(() => {
    if (multiStudentsDemotionStatus === "pending") {
      setDemoteMultiLoadingComplete(false);
    }
    if (multiStudentsDemotionStatus === "rejected") {
      setTimeout(() => {
        setDemoteMultiLoadingComplete(null);
        setMultiDemotionsInProgress(false);
        dispatch(resetMultiDemotionsState());
      }, 3000);
      setTimeout(() => {
        error?.errorMessage?.message?.map((err) =>
          toast.error(err, {
            position: "top-right",
            theme: "dark",
            toastId: "multiStudentPromotionsError",
          })
        );
      }, 2000);
      return;
    }
    if (multiStudentsDemotionStatus === "success") {
      setTimeout(() => {
        setDemoteMultiLoadingComplete(true);
      }, 3000);
      setTimeout(() => {
        //Fetch all users again when successfully promoted
        dispatch(fetchAllUsers());
        setToggleClearRows(!toggleClearRows);
        setMultiDemotionsInProgress(false);
        setDemoteMultiLoadingComplete(null);
        dispatch(resetMultiDemotionsState());
      }, 6000);
    }
  }, [
    dispatch,
    multiStudentsDemotionStatus,
    error,
    multiStudents,
    toggleClearRows,
  ]);

  useLayoutEffect(() => {
    const classLevelFound = allClassLevels?.find(
      (cLevel) => cLevel?.name === class_level?.replace(/_/g, " ")
    );
    setClassLevel(classLevelFound);
  }, [allClassLevels, class_level]);

  const currentClassLevelStd = `${class_level?.replace(
    /_/g,
    " "
  )} Enrolled Students / Total = 
              ${classLevelStudents?.length}`;

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
            value={searchStudent}
            onChange={setSearchStudent}
            placeholder={"Search"}
          />
        </Box>
      </Box>
      <Box
        className="allStudentsData"
        id="allStudents"
        padding={{ xs: " 1rem .5rem", sm: " 1rem" }}
      >
        <Box className="searchDetails">
          {filteredStudents?.length === 0 && searchStudent !== "" && (
            <p className="searchInfo">
              We couldn&apos;t find any matches for &quot;{searchStudent}&quot;
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
            <p className="searchInfo">
              Total Students = {approvedStudents?.length}
            </p>
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
                key={action.label}
                onClick={() => {
                  // setCurrentActionBtn(action.label);
                  if (action.label === "Add New Student +") {
                    setOpenModal(true);
                  } else {
                    navigate(
                      `/sensec/users/${
                        authAdmin?.uniqueId
                      }/admin/${adminCurrentAction}/${adminCurrentLink}/${action.label.replace(
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
            <NewEnrollmentModal
              open={openModal}
              onClose={() => setOpenModal(false)}
              handleNewEnrollment={handleNewEnrollment}
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
            {allClassLevels?.map((cLevel) => (
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
                    }/admin/${adminCurrentAction}/${adminCurrentLink}/${student_category}/${cLevel.name.replace(
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
          </Grid>
        </Box>
        <div className="classLeveSections">
          <div className="levelSections">
            {allClassLevelSections?.map((cLevel) => (
              <span key={cLevel?._id}>
                {cLevel?.classLevelName?.replace(/ /g, "_") === class_level && (
                  <HashLink
                    className={
                      cLevel?.classLevelName?.replace(/ /g, "_") ===
                        class_level && cLevel?.sectionName === program
                        ? "backgroundGreen"
                        : "backgroundYellow"
                    }
                    to={`/sensec/users/${
                      authAdmin?.uniqueId
                    }/admin/${adminCurrentAction}/${adminCurrentLink}/${student_category}/${cLevel?.classLevelName?.replace(
                      / /g,
                      "_"
                    )}/${cLevel.sectionName?.replace(/ /g, "_")}`}
                  >
                    {cLevel?.label}
                  </HashLink>
                )}
              </span>
            ))}
          </div>
        </div>
        {/* Approval buttons */}
        <Box sx={{ display: "flex", gap: 1 }}>
          <MultiStudentsPromotionBtn
            promoteMultiStudentsStatus={multiStudentsPromotionStatus}
            promoteMultiStudentsLoadingComplete={promoteMultiLoadingComplete}
            setPromoteMultiLoadingComplete={setPromoteMultiLoadingComplete}
            multiStudentsDemotionInProgress={multiDemotionsInProgress}
            setMultiStudentsPromotionInProgress={setMultiPromotionsInProgress}
            multiStudentsPromotionFunction={promoteMultiStudents({
              students: multiStudents,
              classLevel: `${classLevelFound?.name}`,
              lastPromotedBy: `${authAdmin?.id}`,
            })}
          />
          <MultiStudentsDemotionBtn
            demoteMultiStudentsStatus={multiStudentsDemotionStatus}
            demoteMultiStudentsLoadingComplete={demoteMultiLoadingComplete}
            setDemoteMultiLoadingComplete={setDemoteMultiLoadingComplete}
            multiStudentsPromotionInProgress={multiPromotionsInProgress}
            setMultiStudentsDemotionInProgress={setMultiDemotionsInProgress}
            // multiStudentsDemotionFunction={approvedMultiStudentEnrollment({
            //   students: multiStudents,
            //   enrollmentApprovedBy: `${authAdmin?.id}`,
            // })}
          />
        </Box>
        <Box className="studentDataTable">
          <DataTable
            title={currentClassLevelStd}
            columns={studentDataFormat}
            data={filteredStudents}
            customStyles={customUserTableStyle}
            pagination
            selectableRows
            selectableRowsHighlight
            highlightOnHover
            onSelectedRowsChange={handleMultiSelect}
            clearSelectedRows={toggleClearRows}
          />
        </Box>
      </Box>
    </>
  );
}
