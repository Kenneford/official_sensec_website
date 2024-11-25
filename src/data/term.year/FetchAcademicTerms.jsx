import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllAcademicTerms,
  fetchCurrentTerm,
  getAllAcademicTerms,
} from "../../features/academics/academicTermSlice";
import { useEffect } from "react";

const FetchAllAcademicTerms = () => {
  const dispatch = useDispatch();
  const allAcademicTerms = useSelector(getAllAcademicTerms);
  useEffect(() => {
    dispatch(fetchAllAcademicTerms());
  }, [dispatch]);

  return allAcademicTerms;
};

const FetchCurrentAcademicTerms = () => {
  const allAcademicTerms = FetchAllAcademicTerms();
  const currentTerm = allAcademicTerms?.find(
    (term) => term?.isCurrent === true && term
  );

  return currentTerm;
};

export { FetchAllAcademicTerms, FetchCurrentAcademicTerms };
