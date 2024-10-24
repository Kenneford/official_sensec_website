import PageLoading from "../pageLoading/PageLoading";
import lazyWithSuspense from "./LazyLoading";

export const NavigationBar = lazyWithSuspense(
  () =>
    import("../navbar/NavigationBar").then((module) => {
      return { default: module.NavigationBar };
    }),
  <PageLoading />,
  "NavigationBar"
);
export const DashboardNavigationBar = lazyWithSuspense(
  () =>
    import("../navbar/DashboardNavigationBar").then((module) => {
      return { default: module.DashboardNavigationBar };
    }),
  <PageLoading />,
  "DashboardNavigationBar"
);
export const Home = lazyWithSuspense(
  () =>
    import("../../pages/home/Home").then((module) => {
      return { default: module.Home };
    }),
  <PageLoading />,
  "HomePage"
);
export const About = lazyWithSuspense(
  () =>
    import("../../pages/about/About").then((module) => {
      return { default: module.About };
    }),
  <PageLoading />,
  "AboutPage"
);
export const Contact = lazyWithSuspense(
  () =>
    import("../../pages/contact/Contact").then((module) => {
      return { default: module.Contact };
    }),
  <PageLoading />,
  "ContactPage"
);
export const Courses = lazyWithSuspense(
  () =>
    import("../../pages/courses/Courses").then((module) => {
      return { default: module.Courses };
    }),
  <PageLoading />,
  "CoursesPage"
);
export const QuestionsSection = lazyWithSuspense(
  () =>
    import("../forHomePage/questionsSection/QuestionsSection").then(
      (module) => {
        return { default: module.QuestionsSection };
      }
    ),
  <PageLoading />,
  "QuestionsSectionPage"
);
export const PageNotFound = lazyWithSuspense(
  () =>
    import("../pageNotFound/PageNotFound").then((module) => {
      return { default: module.PageNotFound };
    }),
  <PageLoading />,
  "PageNotFound"
);
export const PageNotFoundError = lazyWithSuspense(
  () =>
    import("../pageNotFound/PageNotFoundError").then((module) => {
      return { default: module.PageNotFoundError };
    }),
  <PageLoading />,
  "PageNotFoundError"
);
export const EnrollmentPage = lazyWithSuspense(
  () =>
    import("../../pages/enrollment/EnrollmentPage").then((module) => {
      return { default: module.EnrollmentPage };
    }),
  <PageLoading />,
  "EnrollmentPage"
);
export const StudentPlacementCheck = lazyWithSuspense(
  () =>
    import(
      "../../pages/enrollment/studentPlacementVerification/StudentPlacementCheck"
    ).then((module) => {
      return { default: module.StudentPlacementCheck };
    }),
  <PageLoading />,
  "StudentEnrollment"
);
export const StudentEnrollment = lazyWithSuspense(
  () =>
    import("../../pages/enrollment/studentEnrollment/StudentEnrollment").then(
      (module) => {
        return { default: module.StudentEnrollment };
      }
    ),
  <PageLoading />,
  "StudentEnrollment"
);
export const StudentPlacementVerification = lazyWithSuspense(
  () =>
    import(
      "../../pages/enrollment/studentPlacementVerification/StudentPlacementVerification"
    ).then((module) => {
      return { default: module.StudentPlacementVerification };
    }),
  <PageLoading />,
  "StudentPlacementVerification"
);
export const StudentsData = lazyWithSuspense(
  () =>
    import("../../pages/studentsData/StudentsData").then((module) => {
      return { default: module.StudentsData };
    }),
  <PageLoading />,
  "StudentsData"
);
export const FrequentlyAskedQuestions = lazyWithSuspense(
  () =>
    import("../../pages/faqs/FAQS").then((module) => {
      return { default: module.FAQS };
    }),
  <PageLoading />,
  "FrequentlyAskedQuestions"
);
// For Admin
export const AdminDashboard = lazyWithSuspense(
  () =>
    import("../admin/AdminDashboard").then((module) => {
      return { default: module.AdminDashboard };
    }),
  <PageLoading />,
  "AdminDashboard"
);
