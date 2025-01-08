import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers, getAllUsers } from "../../features/auth/authSlice";
import {
  fetchAllReports,
  getAllReports,
} from "../../features/reports/reportSlice";

const FetchAllReports = () => {
  const allReports = useSelector(getAllReports);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllReports());
  }, [dispatch]);

  return allReports;
};
const FetchAllElectiveReports = () => {
  const allReports = FetchAllReports();

  const electiveReports = allReports?.filter(
    (subj) => subj && subj?.electiveSubInfo?.isElectiveReport && subj
  );

  return electiveReports;
};
const FetchAllCoreReports = () => {
  const allReports = FetchAllReports();

  const coreReports = allReports?.filter(
    (subj) => subj && subj?.coreSubInfo?.isCoreReport && subj
  );

  return coreReports;
};
const FetchAllLecturerReports = (lecturerId) => {
  const allReports = FetchAllReports();

  const allLecturerReports = allReports?.filter(
    (subj) => subj && subj?.currentTeacher === lecturerId && subj
  );

  return allLecturerReports;
};
const FetchAllReportStudents = (selectedReport) => {
  const dispatch = useDispatch();
  console.log(selectedReport);
  const allUsers = useSelector(getAllUsers);

  const allLecturerReports = allUsers?.filter(
    (std) =>
      (std &&
        std?.roles?.includes("Student") &&
        std?.studentSchoolData?.electiveReports?.includes(selectedReport)) ||
      (std?.studentSchoolData?.coreReports?.includes(selectedReport) && std)
  );

  const studentsList = allLecturerReports?.map((std) => ({
    ...std,
    classScore: "",
    examScore: "",
    totalScore: "",
    Report: "",
  }));

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);
  return studentsList;
};

export {
  FetchAllReports,
  FetchAllElectiveReports,
  FetchAllCoreReports,
  FetchAllLecturerReports,
  FetchAllReportStudents,
};
