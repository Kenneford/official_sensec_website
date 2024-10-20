import PageLoading from "../../pageLoading/PageLoading";
import lazyWithSuspense from "../LazyLoading";

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

// Admins Attendance Links
// Admins Assessment Links
// Admins Account Links
