import {
  ClassLevelStudents,
  PendingClassLevelStudents,
} from "../../../../lazyLoading/admin/AdminLazyLoadingComponents";
import { useParams } from "react-router-dom";
import { ClassLevelProgrammeStudents } from "../programmeStudents/ClassLevelProgrammeStudents";

export function ClassLevelStudentsContainer() {
  const { class_level, student_category } = useParams();
  return (
    <div>
      {student_category === "Enrolled" && class_level && <ClassLevelStudents />}
      {student_category === "Pending_Students" && class_level && (
        <PendingClassLevelStudents />
      )}
    </div>
  );
}
