import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllDivisionProgrammes,
  fetchAllProgrammes,
  getAllDivisionProgrammes,
  getAllProgrammes,
} from "../../features/academics/programmeSlice";

const FetchAllProgrammes = () => {
  const allProgrammes = useSelector(getAllProgrammes);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllProgrammes());
  }, [dispatch]);

  return allProgrammes;
};
const FetchAllDivisionProgrammes = () => {
  const allProgrammes = useSelector(getAllDivisionProgrammes);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllDivisionProgrammes());
  }, [dispatch]);

  return allProgrammes;
};

export { FetchAllProgrammes, FetchAllDivisionProgrammes };
