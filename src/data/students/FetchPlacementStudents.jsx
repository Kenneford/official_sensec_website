import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers, getAllUsers } from "../../features/auth/authSlice";
import {
  fetchAllPlacementSBatches,
  fetchAllPlacementStudents,
  getAllPlacementBatches,
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
const FetchPlacementStudentsByYear = (year) => {
  const allPlacementStudents = FetchAllPlacementStudents();
  console.log(allPlacementStudents);

  const allStudents = allPlacementStudents?.filter(
    (std) =>
      std && new Date(std?.createdAt)?.getFullYear()?.toString() === year && std
  );

  return allStudents;
};
const FetchAllPlacementSBatches = () => {
  const { uploadExcelFileStatus } = useSelector((state) => state.placement);
  const dispatch = useDispatch();
  const allPlacementBatches = useSelector(getAllPlacementBatches);

  useEffect(() => {
    dispatch(fetchAllPlacementSBatches());
  }, [dispatch]);

  return allPlacementBatches;
};
const FetchPlacementBatchByYear = (year) => {
  const allPlacementBatches = FetchAllPlacementSBatches();
  console.log(allPlacementBatches);

  const allBatches = allPlacementBatches?.find(
    (batch) => batch && batch?.year === year
  );

  return allBatches;
};

export {
  FetchAllPlacementStudents,
  FetchPlacementStudentsByYear,
  FetchAllPlacementSBatches,
  FetchPlacementBatchByYear,
};
