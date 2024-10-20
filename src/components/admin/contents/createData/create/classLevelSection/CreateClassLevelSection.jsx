import React, { useEffect, useRef, useState } from "react";
import "./createClassLevelSection.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
// import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import LoadingProgress from "../../pageLoading/LoadingProgress";
import { toast } from "react-toastify";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  MenuItem,
  Select,
} from "@mui/material";
import { CustomTextField } from "../../../../../../muiStyling/muiStyling";

export function CreateClassLevelSection() {
  const authAdminInfo = {};
  const allClassLevels = [];
  const allProgrammes = [];
  // const {
  //   createClassSectionError,
  //   createClassSectionSuccessMessage,
  //   createClassSectionStatus,
  // } = useSelector((state) => state.classLevelSection);
  const allTeachers = [];
  console.log(allTeachers);
  console.log(allClassLevels);
  console.log(allProgrammes);

  const teachersEmployed = allTeachers?.filter(
    (tch) => tch && tch?.employment?.employmentStatus === "approved"
  );
  console.log(teachersEmployed);
  // const dispatch = useDispatch();
  const [loadingComplete, setLoadingComplete] = useState(null);

  const [openLevelList, setOpenLevelList] = useState(false);
  const [openProgramList, setOpenProgramList] = useState(false);
  const [openCurrentTeacherList, setOpenCurrentTeacherList] = useState(false);
  const [openSectionNameList, setOpenSectionNameList] = useState(false);
  const [openLevelNameList, setOpenLevelNameList] = useState(false);

  const [getProgrammeLabel, setGetProgrammeLabel] = useState("");
  const [getLevelLabel, setGetLevelLabel] = useState("");
  const [getCurrentTeacherLabel, setGetCurrentTeacherLabel] = useState("");
  const [teachersGender, setTeachersGender] = useState("");

  const [sectionNameValue, setSectionNameValue] = useState("");
  const [currentClassLevelValue, setCurrentClassLevelValue] = useState("");
  const [programValue, setProgramValue] = useState("");
  const [currentTeacherValue, setCurrentTeacherValue] = useState("");
  const [levelNameValue, setLevelNameValue] = useState("");
  console.log(currentTeacherValue);

  const [classSection, setClassSection] = useState({
    sectionName: "",
    classLevelId: "",
    classLevelName: "",
    program: "",
    programId: "",
    divisionProgramId: "",
    createdBy: `${authAdminInfo.id}`,
  });
  console.log(classSection);

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
    }
  };

  const canSave =
    Boolean(classSection.sectionName) &&
    Boolean(classSection.classLevelName) &&
    Boolean(classSection.program);
  // Boolean(currentTeacherValue);

  const handleClassSection = (e) => {
    e.preventDefault();
    setLoadingComplete(false);
    // dispatch(
    //   createClassLevelSection({
    //     sectionName: sectionNameValue,
    //     classLevelId: currentClassLevelValue,
    //     classLevelName: levelNameValue,
    //     program: programValue,
    //     currentTeacher: currentTeacherValue,
    //     createdBy: classSection.createdBy,
    //   })
    // );
    setTimeout(() => {
      setLoadingComplete(true);
    }, 3000);
    setTimeout(() => {
      setLoadingComplete(null);
      setClassSection({
        sectionName: "",
        classLevelId: "",
        classLevelName: "",
        program: "",
        programId: "",
        divisionProgramId: "",
      });
      setSectionNameValue("");
      setCurrentClassLevelValue("");
      setProgramValue("");
      setCurrentTeacherValue("");
    }, 6000);
  };
  const handleInputValues = (e) => {
    const { name, value } = e.target;
    setClassSection({
      ...classSection,
      [name]: value,
    });
  };

  // useEffect(() => {
  //   if (createClassSectionStatus === "rejected") {
  //     setTimeout(() => {
  //       setLoadingComplete(null);
  //       createClassSectionError?.errorMessage?.message?.map((err) =>
  //         toast.error(err, {
  //           position: "top-right",
  //           theme: "dark",
  //         })
  //       );
  //     }, 3000);
  //     return;
  //   }
  //   if (createClassSectionStatus === "success") {
  //     setTimeout(() => {
  //       toast.success(createClassSectionSuccessMessage, {
  //         position: "top-right",
  //         theme: "dark",
  //       });
  //     }, 1000);
  //     setTimeout(() => {
  //       window.location.reload();
  //     }, 6000);
  //   }
  // }, [
  //   createClassSectionError,
  //   createClassSectionSuccessMessage,
  //   createClassSectionStatus,
  //   toastOptions,
  //   navigate,
  // ]);

  // useEffect(() => {
  //   dispatch(fetchTeachers());
  //   dispatch(fetchClassLevels());
  //   dispatch(fetchAllProgrammes());
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
      className="createAcademicClassSectionWrap"
    >
      <Box
        component={"form"}
        onSubmit={handleClassSection}
        minHeight={220}
        p={2}
      >
        <h1>Class Section Form</h1>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={6} lg={6} className="inputCont">
            <CustomTextField
              fullWidth
              label="Section Name"
              name="sectionName"
              onChange={handleInputValues}
              value={classSection.sectionName}
              required
              className="textField"
              sx={{
                "&:hover": {
                  borderColor: "none",
                },
              }}
            />
          </Grid>
          {/* Class Level Selection */}
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <CustomTextField
              select
              fullWidth
              label="Class Level"
              name="classLevelName"
              value={classSection?.classLevelName}
              onChange={handleInputValues}
              required
            >
              <MenuItem value="Level 100">Level 100</MenuItem>
              <MenuItem value="Level 200">Level 200</MenuItem>
              <MenuItem value="Level 300">Level 300</MenuItem>
            </CustomTextField>
          </Grid>
          {/* Programme Selection */}
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <CustomTextField
              select
              fullWidth
              label="Select Programme"
              name="program"
              value={classSection?.program}
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
          {classSection && classSection?.program === "General Arts" && (
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <CustomTextField
                select
                fullWidth
                label="Division Program"
                name="divisionProgramId"
                value={classSection?.divisionProgramId}
                onChange={handleInputValues}
                required
              >
                <MenuItem value="General Arts 1">General Arts 1</MenuItem>
                <MenuItem value="General Arts 2">General Arts 2</MenuItem>
                <MenuItem value="General Arts 3">General Arts 3</MenuItem>
              </CustomTextField>
            </Grid>
          )}
        </Grid>
        <Button type="submit" disabled={!canSave}>
          Create Academic Batch
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
