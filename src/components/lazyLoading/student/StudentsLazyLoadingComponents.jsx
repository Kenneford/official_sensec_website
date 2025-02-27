import PageLoading from "../../pageLoading/PageLoading";
import lazyWithSuspense from "../LazyLoading";
// Student Dashboard
export const StudentDashboard = lazyWithSuspense(
  () =>
    import("../../student/StudentDashboard").then((module) => {
      return { default: module.StudentDashboard };
    }),
  <PageLoading />,
  "StudentDashboardComponent"
);
// Student Dashboard Overview
export const StudentDashboardOverview = lazyWithSuspense(
  () =>
    import("../../student/components/overview/StudentDashboardOverview").then(
      (module) => {
        return { default: module.StudentDashboardOverview };
      }
    ),
  <PageLoading />,
  "StudentDashboardOverviewComponent"
);
// Student Dashboard Overview
export const CourseMates = lazyWithSuspense(
  () =>
    import("../../student/components/courseMates/CourseMates").then(
      (module) => {
        return { default: module.CourseMates };
      }
    ),
  <PageLoading />,
  "CourseMatesComponent"
);
// Student Enrollment Form
export const EnrollmentForm = lazyWithSuspense(
  () =>
    import("../../../pages/enrollment/studentEnrollment/EnrollmentForm").then(
      (module) => {
        return { default: module.EnrollmentForm };
      }
    ),
  <PageLoading />,
  "EnrollmentFormComponent"
);
// For PDF's
export const PreviewPDF = lazyWithSuspense(
  () =>
    import(
      "../../../pages/enrollment/successPage/PDFDownload/pdfOverviewContainer/PreviewPDF"
    ).then((module) => {
      return { default: module.PreviewPDF };
    }),
  <PageLoading />,
  "PreviewPDFComponent"
);
export const UndertakingPdfViewer = lazyWithSuspense(
  () =>
    import(
      "../../../pages/enrollment/successPage/PDFDownload/view/UndertakingPdfViewer"
    ).then((module) => {
      return { default: module.UndertakingPdfViewer };
    }),
  <PageLoading />,
  "UndertakingPdfViewerComponent"
);
export const AdmissionPdfViewer = lazyWithSuspense(
  () =>
    import(
      "../../../pages/enrollment/successPage/PDFDownload/view/AdmissionPdfViewer"
    ).then((module) => {
      return { default: module.AdmissionPdfViewer };
    }),
  <PageLoading />,
  "AdmissionPdfViewerComponent"
);
// Student Data Update Form
export const StudentDataUpdateForm = lazyWithSuspense(
  () =>
    import(
      "../../../pages/enrollment/studentEnrollment/StudentDataUpdateForm"
    ).then((module) => {
      return { default: module.StudentDataUpdateForm };
    }),
  <PageLoading />,
  "StudentDataUpdateFormComponent"
);
export const StudentEnrollmentUpdateForm = lazyWithSuspense(
  () =>
    import(
      "../../../pages/enrollment/studentEnrollment/StudentEnrollmentUpdateForm"
    ).then((module) => {
      return { default: module.StudentEnrollmentUpdateForm };
    }),
  <PageLoading />,
  "StudentEnrollmentUpdateFormComponent"
);
// Student Parent Form
export const ParentForm = lazyWithSuspense(
  () =>
    import("../../../pages/enrollment/parent.guardian/ParentForm").then(
      (module) => {
        return { default: module.ParentForm };
      }
    ),
  <PageLoading />,
  "ParentFormComponent"
);
// Student Guardian Form
export const GuardianForm = lazyWithSuspense(
  () =>
    import("../../../pages/enrollment/parent.guardian/GuardianForm").then(
      (module) => {
        return { default: module.GuardianForm };
      }
    ),
  <PageLoading />,
  "GuardianFormComponent"
);
export const AdminStudentEnrollmentSuccessOverview = lazyWithSuspense(
  () =>
    import(
      "../../../pages/enrollment/successPage/AdminStudentEnrollmentSuccessOverview"
    ).then((module) => {
      return { default: module.AdminStudentEnrollmentSuccessOverview };
    }),
  <PageLoading />,
  "AdminStudentEnrollmentSuccessOverviewComponent"
);
