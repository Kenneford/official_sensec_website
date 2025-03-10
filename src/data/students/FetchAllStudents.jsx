import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers, getAllUsers } from "../../features/auth/authSlice";

const FetchAllStudents = () => {
  const { updateStatus } = useSelector((state) => state.student);
  const dispatch = useDispatch();
  const allUsers = useSelector(getAllUsers);
  const allStudents = allUsers?.filter(
    (user) => user?.roles?.includes("Student") && user
  );

  useEffect(() => {
    if (updateStatus === "success") {
      setTimeout(() => {
        dispatch(fetchAllUsers());
      }, 7000);
    } else {
      dispatch(fetchAllUsers());
    }
  }, [dispatch, updateStatus]);

  return allStudents;
};
const FetchAllApprovedStudents = () => {
  const dispatch = useDispatch();
  const allUsers = useSelector(getAllUsers);
  const allApprovedStudents = allUsers?.filter(
    (user) =>
      user?.roles?.includes("Student") &&
      user?.studentStatusExtend?.enrollmentStatus === "approved" &&
      user?.studentStatusExtend?.isStudent &&
      user
  );

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  return allApprovedStudents;
};
const FetchAllGraduatedStudents = () => {
  const allStudents = FetchAllStudents();
  const allGraduatedStudents = allStudents?.filter(
    (user) =>
      user?.studentStatusExtend?.isGraduated &&
      !user?.studentStatusExtend?.isStudent &&
      user
  );

  return allGraduatedStudents;
};
const FetchAllPendingStudents = () => {
  const dispatch = useDispatch();
  const allUsers = useSelector(getAllUsers);
  const allPendingStudents = allUsers?.filter(
    (user) =>
      user?.roles?.includes("Student") &&
      user?.studentStatusExtend?.enrollmentStatus === "pending" &&
      !user?.studentStatusExtend?.isStudent &&
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
const FetchProgrammeStudents = (programmeFound) => {
  const allApprovedStudents = FetchAllApprovedStudents();

  const programStudents = allApprovedStudents?.filter(
    (std) => std && std?.studentSchoolData?.program?._id === programmeFound
  );

  return programStudents;
};
//Fetch ClassSection Students
const FetchClassSectionStudents = ({ class_section, classLevelFound }) => {
  const allApprovedStudents = FetchAllStudents();
  if (class_section) {
    const classSectionStudents = allApprovedStudents?.filter(
      (std) =>
        (std?.studentStatusExtend?.enrollmentStatus === "approved" &&
          std?.studentSchoolData?.currentClassLevel?._id ===
            classLevelFound?._id &&
          std &&
          std?.studentSchoolData?.program?.programId === class_section) ||
        (std &&
          std?.studentSchoolData?.currentClassLevelSection?._id ===
            class_section)
    );

    return classSectionStudents;
  }
};
//Fetch Students CourseMates
const FetchStudentsCourseMates = ({
  authStudent,
  programme,
  classLevelFound,
}) => {
  const allApprovedStudents = FetchAllStudents();
  if (programme) {
    const courseMates = allApprovedStudents?.filter(
      (std) =>
        std?.studentStatusExtend?.enrollmentStatus === "approved" &&
        std?.studentSchoolData?.currentClassLevel?._id === classLevelFound &&
        std?.studentSchoolData?.program?.programId === programme &&
        std?.uniqueId !== authStudent?.uniqueId
    );

    return courseMates;
  }
};

export {
  FetchAllStudents,
  FetchAllApprovedStudents,
  FetchAllPendingStudents,
  FetchPendingClassLevelStudents,
  FetchApprovedClassLevelStudents,
  FetchProgrammeStudents,
  FetchAllGraduatedStudents,
  FetchClassSectionStudents,
  FetchStudentsCourseMates,
};
