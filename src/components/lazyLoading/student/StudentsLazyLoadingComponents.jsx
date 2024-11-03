import PageLoading from "../../pageLoading/PageLoading";
import lazyWithSuspense from "../LazyLoading";
// Student Dashboard
export const StudentDashboard = lazyWithSuspense(
  () =>
    import("../../student/StudentDashboard").then((module) => {
      return { default: module.StudentDashboard };
    }),
  <PageLoading />,
  "StudentDashboardComponent"
);
// Student Enrollment Form
export const EnrollmentForm = lazyWithSuspense(
  () =>
    import("../../../pages/enrollment/studentEnrollment/EnrollmentForm").then(
      (module) => {
        return { default: module.EnrollmentForm };
      }
    ),
  <PageLoading />,
  "EnrollmentFormComponent"
);
// Student Parent Form
export const ParentForm = lazyWithSuspense(
  () =>
    import("../../../pages/enrollment/parent.guardian/ParentForm").then(
      (module) => {
        return { default: module.ParentForm };
      }
    ),
  <PageLoading />,
  "ParentFormComponent"
);
// Student Guardian Form
export const GuardianForm = lazyWithSuspense(
  () =>
    import("../../../pages/enrollment/parent.guardian/GuardianForm").then(
      (module) => {
        return { default: module.GuardianForm };
      }
    ),
  <PageLoading />,
  "GuardianFormComponent"
);
