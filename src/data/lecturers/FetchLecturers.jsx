import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers, getAllUsers } from "../../features/auth/authSlice";

const FetchAllLecturers = () => {
  const dispatch = useDispatch();
  const allUsers = useSelector(getAllUsers);
  const allLecturers = allUsers?.filter(
    (user) => user?.roles?.includes("lecturer") && user
  );

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  return allLecturers;
};

const FetchAllEmployedLecturers = () => {
  const allLecturers = FetchAllLecturers();
  const allEmployedLecturers = allLecturers?.filter(
    (user) => user?.employment?.employmentStatus === "approved" && user
  );

  return allEmployedLecturers;
};
const FetchAllPendingLecturers = () => {
  const allLecturers = FetchAllLecturers();
  const allPendingLecturers = allLecturers?.filter(
    (user) => user?.employment?.employmentStatus === "pending" && user
  );

  return allPendingLecturers;
};

export {
  FetchAllLecturers,
  FetchAllEmployedLecturers,
  FetchAllPendingLecturers,
};
