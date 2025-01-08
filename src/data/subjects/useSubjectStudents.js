import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllUsers,
  getAllUsers,
  getAuthUser,
} from "../../features/auth/authSlice";
import {
  FetchAllCoreSubjects,
  FetchAllElectiveSubjects,
  FetchAllSubjects,
} from "./FetchSubjects";
import {
  fetchAllReports,
  fetchAllStudentReports,
  fetchDraftReport,
  getAllReports,
  getAllStudentReports,
  getDraftReportInfo,
} from "../../features/reports/reportSlice";
import { FetchCurrentAcademicTerms } from "../term.year/FetchAcademicTerms";

const useSubjectStudents = ({ classLevel, subject }) => {
  const { createStatus, error, successMessage } = useSelector(
    (state) => state.report
  );
  const dispatch = useDispatch();
  const authUser = useSelector(getAuthUser);
  const allUsers = useSelector(getAllUsers);
  const allReports = useSelector(getAllStudentReports);
  const draftReportInfo = useSelector(getDraftReportInfo);
  const allElectiveSubjects = FetchAllElectiveSubjects();
  const currentAcademicTerms = FetchCurrentAcademicTerms();
  const currentYear = new Date().getFullYear();
  const allCoreSubjects = FetchAllCoreSubjects();
  const [studentsList, setStudentsList] = useState([]);
  const lecturerFound = allUsers?.find((user) => user?._id === authUser?.id);

  const electiveSudjFound = allElectiveSubjects?.find(
    (subj) => subj?._id === subject
  );
  const coreSudjFound = allCoreSubjects?.find((subj) => subj?._id === subject);

  // Fetch users from the server on initial render
  useEffect(() => {
    dispatch(fetchAllUsers());
    dispatch(fetchAllStudentReports());
    const data = {
      classLevel,
      semester: currentAcademicTerms?.name,
      subject,
      lecturer: authUser?.id,
    };
    dispatch(fetchDraftReport(data));
  }, [dispatch, authUser, currentAcademicTerms, classLevel, subject]);
  //   useEffect(() => {
  //     if (createStatus === "success") {
  //       dispatch(fetchAllStudentReports());
  //     } else {
  //       dispatch(fetchAllUsers());
  //       dispatch(fetchAllStudentReports());
  //     }
  //   }, [dispatch, createStatus]);

  // Filter students based on the selected subject
  useEffect(() => {
    if (electiveSudjFound) {
      const filteredStudents =
        lecturerFound?.lecturerSchoolData?.students?.filter(
          (std) =>
            std?.studentSchoolData?.currentClassLevel === classLevel &&
            std?.studentSchoolData?.electiveSubjects?.includes(subject) &&
            std
        );
      // Add default fields for editing scores
      const formattedStudents = filteredStudents?.map((std) => ({
        ...std,
        classScore: std?.classScore || "",
        examScore: std?.examScore || "",
        totalScore: std?.totalScore || "",
        grade: std?.grade || "",
      }));
      setStudentsList(formattedStudents);
    } else if (coreSudjFound) {
      const filteredStudents =
        lecturerFound?.lecturerSchoolData?.students?.filter(
          (std) =>
            std?.studentSchoolData?.currentClassLevel === classLevel &&
            std?.studentSchoolData?.coreSubjects?.includes(subject) &&
            std
        );
      // Add default fields for editing scores
      const formattedStudents = filteredStudents?.map((std) => ({
        ...std,
        classScore: std?.classScore || "",
        examScore: std?.examScore || "",
        totalScore: std?.totalScore || "",
        grade: std?.grade || "",
      }));
      setStudentsList(formattedStudents);
    } else {
      setStudentsList([]); // Reset if no subject is selected
    }
  }, [
    subject,
    allUsers,
    classLevel,
    coreSudjFound,
    electiveSudjFound,
    lecturerFound,
    allReports,
    currentAcademicTerms,
    currentYear,
    draftReportInfo,
  ]);

  return studentsList;
};

export default useSubjectStudents;
