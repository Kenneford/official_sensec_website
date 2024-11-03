import { configureStore } from "@reduxjs/toolkit";
import authUserReducer from "../features/auth/authSlice";
import programmeReducer from "../features/academics/programmeSlice";
import classSectionReducer from "../features/academics/classSectionSlice";
import classLevelReducer from "../features/academics/classLevelsSlice";
import batchReducer from "../features/academics/batchSlice";
import placementReducer from "../features/academics/placementSlice";
import studentReducer from "../features/students/studentsSlice";
import parentReducer from "../features/students/parentSlice";
import guardianReducer from "../features/students/guardianSlice";

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
  },
});
