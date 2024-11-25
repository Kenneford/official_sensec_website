import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  fetchAllAcademicYears,
  getAllAcademicYears,
} from "../../features/academics/academicYearSlice";

const FetchAllAcademicYears = () => {
  const dispatch = useDispatch();
  const allAcademicYear = useSelector(getAllAcademicYears);
  useEffect(() => {
    dispatch(fetchAllAcademicYears());
  }, [dispatch]);

  return allAcademicYear;
};

const FetchCurrentAcademicYear = () => {
  const allAcademicYears = FetchAllAcademicYears();
  const currentTerm = allAcademicYears?.find(
    (year) => year?.isCurrent === true && year
  );

  return currentTerm;
};

export { FetchAllAcademicYears, FetchCurrentAcademicYear };
