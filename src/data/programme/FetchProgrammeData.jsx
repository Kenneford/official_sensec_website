import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllProgrammes,
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

export { FetchAllProgrammes };
