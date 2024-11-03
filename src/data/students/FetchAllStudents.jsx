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

export { FetchAllStudents, FetchAllApprovedStudents };
