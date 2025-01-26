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
  subjectMultiStudentsReports: "",
  allStudentReports: [],
  successMessage: "",
  error: "",
  createStatus: "",
  createMultiStatus: "",
  fetchStatus: "",
  fetchElectiveStatus: "",
  fetchCoreStatus: "",
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
export const fetchSubjectMultiStudentsReport = createAsyncThunk(
  "Report/fetchSubjectMultiStudentsReport",
  async (data, { rejectWithValue }) => {
    try {
      const res = await tokenInterceptor.put(
        `/academics/report/subject/fetch_all`,
        data
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
export const fetchElectiveDraftReport = createAsyncThunk(
  "Report/fetchElectiveDraftReport",
  async (data, { rejectWithValue }) => {
    try {
      const res = await tokenInterceptor.post(
        `/academics/student_report/draft/elective/fetch`,
        data
      );
      return res.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
export const fetchCoreDraftReport = createAsyncThunk(
  "Report/fetchCoreDraftReport",
  async (data, { rejectWithValue }) => {
    console.log(data);

    try {
      const res = await tokenInterceptor.post(
        `/academics/student_report/draft/core/fetch`,
        data
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
    resetCreateMultiReportState(state) {
      return {
        ...state,
        createMultiStatus: "",
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
    resetFetchElectiveReportState(state) {
      return {
        ...state,
        fetchElectiveStatus: "",
        error: "",
        successMessage: "",
      };
    },
    resetFetchCoreReportState(state) {
      return {
        ...state,
        fetchCoreStatus: "",
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
      return { ...state, createMultiStatus: "pending" };
    });
    builder.addCase(createMultiStudentsReport.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          multiStudentsReportInfo: action.payload.multiStudentsReport,
          successMessage: action.payload.successMessage,
          createMultiStatus: "success",
        };
      } else return state;
    });
    builder.addCase(createMultiStudentsReport.rejected, (state, action) => {
      return {
        ...state,
        createMultiStatus: "rejected",
        error: action.payload,
      };
    });
    // Fetch elective draft report
    builder.addCase(fetchElectiveDraftReport.pending, (state) => {
      return { ...state, fetchElectiveStatus: "pending" };
    });
    builder.addCase(fetchElectiveDraftReport.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          draftReportInfo: action.payload.foundDraftReport,
          successMessage: action.payload.successMessage,
          fetchElectiveStatus: "success",
        };
      } else return state;
    });
    builder.addCase(fetchElectiveDraftReport.rejected, (state, action) => {
      return {
        ...state,
        fetchElectiveStatus: "rejected",
        error: action.payload,
      };
    });
    // Fetch elective draft report
    builder.addCase(fetchCoreDraftReport.pending, (state) => {
      return { ...state, fetchCoreStatus: "pending" };
    });
    builder.addCase(fetchCoreDraftReport.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          draftReportInfo: action.payload.foundDraftReport,
          successMessage: action.payload.successMessage,
          fetchCoreStatus: "success",
        };
      } else return state;
    });
    builder.addCase(fetchCoreDraftReport.rejected, (state, action) => {
      return {
        ...state,
        fetchCoreStatus: "rejected",
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
    // Fetch Subject MultiStudents Report
    builder.addCase(fetchSubjectMultiStudentsReport.pending, (state) => {
      return { ...state, fetchStatus: "pending" };
    });
    builder.addCase(
      fetchSubjectMultiStudentsReport.fulfilled,
      (state, action) => {
        if (action.payload) {
          return {
            ...state,
            subjectMultiStudentsReports: action.payload.foundReports,
            successMessage: action.payload.successMessage,
            fetchStatus: "success",
          };
        } else return state;
      }
    );
    builder.addCase(
      fetchSubjectMultiStudentsReport.rejected,
      (state, action) => {
        return {
          ...state,
          fetchStatus: "rejected",
          error: action.payload,
        };
      }
    );
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

export const {
  resetCreateReportState,
  resetCreateMultiReportState,
  resetFetchReportState,
  resetFetchElectiveReportState,
  resetFetchCoreReportState,
} = reportSlice.actions;
export const getAllReports = (state) => state.report.allReports;
export const getSubjectMultiStudentsReports = (state) =>
  state.report.subjectMultiStudentsReports;
export const getAllStudentReports = (state) => state.report.allStudentReports;
export const getDraftReportInfo = (state) => state.report.draftReportInfo;

export default reportSlice.reducer;
