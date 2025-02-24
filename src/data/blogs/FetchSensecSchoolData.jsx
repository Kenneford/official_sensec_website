import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSensecSchoolData,
  getSensecSchoolData,
} from "../../features/schoolDataSlice/schoolDataSlice";

const FetchSensecSchoolData = () => {
  const dispatch = useDispatch();
  const sensecSchoolData = useSelector(getSensecSchoolData);

  useEffect(() => {
    dispatch(fetchSensecSchoolData());
  }, [dispatch]);

  return sensecSchoolData;
};

export { FetchSensecSchoolData };
