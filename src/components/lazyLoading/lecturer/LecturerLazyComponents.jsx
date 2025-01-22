import PageLoading from "../../pageLoading/PageLoading";
import lazyWithSuspense from "../LazyLoading";

// For Auth Users
export const LecturerDashboard = lazyWithSuspense(
  () =>
    import("../../lecturer/LecturerDashboard").then((module) => {
      return { default: module.LecturerDashboard };
    }),
  <PageLoading />,
  "LecturerDashboard"
);

export const TeacherDashboardOverview = lazyWithSuspense(
  () =>
    import("../../lecturer/components/overview/TeacherDashboardOverview").then(
      (module) => {
        return { default: module.TeacherDashboardOverview };
      }
    ),
  <PageLoading />,
  "TeacherDashboardOverview"
);
export const ClassHandlingStudents = lazyWithSuspense(
  () =>
    import("../../lecturer/components/students/ClassHandlingStudents").then(
      (module) => {
        return { default: module.ClassHandlingStudents };
      }
    ),
  <PageLoading />,
  "ClassHandlingStudents"
);
export const ProgrammeStudents = lazyWithSuspense(
  () =>
    import("../../lecturer/components/students/ProgrammeStudents").then(
      (module) => {
        return { default: module.ProgrammeStudents };
      }
    ),
  <PageLoading />,
  "ProgrammeStudents"
);
export const Subjects = lazyWithSuspense(
  () =>
    import("../../lecturer/components/subjects/Subjects").then((module) => {
      return { default: module.Subjects };
    }),
  <PageLoading />,
  "Subjects"
);
export const LecturerAttendance = lazyWithSuspense(
  () =>
    import("../../lecturer/components/attendance/LecturerAttendance").then(
      (module) => {
        return { default: module.LecturerAttendance };
      }
    ),
  <PageLoading />,
  "LecturerAttendance"
);
export const SearchAttendance = lazyWithSuspense(
  () =>
    import(
      "../../lecturer/components/attendance/searchAttendance/SearchAttendance"
    ).then((module) => {
      return { default: module.SearchAttendance };
    }),
  <PageLoading />,
  "SearchAttendance"
);
export const CreateReport = lazyWithSuspense(
  () =>
    import("../../lecturer/components/reports/CreateReport").then((module) => {
      return { default: module.CreateReport };
    }),
  <PageLoading />,
  "CreateReportComponent"
);
export const SearchReport = lazyWithSuspense(
  () =>
    import("../../lecturer/components/reports/SearchReport").then((module) => {
      return { default: module.SearchReport };
    }),
  <PageLoading />,
  "SearchReportComponent"
);
