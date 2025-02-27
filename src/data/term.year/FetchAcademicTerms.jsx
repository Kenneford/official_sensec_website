import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllAcademicTerms,
  fetchCurrentTerm,
  getAllAcademicTerms,
} from "../../features/academics/academicTermSlice";
import { useEffect } from "react";

const FetchAllAcademicTerms = () => {
  const { updateSemesterStatus } = useSelector((state) => state.academicTerm);
  const dispatch = useDispatch();
  const allAcademicTerms = useSelector(getAllAcademicTerms);
  useEffect(() => {
    if (updateSemesterStatus === "success") {
      setTimeout(() => {
        dispatch(fetchAllAcademicTerms());
      }, 3000);
    } else {
      dispatch(fetchAllAcademicTerms());
    }
  }, [dispatch, updateSemesterStatus]);

  return allAcademicTerms;
};

const FetchCurrentAcademicTerms = () => {
  const allAcademicTerms = FetchAllAcademicTerms();
  const currentTerm = allAcademicTerms?.find(
    (term) => term?.status?.includes("isCurrent") && term
  );

  return currentTerm;
};

export { FetchAllAcademicTerms, FetchCurrentAcademicTerms };
