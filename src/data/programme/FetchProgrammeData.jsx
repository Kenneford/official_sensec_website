import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllDivisionProgrammes,
  fetchAllFlattenedProgrammes,
  fetchAllProgrammes,
  fetchCreatedDivisionProgrammes,
  getAllDivisionProgrammes,
  getAllFlattenedProgrammes,
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
const FetchAllFlattenedProgrammes = () => {
  const allProgrammes = useSelector(getAllFlattenedProgrammes);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllFlattenedProgrammes());
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

  useEffect(() => {
    dispatch(fetchCreatedDivisionProgrammes());
  }, [dispatch]);

  return allProgrammes;
};

export {
  FetchAllProgrammes,
  FetchAllFlattenedProgrammes,
  FetchAllDivisionProgrammes,
  FetchAllCreatedDivisionProgrammes,
};
