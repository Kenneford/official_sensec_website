import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllSubjects,
  getAllSubjects,
} from "../../features/academics/subjectsSlice";
import {
  fetchAllUsers,
  getAllUsers,
  getAuthUser,
} from "../../features/auth/authSlice";

const FetchAllSubjects = () => {
  const { assignLecturerStatus, successMessage, removeLecturerStatus, error } =
    useSelector((state) => state.subject);
  const allSubjects = useSelector(getAllSubjects);
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      assignLecturerStatus === "success" ||
      removeLecturerStatus === "success"
    ) {
      dispatch(fetchAllSubjects());
    } else {
      dispatch(fetchAllSubjects());
    }
  }, [assignLecturerStatus, removeLecturerStatus, dispatch]);

  return allSubjects;
};
const FetchAllElectiveSubjects = () => {
  const allSubjects = FetchAllSubjects();

  const electiveSubjects = allSubjects?.filter(
    (subj) => subj && subj?.subjectInfo?.isElectiveSubject && subj
  );

  return electiveSubjects;
};
const FetchAllCoreSubjects = () => {
  const allSubjects = FetchAllSubjects();

  const coreSubjects = allSubjects?.filter(
    (subj) => subj && subj?.subjectInfo?.isCoreSubject
  );

  return coreSubjects;
};
const FetchAllLecturerSubjects = (isCore) => {
  const authUser = useSelector(getAuthUser);
  const [subjects, setSubjects] = useState([]);

  // const allSubjects = FetchAllSubjects();
  const allUsers = useSelector(getAllUsers);
  const dispatch = useDispatch();

  const lecturerFound = allUsers?.find(
    (lecturer) => lecturer?.uniqueId === authUser?.uniqueId
  );
  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  useEffect(() => {
    if (!isCore) {
      const subjects =
        lecturerFound?.lecturerSchoolData?.teachingSubjects?.electives;
      setSubjects(subjects);
    } else {
      const subjects =
        lecturerFound?.lecturerSchoolData?.teachingSubjects?.cores;
      setSubjects(subjects);
    }
  }, [lecturerFound, isCore]);

  if (!subjects) {
    return [];
  }
  // Extract all subjects from the nested subjects array
  const allSubjects = subjects.flatMap((subj) => subj);
  // Filter out duplicates based on the _id property
  const uniqueSubjects = Array.from(
    new Map(subjects.map((subj) => [subj?.subject?._id, subj])).values()
  );

  return uniqueSubjects;
  // const allSubjects = FetchAllSubjects();

  // const allLecturerSubjects = allSubjects?.filter(
  //   (subj) => subj && subj?.currentTeacher === lecturerId && subj
  // );

  // return allLecturerSubjects;
};
const FetchAllSubjectStudents = (selectedSubject) => {
  const dispatch = useDispatch();
  const allUsers = useSelector(getAllUsers);

  const allLecturerSubjects = allUsers?.filter(
    (std) =>
      (std &&
        std?.roles?.includes("Student") &&
        std?.studentSchoolData?.electiveSubjects?.includes(selectedSubject)) ||
      (std?.studentSchoolData?.coreSubjects?.includes(selectedSubject) && std)
  );

  const studentsList = allLecturerSubjects?.map((std) => ({
    ...std,
    classScore: "",
    examScore: "",
    totalScore: "",
    subject: "",
  }));

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);
  return studentsList;
};

export {
  FetchAllSubjects,
  FetchAllElectiveSubjects,
  FetchAllCoreSubjects,
  FetchAllLecturerSubjects,
  FetchAllSubjectStudents,
};
