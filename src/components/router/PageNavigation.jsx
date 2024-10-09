import { Navigate, useRoutes } from "react-router-dom";
import { DEFAULT_PATH } from "./paths";
import lazyWithSuspense from "../lazyLoading/LazyLoading";
import PageLoading from "../pageLoading/PageLoading";
import {
  About,
  AllStudents,
  Contact,
  Courses,
  CurrentUser,
  EnrollmentPage,
  FrequentlyAskedQuestions,
  Home,
  PageNotFound,
  StudentEnrollment,
  StudentPlacementCheck,
  StudentPlacementVerification,
  StudentsData,
} from "../lazyLoading/LazyComponents";

export default function PageNavigation() {
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
        { path: "*", element: <PageNotFound /> },
      ],
    },
    { path: "*", element: <PageNotFound /> },
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
