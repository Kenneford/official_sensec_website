import PageLoading from "../../pageLoading/PageLoading";
import lazyWithSuspense from "../LazyLoading";

// Admin Sidebar
export const AdminSidebar = lazyWithSuspense(
  () =>
    import("../../sidebar/admin/AdminSidebar").then((module) => {
      return { default: module.AdminSidebar };
    }),
  <PageLoading />,
  "AdminSidebarComponent"
);

// Admins Dashboard Links
export const AdminDashboardOverview = lazyWithSuspense(
  () =>
    import("../../admin/contents/overview/AdminDashboardOverview").then(
      (module) => {
        return { default: module.AdminDashboardOverview };
      }
    ),
  <PageLoading />,
  "AdminDashboardOverview"
);
export const ClassLevels = lazyWithSuspense(
  () =>
    import("../../admin/contents/classLevels/ClassLevels").then((module) => {
      return { default: module.ClassLevels };
    }),
  <PageLoading />,
  "ClassLevelsPage"
);
export const ClassSectionsData = lazyWithSuspense(
  () =>
    import("../../admin/contents/classSectionsData/ClassSectionsData").then(
      (module) => {
        return { default: module.ClassSectionsData };
      }
    ),
  <PageLoading />,
  "ClassSectionsDataPage"
);
export const SchoolProgrammesData = lazyWithSuspense(
  () =>
    import(
      "../../admin/contents/schoolProgrammesData/SchoolProgrammesData"
    ).then((module) => {
      return { default: module.SchoolProgrammesData };
    }),
  <PageLoading />,
  "SchoolProgrammesDataPage"
);
export const Blogs = lazyWithSuspense(
  () =>
    import("../../admin/contents/blogs/Blogs").then((module) => {
      return { default: module.Blogs };
    }),
  <PageLoading />,
  "BlogsPage"
);

// Admins Actions Links
export const CreateNewData = lazyWithSuspense(
  () =>
    import("../../admin/contents/createData/CreateNewData").then((module) => {
      return { default: module.CreateNewData };
    }),
  <PageLoading />,
  "CreateNewDataPage"
);
export const NewDataContainer = lazyWithSuspense(
  () =>
    import(
      "../../admin/contents/createData/newDataContainer/NewDataContainer"
    ).then((module) => {
      return { default: module.NewDataContainer };
    }),
  <PageLoading />,
  "NewDataContainerPage"
);
export const CreateAcademicBatch = lazyWithSuspense(
  () =>
    import(
      "../../admin/contents/createData/create/batch/CreateAcademicBatch"
    ).then((module) => {
      return { default: module.CreateAcademicBatch };
    }),
  <PageLoading />,
  "CreateAcademicBatchComponent"
);
export const CreatePlacementBatch = lazyWithSuspense(
  () =>
    import(
      "../../admin/contents/createData/create/placement/CreatePlacementBatch"
    ).then((module) => {
      return { default: module.CreatePlacementBatch };
    }),
  <PageLoading />,
  "CreatePlacementBatchComponent"
);
export const CreateAcademicYear = lazyWithSuspense(
  () =>
    import(
      "../../admin/contents/createData/create/academicYear/CreateAcademicYear"
    ).then((module) => {
      return { default: module.CreateAcademicYear };
    }),
  <PageLoading />,
  "CreateAcademicYearComponent"
);
export const CreateAcademicTerm = lazyWithSuspense(
  () =>
    import(
      "../../admin/contents/createData/create/academicTerm/CreateAcademicTerm"
    ).then((module) => {
      return { default: module.CreateAcademicTerm };
    }),
  <PageLoading />,
  "CreateAcademicTermComponent"
);
export const CreateClassLevel = lazyWithSuspense(
  () =>
    import(
      "../../admin/contents/createData/create/classLevel/CreateClassLevel"
    ).then((module) => {
      return { default: module.CreateClassLevel };
    }),
  <PageLoading />,
  "CreateClassLevelComponent"
);
export const CreateProgram = lazyWithSuspense(
  () =>
    import(
      "../../admin/contents/createData/create/programme/CreateProgram"
    ).then((module) => {
      return { default: module.CreateProgram };
    }),
  <PageLoading />,
  "CreateProgramComponent"
);
export const CreateDivisionProgram = lazyWithSuspense(
  () =>
    import(
      "../../admin/contents/createData/create/programme/CreateDivisionProgram"
    ).then((module) => {
      return { default: module.CreateDivisionProgram };
    }),
  <PageLoading />,
  "CreateDivisionProgramComponent"
);
export const CreateClassLevelSection = lazyWithSuspense(
  () =>
    import(
      "../../admin/contents/createData/create/classLevelSection/CreateClassLevelSection"
    ).then((module) => {
      return { default: module.CreateClassLevelSection };
    }),
  <PageLoading />,
  "CreateClassLevelSectionComponent"
);
export const CreateHouse = lazyWithSuspense(
  () =>
    import("../../admin/contents/createData/create/house/CreateHouse").then(
      (module) => {
        return { default: module.CreateHouse };
      }
    ),
  <PageLoading />,
  "CreateHouseComponent"
);
export const CreateSubject = lazyWithSuspense(
  () =>
    import(
      "../../admin/contents/createData/create/subjects/CreateSubject"
    ).then((module) => {
      return { default: module.CreateSubject };
    }),
  <PageLoading />,
  "CreateSubjectComponent"
);
export const CreateCoreSubject = lazyWithSuspense(
  () =>
    import(
      "../../admin/contents/createData/create/subjects/coreSubjects/CreateCoreSubject"
    ).then((module) => {
      return { default: module.CreateCoreSubject };
    }),
  <PageLoading />,
  "CreateCoreSubjectComponent"
);
export const CreateElectiveSubject = lazyWithSuspense(
  () =>
    import(
      "../../admin/contents/createData/create/subjects/electiveSubjects/CreateElectiveSubject"
    ).then((module) => {
      return { default: module.CreateElectiveSubject };
    }),
  <PageLoading />,
  "CreateElectiveSubjectComponent"
);
export const CreateOldStudentsGroup = lazyWithSuspense(
  () =>
    import(
      "../../admin/contents/createData/create/oldStudents/CreateOldStudentsGroup"
    ).then((module) => {
      return { default: module.CreateOldStudentsGroup };
    }),
  <PageLoading />,
  "CreateOldStudentsGroupComponent"
);
export const CreateSchoolInfoData = lazyWithSuspense(
  () =>
    import(
      "../../admin/contents/createData/create/schoolData/CreateSchoolInfoData"
    ).then((module) => {
      return { default: module.CreateSchoolInfoData };
    }),
  <PageLoading />,
  "CreateSchoolInfoDataComponent"
);
export const CreateTimeTable = lazyWithSuspense(
  () =>
    import(
      "../../admin/contents/createData/create/timeTable/CreateTimeTable"
    ).then((module) => {
      return { default: module.CreateTimeTable };
    }),
  <PageLoading />,
  "CreateTimeTableComponent"
);
export const TimeTableProgramme = lazyWithSuspense(
  () =>
    import(
      "../../admin/contents/createData/create/timeTable/program/TimeTableProgramme"
    ).then((module) => {
      return { default: module.TimeTableProgramme };
    }),
  <PageLoading />,
  "TimeTableProgrammeComponent"
);
export const TimeTableDayLessons = lazyWithSuspense(
  () =>
    import(
      "../../admin/contents/createData/create/timeTable/lessons/TimeTableDayLessons"
    ).then((module) => {
      return { default: module.TimeTableDayLessons };
    }),
  <PageLoading />,
  "TimeTableDayLessonsComponent"
);
export const LessonHours = lazyWithSuspense(
  () =>
    import(
      "../../admin/contents/createData/create/timeTable/time/LessonHours"
    ).then((module) => {
      return { default: module.LessonHours };
    }),
  <PageLoading />,
  "LessonHoursComponent"
);

// Admins User Types Links
export const UserTypesContainer = lazyWithSuspense(
  () =>
    import("../../admin/contents/userTypesContainer/UserTypesContainer").then(
      (module) => {
        return { default: module.UserTypesContainer };
      }
    ),
  <PageLoading />,
  "UserTypesContainerComponent"
);
export const AllAdmins = lazyWithSuspense(
  () =>
    import("../../admin/contents/allAdminsData/employedAdmins/AllAdmins").then(
      (module) => {
        return { default: module.AllAdmins };
      }
    ),
  <PageLoading />,
  "AllAdminsDataComponent"
);
export const PendingAdmins = lazyWithSuspense(
  () =>
    import(
      "../../admin/contents/allAdminsData/pendingAdmins/PendingAdmins"
    ).then((module) => {
      return { default: module.PendingAdmins };
    }),
  <PageLoading />,
  "PendingAdminsComponent"
);
export const EmployeeDataUpdateForm = lazyWithSuspense(
  () =>
    import("../../../pages/employment/EmployeeDataUpdateForm").then(
      (module) => {
        return { default: module.EmployeeDataUpdateForm };
      }
    ),
  <PageLoading />,
  "EmployeeDataUpdateFormComponent"
);
export const AssignLectureClassForm = lazyWithSuspense(
  () =>
    import("../../../pages/employment/AssignLectureClassForm").then(
      (module) => {
        return { default: module.AssignLectureClassForm };
      }
    ),
  <PageLoading />,
  "AssignLectureClassFormComponent"
);
export const HangingAdmins = lazyWithSuspense(
  () =>
    import(
      "../../admin/contents/allAdminsData/hangingAdmins/HangingAdmins"
    ).then((module) => {
      return { default: module.HangingAdmins };
    }),
  <PageLoading />,
  "HangingAdminsComponent"
);
export const NTStaffsData = lazyWithSuspense(
  () =>
    import(
      "../../admin/contents/allNTStaffs/employedNTStaffs/NTStaffsData"
    ).then((module) => {
      return { default: module.NTStaffsData };
    }),
  <PageLoading />,
  "NTStaffsDataComponent"
);
export const PendingNTStaffs = lazyWithSuspense(
  () =>
    import(
      "../../admin/contents/allNTStaffs/pendingNTStaffs/PendingNTStaffs"
    ).then((module) => {
      return { default: module.PendingNTStaffs };
    }),
  <PageLoading />,
  "PendingNTStaffsComponent"
);
export const LecturersData = lazyWithSuspense(
  () =>
    import(
      "../../admin/contents/allLecturers/employedLecturers/LecturersData"
    ).then((module) => {
      return { default: module.LecturersData };
    }),
  <PageLoading />,
  "LecturersDataComponent"
);
export const PendingLecturers = lazyWithSuspense(
  () =>
    import(
      "../../admin/contents/allLecturers/pendingLecturers/PendingLecturers"
    ).then((module) => {
      return { default: module.PendingLecturers };
    }),
  <PageLoading />,
  "PendingLecturersComponent"
);
export const HangingLecturers = lazyWithSuspense(
  () =>
    import(
      "../../admin/contents/allLecturers/hangingLecturers/HangingLecturers"
    ).then((module) => {
      return { default: module.HangingLecturers };
    }),
  <PageLoading />,
  "HangingLecturersComponent"
);
export const ClassLevelLecturers = lazyWithSuspense(
  () =>
    import(
      "../../admin/contents/allLecturers/classLevelLecturers/ClassLevelLecturers"
    ).then((module) => {
      return { default: module.ClassLevelLecturers };
    }),
  <PageLoading />,
  "ClassLevelLecturersComponent"
);
export const AllEnrolledStudents = lazyWithSuspense(
  () =>
    import(
      "../../admin/contents/allStudentsData/enrolledStudents/AllEnrolledStudents"
    ).then((module) => {
      return { default: module.AllEnrolledStudents };
    }),
  <PageLoading />,
  "AllEnrolledStudentsComponent"
);
export const StudentsCategories = lazyWithSuspense(
  () =>
    import(
      "../../admin/contents/allStudentsData/studentsCategoriesContainer/StudentsCategories"
    ).then((module) => {
      return { default: module.StudentsCategories };
    }),
  <PageLoading />,
  "StudentsCategoriesComponent"
);
export const PendingStudents = lazyWithSuspense(
  () =>
    import(
      "../../admin/contents/allStudentsData/pendingStudents/PendingStudents"
    ).then((module) => {
      return { default: module.PendingStudents };
    }),
  <PageLoading />,
  "PendingStudentsComponent"
);
export const ClassLevelProgrammeStudents = lazyWithSuspense(
  () =>
    import(
      "../../admin/contents/allStudentsData/programmeStudents/ClassLevelProgrammeStudents"
    ).then((module) => {
      return { default: module.ClassLevelProgrammeStudents };
    }),
  <PageLoading />,
  "ClassLevelProgrammeStudentsComponent"
);
export const ClassLevelStudents = lazyWithSuspense(
  () =>
    import(
      "../../admin/contents/allStudentsData/classLevelStudents/ClassLevelStudents"
    ).then((module) => {
      return { default: module.ClassLevelStudents };
    }),
  <PageLoading />,
  "ClassLevelStudentsComponent"
);
export const PendingClassLevelStudents = lazyWithSuspense(
  () =>
    import(
      "../../admin/contents/allStudentsData/pendingStudents/PendingClassLevelStudents"
    ).then((module) => {
      return { default: module.PendingClassLevelStudents };
    }),
  <PageLoading />,
  "PendingClassLevelStudentsComponent"
);
export const ClassLevelStudentsContainer = lazyWithSuspense(
  () =>
    import(
      "../../admin/contents/allStudentsData/classLevelStudents/ClassLevelStudentsContainer"
    ).then((module) => {
      return { default: module.ClassLevelStudentsContainer };
    }),
  <PageLoading />,
  "ClassLevelStudentsContainerComponent"
);
export const PlacementStudents = lazyWithSuspense(
  () =>
    import("../../admin/contents/allPlacementStudents/PlacementStudents").then(
      (module) => {
        return { default: module.PlacementStudents };
      }
    ),
  <PageLoading />,
  "PlacementStudentsComponent"
);

// Admins Attendance Links
export const AdminAttendance = lazyWithSuspense(
  () =>
    import("../../admin/contents/attendance.admin/AdminAttendance").then(
      (module) => {
        return { default: module.AdminAttendance };
      }
    ),
  <PageLoading />,
  "AdminAttendanceComponent"
);
export const ViewAttendance = lazyWithSuspense(
  () =>
    import(
      "../../admin/contents/attendance.admin/viewAttendance/ViewAttendance"
    ).then((module) => {
      return { default: module.ViewAttendance };
    }),
  <PageLoading />,
  "ViewAttendanceComponent"
);
export const SearchAttendance = lazyWithSuspense(
  () =>
    import("../../admin/contents/attendance.admin/SearchAttendance").then(
      (module) => {
        return { default: module.SearchAttendance };
      }
    ),
  <PageLoading />,
  "SearchAttendanceComponent"
);
export const AcademicSemesters = lazyWithSuspense(
  () =>
    import("../../admin/contents/academicSemesters/AcademicSemesters").then(
      (module) => {
        return { default: module.AcademicSemesters };
      }
    ),
  <PageLoading />,
  "AcademicSemestersComponent"
);

// Admins Assessment Links
// Admins Account Links
