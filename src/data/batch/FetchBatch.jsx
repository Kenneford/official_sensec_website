import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllBatches,
  getAllBatches,
} from "../../features/academics/batchSlice";

const FetchAllBatches = () => {
  const dispatch = useDispatch();
  const allBatches = useSelector(getAllBatches);

  useEffect(() => {
    dispatch(fetchAllBatches());
  }, [dispatch]);

  return allBatches;
};

export { FetchAllBatches };
