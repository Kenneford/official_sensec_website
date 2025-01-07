import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SENSEC_API_ENDPOINT } from "../../apiEndPoint/api";
import tokenInterceptor from "../../apiEndPoint/interceptors";

const initialState = {
  gradeInfo: "",
  allGrades: [],
  reportInfo: "",
  multiStudentsReportInfo: "",
  draftReportInfo: "",
  allReports: [],
  allStudentReports: [],
  successMessage: "",
  error: "",
  createStatus: "",
  fetchStatus: "",
};

export const addGrade = createAsyncThunk(
  "Report/addGrade",
  async (data, { rejectWithValue }) => {
    try {
      const res = await tokenInterceptor.post(`/academics/grades/create`, {
        data,
      });
      return res.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
export const createStudentReport = createAsyncThunk(
  "Report/createStudentReport",
  async (data, { rejectWithValue }) => {
    try {
      const res = await tokenInterceptor.post(
        `/academics/student_report/${data?.studentId}/create`,
        {
          data,
        }
      );
      return res.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
export const createMultiStudentsReport = createAsyncThunk(
  "Report/createMultiStudentsReport",
  async (data, { rejectWithValue }) => {
    try {
      const res = await tokenInterceptor.post(
        `/academics/reports/multi_students/create`,
        {
          data,
        }
      );
      return res.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
export const saveDraftReport = createAsyncThunk(
  "Report/saveDraftReport",
  async (data, { rejectWithValue }) => {
    try {
      const res = await tokenInterceptor.post(
        `/academics/student_report/draft/save`,
        {
          data,
        }
      );
      return res.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
export const fetchDraftReport = createAsyncThunk(
  "Report/fetchDraftReport",
  async (data, { rejectWithValue }) => {
    try {
      const res = await tokenInterceptor.post(
        `/academics/student_report/draft/fetch`,
        {
          data,
        }
      );
      return res.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
export const fetchAllReports = createAsyncThunk(
  "Report/fetchAllReports",
  async (rejectWithValue) => {
    try {
      const res = await tokenInterceptor.post(
        `/academics/student_report/fetch_all`
      );
      return res.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
export const fetchAllStudentReports = createAsyncThunk(
  "Report/fetchAllStudentReports",
  async (rejectWithValue) => {
    try {
      const res = await tokenInterceptor.post(
        `/academics/reports/all_student/fetch_all`
      );
      return res.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchAllBatches = createAsyncThunk(
  "Batch/fetchAllBatches",
  async () => {
    const response = await axios.get(
      `${SENSEC_API_ENDPOINT}/academics/batches/fetch_all`
    );
    // const students = response.data;
    return response.data;
  }
);

const reportSlice = createSlice({
  name: "Report",
  initialState,
  reducers: {
    resetCreateReportState(state) {
      return {
        ...state,
        createStatus: "",
        error: "",
        successMessage: "",
      };
    },
    resetFetchReportState(state) {
      return {
        ...state,
        fetchStatus: "",
        error: "",
        successMessage: "",
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addGrade.pending, (state) => {
      return { ...state, createStatus: "pending" };
    });
    builder.addCase(addGrade.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          gradeInfo: action.payload.academicGrade,
          successMessage: action.payload.successMessage,
          createStatus: "success",
        };
      } else return state;
    });
    builder.addCase(addGrade.rejected, (state, action) => {
      return {
        ...state,
        createStatus: "rejected",
        error: action.payload,
      };
    });
    //   Create Student Report
    builder.addCase(createStudentReport.pending, (state) => {
      return { ...state, createStatus: "pending" };
    });
    builder.addCase(createStudentReport.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          reportInfo: action.payload.studentReport,
          successMessage: action.payload.successMessage,
          createStatus: "success",
        };
      } else return state;
    });
    builder.addCase(createStudentReport.rejected, (state, action) => {
      return {
        ...state,
        createStatus: "rejected",
        error: action.payload,
      };
    });
    //   Create Multi Students Report
    builder.addCase(createMultiStudentsReport.pending, (state) => {
      return { ...state, createStatus: "pending" };
    });
    builder.addCase(createMultiStudentsReport.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          multiStudentsReportInfo: action.payload.multiStudentsReport,
          successMessage: action.payload.successMessage,
          createStatus: "success",
        };
      } else return state;
    });
    builder.addCase(createMultiStudentsReport.rejected, (state, action) => {
      return {
        ...state,
        createStatus: "rejected",
        error: action.payload,
      };
    });
    // Fetch draft report
    builder.addCase(fetchDraftReport.pending, (state) => {
      return { ...state, fetchStatus: "pending" };
    });
    builder.addCase(fetchDraftReport.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          draftReportInfo: action.payload.foundDraftReport,
          successMessage: action.payload.successMessage,
          fetchStatus: "success",
        };
      } else return state;
    });
    builder.addCase(fetchDraftReport.rejected, (state, action) => {
      return {
        ...state,
        fetchStatus: "rejected",
        error: action.payload,
      };
    });
    //   Fetch all reports
    builder.addCase(fetchAllReports.pending, (state) => {
      return { ...state, fetchStatus: "pending" };
    });
    builder.addCase(fetchAllReports.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          allReports: action.payload.allReports,
          successMessage: action.payload.successMessage,
          fetchStatus: "success",
        };
      } else return state;
    });
    builder.addCase(fetchAllReports.rejected, (state, action) => {
      return {
        ...state,
        fetchStatus: "rejected",
        error: action.payload,
      };
    });
    //   Fetch all student reports
    builder.addCase(fetchAllStudentReports.pending, (state) => {
      return { ...state, fetchStatus: "pending" };
    });
    builder.addCase(fetchAllStudentReports.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          allStudentReports: action.payload.allStudentReports,
          successMessage: action.payload.successMessage,
          fetchStatus: "success",
        };
      } else return state;
    });
    builder.addCase(fetchAllStudentReports.rejected, (state, action) => {
      return {
        ...state,
        fetchStatus: "rejected",
        error: action.payload,
      };
    });
  },
});

export const { resetCreateBlogState } = reportSlice.actions;
export const getAllReports = (state) => state.report.allReports;
export const getAllStudentReports = (state) => state.report.allStudentReports;
export const getDraftReportInfo = (state) => state.report.draftReportInfo;

export default reportSlice.reducer;
