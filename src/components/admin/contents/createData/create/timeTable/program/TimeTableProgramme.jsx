import React, { useEffect, useRef, useState } from "react";
import "./timeTableProgramme.scss";
import { Box, Button, CircularProgress, Grid, MenuItem } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
// import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import LoadingProgress from "../../../pageLoading/LoadingProgress";
import { toast } from "react-toastify";
import { CustomTextField } from "../../../../../../../muiStyling/muiStyling";

export function TimeTableProgramme() {
  const authAdminInfo = {};
  const allClassLevels = [];
  const allProgrammes = [];
  const allTeachers = [];
  console.log(allTeachers);
  console.log(allClassLevels);
  console.log(allProgrammes);

  // const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState(authAdminInfo);
  console.log(userInfo.id);
  const [loadingComplete, setLoadingComplete] = useState(null);

  const [openLevelList, setOpenLevelList] = useState(false);
  const [openProgramList, setOpenProgramList] = useState(false);

  const [getProgrammeLabel, setGetProgrammeLabel] = useState("");
  const [getLevelLabel, setGetLevelLabel] = useState("");

  const [currentClassLevelValue, setCurrentClassLevelValue] = useState("");
  console.log(currentClassLevelValue);
  const [programValue, setProgramValue] = useState("");
  console.log(programValue);

  const navigate = useNavigate();

  const outSideClickRef = useRef(null);
  const hideOnClickOutside = (e) => {
    // console.log(outSideClickRef.current);
    if (
      outSideClickRef.current &&
      !outSideClickRef.current.contains(e.target)
    ) {
      setOpenLevelList(false);
      setOpenProgramList(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", hideOnClickOutside, true);
  }, []);

  // const { createStatus, successMessage, timeTableError } = useSelector(
  //   (state) => state.timeTable
  // );

  const [timeTable, setTimeTable] = useState({
    classLevelId: "",
    programId: "",
    createdBy: "",
  });
  console.log(timeTable);

  const canSave = Boolean(currentClassLevelValue) && Boolean(programValue);

  const handleInputValues = (e) => {
    const { name, value } = e.target;
    setTimeTable({
      ...timeTable,
      [name]: value,
    });
  };
  const handleTimeTable = (e) => {
    e.preventDefault();
    setLoadingComplete(false);
    // dispatch(
    //   createTimeTable({
    //     programId: programValue,
    //     classLevelId: currentClassLevelValue,
    //     createdBy: userInfo?.id,
    //   })
    // );
  };

  // useEffect(() => {
  //   if (createStatus === "pending") {
  //     setTimeout(() => {
  //       setLoadingComplete(true);
  //     }, 3000);
  //   }
  //   if (createStatus === "rejected") {
  //     setTimeout(() => {
  //       setLoadingComplete(null);
  //     }, 3000);
  //     setTimeout(() => {
  //       timeTableError?.errorMessage?.message?.map((err) =>
  //         toast.error(err, {
  //           position: "top-right",
  //           theme: "light",
  //           // toastId: successId,
  //         })
  //       );
  //     }, 2000);
  //     return;
  //   }
  //   if (createStatus === "success") {
  //     setTimeout(() => {
  //       toast.success(successMessage, {
  //         position: "top-right",
  //         theme: "dark",
  //         // toastId: successId,
  //       });
  //     }, 2000);
  //     setTimeout(() => {
  //       setLoadingComplete(null);
  //       setElectiveSubject({
  //         subjectName: "",
  //         classLevel: "",
  //         currentTeacher: "",
  //       });
  //       setGetLevelLabel("");
  //       setGetProgrammeLabel("");
  //       window.location.reload();
  //     }, 6000);
  //   }
  // }, [
  //   timeTableError,
  //   successMessage,
  //   createStatus,
  //   toastOptions,
  //   navigate,
  //   dispatch,
  // ]);

  // useEffect(() => {
  //   dispatch(fetchAllProgrammes());
  //   dispatch(fetchClassLevels());
  // }, [dispatch]);

  return (
    <Box
      sx={{
        width: { xs: "100%", sm: "85%", md: "75%", lg: "60%", xl: "50%" },
        margin: "auto",
        paddingTop: "2rem",
        display: "flex",
        flexDirection: "column",
      }}
      className="createTimeTableProgrammeWrap"
    >
      <Box component={"form"} onSubmit={handleTimeTable} minHeight={220} p={2}>
        <h1>Time Table Programme</h1>
        <Grid container spacing={3}>
          {/* Programme Selection */}
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <CustomTextField
              select
              fullWidth
              label="Select Programme"
              name="program"
              value={timeTable?.program}
              onChange={handleInputValues}
              required
            >
              <MenuItem value="Agric Science">Agric Science</MenuItem>
              <MenuItem value="Business">Business</MenuItem>
              <MenuItem value="General Science">General Science</MenuItem>
              <MenuItem value="General Arts">General Arts</MenuItem>
              <MenuItem value="Visual Arts">Visual Arts</MenuItem>
              <MenuItem value="Home Economics">Home Economics</MenuItem>
            </CustomTextField>
          </Grid>
          {/* Division Program (conditional) */}
          {timeTable && timeTable?.program === "General Arts" && (
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <CustomTextField
                select
                fullWidth
                label="Division Program"
                name="divisionProgramId"
                value={timeTable?.divisionProgramId}
                onChange={handleInputValues}
                required
              >
                <MenuItem value="General Arts 1">General Arts 1</MenuItem>
                <MenuItem value="General Arts 2">General Arts 2</MenuItem>
                <MenuItem value="General Arts 3">General Arts 3</MenuItem>
              </CustomTextField>
            </Grid>
          )}
          {/* Class Level Selection */}
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <CustomTextField
              select
              fullWidth
              label="Class Level"
              name="classLevelName"
              value={timeTable?.classLevelName}
              onChange={handleInputValues}
              required
            >
              <MenuItem value="Level 100">Level 100</MenuItem>
              <MenuItem value="Level 200">Level 200</MenuItem>
              <MenuItem value="Level 300">Level 300</MenuItem>
            </CustomTextField>
          </Grid>
        </Grid>
        <Button type="submit" disabled={!canSave}>
          Create Time Table Programme
          {/* {loadingComplete === false && (
            <LoadingProgress color={"#fff"} size={"1.3rem"} />
          )}
          {loadingComplete === true && createTermStatus === "success" && (
            <>
              <span> Academic Term Created Successfully...</span>{" "}
              <TaskAltIcon />
            </>
          )}
          {loadingComplete === null && "Create Academic Term"} */}
        </Button>
      </Box>
    </Box>
  );
}
