import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchClassLevels,
  fetchLecturerClassLevels,
  getAllClassLevels,
  getLecturerClassLevels,
} from "../../features/academics/classLevelsSlice";

const FetchAllClassLevels = () => {
  const dispatch = useDispatch();
  const allClassLevels = useSelector(getAllClassLevels);

  useEffect(() => {
    dispatch(fetchClassLevels());
  }, [dispatch]);

  return allClassLevels;
};
const FetchLecturerClassLevels = ({ lecturerId }) => {
  const dispatch = useDispatch();
  const allClassLevels = useSelector(getLecturerClassLevels);

  const allLecturerSubjects = allSubjects?.filter(
    (subj) => subj && subj?.currentTeacher === lecturerId && subj
  );
  // useEffect(() => {
  //   dispatch(fetchLecturerClassLevels(lecturerId));
  // }, [dispatch, lecturerId]);

  return allClassLevels;
};

export { FetchAllClassLevels, FetchLecturerClassLevels };
