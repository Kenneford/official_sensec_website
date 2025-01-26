import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ENDPOINT, SENSEC_API_ENDPOINT } from "../../apiEndPoint/api";
import tokenInterceptor from "../../apiEndPoint/interceptors";

const initialState = {
  attendanceInfo: "",
  classAttendanceInfo: "",
  searchedAttendanceInfo: "",
  weekendAttendanceInfo: "",
  presentAttendanceInfo: "",
  absentAttendanceInfo: "",
  holidayAttendanceInfo: "",
  allClassAttendances: [],
  currentClassAttendance: "",
  weeklyClassAttendance: "",
  allStudentAttendances: [],
  takeAttendanceStatus: "",
  takeAttendanceSuccessMessage: "",
  takeAttendanceError: "",
  takeWeekendAttendanceStatus: "",
  takeWeekendAttendanceSuccessMessage: "",
  takeWeekendAttendanceError: "",
  searchClassAttendanceStatus: "",
  searchClassAttendanceSuccessMessage: "",
  successMessage: "",
  searchClassAttendanceError: "",
  error: "",
  createStatus: "",
  searchingStatus: "",
  fetchingStatus: "",
  fetchingSingleStudentStatus: "",
};

export const createClassAttendance = createAsyncThunk(
  "Attendance/createClassAttendance",
  async (data, { rejectWithValue }) => {
    try {
      const res = await tokenInterceptor.post(
        `/academics/attendance/create`,
        data
      );
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const handleWeekendAttendance = createAsyncThunk(
  "Attendance/handleWeekendAttendance",
  async () => {
    try {
      const res = await axios.post(
        `${SENSEC_API_ENDPOINT}/teacher/academics/attendance/weekend/create`
      );
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error.response.data);
    }
  }
);
export const handleStudentAttendance = createAsyncThunk(
  "Attendance/handleStudentAttendance",
  async (data, teacherId, student_id, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${SENSEC_API_ENDPOINT}/teacher/academics/${teacherId}/${student_id}/attendance/create`,
        data
      );
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

// export const fetchPreviousAttendance = createAsyncThunk(
//   "Attendance/fetchPreviousAttendance",
//   async () => {
//     const response = await axios.get(
//       `${SENSEC_API_ENDPOINT}/admins/academics/get_class_levels`
//     );
//     // const students = response.data;
//     console.log(response.data);
//     return response.data;
//   }
// );

export const fetchClassAttendances = createAsyncThunk(
  "Attendance/fetchClassAttendances",
  async () => {
    const response = await axios.get(
      `${SENSEC_API_ENDPOINT}/teacher/academics/students/class_attendance/fetch_all`
    );
    // const students = response.data;
    console.log(response.data);
    return response.data;
  }
);
export const fetchCurrentClassAttendance = createAsyncThunk(
  "Attendance/fetchCurrentClassAttendance",
  async (rejectWithValue) => {
    try {
      const response = await tokenInterceptor.get(
        `/academics/class_attendance/current/fetch`
      );
      // const students = response.data;
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
export const fetchWeeklyClassAttendances = createAsyncThunk(
  "Attendance/fetchWeeklyClassAttendances",
  async (rejectWithValue) => {
    try {
      const response = await tokenInterceptor.get(
        `/academics/weekly_attendance/fetch_all`
      );
      // const students = response.data;
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchSingleClassAttendance = createAsyncThunk(
  "Attendance/fetchSingleClassAttendance",
  async () => {
    const response = await axios.get(
      `${SENSEC_API_ENDPOINT}/teacher/academics/students/class_attendance/fetch_single`
    );
    // const students = response.data;
    console.log(response.data);
    return response.data;
  }
);

export const fetchSingleStudentAttendance = createAsyncThunk(
  "Attendance/fetchSingleStudentAttendance",
  async ({ uniqueId }, { rejectWithValue }) => {
    console.log(uniqueId);
    try {
      const response = await axios.get(
        `${SENSEC_API_ENDPOINT}/student/academics/${uniqueId}/attendance/fetch_all`
      );
      // const students = response.data;
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const searchClassAttendance = createAsyncThunk(
  "Attendance/searchClassAttendance",
  async (data, { rejectWithValue }) => {
    console.log(data);

    try {
      const response = await tokenInterceptor.put(
        `/academics/class_attendance/search`,
        data
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchStudentPresentAttendance = createAsyncThunk(
  "Attendance/fetchStudentPresentAttendance",
  async (uniqueId) => {
    const response = await axios.get(
      `${SENSEC_API_ENDPOINT}/students/attendance/${uniqueId}/present`
    );
    // const students = response.data;
    console.log(response.data);
    return response.data;
  }
);

export const fetchStudentAbsentAttendance = createAsyncThunk(
  "Attendance/fetchStudentAbsentAttendance",
  async (uniqueId) => {
    const response = await axios.get(
      `${SENSEC_API_ENDPOINT}/students/attendance/${uniqueId}/absent`
    );
    // const students = response.data;
    console.log(response.data);
    return response.data;
  }
);

export const fetchStudentHolidayAttendance = createAsyncThunk(
  "Attendance/fetchStudentHolidayAttendance",
  async (uniqueId) => {
    const response = await axios.get(
      `${SENSEC_API_ENDPOINT}/students/attendance/${uniqueId}/holiday`
    );
    // const students = response.data;
    console.log(response.data);
    return response.data;
  }
);

const attendancesSlice = createSlice({
  name: "Attendance",
  initialState,
  reducers: {
    resetCreateAttendanceState(state) {
      return {
        ...state,
        createStatus: "",
        successMessage: "",
        error: "",
      };
    },
    resetSearchState(state) {
      return {
        ...state,
        searchingStatus: "",
        successMessage: "",
        error: "",
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createClassAttendance.pending, (state, action) => {
      return { ...state, createStatus: "pending" };
    });
    builder.addCase(createClassAttendance.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          classAttendanceInfo: action.payload.attendance,
          successMessage: action.payload.successMessage,
          createStatus: "success",
        };
      } else return state;
    });
    builder.addCase(createClassAttendance.rejected, (state, action) => {
      return {
        ...state,
        createStatus: "rejected",
        error: action.payload,
      };
    });
    builder.addCase(handleWeekendAttendance.pending, (state, action) => {
      return { ...state, takeWeekendAttendanceStatus: "pending" };
    });
    builder.addCase(handleWeekendAttendance.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          weekendAttendanceInfo: action.payload.savedClassAttendance,
          takeWeekendAttendanceSuccessMessage: action.payload.successMessage,
          takeWeekendAttendanceStatus: "success",
        };
      } else return state;
    });
    builder.addCase(handleWeekendAttendance.rejected, (state, action) => {
      return {
        ...state,
        takeWeekendAttendanceStatus: "rejected",
        takeWeekendAttendanceError: action.payload,
      };
    });
    builder.addCase(handleStudentAttendance.pending, (state, action) => {
      return { ...state, addStatus: "pending" };
    });
    builder.addCase(handleStudentAttendance.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          attendanceInfo: action.payload.attendance,
          successMessage: action.payload.successMessage,
          addStatus: "success",
        };
      } else return state;
    });
    builder.addCase(handleStudentAttendance.rejected, (state, action) => {
      return {
        ...state,
        addStatus: "rejected",
        error: action.payload,
      };
    });

    builder.addCase(fetchClassAttendances.pending, (state, action) => {
      return { ...state, fetchingStatus: "pending" };
    });
    builder.addCase(fetchClassAttendances.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          allClassAttendances: action.payload.allClassAttendances,
          successMessage: action.payload.successMessage,
          fetchingStatus: "success",
        };
      } else return state;
    });
    builder.addCase(fetchClassAttendances.rejected, (state, action) => {
      return {
        ...state,
        fetchingStatus: "rejected",
        teacherError: action.payload,
      };
    });
    builder.addCase(fetchCurrentClassAttendance.pending, (state, action) => {
      return { ...state, fetchingStatus: "pending" };
    });
    builder.addCase(fetchCurrentClassAttendance.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          currentClassAttendance: action.payload.currentClassAttendance,
          successMessage: action.payload.successMessage,
          fetchingStatus: "success",
        };
      } else return state;
    });
    builder.addCase(fetchCurrentClassAttendance.rejected, (state, action) => {
      return {
        ...state,
        fetchingStatus: "rejected",
        teacherError: action.payload,
      };
    });
    builder.addCase(fetchWeeklyClassAttendances.pending, (state, action) => {
      return { ...state, fetchingStatus: "pending" };
    });
    builder.addCase(fetchWeeklyClassAttendances.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          weeklyClassAttendance: action.payload.weeklyClassAttendance,
          successMessage: action.payload.successMessage,
          fetchingStatus: "success",
        };
      } else return state;
    });
    builder.addCase(fetchWeeklyClassAttendances.rejected, (state, action) => {
      return {
        ...state,
        fetchingStatus: "rejected",
        teacherError: action.payload,
      };
    });

    builder.addCase(fetchSingleClassAttendance.pending, (state, action) => {
      return { ...state, fetchingStatus: "pending" };
    });
    builder.addCase(fetchSingleClassAttendance.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          currentClassAttendance: action.payload.classAttendance,
          successMessage: action.payload.successMessage,
          fetchingStatus: "success",
        };
      } else return state;
    });
    builder.addCase(fetchSingleClassAttendance.rejected, (state, action) => {
      return {
        ...state,
        fetchingStatus: "rejected",
        teacherError: action.payload,
      };
    });

    builder.addCase(fetchSingleStudentAttendance.pending, (state) => {
      return { ...state, fetchingSingleStudentStatus: "pending" };
    });
    builder.addCase(fetchSingleStudentAttendance.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          attendanceInfo: action.payload.studentAttendances,
          successMessage: action.payload.successMessage,
          fetchingSingleStudentStatus: "success",
        };
      } else return state;
    });
    builder.addCase(fetchSingleStudentAttendance.rejected, (state, action) => {
      return {
        ...state,
        fetchingSingleStudentStatus: "rejected",
        error: action.payload,
      };
    });

    builder.addCase(searchClassAttendance.pending, (state) => {
      return { ...state, searchingStatus: "pending" };
    });
    builder.addCase(searchClassAttendance.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          searchedAttendanceInfo: action.payload.foundClassAttendance,
          successMessage: action.payload.successMessage,
          searchingStatus: "success",
        };
      } else return state;
    });
    builder.addCase(searchClassAttendance.rejected, (state, action) => {
      return {
        ...state,
        searchingStatus: "rejected",
        searchClassAttendanceError: action.payload,
      };
    });

    builder.addCase(fetchStudentAbsentAttendance.pending, (state) => {
      return { ...state, fetchingStatus: "pending" };
    });
    builder.addCase(fetchStudentAbsentAttendance.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          absentAttendanceInfo: action.payload.studentAttendance,
          successMessage: action.payload.successMessage,
          fetchingStatus: "success",
        };
      } else return state;
    });
    builder.addCase(fetchStudentAbsentAttendance.rejected, (state, action) => {
      return {
        ...state,
        fetchingStatus: "rejected",
        error: action.payload,
      };
    });

    builder.addCase(fetchStudentHolidayAttendance.pending, (state) => {
      return { ...state, fetchingStatus: "pending" };
    });
    builder.addCase(
      fetchStudentHolidayAttendance.fulfilled,
      (state, action) => {
        if (action.payload) {
          return {
            ...state,
            holidayAttendanceInfo: action.payload.studentAttendance,
            successMessage: action.payload.successMessage,
            fetchingStatus: "success",
          };
        } else return state;
      }
    );
    builder.addCase(fetchStudentHolidayAttendance.rejected, (state, action) => {
      return {
        ...state,
        fetchingStatus: "rejected",
        error: action.payload,
      };
    });
  },
});

export const { resetCreateAttendanceState, resetSearchState } =
  attendancesSlice.actions;
export const getAllClassAttendances = (state) =>
  state.attendance.allClassAttendances;
export const getCurrentClassAttendance = (state) =>
  state.attendance.currentClassAttendance;
export const getWeeklyClassAttendance = (state) =>
  state.attendance.weeklyClassAttendance;
export const getSearchedClassAttendance = (state) =>
  state.attendance.searchedAttendanceInfo;
export const getAllStudentAttendances = (state) =>
  state.attendance.allStudentAttendances;
export const getSingleStudentAttendance = (state) =>
  state.attendance.attendanceInfo;
export const getStudentPresentAttendance = (state) =>
  state.attendance.presentAttendanceInfo;
export const getStudentAbsentAttendance = (state) =>
  state.attendance.absentAttendanceInfo;
export const getStudentHolidayAttendance = (state) =>
  state.attendance.holidayAttendanceInfo;

export default attendancesSlice.reducer;
