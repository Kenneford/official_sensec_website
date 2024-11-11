import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers, getAllUsers } from "../../features/auth/authSlice";

const FetchAllNTStaffs = () => {
  const dispatch = useDispatch();
  const allUsers = useSelector(getAllUsers);
  const allNT_Staffs = allUsers?.filter(
    (user) => user?.roles?.includes("nt-staff") && user
  );

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  return allNT_Staffs;
};

const FetchAllEmployedNTStaffs = () => {
  const allNT_Staffs = FetchAllNTStaffs();
  const allEmployedNT_Staffs = allNT_Staffs?.filter(
    (user) => user?.employment?.employmentStatus === "approved" && user
  );

  return allEmployedNT_Staffs;
};
const FetchAllPendingNTStaffs = () => {
  const allNT_Staffs = FetchAllNTStaffs();
  const allPendingNT_Staffs = allNT_Staffs?.filter(
    (user) => user?.employment?.employmentStatus === "pending" && user
  );

  return allPendingNT_Staffs;
};

export { FetchAllNTStaffs, FetchAllEmployedNTStaffs, FetchAllPendingNTStaffs };
