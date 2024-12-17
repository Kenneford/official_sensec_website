import React, { useEffect, useRef, useState } from "react";
import "../../create.scss";
import { Box, Button, CircularProgress, Grid, MenuItem } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import LoadingProgress from "../../../pageLoading/LoadingProgress";
import { toast } from "react-toastify";
import { CustomTextField } from "../../../../../../../muiStyling/muiStyling";

export function TimeTableDayLessons() {
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

  // const {
  //   createTimeTableDayStatus,
  //   timeTableDaySuccessMessage,
  //   timeTableDayError,
  // } = useSelector((state) => state.timeTable);

  const [lessonData, setLessonData] = useState({
    nameOfDay: "",
    classLevelId: "",
    programId: "",
    lesson1: "",
    lesson2: "",
    lesson3: "",
    lesson4: "",
    lesson5: "",
    lesson6: "",
    lesson7: "",
    breakLetter: "",
    createdBy: "",
  });
  console.log(lessonData);

  const canSave =
    // Boolean(currentClassLevelValue) &&
    // Boolean(programValue) &&
    Boolean(lessonData?.nameOfDay) &&
    Boolean(lessonData?.lesson1) &&
    Boolean(lessonData?.lesson2) &&
    Boolean(lessonData?.lesson3) &&
    Boolean(lessonData?.lesson4) &&
    Boolean(lessonData?.lesson5) &&
    Boolean(lessonData?.lesson6) &&
    Boolean(lessonData?.lesson7);

  const handleInputValues = (e) => {
    setLessonData({
      ...lessonData,
      [e.target.name]: e.target.value,
    });
  };

  const handleTimeTable = (e) => {
    e.preventDefault();
    setLoadingComplete(false);
    if (!lessonData?.nameOfDay) {
      toast.error("Invalid Name Of Day!", {
        position: "top-right",
        theme: "light",
        // toastId: successId,
      });
      return;
    }
    if (
      lessonData?.nameOfDay &&
      lessonData?.nameOfDay !== "Monday" &&
      lessonData?.nameOfDay !== "Tuesday" &&
      lessonData?.nameOfDay !== "Wednesday" &&
      lessonData?.nameOfDay !== "Thursday" &&
      lessonData?.nameOfDay !== "Friday"
    ) {
      toast.error("Invalid Name Of Day!", {
        position: "top-right",
        theme: "light",
        // toastId: successId,
      });
      return;
    }
    // dispatch(
    //   createTimeTableDay({
    //     nameOfDay: lessonData?.nameOfDay,
    //     programId: programValue,
    //     classLevelId: currentClassLevelValue,
    //     lesson1: lessonData?.lesson1,
    //     lesson2: lessonData?.lesson2,
    //     lesson3: lessonData?.lesson3,
    //     lesson4: lessonData?.lesson4,
    //     lesson5: lessonData?.lesson5,
    //     lesson6: lessonData?.lesson6,
    //     lesson7: lessonData?.lesson7,
    //     // breakLetter,
    //     // description: "",
    //     createdBy: userInfo?.id,
    //   })
    // );
  };

  // useEffect(() => {
  //   if (createTimeTableDayStatus === "pending") {
  //     setTimeout(() => {
  //       setLoadingComplete(true);
  //     }, 3000);
  //   }
  //   if (createTimeTableDayStatus === "rejected") {
  //     setTimeout(() => {
  //       setLoadingComplete(null);
  //     }, 3000);
  //     setTimeout(() => {
  //       timeTableDayError?.errorMessage?.message?.map((err) =>
  //         toast.error(err, {
  //           position: "top-right",
  //           theme: "light",
  //           // toastId: successId,
  //         })
  //       );
  //     }, 2000);
  //     return;
  //   }
  //   if (createTimeTableDayStatus === "success") {
  //     setTimeout(() => {
  //       toast.success(timeTableDaySuccessMessage, {
  //         position: "top-right",
  //         theme: "dark",
  //         // toastId: successId,
  //       });
  //     }, 2000);
  //     setTimeout(() => {
  //       setLoadingComplete(null);
  //       setLessonData({
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
  //   timeTableDayError,
  //   timeTableDaySuccessMessage,
  //   createTimeTableDayStatus,
  //   toastOptions,
  //   navigate,
  //   dispatch,
  // ]);

  // useEffect(() => {
  //   dispatch(fetchAllProgrammes());
  //   dispatch(fetchClassLevels());
  // }, [dispatch]);

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
      className="createDataWrap"
    >
      <Box component={"form"} onSubmit={handleTimeTable} minHeight={220} p={2}>
        <h1>Time Table Day & Lessons</h1>
        <Grid container spacing={3}>
          {/* Programme Selection */}
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <CustomTextField
              select
              fullWidth
              label="Select Programme"
              name="program"
              value={lessonData?.programme}
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
          {lessonData && lessonData?.programme === "General Arts" && (
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <CustomTextField
                select
                fullWidth
                label="Division Program"
                name="divisionProgramId"
                value={lessonData?.divisionProgramId}
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
              value={lessonData?.classLevelName}
              onChange={handleInputValues}
              required
            >
              <MenuItem value="Level 100">Level 100</MenuItem>
              <MenuItem value="Level 200">Level 200</MenuItem>
              <MenuItem value="Level 300">Level 300</MenuItem>
            </CustomTextField>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <CustomTextField
              fullWidth
              label="Name Of Day"
              name="nameOfDay"
              value={lessonData?.nameOfDay}
              onChange={handleInputValues}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <CustomTextField
              fullWidth
              label="Lesson 1"
              name="lesson1"
              value={lessonData?.lesson1}
              onChange={handleInputValues}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <CustomTextField
              fullWidth
              label="Lesson 2"
              name="lesson2"
              value={lessonData?.lesson2}
              onChange={handleInputValues}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <CustomTextField
              fullWidth
              label="Lesson 3"
              name="lesson3"
              value={lessonData?.lesson3}
              onChange={handleInputValues}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <CustomTextField
              fullWidth
              label="Lesson 4"
              name="lesson4"
              value={lessonData?.lesson4}
              onChange={handleInputValues}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <CustomTextField
              fullWidth
              label="Lesson 5"
              name="lesson5"
              value={lessonData?.lesson5}
              onChange={handleInputValues}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <CustomTextField
              fullWidth
              label="Lesson 6"
              name="lesson6"
              value={lessonData?.lesson6}
              onChange={handleInputValues}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <CustomTextField
              fullWidth
              label="Lesson 7"
              name="lesson7"
              value={lessonData?.lesson7}
              onChange={handleInputValues}
              required
            />
          </Grid>
        </Grid>
        <Button type="submit" disabled={!canSave}>
          Create Daily Lessons
          {/* {loadingComplete === false && (
            <LoadingProgress color={"#fff"} size={"1.3rem"} />
          )}
          {loadingComplete === true && createTermStatus === "success" && (
            <>
              <span> Academic Term Created Successfully...</span>{" "}
              <TaskAlt />
            </>
          )}
          {loadingComplete === null && "Create Academic Term"} */}
        </Button>
      </Box>
    </Box>
  );
}
