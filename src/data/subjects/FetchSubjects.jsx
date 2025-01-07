import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllSubjects,
  getAllSubjects,
} from "../../features/academics/subjectsSlice";
import { FetchAllApprovedStudents } from "../students/FetchAllStudents";
import { fetchAllUsers, getAllUsers } from "../../features/auth/authSlice";

const FetchAllSubjects = () => {
  const allSubjects = useSelector(getAllSubjects);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllSubjects());
  }, [dispatch]);

  return allSubjects;
};
const FetchAllElectiveSubjects = () => {
  const allSubjects = FetchAllSubjects();

  const electiveSubjects = allSubjects?.filter(
    (subj) => subj && subj?.electiveSubInfo?.isElectiveSubject && subj
  );

  return electiveSubjects;
};
const FetchAllCoreSubjects = () => {
  const allSubjects = FetchAllSubjects();

  const coreSubjects = allSubjects?.filter(
    (subj) => subj && subj?.coreSubInfo?.isCoreSubject && subj
  );

  return coreSubjects;
};
const FetchAllLecturerSubjects = (lecturerId) => {
  const allSubjects = FetchAllSubjects();

  const allLecturerSubjects = allSubjects?.filter(
    (subj) => subj && subj?.currentTeacher === lecturerId && subj
  );

  return allLecturerSubjects;
};
const FetchAllSubjectStudents = (selectedSubject) => {
  const dispatch = useDispatch();
  console.log(selectedSubject);
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
