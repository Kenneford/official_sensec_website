import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchClassLevels,
  getAllClassLevels,
} from "../../features/academics/classLevelsSlice";

const FetchAllClassLevels = () => {
  const dispatch = useDispatch();
  const allClassLevels = useSelector(getAllClassLevels);

  useEffect(() => {
    dispatch(fetchClassLevels());
  }, [dispatch]);

  return allClassLevels;
};

export { FetchAllClassLevels };
