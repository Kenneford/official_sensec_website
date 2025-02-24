import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSensecSchoolData,
  getSensecSchoolData,
} from "../../features/schoolDataSlice/schoolDataSlice";

const FetchSensecSchoolData = () => {
  const { updateSchoolStatus } = useSelector((state) => state.schoolData);
  const dispatch = useDispatch();
  const sensecSchoolData = useSelector(getSensecSchoolData);

  useEffect(() => {
    if (updateSchoolStatus === "success") {
      dispatch(fetchSensecSchoolData());
    } else {
      dispatch(fetchSensecSchoolData());
    }
  }, [dispatch, updateSchoolStatus]);

  return sensecSchoolData;
};

export { FetchSensecSchoolData };
