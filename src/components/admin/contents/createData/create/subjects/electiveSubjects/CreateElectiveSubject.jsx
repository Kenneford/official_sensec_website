import React, { useEffect, useRef, useState } from "react";
import "./electiveSubject.scss";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
} from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
// import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import LoadingProgress from "../../../pageLoading/LoadingProgress";
import { toast } from "react-toastify";
import { CustomTextField } from "../../../../../../../muiStyling/muiStyling";

export function CreateElectiveSubject() {
  const authAdminInfo = {};
  const allClassLevels = [];
  const allProgrammes = [];
  const allDivisionProgrammes = [];
  const allTeachers = [];
  console.log(allTeachers);
  console.log(allClassLevels);
  console.log(allProgrammes);
  console.log(allDivisionProgrammes);

  // const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState(authAdminInfo);
  console.log(userInfo.id);
  const [loadingComplete, setLoadingComplete] = useState(null);
  const [hasDivisions, setHasDivisions] = useState(false);
  console.log(hasDivisions);

  const [openLevelList, setOpenLevelList] = useState(false);
  const [openProgramList, setOpenProgramList] = useState(false);
  const [openIsElectiveList, setOpenIsElectiveList] = useState(false);
  const [openProgramNameList, setOpenProgramNameList] = useState(false);
  const [openCurrentTeacherList, setOpenCurrentTeacherList] = useState(false);
  const [openSectionNameList, setOpenSectionNameList] = useState(false);
  const [openLevelNameList, setOpenLevelNameList] = useState(false);

  const [getProgrammeLabel, setGetProgrammeLabel] = useState("");
  const [getProgrammeNameLabel, setGetProgrammeNameLabel] = useState("");
  const [getIsElectiveLabel, setGetIsElectiveLabel] = useState("");
  const [getLevelLabel, setGetLevelLabel] = useState("");
  const [getCurrentTeacherLabel, setGetCurrentTeacherLabel] = useState("");
  const [teachersGender, setTeachersGender] = useState("");

  const [sectionNameValue, setSectionNameValue] = useState("");
  const [currentClassLevelValue, setCurrentClassLevelValue] = useState("");
  const [programValue, setProgramValue] = useState("");
  const [isElectiveValue, setisElectiveValue] = useState("");
  const [currentTeacherValue, setCurrentTeacherValue] = useState("");
  const [levelNameValue, setLevelNameValue] = useState("");
  console.log(currentTeacherValue);
  console.log(programValue);

  const navigate = useNavigate();

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
      setOpenIsElectiveList(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", hideOnClickOutside, true);
  }, []);

  // const {
  //   createElectiveSubjectStatus,
  //   electiveSubjectSuccessMessage,
  //   electiveSubjectError,
  // } = useSelector((state) => state.electiveSubject);
  // const allAcademicTerms = useSelector(getAllAcademicTerms);
  // const allAllClassLevels = useSelector(getAllClassLevels);

  const [electiveSubject, setElectiveSubject] = useState({
    subjectName: "",
    nameOfProgram: "",
    programId: "",
    nameOfDivisionProgram: "",
    divisionProgramId: "",
    isOptional: false,
    createdBy: `${userInfo.id}`,
  });
  console.log(electiveSubject);

  const handleInputValues = (e) => {
    setElectiveSubject({
      ...electiveSubject,
      [e.target.name]: e.target.value,
    });
  };

  const canSave = Boolean(electiveSubject.subjectName);
  // Boolean(currentClassLevelValue) &&
  // Boolean(programValue) &&
  // Boolean(getProgrammeLabel);
  // Boolean(currentTeacherValue);

  const handleElectiveSubject = (e) => {
    e.preventDefault();
    setLoadingComplete(false);
    const data = {
      subjectName: electiveSubject?.subjectName,
      nameOfProgram: electiveSubject?.nameOfProgram,
      programId: electiveSubject?.programId,
      divisionProgramId: electiveSubject?.divisionProgramId,
      isOptional: electiveSubject?.isOptional,
      createdBy: userInfo?.id,
    };
    // dispatch(createElectiveSubject(data));
  };

  // useEffect(() => {
  //   if (createElectiveSubjectStatus === "pending") {
  //     setTimeout(() => {
  //       setLoadingComplete(true);
  //     }, 3000);
  //   }
  //   if (createElectiveSubjectStatus === "rejected") {
  //     setTimeout(() => {
  //       setLoadingComplete(null);
  //     }, 3000);
  //     setTimeout(() => {
  //       electiveSubjectError?.errorMessage?.message?.map((err) =>
  //         toast.error(err, {
  //           position: "top-right",
  //           theme: "light",
  //           // toastId: successId,
  //         })
  //       );
  //       dispatch(resetCreateElectiveSubjState());
  //     }, 2000);
  //     return;
  //   }
  //   if (createElectiveSubjectStatus === "success") {
  //     setTimeout(() => {
  //       toast.success(electiveSubjectSuccessMessage, {
  //         position: "top-right",
  //         theme: "dark",
  //         // toastId: successId,
  //       });
  //     }, 2000);
  //     setTimeout(() => {
  //       setLoadingComplete(null);
  //       setElectiveSubject({
  //         subjectName: "",
  //         nameOfProgram: "",
  //         programId: "",
  //         nameOfDivisionProgram: "",
  //         divisionProgramId: "",
  //         isOptional: false,
  //         createdBy: `${userInfo.id}`,
  //       });
  //       setGetLevelLabel("");
  //       setGetCurrentTeacherLabel("");
  //       setGetProgrammeLabel("");
  //       setGetProgrammeNameLabel("");
  //       dispatch(resetCreateElectiveSubjState());
  //       // window.location.reload();
  //       setHasDivisions(false);
  //     }, 6000);
  //   }
  // }, [
  //   electiveSubjectError,
  //   electiveSubjectSuccessMessage,
  //   createElectiveSubjectStatus,
  //   toastOptions,
  //   navigate,
  //   dispatch,
  //   userInfo,
  // ]);

  // useEffect(() => {
  //   dispatch(fetchTeachers());
  //   dispatch(fetchAllProgrammes());
  //   if (electiveSubject?.programId) {
  //     dispatch(
  //       fetchAllDivisionProgrammes({ programId: electiveSubject?.programId })
  //     );
  //   }
  //   dispatch(fetchAllAcademicTerms());
  //   dispatch(fetchClassLevels());
  // }, [dispatch, electiveSubject?.programId]);

  // useEffect(() => {
  //   setUserInfo(userInfo);
  // }, [userInfo]);

  return (
    <div className="electiveSubjectWrap">
      {/* <form onSubmit={handleElectiveSubject}>
        <h1 className="subjectFormH1">Elective Subject Form</h1>
        <div className="formInputWrap">
          <div className="inputCont">
            <label htmlFor="subjectName">
              Subject Name<span>*</span>
            </label>
            <input
              type="text"
              name="subjectName"
              onChange={handleInputValues}
              placeholder=""
              value={electiveSubject.subjectName}
            />
          </div>
          <div className="selectBox">
            <div
              className="selectedOption"
              onClick={() => setOpenProgramList(!openProgramList)}
            >
              <span className="optionSelected">
                {!electiveSubject?.nameOfProgram && (
                  <p className="genderLabel">
                    Select Program<span>*</span>
                  </p>
                )}
                {electiveSubject?.nameOfProgram}
              </span>
              <div className="arrows">
                {!openProgramList ? (
                  <KeyboardArrowDownIcon className="arrowDown" />
                ) : (
                  <KeyboardArrowUpIcon className="arrowUp" />
                )}
              </div>
            </div>
            <div
              ref={outSideClickRef}
              className={
                !openProgramList
                  ? "genderOptionCont"
                  : "genderOptionCont active"
              }
            >
              {allProgrammes.map((program) => (
                <div className="option" key={program?._id}>
                  <input
                    style={{ display: "none" }}
                    type="radio"
                    className="radio"
                    id="programs"
                    name="programId"
                  />
                  <label
                    htmlFor="programId"
                    onClick={(e) => {
                      e.preventDefault();
                      if (program && program?.programDivisions?.length > 0) {
                        setHasDivisions(true);
                        setElectiveSubject({
                          ...electiveSubject,
                          nameOfProgram: program?.name,
                          programId: program?._id,
                        });
                        // dispatch(
                        //   fetchAllDivisionProgrammes({
                        //     programId: program?._id,
                        //   })
                        // );
                        setOpenProgramList(false);
                      } else {
                        setElectiveSubject({
                          ...electiveSubject,
                          nameOfProgram: program?.name,
                          programId: program?._id,
                        });
                        setHasDivisions(false);
                        setOpenProgramList(false);
                      }
                    }}
                  >
                    <p>{program?.name}</p>
                  </label>
                </div>
              ))}
            </div>
          </div>
          {hasDivisions && (
            <div className="selectBox">
              <div
                className="selectedOption"
                onClick={() => setOpenProgramNameList(!openProgramNameList)}
              >
                <span className="optionSelected">
                  {!electiveSubject?.nameOfDivisionProgram && (
                    <p className="genderLabel">
                      Select Division Program<span>*</span>
                    </p>
                  )}
                  {electiveSubject?.nameOfDivisionProgram}
                </span>
                <div className="arrows">
                  {!openProgramNameList ? (
                    <KeyboardArrowDownIcon className="arrowDown" />
                  ) : (
                    <KeyboardArrowUpIcon className="arrowUp" />
                  )}
                </div>
              </div>
              <div
                ref={outSideClickRef}
                className={
                  !openProgramNameList
                    ? "genderOptionCont"
                    : "genderOptionCont active"
                }
              >
                {allDivisionProgrammes.map((program) => (
                  <div className="option" key={program?._id}>
                    <input
                      style={{ display: "none" }}
                      type="radio"
                      className="radio"
                      id="programs"
                      name="nameOfProgram"
                    />
                    <label
                      htmlFor="nameOfProgram"
                      onClick={() => {
                        setElectiveSubject({
                          ...electiveSubject,
                          divisionProgramId: program?._id,
                          nameOfDivisionProgram: program?.divisionName,
                        });
                      }}
                    >
                      <p>{program?.divisionName}</p>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="selectBox">
            <div className="selectedOption optionalSubjects">
              <label htmlFor="nationality">Optional E-Subject:</label>
              <div className="genderCont">
                <div className="radioGap">
                  <label
                    htmlFor="true"
                    style={{
                      // color: "#25f748",
                      outline: "none",
                      marginRight: "5px",
                    }}
                  >
                    True
                  </label>
                  <input
                    type="radio"
                    onChange={handleInputValues}
                    name="isOptional"
                    value={true}
                    style={{ outline: "none" }}
                    checked={electiveSubject.isOptional === "true"}
                  />
                </div>
                <div className="radioGap">
                  <label
                    htmlFor="false"
                    style={{
                      // color: "#ec6767",
                      outline: "none",
                      marginRight: "5px",
                    }}
                  >
                    False
                  </label>
                  <input
                    type="radio"
                    onChange={handleInputValues}
                    name="isOptional"
                    value={false}
                    style={{ outline: "none" }}
                    checked={electiveSubject.isOptional === "false"}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <button className="addStudentBtn" type="submit" disabled={!canSave}>
          Create Elective Subject
        </button>
      </form> */}
      <Box
        sx={{
          width: { xs: "100%", sm: "85%", md: "75%", lg: "60%", xl: "50%" },
          margin: "auto",
          paddingTop: "2rem",
          display: "flex",
          flexDirection: "column",
        }}
        className="createElectiveSubjectWrap"
      >
        <Box
          component={"form"}
          onSubmit={handleElectiveSubject}
          minHeight={220}
          p={2}
        >
          <h1>Elective Subject Form</h1>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={6} lg={6} className="inputCont">
              <CustomTextField
                fullWidth
                label="Subject Name"
                name="subjectName"
                onChange={handleInputValues}
                value={electiveSubject?.subjectName}
                required
                className="textField"
                sx={{
                  "&:hover": {
                    borderColor: "none",
                  },
                }}
              />
            </Grid>
            {/* Programme Selection */}
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <CustomTextField
                select
                fullWidth
                label="Select Programme"
                name="nameOfProgram"
                value={electiveSubject?.nameOfProgram}
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
            {electiveSubject &&
              electiveSubject?.nameOfProgram === "General Arts" && (
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <CustomTextField
                    select
                    fullWidth
                    label="Division Program"
                    name="nameOfDivisionProgram"
                    value={electiveSubject?.nameOfDivisionProgram}
                    onChange={handleInputValues}
                    required
                  >
                    <MenuItem value="General Arts 1">General Arts 1</MenuItem>
                    <MenuItem value="General Arts 2">General Arts 2</MenuItem>
                    <MenuItem value="General Arts 3">General Arts 3</MenuItem>
                  </CustomTextField>
                </Grid>
              )}
            <Grid item xs={12} sm={6} md={6} lg={6} className="inputCont">
              <FormControl component="fieldset">
                <Box
                  sx={
                    {
                      // display: "flex",
                      // flexWrap: "wrap",
                      // justifyContent: "center",
                      // alignItems: "flex-start",
                      // textAlign: "left",
                      // gap: { xs: "0", sm: "1rem" },
                    }
                  }
                >
                  <FormLabel
                    component="legend"
                    // className="title"
                    sx={{
                      fontWeight: "600",
                      marginRight: "1rem",
                      color: "red",
                    }}
                  >
                    <h5>Optional E-Subject:</h5>
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-label="options"
                    name="isOptional"
                    onChange={handleInputValues}
                  >
                    <FormControlLabel
                      value="true"
                      control={
                        <Radio
                          sx={{
                            color: "green",
                            "&.Mui-checked": {
                              color: "#04a214",
                            },
                          }}
                        />
                      }
                      label="True"
                      sx={{
                        color:
                          electiveSubject.isOptional === "true"
                            ? "#04a214"
                            : "",
                      }}
                    />
                    <FormControlLabel
                      value="false"
                      control={
                        <Radio
                          sx={{
                            color: "red",
                            "&.Mui-checked": {
                              color: "#f00808",
                            },
                          }}
                        />
                      }
                      label="False"
                      sx={{
                        color:
                          electiveSubject.isOptional === "false"
                            ? "#f00808"
                            : "",
                      }}
                    />
                  </RadioGroup>
                </Box>
              </FormControl>
            </Grid>
          </Grid>
          <Button type="submit" disabled={!canSave}>
            Create Elective Subject
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
    </div>
  );
}
