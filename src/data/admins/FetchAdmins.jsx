import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers, getAllUsers } from "../../features/auth/authSlice";

const FetchAllAdmins = () => {
  const dispatch = useDispatch();
  const allUsers = useSelector(getAllUsers);
  const allAdmins = allUsers?.filter(
    (user) => user?.roles?.includes("admin") && user
  );

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  return allAdmins;
};

const FetchAllEmployedAdmins = () => {
  const allAdmins = FetchAllAdmins();
  const allEmployedAdmins = allAdmins?.filter(
    (user) =>
      user?.employment?.employmentStatus === "approved" &&
      user?.adminStatusExtend.isAdmin &&
      user
  );

  return allEmployedAdmins;
};
const FetchAllPendingAdmins = () => {
  const allAdmins = FetchAllAdmins();
  const allPendingAdmins = allAdmins?.filter(
    (user) =>
      user?.employment?.employmentStatus === "pending" &&
      !user?.adminStatusExtend.isAdmin &&
      user
  );

  return allPendingAdmins;
};

export { FetchAllAdmins, FetchAllEmployedAdmins, FetchAllPendingAdmins };
