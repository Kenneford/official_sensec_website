import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import {
  AllEnrolledStudents,
  ClassLevelStudents,
  PendingClassLevelStudents,
  PendingStudents,
} from "../../../../lazyLoading/admin/AdminLazyLoadingComponents";
import { AllGraduatedStudents } from "../graduatedStudents/AllGraduatedStudents";

export function StudentsCategories() {
  const { adminCurrentLink, class_level, student_category } = useParams();

  return (
    <Box>
      {adminCurrentLink === "Students" && student_category === "Enrolled" && (
        <AllEnrolledStudents />
      )}
      {adminCurrentLink === "Students" &&
        student_category === "Pending_Students" && <PendingStudents />}
      {adminCurrentLink === "Students" && student_category === "Graduates" && (
        <AllGraduatedStudents />
      )}
    </Box>
  );
}
