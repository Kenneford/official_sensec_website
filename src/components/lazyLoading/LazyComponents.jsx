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
export const EmploymentForm = lazyWithSuspense(
  () =>
    import("../../pages/employment/EmploymentForm").then((module) => {
      return { default: module.EmploymentForm };
    }),
  <PageLoading />,
  "EmploymentPage"
);
export const StudentPlacementCheck = lazyWithSuspense(
  () =>
    import("../../pages/enrollment/placementCheck/StudentPlacementCheck").then(
      (module) => {
        return { default: module.StudentPlacementCheck };
      }
    ),
  <PageLoading />,
  "StudentPlacementCheckPage"
);
export const PlacementCheckOverview = lazyWithSuspense(
  () =>
    import("../../pages/enrollment/placementCheck/PlacementCheckOverview").then(
      (module) => {
        return { default: module.PlacementCheckOverview };
      }
    ),
  <PageLoading />,
  "PlacementCheckOverviewPage"
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
export const SearchModal = lazyWithSuspense(
  () =>
    import("../../modals/SearchModal").then((module) => {
      return { default: module.SearchModal };
    }),
  <PageLoading />,
  "SearchModalComponent"
);
export const MultiApprovalBtn = lazyWithSuspense(
  () =>
    import("../../buttons/MultiApprovalBtn").then((module) => {
      return { default: module.MultiApprovalBtn };
    }),
  <PageLoading />,
  "MultiApprovalBtnComponent"
);
export const MultiRejectionBtn = lazyWithSuspense(
  () =>
    import("../../buttons/MultiRejectionBtn").then((module) => {
      return { default: module.MultiRejectionBtn };
    }),
  <PageLoading />,
  "MultiRejectionBtnComponent"
);
export const MultiStudentsPromotionBtn = lazyWithSuspense(
  () =>
    import("../../buttons/MultiStudentsPromotionBtn").then((module) => {
      return { default: module.MultiStudentsPromotionBtn };
    }),
  <PageLoading />,
  "MultiStudentsPromotionBtnComponent"
);
export const MultiStudentsDemotionBtn = lazyWithSuspense(
  () =>
    import("../../buttons/MultiStudentsDemotionBtn").then((module) => {
      return { default: module.MultiStudentsDemotionBtn };
    }),
  <PageLoading />,
  "MultiStudentsDemotionBtnComponent"
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
