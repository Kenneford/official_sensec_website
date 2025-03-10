import { configureStore } from "@reduxjs/toolkit";
import authUserReducer from "../features/auth/authSlice";
import programmeReducer from "../features/academics/programmeSlice";
import classSectionReducer from "../features/academics/classSectionSlice";
import classLevelReducer from "../features/academics/classLevelsSlice";
import batchReducer from "../features/academics/batchSlice";
import placementReducer from "../features/academics/placementSlice";
import studentReducer from "../features/students/studentsSlice";
import PromotionReducer from "../features/students/promotionSlice";
import parentReducer from "../features/students/parentSlice";
import guardianReducer from "../features/students/guardianSlice";
import employmentReducer from "../features/employments/employmentSlice";
import AcademicYearReducer from "../features/academics/academicYearSlice";
import AcademicTermReducer from "../features/academics/academicTermSlice";
import StudentsHouseReducer from "../features/academics/houseSlice";
import SubjectReducer from "../features/academics/subjectsSlice";
import BlogReducer from "../features/blogs/blogSlice";
import ReportReducer from "../features/reports/reportSlice";
import AttendanceReducer from "../features/academics/attendanceSlice";
import supportEmailReducer from "../features/supportCenter/supportEmailSlice";
import schoolDataReducer from "../features/schoolDataSlice/schoolDataSlice";
import PaymentReducer from "../features/payments/paymentsSlice";

export const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    programme: programmeReducer,
    classSection: classSectionReducer,
    classLevel: classLevelReducer,
    batch: batchReducer,
    placement: placementReducer,
    student: studentReducer,
    parent: parentReducer,
    guardian: guardianReducer,
    employment: employmentReducer,
    promotion: PromotionReducer,
    academicYear: AcademicYearReducer,
    academicTerm: AcademicTermReducer,
    studentsHouse: StudentsHouseReducer,
    subject: SubjectReducer,
    blog: BlogReducer,
    report: ReportReducer,
    attendance: AttendanceReducer,
    supportEmail: supportEmailReducer,
    schoolData: schoolDataReducer,
    payments: PaymentReducer,
  },
});
