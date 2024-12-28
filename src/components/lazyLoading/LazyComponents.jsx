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
// For About Page
export const About = lazyWithSuspense(
  () =>
    import("../../pages/about/About").then((module) => {
      return { default: module.About };
    }),
  <PageLoading />,
  "AboutPage"
);
export const AboutBanner = lazyWithSuspense(
  () =>
    import("../forAboutPage/banner/AboutBanner").then((module) => {
      return { default: module.AboutBanner };
    }),
  <PageLoading />,
  "AboutBannerComponent"
);
export const WhoWeAre = lazyWithSuspense(
  () =>
    import("../forAboutPage/aboutWhoWeAre/WhoWeAre").then((module) => {
      return { default: module.WhoWeAre };
    }),
  <PageLoading />,
  "WhoWeAreComponent"
);
export const OurHistory = lazyWithSuspense(
  () =>
    import("../forAboutPage/aboutOurHistory/OurHistory").then((module) => {
      return { default: module.OurHistory };
    }),
  <PageLoading />,
  "OurHistoryComponent"
);
export const OurVision = lazyWithSuspense(
  () =>
    import("../forAboutPage/aboutOurVision/OurVision").then((module) => {
      return { default: module.OurVision };
    }),
  <PageLoading />,
  "OurVisionComponent"
);
export const Achievements = lazyWithSuspense(
  () =>
    import("../forAboutPage/aboutAchievements/Achievements").then((module) => {
      return { default: module.Achievements };
    }),
  <PageLoading />,
  "AchievementsComponent"
);
// For Contact Page
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
export const CoursesBanner = lazyWithSuspense(
  () =>
    import("../forCoursesPage/banner/CoursesBanner").then((module) => {
      return { default: module.CoursesBanner };
    }),
  <PageLoading />,
  "CoursesBannerPage"
);
export const AllCourses = lazyWithSuspense(
  () =>
    import("../forCoursesPage/courses/AllCourses").then((module) => {
      return { default: module.AllCourses };
    }),
  <PageLoading />,
  "AllCoursesPage"
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
export const EnrollmentSuccessLinksContainer = lazyWithSuspense(
  () =>
    import(
      "../../pages/enrollment/successPage/sidebar_links/linkContainer/EnrollmentSuccessLinksContainer"
    ).then((module) => {
      return { default: module.EnrollmentSuccessLinksContainer };
    }),
  <PageLoading />,
  "EnrollmentSuccessLinksContainer"
);
export const EnrollmentSuccessOverview = lazyWithSuspense(
  () =>
    import("../../pages/enrollment/successPage/EnrollmentSuccessOverview").then(
      (module) => {
        return { default: module.EnrollmentSuccessOverview };
      }
    ),
  <PageLoading />,
  "EnrollmentSuccessOverview"
);
export const StudentDataOverview = lazyWithSuspense(
  () =>
    import("../../pages/enrollment/successPage/StudentDataOverview").then(
      (module) => {
        return { default: module.StudentDataOverview };
      }
    ),
  <PageLoading />,
  "StudentDataOverview"
);
export const UpdateEnrollmentData = lazyWithSuspense(
  () =>
    import("../../pages/enrollment/successPage/UpdateEnrollmentData").then(
      (module) => {
        return { default: module.UpdateEnrollmentData };
      }
    ),
  <PageLoading />,
  "UpdateEnrollmentData"
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
export const EnrollmentDocumentation = lazyWithSuspense(
  () =>
    import(
      "../../pages/enrollment/studentEnrollment/documentation/EnrollmentDocumentation"
    ).then((module) => {
      return { default: module.EnrollmentDocumentation };
    }),
  <PageLoading />,
  "EnrollmentDocumentation"
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
// For Admin
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
export const AdminDashboard = lazyWithSuspense(
  () =>
    import("../admin/AdminDashboard").then((module) => {
      return { default: module.AdminDashboard };
    }),
  <PageLoading />,
  "AdminDashboard"
);
