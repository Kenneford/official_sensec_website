import React, { useEffect, useRef, useState } from "react";
import "./coreSubject.scss";
import { Box, Button, CircularProgress, Grid } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
// import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import LoadingProgress from "../../../pageLoading/LoadingProgress";
import { toast } from "react-toastify";
import { CustomTextField } from "../../../../../../../muiStyling/muiStyling";

export function CreateCoreSubject() {
  const authAdminInfo = [];
  const allClassLevels = [];
  const allProgrammes = [];
  const allTeachers = [];
  console.log(allTeachers);
  console.log(allClassLevels);
  console.log(allProgrammes);

  // const dispatch = useDispatch();
  const [loadingComplete, setLoadingComplete] = useState(null);

  const [openLevelList, setOpenLevelList] = useState(false);
  const [openProgramList, setOpenProgramList] = useState(false);
  const [openProgramNameList, setOpenProgramNameList] = useState(false);
  const [openCurrentTeacherList, setOpenCurrentTeacherList] = useState(false);
  const [openSectionNameList, setOpenSectionNameList] = useState(false);
  const [openLevelNameList, setOpenLevelNameList] = useState(false);

  const [getProgrammeLabel, setGetProgrammeLabel] = useState("");
  const [getProgrammeNameLabel, setGetProgrammeNameLabel] = useState("");
  const [getLevelLabel, setGetLevelLabel] = useState("");
  const [getCurrentTeacherLabel, setGetCurrentTeacherLabel] = useState("");
  const [teachersGender, setTeachersGender] = useState("");

  const [sectionNameValue, setSectionNameValue] = useState("");
  const [currentClassLevelValue, setCurrentClassLevelValue] = useState("");
  const [programValue, setProgramValue] = useState("");
  const [currentTeacherValue, setCurrentTeacherValue] = useState("");
  const [levelNameValue, setLevelNameValue] = useState("");
  console.log(currentTeacherValue);
  console.log(programValue);

  const navigate = useNavigate();

  useEffect(() => {
    document.addEventListener("click", hideOnClickOutside, true);
  }, []);
  const outSideClickRef = useRef(null);
  const hideOnClickOutside = (e) => {
    // console.log(outSideClickRef.current);
    if (
      outSideClickRef.current &&
      !outSideClickRef.current.contains(e.target)
    ) {
      setOpenSectionNameList(false);
      setOpenLevelList(false);
      setOpenProgramList(false);
      setOpenCurrentTeacherList(false);
      setOpenLevelNameList(false);
      setOpenProgramNameList(false);
    }
  };
  // const { createStatus, successMessage, error } = useSelector(
  //   (state) => state.coreSubject
  // );
  // const allAcademicTerms = useSelector(getAllAcademicTerms);
  // const allAllClassLevels = useSelector(getAllClassLevels);

  const [coreSubject, setCoreSubject] = useState({
    subjectName: "",
    // classLevel: "",
    isCore: true,
    createdBy: authAdminInfo?.id,
  });
  console.log(coreSubject);

  const handleInputValues = (e) => {
    setCoreSubject({
      ...coreSubject,
      [e.target.name]: e.target.value,
    });
  };

  const canSave = Boolean(coreSubject.subjectName);
  // Boolean(currentTeacherValue);

  const handleCoreSubject = (e) => {
    e.preventDefault();
    setLoadingComplete(false);
    // dispatch(
    //   createCoreSubject({
    //     subjectName: coreSubject.subjectName,
    //     isCore: true,
    //     createdBy: authAdminInfo?.id,
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
  //       error?.errorMessage?.message?.map((err) =>
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
  //       setCoreSubject({
  //         subjectName: "",
  //         isCore: true,
  //         createdBy: authAdminInfo?.id,
  //       });
  //       setGetLevelLabel("");
  //       setGetCurrentTeacherLabel("");
  //       // window.location.reload();
  //       dispatch(resetCreateCoreSubjState());
  //     }, 6000);
  //   }
  // }, [
  //   error,
  //   successMessage,
  //   createStatus,
  //   toastOptions,
  //   navigate,
  //   authAdminInfo,
  //   dispatch,
  // ]);

  // useEffect(() => {
  //   dispatch(fetchTeachers());
  //   dispatch(fetchAllProgrammes());
  //   dispatch(fetchAllAcademicTerms());
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
      className="createCoreSubjectWrap"
    >
      <Box
        component={"form"}
        onSubmit={handleCoreSubject}
        minHeight={220}
        p={2}
      >
        <h1>Core Subject Form</h1>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={6} lg={6} className="inputCont">
            <CustomTextField
              fullWidth
              label="Subject Name"
              name="name"
              onChange={handleInputValues}
              value={coreSubject.name}
              required
              className="textField"
              sx={{
                "&:hover": {
                  borderColor: "none",
                },
              }}
            />
          </Grid>
        </Grid>
        <Button type="submit" disabled={!canSave}>
          Create Core Subject
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
