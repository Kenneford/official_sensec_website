import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllSubjects,
  getAllSubjects,
} from "../../features/academics/subjectsSlice";

const FetchAllSubjects = () => {
  const allSubjects = useSelector(getAllSubjects);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllSubjects());
  }, [dispatch]);

  return allSubjects;
};
const FetchAllElectiveSubjects = () => {
  const allSubjects = FetchAllSubjects();

  const electiveSubjects = allSubjects?.filter(
    (subj) => subj && subj?.electiveSubInfo?.isElectiveSubject && subj
  );

  return electiveSubjects;
};
const FetchAllCoreSubjects = () => {
  const allSubjects = FetchAllSubjects();

  const coreSubjects = allSubjects?.filter(
    (subj) => subj && subj?.coreSubInfo?.isCoreSubject && subj
  );

  return coreSubjects;
};

export { FetchAllSubjects, FetchAllElectiveSubjects, FetchAllCoreSubjects };
