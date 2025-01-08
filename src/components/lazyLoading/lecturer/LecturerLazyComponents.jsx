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
