import { Navigate, useRoutes } from "react-router-dom";
import { DEFAULT_PATH } from "./paths";
import lazyWithSuspense from "../lazyLoading/LazyLoading";
import PageLoading from "../pageLoading/PageLoading";
import {
  About,
  AdminDashboard,
  Contact,
  Courses,
  EnrollmentPage,
  FrequentlyAskedQuestions,
  Home,
  PageNotFound,
  PageNotFoundError,
  StudentEnrollment,
  StudentPlacementCheck,
  StudentPlacementVerification,
} from "../lazyLoading/LazyComponents";
import {
  AuthUserDashboard,
  SignUpContainer,
  UserDashboardLayout,
} from "../lazyLoading/auth/AuthLazyComponents";
import {
  AdminAttendance,
  ClassLevelLecturers,
  ClassLevelStudentsContainer,
  NewDataContainer,
  StudentsCategories,
  UserTypesContainer,
} from "../lazyLoading/admin/AdminLazyLoadingComponents";
import FakeDashboard from "../admin/contents/overview/FakeDashboard";

export default function PageNavigation() {
  const userInfo = { isAdmin: true };

  // Function to redirect users to their dashboard
  const getUserRolePath = () => {
    if (userInfo?.isAdmin) return "admin";
    if (userInfo?.isLecturer) return "lecturer";
    if (userInfo?.isStudent) return "student";
    if (userInfo?.isNTStaff) return "nt_staff";
    return "page_not_found/404_ERROR";
  };
  const userRolePath = getUserRolePath();

  return useRoutes([
    {
      path: "/",
      element: <PageLayout />,
      children: [
        { element: <Navigate to={DEFAULT_PATH} replace />, index: true },
        {
          path: "sensec",
          element: <GuestPageLayout />,
          children: [
            {
              path: ":currentGuestPage",
              element: <GuestPageLayout />,
              children: [
                {
                  path: ":signUpAction",
                  element: <SignUpContainer />,
                },
                { path: "*", element: <PageNotFound /> },
              ],
            },
            {
              path: "sensec/frequently_asked_questions",
              element: <FrequentlyAskedQuestions />,
            },
            { path: "*", element: <PageNotFound /> },
          ],
        },
        {
          path: "sensec/students/enrollment",
          element: <EnrollmentPage />,
          children: [
            {
              element: <Navigate to={"placement_verification"} />,
              index: true,
            },
            {
              path: "placement_verification",
              element: <StudentPlacementVerification />,
            },
            {
              path: "placement_check",
              element: <StudentPlacementCheck />,
            },
            {
              path: "online",
              element: <StudentEnrollment />,
            },
            { path: "*", element: <PageNotFound /> },
          ],
        },
        // For Authenticated Users
        {
          path: "sensec/users",
          element: <AuthUserDashboard />,
          children: [
            {
              element: <Navigate to={userRolePath} />,
              index: true,
            },
            {
              path: "admin",
              element: <UserDashboardLayout />,
              children: [
                {
                  element: <Navigate to={"Dashboard/Overview"} />,
                  index: true,
                },
                {
                  path: ":adminCurrentAction/:adminCurrentLink",
                  element: <AdminDashboard />,
                  children: [
                    {
                      path: "employees/:employees_link",
                      element: <UserTypesContainer />,
                    },
                    {
                      path: ":data/new",
                      element: <NewDataContainer />,
                    },
                    {
                      path: "employees/:employees_link/:class_level",
                      element: <ClassLevelLecturers />,
                    },
                    {
                      path: ":student_category",
                      element: <StudentsCategories />,
                    },
                    {
                      path: ":student_category/:class_level",
                      element: <ClassLevelStudentsContainer />,
                    },
                    { path: "*", element: <PageNotFound /> },
                  ],
                },
                { path: "*", element: <PageNotFound /> },
              ],
            },
            {
              path: "*",
              element: <PageNotFoundError />,
            },
          ],
        },
        { path: "*", element: <PageNotFound /> },
      ],
    },
    {
      path: "/fake/dashboard",
      element: <FakeDashboard />,
    },
  ]);
}

export const PageLayout = lazyWithSuspense(
  () =>
    import("../../layout/PageLayout").then((module) => {
      return { default: module.PageLayout };
    }),
  <PageLoading />,
  "PageLayout"
);
export const GuestPageLayout = lazyWithSuspense(
  () =>
    import("../../pages/auth/forGuests/GuestPageLayout").then((module) => {
      return { default: module.GuestPageLayout };
    }),
  <PageLoading />,
  "GuestPageLayout"
);
