import PageLoading from "../../pageLoading/PageLoading";
import lazyWithSuspense from "../LazyLoading";

// For Auth Users
export const AuthUserDashboard = lazyWithSuspense(
  () =>
    import("../../../pages/auth/AuthUserDashboard").then((module) => {
      return { default: module.AuthUserDashboard };
    }),
  <PageLoading />,
  "AdminDashboard"
);
export const UserDashboardLayout = lazyWithSuspense(
  () =>
    import("../../../pages/auth/UserDashboardLayout").then((module) => {
      return { default: module.UserDashboardLayout };
    }),
  <PageLoading />,
  "UserDashboardLayout"
);

// Admins Dashboard ==> Dashboard-Links
export const AdminDashboardLinks = lazyWithSuspense(
  () =>
    import("../../sidebar/admin/admin.sidebar.links/AdminDashboardLinks").then(
      (module) => {
        return { default: module.AdminDashboardLinks };
      }
    ),
  <PageLoading />,
  "AdminDashboardLinksPage"
);
// Admins Dashboard ==> Actions-Links
export const ActionsLinks = lazyWithSuspense(
  () =>
    import("../../sidebar/admin/admin.sidebar.links/ActionsLinks").then(
      (module) => {
        return { default: module.ActionsLinks };
      }
    ),
  <PageLoading />,
  "ActionsLinksPage"
);
// Admins Dashboard ==> User-Types-Links
export const UsersLinks = lazyWithSuspense(
  () =>
    import("../../sidebar/admin/admin.sidebar.links/UsersLinks").then(
      (module) => {
        return { default: module.UsersLinks };
      }
    ),
  <PageLoading />,
  "UsersLinksPage"
);
// Admins Dashboard ==> Attendance-Links
export const AdminAttendanceLinks = lazyWithSuspense(
  () =>
    import("../../sidebar/admin/admin.sidebar.links/AdminAttendanceLinks").then(
      (module) => {
        return { default: module.AdminAttendanceLinks };
      }
    ),
  <PageLoading />,
  "AdminAttendanceLinksPage"
);
// Admins Dashboard ==> Assessment-Links
export const AssessmentLinks = lazyWithSuspense(
  () =>
    import("../../sidebar/admin/admin.sidebar.links/AssessmentLinks").then(
      (module) => {
        return { default: module.AssessmentLinks };
      }
    ),
  <PageLoading />,
  "AssessmentLinksPage"
);
// Admins Dashboard ==> Account-Links
export const AccountLinks = lazyWithSuspense(
  () =>
    import("../../sidebar/admin/admin.sidebar.links/AccountLinks").then(
      (module) => {
        return { default: module.AccountLinks };
      }
    ),
  <PageLoading />,
  "AccountLinksPage"
);

// Lecturers Dash
// Students Dash
// NT-Staffs Dash
