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
