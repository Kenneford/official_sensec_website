import PageLoading from "../pageLoading/PageLoading";
import lazyWithSuspense from "./LazyLoading";

// For Auth Users
export const AuthUserDashboard = lazyWithSuspense(
  () =>
    import("../../pages/auth/AuthUserDashboard").then((module) => {
      return { default: module.AuthUserDashboard };
    }),
  <PageLoading />,
  "AdminDashboard"
);
export const UserDashboardLayout = lazyWithSuspense(
  () =>
    import("../../pages/auth/UserDashboardLayout").then((module) => {
      return { default: module.UserDashboardLayout };
    }),
  <PageLoading />,
  "UserDashboardLayout"
);

// Admins Dash
export const AdminDashboardOverview = lazyWithSuspense(
  () =>
    import("../admin/contents/overview/AdminDashboardOverview").then(
      (module) => {
        return { default: module.AdminDashboardOverview };
      }
    ),
  <PageLoading />,
  "AdminDashboardOverview"
);
export const ClassLevels = lazyWithSuspense(
  () =>
    import("../admin/contents/classLevels/ClassLevels").then((module) => {
      return { default: module.ClassLevels };
    }),
  <PageLoading />,
  "ClassLevelsPage"
);

// Admins Actions
export const DashboardLinks = lazyWithSuspense(
  () =>
    import("../sidebar/admin/admin.sidebar.links/DashboardLinks").then(
      (module) => {
        return { default: module.DashboardLinks };
      }
    ),
  <PageLoading />,
  "DashboardLinksPage"
);
export const ActionsLinks = lazyWithSuspense(
  () =>
    import("../sidebar/admin/admin.sidebar.links/ActionsLinks").then(
      (module) => {
        return { default: module.ActionsLinks };
      }
    ),
  <PageLoading />,
  "ActionsLinksPage"
);
export const UsersLinks = lazyWithSuspense(
  () =>
    import("../sidebar/admin/admin.sidebar.links/UsersLinks").then((module) => {
      return { default: module.UsersLinks };
    }),
  <PageLoading />,
  "UsersLinksPage"
);
export const AdminAttendanceLinks = lazyWithSuspense(
  () =>
    import("../sidebar/admin/admin.sidebar.links/AdminAttendanceLinks").then(
      (module) => {
        return { default: module.AdminAttendanceLinks };
      }
    ),
  <PageLoading />,
  "AdminAttendanceLinksPage"
);
export const AssessmentLinks = lazyWithSuspense(
  () =>
    import("../sidebar/admin/admin.sidebar.links/AssessmentLinks").then(
      (module) => {
        return { default: module.AssessmentLinks };
      }
    ),
  <PageLoading />,
  "AssessmentLinksPage"
);
export const AccountLinks = lazyWithSuspense(
  () =>
    import("../sidebar/admin/admin.sidebar.links/AccountLinks").then(
      (module) => {
        return { default: module.AccountLinks };
      }
    ),
  <PageLoading />,
  "AccountLinksPage"
);
