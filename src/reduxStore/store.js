import { configureStore } from "@reduxjs/toolkit";
import authUserReducer from "../features/auth/authSlice";
import programmeReducer from "../features/academics/programmeSlice";
import classSectionReducer from "../features/academics/classSectionSlice";

export const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    programme: programmeReducer,
    classSection: classSectionReducer,
  },
});
