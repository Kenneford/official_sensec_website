import React, { useEffect, useRef, useState } from "react";
import "./updateClassLevelSection.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getUser } from "../../../../features/allUsers/usersSlice";
import {
  fetchClassLevels,
  getAllClassLevels,
} from "../../../../features/academics/classLevels/classLevelsSlice";
import {
  fetchAllProgrammes,
  getAllProgrammes,
} from "../../../../features/academics/academicProgram/academicProgramSlice";
import {
  fetchSingleTeacher,
  fetchTeachers,
  getAllTeachers,
  getSingleTeacher,
} from "../../../../features/teacher/teachersSlice";
import {
  createClassLevelSection,
  removeClassSectionLecturer,
  updateClassLevelSection,
} from "../../../../features/academics/classLevels/classLevelSectionSlice";
import LoadingProgress from "../../../pageLoading/LoadingProgress";
import { FetchSingleClassSection } from "../../../../dataFetching/fetchClassSections/FetchClassSectionsCategories";
import {
  ApprovedLecturers,
  ClassSectionLecturer,
  SingleLecturer,
} from "../../../../dataFetching/fetchLecturers/FetchLecturersCategories";
import { FetchClassLevels } from "../../../../dataFetching/fetchClassLevels/FetchAllClassLevels";
import PageLoading from "../../../pageLoading/PageLoading";

export default function UpdateClassSection() {
  const dispatch = useDispatch();
  const { section_name, currentLevel } = useParams();
  console.log(section_name, currentLevel);
  const authAdminInfo = useSelector(getUser);
  const allClassLevels = FetchClassLevels();
  const classSectionFound = FetchSingleClassSection(currentLevel, section_name);
  const teachersEmployed = ApprovedLecturers(); // Don't change this logic
  console.log(classSectionFound);

  const allProgrammes = useSelector(getAllProgrammes);
  const {
    updateClassSectionStatus,
    updateClassSectionSuccessMessage,
    updateClassSectionError,
    removeClassSectionLecturerStatus,
    removeClassSectionLecturerSuccessMessage,
    removeClassSectionLecturerError,
  } = useSelector((state) => state.classLevelSection);

  // console.log(allProgrammes);

  // console.log(teachersEmployed);

  const [loadingComplete, setLoadingComplete] = useState(null);
  const [removeLoadingComplete, setRemoveLoadingComplete] = useState(null);
  const [removeLecturer, setRemoveLecturer] = useState(false);

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

  const singleTeacher = ClassSectionLecturer({
    teacherId: classSectionFound?.currentTeacher?._id || currentTeacherValue,
  });

  // const classSectionTeacher = ClassSectionLecturer({
  //   teacherId: currentTeacherValue,
  // });
  console.log(singleTeacher);
  // console.log(classSectionTeacher);

  const [classSection, setClassSection] = useState({
    classLevelSectionId: classSectionFound?._id,
    // sectionName: classSectionFound?.sectionName,
    // classLevelId: classSectionFound?.classLevelId,
    // classLevelName: classSectionFound?.classLevelName,
    // program: classSectionFound?.program,
    currentTeacher: classSectionFound?.currentTeacher?._id,
    lastUpdatedBy: `${authAdminInfo.id}`,
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

  // const canSave =
  //   Boolean(sectionNameValue) &&
  //   Boolean(currentClassLevelValue) &&
  //   Boolean(programValue);
  // Boolean(currentTeacherValue);

  const handleClassSectionUpdate = (e) => {
    e.preventDefault();
    setLoadingComplete(false);
    if (
      classSectionFound &&
      classSectionFound?.program?._id !==
        singleTeacher?.teacherSchoolData?.program?._id
    ) {
      setTimeout(() => {
        toast.error("Teacher Not Found Under This Programme!", {
          position: "top-right",
          theme: "dark",
        });
      }, 2000);
      setTimeout(() => {
        setLoadingComplete(null);
      }, 3000);
      return;
    }
    dispatch(
      updateClassLevelSection({
        classLevelSectionId: classSectionFound?._id,
        // sectionName: classSectionFound?.sectionName
        //   ? classSectionFound?.sectionName
        //   : sectionNameValue,
        // classLevelId: classSectionFound?.classLevelId
        //   ? classSectionFound?.classLevelId?._id
        //   : currentClassLevelValue,
        // classLevelName: classSectionFound?.classLevelName
        //   ? classSectionFound?.classLevelName
        //   : levelNameValue,
        // program: classSectionFound?.program
        //   ? classSectionFound?.program?._id
        //   : programValue,
        currentTeacher: singleTeacher
          ? singleTeacher?._id
          : currentTeacherValue,
        lastUpdatedBy: classSection?.lastUpdatedBy,
      })
    );
  };
  const handleLecturerRemoval = (e) => {
    e.preventDefault();
    setRemoveLecturer(true);
    dispatch(
      removeClassSectionLecturer({
        lecturerId: singleTeacher?._id,
        adminId: authAdminInfo?.id,
      })
    );
  };

  //Updating Class Section Status Check
  useEffect(() => {
    if (updateClassSectionStatus === "pending") {
      setLoadingComplete(false);
      setTimeout(() => {
        setLoadingComplete(true);
      }, 3000);
    }
    if (updateClassSectionStatus === "rejected") {
      setTimeout(() => {
        updateClassSectionError?.errorMessage?.message?.map((err) =>
          toast.error(err, {
            position: "top-right",
            theme: "dark",
          })
        );
      }, 1000);
      setTimeout(() => {
        setLoadingComplete(null);
      }, 3000);
      return;
    }
    if (updateClassSectionStatus === "success") {
      setTimeout(() => {
        toast.success(updateClassSectionSuccessMessage, {
          position: "top-right",
          theme: "dark",
        });
      }, 3000);
      dispatch(fetchTeachers());
      dispatch(fetchClassLevels());
      dispatch(fetchAllProgrammes());
    }
  }, [
    updateClassSectionError,
    updateClassSectionSuccessMessage,
    updateClassSectionStatus,
    navigate,
    dispatch,
  ]);

  //Removing Class Section Lecturer Status Check
  useEffect(() => {
    if (removeClassSectionLecturerStatus === "pending") {
      setRemoveLoadingComplete(false);
      setTimeout(() => {
        setRemoveLoadingComplete(true);
      }, 3000);
    }
    if (removeClassSectionLecturerStatus === "rejected") {
      setTimeout(() => {
        removeClassSectionLecturerError?.errorMessage?.message?.map((err) =>
          toast.error(err, {
            position: "top-right",
            theme: "dark",
          })
        );
      }, 2000);
      setTimeout(() => {
        setRemoveLoadingComplete(null);
      }, 3000);
      return;
    }
    if (removeClassSectionLecturerStatus === "success") {
      setTimeout(() => {
        toast.success(removeClassSectionLecturerSuccessMessage, {
          position: "top-right",
          theme: "dark",
        });
      }, 3000);
      setRemoveLecturer(false);
      dispatch(fetchTeachers());
      dispatch(fetchClassLevels());
      dispatch(fetchAllProgrammes());
    }
  }, [
    removeClassSectionLecturerError,
    removeClassSectionLecturerSuccessMessage,
    removeClassSectionLecturerStatus,
    navigate,
    dispatch,
  ]);

  useEffect(() => {
    dispatch(fetchAllProgrammes());
    setClassSection(classSectionFound);
  }, [dispatch, classSectionFound]);

  if (!classSectionFound) {
    return <PageLoading />;
  }
  return (
    <div id="updateClassSectionWrap">
      <form>
        <h1>Update {section_name.replace(/_/g, " ")} Section</h1>
        <h4>[ {currentLevel.replace(/_/g, " ")} ]</h4>
        <div className="formInputWrap">
          <div className="selectBox">
            <p className="inputFieldInfo">Class Section Name</p>
            <input
              type="text"
              className="inputDisabled"
              name="sectionName"
              value={classSection?.sectionName}
              disabled
            />
          </div>
          <div className="selectBox">
            <p className="inputFieldInfo">Class Level</p>
            <input
              type="text"
              className="inputDisabled"
              name="classLevelId"
              value={classSection?.classLevelId?.name}
              disabled
            />
          </div>
          <div className="selectBox">
            <p className="inputFieldInfo">Select Program</p>
            <input
              type="text"
              className="inputDisabled"
              name="program"
              value={classSection?.program?.name}
              disabled
            />
          </div>
          <div className="selectBox">
            <p className="inputFieldInfo">Select Teacher</p>
            <button
              className="selectedOption"
              onClick={(e) => {
                e.preventDefault();
                setOpenCurrentTeacherList(!openCurrentTeacherList);
              }}
            >
              <span className="optionSelected">
                {!getCurrentTeacherLabel && (
                  <p className="genderLabel">
                    {classSection?.currentTeacher &&
                      classSection?.currentTeacher?.personalInfo?.gender ===
                        "Male" &&
                      "Mr."}{" "}
                    {classSection?.currentTeacher &&
                      classSection?.currentTeacher?.personalInfo?.gender ===
                        "Female" &&
                      "Mrs."}{" "}
                    {classSection?.currentTeacher?.personalInfo?.fullName}
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
            </button>
            <div
              ref={outSideClickRef}
              className={
                !openCurrentTeacherList
                  ? "genderOptionCont"
                  : "genderOptionCont active"
              }
            >
              {teachersEmployed &&
                teachersEmployed?.length > 0 &&
                teachersEmployed?.map((teacher) => (
                  <div className="option" key={teacher?._id}>
                    <input
                      style={{ display: "none" }}
                      type="radio"
                      className="radio"
                      id="teachers"
                      name="currentTeacher"
                    />
                    <button
                      className="listOfTeachers"
                      onClick={(e) => {
                        e.preventDefault();
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
                    </button>
                  </div>
                ))}
            </div>
            {/* {updateClassSectionStatus === "rejected" &&
              singleTeacher?.teacherSchoolData?.isClassLevelTeacher && (
                <button
                  className="removeLecturerBtn"
                  onClick={handleLecturerRemoval}
                >
                  {removeLoadingComplete === false && (
                    <LoadingProgress color={"#fff"} size={"1rem"} />
                  )}
                  {removeLoadingComplete === true &&
                    removeClassSectionLecturerStatus === "success" && (
                      <>
                        <span> Lecturer removed successfully</span>{" "}
                        <TaskAltIcon />
                      </>
                    )}
                  {removeLoadingComplete === null &&
                    "Remove lecturer from current class first"}
                </button>
              )} */}
          </div>
          <div className="selectBox">
            <p className="inputFieldInfo">Class Level Name</p>
            <input
              type="text"
              className="inputDisabled"
              name="classLevelName"
              value={classSection?.classLevelName}
              disabled
            />
          </div>
        </div>
      </form>
      {/* Remove Button */}
      {singleTeacher?.teacherSchoolData?.isClassLevelTeacher &&
        singleTeacher?.teacherSchoolData?.program?._id ===
          classSectionFound?.program?._id &&
        updateClassSectionStatus === "rejected" && (
          <button className="removeLecturerBtn" onClick={handleLecturerRemoval}>
            {removeLoadingComplete === false && (
              <LoadingProgress color={"#fff"} size={"1rem"} />
            )}
            {removeLoadingComplete === true &&
              removeClassSectionLecturerStatus === "success" && (
                <>
                  <span> Lecturer removed successfully</span> <TaskAltIcon />
                </>
              )}
            {removeLoadingComplete === null &&
              "Remove lecturer from current class first"}
          </button>
        )}
      {/* {classSectionTeacher?.teacherSchoolData?.isClassLevelTeacher &&
        updateClassSectionStatus === "rejected" && (
          <button className="removeLecturerBtn" onClick={handleLecturerRemoval}>
            {removeLoadingComplete === false && (
              <LoadingProgress color={"#fff"} size={"1rem"} />
            )}
            {removeLoadingComplete === true &&
              removeClassSectionLecturerStatus === "success" && (
                <>
                  <span> Lecturer removed successfully</span> <TaskAltIcon />
                </>
              )}
            {removeLoadingComplete === null &&
              "Remove lecturer from current class first"}
          </button>
        )} */}
      {/* Update Button */}
      <button
        className="updateClassSectionBtn"
        // type="submit"
        onClick={handleClassSectionUpdate}
      >
        {loadingComplete === false && (
          <LoadingProgress color={"#fff"} size={"1.3rem"} />
        )}
        {loadingComplete === true && updateClassSectionStatus === "success" && (
          <>
            <span> Class Section Updated Successfully...</span> <TaskAltIcon />
          </>
        )}
        {loadingComplete === null && "Update Class Section"}
      </button>
    </div>
  );
}
