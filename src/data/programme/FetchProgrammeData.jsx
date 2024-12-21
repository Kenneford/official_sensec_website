import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllDivisionProgrammes,
  fetchAllProgrammes,
  fetchCreatedDivisionProgrammes,
  getAllDivisionProgrammes,
  getAllProgrammes,
  getCreatedDivisionProgrammes,
} from "../../features/academics/programmeSlice";

const FetchAllProgrammes = () => {
  const allProgrammes = useSelector(getAllProgrammes);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllProgrammes());
  }, [dispatch]);

  return allProgrammes;
};
const FetchAllDivisionProgrammes = ({ programId }) => {
  const allProgrammes = useSelector(getAllDivisionProgrammes);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllDivisionProgrammes(programId));
  }, [dispatch, programId]);

  return allProgrammes;
};
const FetchAllCreatedDivisionProgrammes = () => {
  const allProgrammes = useSelector(getCreatedDivisionProgrammes);
  const dispatch = useDispatch();
  console.log(allProgrammes);

  useEffect(() => {
    dispatch(fetchCreatedDivisionProgrammes());
  }, [dispatch]);

  return allProgrammes;
};

export {
  FetchAllProgrammes,
  FetchAllDivisionProgrammes,
  FetchAllCreatedDivisionProgrammes,
};
