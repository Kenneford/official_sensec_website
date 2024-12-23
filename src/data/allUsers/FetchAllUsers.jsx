import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers, getAllUsers } from "../../features/auth/authSlice";

const FetchAllUsers = () => {
  const dispatch = useDispatch();
  const allUsers = useSelector(getAllUsers);

  useEffect(() => {
    if (!allUsers || allUsers?.length === 0) {
      dispatch(fetchAllUsers());
    }
    // dispatch(fetchAllUsers());
  }, [dispatch, allUsers]);

  return allUsers;
};

const FetchAllEmployees = () => {
  // Get all users
  const allUsers = FetchAllUsers();
  // Filter out all employees
  const allEmployees = allUsers?.filter((user) => user?.employment && user);

  return allEmployees;
};

const FetchAllApprovedEmployees = () => {
  // Get all users
  const allUsers = FetchAllUsers();
  // Filter out all approved employees
  const allEmployees = allUsers?.filter(
    (user) => user?.employment?.employmentStatus === "approved" && user
  );

  return allEmployees;
};

const FetchAllPendingEmployees = () => {
  // Get all users
  const allUsers = FetchAllUsers();
  // Filter out all pending employees
  const allEmployees = allUsers?.filter(
    (user) => user?.employment?.employmentStatus === "pending" && user
  );

  return allEmployees;
};

const FetchAllRejectedEmployees = () => {
  // Get all users
  const allUsers = FetchAllUsers();
  // Filter out all rejected employees
  const allEmployees = allUsers?.filter(
    (user) => user?.employment?.employmentStatus === "rejected" && user
  );

  return allEmployees;
};

export {
  FetchAllUsers,
  FetchAllEmployees,
  FetchAllApprovedEmployees,
  FetchAllPendingEmployees,
  FetchAllRejectedEmployees,
};
