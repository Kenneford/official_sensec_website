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
export const SignUpContainer = lazyWithSuspense(
  () =>
    import("../../../pages/auth/user.signUp/SignUpContainer").then((module) => {
      return { default: module.SignUpContainer };
    }),
  <PageLoading />,
  "SignUpContainerComponent"
);
export const UserSignUp = lazyWithSuspense(
  () =>
    import("../../../pages/auth/user.signUp/UserSignUp").then((module) => {
      return { default: module.UserSignUp };
    }),
  <PageLoading />,
  "UserSignUpPage"
);
export const StudentsSignUp = lazyWithSuspense(
  () =>
    import("../../../pages/auth/user.signUp/StudentsSignUp").then((module) => {
      return { default: module.StudentsSignUp };
    }),
  <PageLoading />,
  "StudentsSignUpPage"
);
export const Verification = lazyWithSuspense(
  () =>
    import("../../emails/Verification").then((module) => {
      return { default: module.Verification };
    }),
  <PageLoading />,
  "VerificationPage"
);
export const ConfirmVerification = lazyWithSuspense(
  () =>
    import("../../emails/pages/ConfirmVerification").then((module) => {
      return { default: module.ConfirmVerification };
    }),
  <PageLoading />,
  "ConfirmVerificationComponent"
);
export const VerificationTimeOut = lazyWithSuspense(
  () =>
    import("../../emails/pages/VerificationTimeOut").then((module) => {
      return { default: module.VerificationTimeOut };
    }),
  <PageLoading />,
  "VerificationTimeOutComponent"
);
export const Login = lazyWithSuspense(
  () =>
    import("../../../pages/auth/user.login/Login").then((module) => {
      return { default: module.Login };
    }),
  <PageLoading />,
  "LoginPage"
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
