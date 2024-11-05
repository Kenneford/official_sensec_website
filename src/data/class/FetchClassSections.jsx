import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllClassSections,
  getAllClassSections,
} from "../../features/academics/classSectionSlice";

const FetchAllClassSections = () => {
  const dispatch = useDispatch();
  const allClassSections = useSelector(getAllClassSections);

  useEffect(() => {
    dispatch(fetchAllClassSections());
  }, [dispatch]);

  return allClassSections;
};

export { FetchAllClassSections };
