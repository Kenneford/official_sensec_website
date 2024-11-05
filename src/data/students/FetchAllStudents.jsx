import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers, getAllUsers } from "../../features/auth/authSlice";

const FetchAllStudents = () => {
  const dispatch = useDispatch();
  const allUsers = useSelector(getAllUsers);
  const allStudents = allUsers?.filter(
    (user) => user?.roles?.includes("student") && user
  );

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  return allStudents;
};
const FetchAllApprovedStudents = () => {
  const dispatch = useDispatch();
  const allUsers = useSelector(getAllUsers);
  const allApprovedStudents = allUsers?.filter(
    (user) =>
      user?.roles?.includes("student") &&
      user?.studentStatusExtend?.enrollmentStatus === "approved" &&
      user
  );

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  return allApprovedStudents;
};
const FetchAllPendingStudents = () => {
  const dispatch = useDispatch();
  const allUsers = useSelector(getAllUsers);
  const allPendingStudents = allUsers?.filter(
    (user) =>
      user?.roles?.includes("student") &&
      user?.studentStatusExtend?.enrollmentStatus === "pending" &&
      user
  );

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  return allPendingStudents;
};
const FetchPendingClassLevelStudents = (class_level) => {
  const allPendingStudents = FetchAllPendingStudents();
  const pendingClassLevelStudents = allPendingStudents?.filter(
    (std) =>
      std && std?.studentSchoolData?.currentClassLevel?._id === class_level
  );

  return pendingClassLevelStudents;
};
//Fetch ClassLevel Students
const FetchApprovedClassLevelStudents = (class_level) => {
  const allApprovedStudents = FetchAllApprovedStudents();

  const classLevelStudents = allApprovedStudents?.filter(
    (std) =>
      std && std?.studentSchoolData?.currentClassLevel?._id === class_level
  );

  return classLevelStudents;
};
//Fetch ClassLevel Students
const FetchClassLevelProgrammeStudents = (class_level, programmeFound) => {
  const allApprovedStudents = FetchAllApprovedStudents();

  const classLevelStudents = allApprovedStudents?.filter(
    (std) =>
      std &&
      std?.studentSchoolData?.currentClassLevel?._id === class_level &&
      std?.studentSchoolData?.program?._id === programmeFound
  );

  return classLevelStudents;
};

export {
  FetchAllStudents,
  FetchAllApprovedStudents,
  FetchAllPendingStudents,
  FetchPendingClassLevelStudents,
  FetchApprovedClassLevelStudents,
  FetchClassLevelProgrammeStudents,
};
