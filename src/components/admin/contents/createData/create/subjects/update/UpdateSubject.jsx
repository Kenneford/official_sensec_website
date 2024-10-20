import React, { useEffect, useRef, useState } from "react";
// import "./electiveSubject.scss";
import { CircularProgress } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { useDispatch, useSelector } from "react-redux";
import {
  academicTermOptions,
  academicYearOptions,
  booleanOptions,
  classLevelOptions,
  programOptions,
  teachersOptions,
} from "../../../../options/options";
import { getAdminInfo } from "../../../../features/admin/adminsSlice";
import { createAcademicYear } from "../../../../features/academics/academicYear/academicYearSlice";
import { useNavigate } from "react-router-dom";
import {
  createElectiveSubject,
  refreshSubjectPage,
} from "../../../../features/academics/subjects/electiveSubjectSlice";
import {
  fetchTeachers,
  getAllTeachers,
} from "../../../../features/teacher/teachersSlice";
import {
  fetchAllProgrammes,
  getAllProgrammes,
} from "../../../../features/academics/academicProgram/academicProgramSlice";
import {
  fetchAllAcademicTerms,
  getAllAcademicTerms,
} from "../../../../features/academics/academicTerm/academicTermSlice";
import {
  fetchClassLevels,
  getAllClassLevels,
} from "../../../../features/academics/classLevels/classLevelsSlice";
import { getUser } from "../../../../features/allUsers/usersSlice";
import LoadingProgress from "../../../pageLoading/LoadingProgress";
import { toast } from "react-toastify";

export default function UpdateSubject({ toastOptions }) {
  const authAdminInfo = useSelector(getUser);
  const allClassLevels = useSelector(getAllClassLevels);
  const allProgrammes = useSelector(getAllProgrammes);
  const allTeachers = useSelector(getAllTeachers);
  console.log(allTeachers);
  console.log(allClassLevels);
  console.log(allProgrammes);

  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState(authAdminInfo);
  console.log(userInfo.id);
  const [loadingComplete, setLoadingComplete] = useState(null);

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
      setOpenIsElectiveList(false);
    }
  };
  const {
    createElectiveSubjectStatus,
    electiveSubjectSuccessMessage,
    electiveSubjectError,
  } = useSelector((state) => state.electiveSubject);
  const allAcademicTerms = useSelector(getAllAcademicTerms);
  const allAllClassLevels = useSelector(getAllClassLevels);

  const [electiveSubject, setElectiveSubject] = useState({
    subjectName: "",
    nameOfProgram: "",
    classLevel: "",
    currentTeacher: "",
    programId: "",
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

  const canSave =
    Boolean(electiveSubject.subjectName) &&
    Boolean(currentClassLevelValue) &&
    Boolean(programValue) &&
    Boolean(getProgrammeLabel);
  // Boolean(currentTeacherValue);

  const handleElectiveSubject = (e) => {
    e.preventDefault();
    setLoadingComplete(false);
    const formData = new FormData();
    formData.append("subjectName", electiveSubject.subjectName);
    formData.append("classLevel", currentClassLevelValue);
    formData.append("programId", programValue);
    formData.append("nameOfProgram", getProgrammeLabel);
    formData.append("currentTeacher", currentTeacherValue);
    formData.append("createdBy", electiveSubject.createdBy);
    // dispatch(createElectiveSubject(formData));
    dispatch(
      createElectiveSubject({
        subjectName: electiveSubject.subjectName,
        classLevel: currentClassLevelValue,
        programId: programValue,
        isOptional: electiveSubject.isOptional,
        nameOfProgram: getProgrammeLabel,
        currentTeacher: currentTeacherValue,
        createdBy: electiveSubject.createdBy,
      })
    );
  };

  useEffect(() => {
    if (createElectiveSubjectStatus === "pending") {
      setTimeout(() => {
        setLoadingComplete(true);
      }, 3000);
    }
    if (createElectiveSubjectStatus === "rejected") {
      setTimeout(() => {
        setLoadingComplete(null);
      }, 3000);
      setTimeout(() => {
        electiveSubjectError?.errorMessage?.message?.map((err) =>
          toast.error(err, {
            position: "top-right",
            theme: "light",
            // toastId: successId,
          })
        );
      }, 2000);
      return;
    }
    if (createElectiveSubjectStatus === "success") {
      setTimeout(() => {
        toast.success(electiveSubjectSuccessMessage, {
          position: "top-right",
          theme: "dark",
          // toastId: successId,
        });
      }, 2000);
      setTimeout(() => {
        setLoadingComplete(null);
        setElectiveSubject({
          subjectName: "",
          classLevel: "",
          currentTeacher: "",
        });
        setGetLevelLabel("");
        setGetCurrentTeacherLabel("");
        setGetProgrammeLabel("");
        setGetProgrammeNameLabel("");
        window.location.reload();
      }, 6000);
    }
  }, [
    electiveSubjectError,
    electiveSubjectSuccessMessage,
    createElectiveSubjectStatus,
    toastOptions,
    navigate,
    dispatch,
  ]);

  useEffect(() => {
    dispatch(fetchTeachers());
    dispatch(fetchAllProgrammes());
    dispatch(fetchAllAcademicTerms());
    dispatch(fetchClassLevels());
  }, [dispatch]);

  useEffect(() => {
    setUserInfo(userInfo);
  }, [userInfo]);

  return (
    <div className="electiveSubjectWrap">
      <form onSubmit={handleElectiveSubject}>
        <h1 className="subjectFormH1">Update Subject</h1>
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
              onClick={() => setOpenLevelList(!openLevelList)}
            >
              <span className="optionSelected">
                {!getLevelLabel ? (
                  <p className="genderLabel">
                    Select Class Level<span>*</span>
                  </p>
                ) : (
                  getLevelLabel
                )}
              </span>
              <div className="arrows">
                {!openLevelList ? (
                  <KeyboardArrowDownIcon className="arrowDown" />
                ) : (
                  <KeyboardArrowUpIcon className="arrowUp" />
                )}
              </div>
            </div>
            <div
              ref={outSideClickRef}
              className={
                !openLevelList ? "genderOptionCont" : "genderOptionCont active"
              }
            >
              {allClassLevels.map((classLevel) => (
                <div className="option" key={classLevel?._id}>
                  <input
                    style={{ display: "none" }}
                    type="radio"
                    className="radio"
                    id="classLevels"
                    name="currentClassLevelValue"
                  />
                  <label
                    htmlFor="currentClassLevelValue"
                    onClick={() => {
                      setCurrentClassLevelValue(
                        classLevel?._id,
                        setGetLevelLabel(classLevel?.name)
                      );
                    }}
                  >
                    <p>{classLevel?.name}</p>
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="selectBox">
            <div
              className="selectedOption"
              onClick={() => setOpenProgramList(!openProgramList)}
            >
              <span className="optionSelected">
                {!getProgrammeLabel && (
                  <p className="genderLabel">
                    Select Program<span>*</span>
                  </p>
                )}
                {getProgrammeLabel && getProgrammeLabel}
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
                    onClick={() => {
                      setProgramValue(
                        program?._id,
                        setGetProgrammeLabel(program?.name)
                      );
                    }}
                  >
                    <p>{program?.name}</p>
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="selectBox">
            <div
              className="selectedOption"
              onClick={() => setOpenProgramNameList(!openProgramNameList)}
            >
              <span className="optionSelected">
                {!getProgrammeNameLabel && (
                  <p className="genderLabel">
                    Select Name Of Program<span>*</span>
                  </p>
                )}
                {getProgrammeNameLabel && getProgrammeNameLabel}
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
              {allProgrammes.map((program) => (
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
                      setGetProgrammeNameLabel(program?.name);
                    }}
                  >
                    <p>{program?.name}</p>
                  </label>
                </div>
              ))}
            </div>
          </div>
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
              {/* <span className="optionSelected">
                {!getProgrammeLabel && (
                  <p className="genderLabel">
                    It's Optional (True/False)<span>*</span>
                  </p>
                )}
                {getProgrammeLabel && getProgrammeLabel}
              </span>
              <div className="arrows">
                {!openProgramList ? (
                  <KeyboardArrowDownIcon className="arrowDown" />
                ) : (
                  <KeyboardArrowUpIcon className="arrowUp" />
                )}
              </div> */}
            </div>
            {/* <div
              ref={outSideClickRef}
              className={
                !openProgramList
                  ? "genderOptionCont"
                  : "genderOptionCont active"
              }
            >
              {booleanOptions.map((program) => (
                <div className="option" key={program.label}>
                  <input
                    style={{ display: "none" }}
                    type="radio"
                    className="radio"
                    id="programs"
                    name="programId"
                  />
                  <label
                    htmlFor="programId"
                    onClick={() => {
                      setProgramValue(
                        program.value,
                        setGetProgrammeLabel(program?.label)
                      );
                    }}
                  >
                    <p>{program?.label}</p>
                  </label>
                </div>
              ))}
            </div> */}
          </div>
          <div className="selectBox">
            <div
              className="selectedOption"
              onClick={() => setOpenCurrentTeacherList(!openCurrentTeacherList)}
            >
              <span className="optionSelected">
                {!getCurrentTeacherLabel && (
                  <p className="genderLabel">
                    Select Teacher<span>*</span>
                  </p>
                )}
                {getCurrentTeacherLabel && teachersGender === "Male" && "Mr."}{" "}
                {getCurrentTeacherLabel &&
                  teachersGender === "Female" &&
                  "Mrs."}{" "}
                {getCurrentTeacherLabel && getCurrentTeacherLabel}
              </span>
              <div className="arrows">
                {!openCurrentTeacherList ? (
                  <KeyboardArrowDownIcon className="arrowDown" />
                ) : (
                  <KeyboardArrowUpIcon className="arrowUp" />
                )}
              </div>
            </div>
            <div
              ref={outSideClickRef}
              className={
                !openCurrentTeacherList
                  ? "genderOptionCont"
                  : "genderOptionCont active"
              }
            >
              {allTeachers.map((teacher) => (
                <div className="option" key={teacher?._id}>
                  <input
                    style={{ display: "none" }}
                    type="radio"
                    className="radio"
                    id="teachers"
                    name="currentTeacher"
                  />
                  <label
                    htmlFor="currentTeacher"
                    onClick={() => {
                      setCurrentTeacherValue(
                        teacher?._id,
                        setGetCurrentTeacherLabel(
                          teacher?.personalInfo?.fullName
                        ),
                        setTeachersGender(teacher?.personalInfo?.gender)
                      );
                    }}
                  >
                    <p>
                      {teacher?.personalInfo?.gender === "" && "Mr./Mrs. "}
                      {teacher?.personalInfo?.gender === "Male" && "Mr. "}
                      {teacher?.personalInfo?.gender === "Female" && "Mrs. "}
                      {teacher?.personalInfo
                        ? teacher?.personalInfo?.fullName
                        : teacher?.fullName}
                    </p>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <button className="addStudentBtn" type="submit" disabled={!canSave}>
          {loadingComplete === false && (
            <LoadingProgress color={"#fff"} size={"1.3rem"} />
          )}
          {loadingComplete === true &&
            createElectiveSubjectStatus === "success" && (
              <>
                <span> Elective Subject Created Successfully</span>{" "}
                <TaskAltIcon />
              </>
            )}
          {loadingComplete === null && "Create Elective Subject"}
        </button>
      </form>
    </div>
  );
}
