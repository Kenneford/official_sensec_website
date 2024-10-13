import { Navigate, useRoutes } from "react-router-dom";
import { DEFAULT_PATH } from "./paths";
import lazyWithSuspense from "../lazyLoading/LazyLoading";
import PageLoading from "../pageLoading/PageLoading";
import {
  About,
  AdminDashboard,
  AllStudents,
  Contact,
  Courses,
  CurrentUser,
  EnrollmentPage,
  FrequentlyAskedQuestions,
  Home,
  PageNotFound,
  PageNotFoundError,
  StudentEnrollment,
  StudentPlacementCheck,
  StudentPlacementVerification,
  StudentsData,
} from "../lazyLoading/LazyComponents";
import Testing from "../../test/Testing";
import {
  AuthUserDashboard,
  UserDashboardLayout,
} from "../lazyLoading/AuthLazyComponents";

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
          path: "sensec/homepage",
          element: <Home />,
        },
        {
          path: "sensec/about",
          element: <About />,
        },
        {
          path: "sensec/courses",
          element: <Courses />,
        },
        {
          path: "sensec/contact",
          element: <Contact />,
        },
        {
          path: "sensec/students/placement_check",
          element: <StudentPlacementCheck />,
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
              path: "online",
              element: <StudentEnrollment />,
            },
            { path: "*", element: <PageNotFound /> },
          ],
        },
        {
          path: "sensec/students",
          element: <StudentsData />,
          children: [
            { element: <Navigate to={"all"} />, index: true },
            {
              path: "all",
              element: <AllStudents />,
            },
          ],
        },
        {
          path: "sensec/frequently_asked_questions",
          element: <FrequentlyAskedQuestions />,
        },
        {
          path: "sensec/users/dashboard",
          element: <CurrentUser />,
        },
        {
          path: "sensec/testing",
          element: <Testing />,
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
                },
              ],
            },
            {
              path: "page_not_found/404_ERROR",
              element: <PageNotFoundError />,
            },
          ],
        },
        { path: "*", element: <PageNotFound /> },
      ],
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
