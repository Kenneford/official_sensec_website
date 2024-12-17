import React, { useEffect, useRef, useState } from "react";
import "../../create.scss";
import { Box, Button, CircularProgress, Grid, MenuItem } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import LoadingProgress from "../../../pageLoading/LoadingProgress";
import { toast } from "react-toastify";
import { CustomTextField } from "../../../../../../../muiStyling/muiStyling";

export function LessonHours() {
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

  // const { createTimeRangeStatus, timeRangeSuccessMessage, timeRangeError } =
  //   useSelector((state) => state.timeTable);

  const [lessonData, setLessonData] = useState({
    lesson1Time: "",
    lesson2Time: "",
    lesson3Time: "",
    lesson4Time: "",
    lesson5Time: "",
    lesson6Time: "",
    lesson7Time: "",
    firstBreak: "",
    secondBreak: "",
    createdBy: "",
  });

  const canSave =
    Boolean(lessonData?.lesson1Time) &&
    Boolean(lessonData?.lesson2Time) &&
    Boolean(lessonData?.lesson3Time) &&
    Boolean(lessonData?.lesson4Time) &&
    Boolean(lessonData?.lesson5Time) &&
    Boolean(lessonData?.lesson6Time) &&
    Boolean(lessonData?.lesson7Time);

  const handleInputValues = (e) => {
    setLessonData({
      ...lessonData,
      [e.target.name]: e.target.value,
    });
  };

  const handleTimeTable = (e) => {
    e.preventDefault();
    // dispatch(
    //   createTimeRange({
    //     dayTime: "Day/Time",
    //     lesson1Time: lessonData?.lesson1Time,
    //     lesson2Time: lessonData?.lesson2Time,
    //     lesson3Time: lessonData?.lesson3Time,
    //     lesson4Time: lessonData?.lesson4Time,
    //     lesson5Time: lessonData?.lesson5Time,
    //     lesson6Time: lessonData?.lesson6Time,
    //     lesson7Time: lessonData?.lesson7Time,
    //     firstBreak: lessonData?.firstBreak,
    //     secondBreak: lessonData?.secondBreak,
    //     createdBy: userInfo?.id,
    //   })
    // );
  };

  // useEffect(() => {
  //   if (createTimeRangeStatus === "pending") {
  //     setLoadingComplete(false);
  //     setTimeout(() => {
  //       setLoadingComplete(true);
  //     }, 3000);
  //   }
  //   if (createTimeRangeStatus === "rejected") {
  //     setTimeout(() => {
  //       setLoadingComplete(null);
  //     }, 3000);
  //     setTimeout(() => {
  //       timeRangeError?.errorMessage?.message?.map((err) =>
  //         toast.error(err, {
  //           position: "top-right",
  //           theme: "dark",
  //           // toastId: successId,
  //         })
  //       );
  //     }, 2000);
  //     return;
  //   }
  //   if (createTimeRangeStatus === "success") {
  //     setTimeout(() => {
  //       toast.success(timeRangeSuccessMessage, {
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
  //       setLessonData({
  //         lesson1Time: "",
  //         lesson2Time: "",
  //         lesson3Time: "",
  //         lesson4Time: "",
  //         lesson5Time: "",
  //         lesson6Time: "",
  //         lesson7Time: "",
  //         firstBreak: "",
  //         secondBreak: "",
  //         createdBy: "",
  //       });
  //     }, 6000);
  //   }
  // }, [
  //   timeRangeError,
  //   timeRangeSuccessMessage,
  //   createTimeRangeStatus,
  //   toastOptions,
  //   navigate,
  //   dispatch,
  // ]);

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
        <h1>Time Table Lesson Hours</h1>
        <Grid container spacing={3}>
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
              label="First Break"
              name="firstBreak"
              value={lessonData?.firstBreak}
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
              label="Second Break"
              name="secondBreak"
              value={lessonData?.secondBreak}
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
          Create Lesson Hours
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
