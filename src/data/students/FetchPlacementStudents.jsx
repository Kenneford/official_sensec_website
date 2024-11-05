import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers, getAllUsers } from "../../features/auth/authSlice";
import {
  fetchAllPlacementStudents,
  getAllPlacementStudents,
} from "../../features/academics/placementSlice";

const FetchAllPlacementStudents = () => {
  const dispatch = useDispatch();
  const allStudents = useSelector(getAllPlacementStudents);

  useEffect(() => {
    dispatch(fetchAllPlacementStudents());
  }, [dispatch]);

  return allStudents;
};

export { FetchAllPlacementStudents };
