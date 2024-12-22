import { Navigate, useRoutes } from "react-router-dom";
import { DEFAULT_PATH } from "./paths";
import lazyWithSuspense from "../lazyLoading/LazyLoading";
import PageLoading from "../pageLoading/PageLoading";
import {
  About,
  AdminDashboard,
  Contact,
  Courses,
  EmploymentForm,
  EnrollmentPage,
  EnrollmentSuccessLinksContainer,
  EnrollmentSuccessOverview,
  FrequentlyAskedQuestions,
  Home,
  PageNotFound,
  PageNotFoundError,
  PlacementCheckOverview,
  StudentDataOverview,
  StudentEnrollment,
  StudentPlacementCheck,
  StudentPlacementVerification,
} from "../lazyLoading/LazyComponents";
import {
  AuthUserDashboard,
  SignUpContainer,
  SignUpSuccessPage,
  UserDashboardLayout,
  Verification,
} from "../lazyLoading/auth/AuthLazyComponents";
import {
  AdminAttendance,
  EmployeeDataUpdateForm,
  ClassLevelLecturers,
  ClassLevelProgrammeStudents,
  ClassLevelStudentsContainer,
  NewDataContainer,
  StudentsCategories,
  UserTypesContainer,
  Blogs,
} from "../lazyLoading/admin/AdminLazyLoadingComponents";
import FakeDashboard from "../admin/contents/overview/FakeDashboard";
import {
  AdminStudentEnrollmentSuccessOverview,
  EnrollmentForm,
  GuardianForm,
  ParentForm,
  PreviewPDF,
  StudentDashboard,
  StudentDataUpdateForm,
} from "../lazyLoading/student/StudentsLazyLoadingComponents";
import { useSelector } from "react-redux";
import { getAuthUser } from "../../features/auth/authSlice";
import { LecturerDashboard } from "../lazyLoading/lecturer/LecturerLazyComponents";

export default function PageNavigation() {
  const authUser = useSelector(getAuthUser);
  const userInfo = { isAdmin: true };

  // Function to redirect users to their dashboard
  const getUserRolePath = () => {
    if (authUser?.roles?.includes("admin")) return "admin/Dashboard/Overview";
    if (authUser?.roles?.includes("lecturer"))
      return "lecturer/Dashboard/Overview";
    if (authUser?.roles?.includes("student"))
      return "student/Dashboard/Overview";
    if (authUser?.roles?.includes("nt_Staff"))
      return "nt_staff/Dashboard/Overview";
    return "*";
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
                {
                  path: "new_employment",
                  element: <EmploymentForm />,
                },
                { path: "*", element: <PageNotFound /> },
              ],
            },
            // { path: "*", element: <PageNotFound /> },
          ],
        },
        // {
        //   path: "/sensec/blog",
        //   element: <Blogs />,
        // },
        {
          path: "/sensec/sign_up/:signUpAction/:uniqueId/successful",
          element: <SignUpSuccessPage />,
        },
        // {
        //   path: "sensec/sign_up/successful/:uniqueId",
        //   element: <SignUpSuccessPage />,
        // },
        // Email Verification
        {
          path: "sensec/email/:uniqueId/:emailToken/verify",
          element: <Verification />,
        },
        // Student Enrollment
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
              path: "placement_check/:studentName/:studentIndexNo",
              element: <PlacementCheckOverview />,
            },
            {
              path: "online/:studentIndexNo",
              element: <StudentEnrollment />,
            },
            {
              path: "online/:studentId/parent/add",
              element: <ParentForm />,
            },
            {
              path: "online/:studentId/guardian/add",
              element: <GuardianForm />,
            },
            {
              path: "online/:studentId/success/:current_link",
              element: <EnrollmentSuccessLinksContainer />,
            },
            {
              path: "online/:studentId/success/:current_link/:pdf",
              element: <PreviewPDF />,
            },
            // {
            //   path: "online/:studentId/success/data_overview",
            //   element: <StudentDataOverview />,
            // },
            { path: "*", element: <PageNotFound /> },
          ],
        },
        // For Authenticated Users
        {
          path: "sensec/users",
          element: authUser ? (
            <AuthUserDashboard />
          ) : (
            <Navigate to={"/sensec/login_options"} />
          ),
          children: [
            {
              element: <Navigate to={userRolePath} />,
              index: true,
            },
            {
              path: ":userId",
              element: <UserDashboardLayout />,
              children: [
                {
                  element: <Navigate to={":currentUser/Dashboard/Overview"} />,
                  index: true,
                },
                // Admin Dashboard
                {
                  path: "admin/:adminCurrentAction/:adminCurrentLink",
                  element: authUser?.roles?.includes("admin") && (
                    <AdminDashboard />
                  ),
                  children: [
                    {
                      path: "new_enrollment/placement_verification",
                      element: <StudentPlacementVerification />,
                    },
                    {
                      path: "student_update",
                      element: <StudentDataUpdateForm />,
                    },
                    {
                      path: "admin_update",
                      element: <EmployeeDataUpdateForm />,
                    },
                    {
                      path: "lecturer_update",
                      element: <EmployeeDataUpdateForm />,
                    },
                    {
                      path: "nt-staff_update",
                      element: <EmployeeDataUpdateForm />,
                    },
                    {
                      path: "new_employment",
                      element: <EmploymentForm />,
                    },
                    {
                      path: ":studentIndexNo/new_enrollment",
                      element: <EnrollmentForm />,
                    },
                    {
                      path: ":studentId/new_enrollment/parent/add",
                      element: <ParentForm />,
                    },
                    {
                      path: ":studentId/enrollment/online/success",
                      element: <AdminStudentEnrollmentSuccessOverview />,
                    },
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
                    {
                      path: ":student_category/:class_level/:programme",
                      element: <ClassLevelProgrammeStudents />,
                    },
                    { path: "*", element: <PageNotFound /> },
                  ],
                },
                // Lecturer Dashboard
                {
                  path: "lecturer/:lecturerCurrentAction/:lecturerCurrentLink",
                  element: authUser?.roles?.includes("lecturer") && (
                    <LecturerDashboard />
                  ),
                },
                // Student Dashboard
                {
                  path: "student/:studentCurrentAction/:studentCurrentLink",
                  element: authUser?.roles?.includes("student") && (
                    <StudentDashboard />
                  ),
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
