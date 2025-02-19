import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SENSEC_API_ENDPOINT } from "../../apiEndPoint/api";
import tokenInterceptor from "../../apiEndPoint/interceptors";

const initialState = {
  gradeInfo: "",
  allGrades: [],
  reportInfo: "",
  multiStudentsReportInfo: "",
  electiveDraftReportInfo: "",
  coreDraftReportInfo: "",
  searchedClassReportInfo: "",
  searchedStudentReportInfo: "",
  allReports: [],
  electiveSubjectMultiStudentsReports: "",
  coreSubjectMultiStudentsReports: "",
  allStudentReports: [],
  successMessage: "",
  error: "",
  searchClassReportError: "",
  createStatus: "",
  createMultiStatus: "",
  fetchStatus: "",
  searchingStatus: "",
  fetchElectiveDraftStatus: "",
  fetchCoreDraftStatus: "",
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
export const fetchElectiveSubjectMultiStudentsReport = createAsyncThunk(
  "Report/fetchElectiveSubjectMultiStudentsReport",
  async (data, { rejectWithValue }) => {
    try {
      const res = await tokenInterceptor.put(
        `/academics/report/elective_subject/multi_students/fetch_all`,
        data
      );
      return res.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
export const fetchCoreSubjectMultiStudentsReport = createAsyncThunk(
  "Report/fetchCoreSubjectMultiStudentsReport",
  async (data, { rejectWithValue }) => {
    try {
      const res = await tokenInterceptor.put(
        `/academics/report/core_subject/multi_students/fetch_all`,
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
export const searchClassReport = createAsyncThunk(
  "Report/searchClassReport",
  async (data, { rejectWithValue }) => {
    console.log(data);

    try {
      const response = await tokenInterceptor.put(
        `/academics/class_report/search`,
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
export const searchSingleStudentReport = createAsyncThunk(
  "Report/searchSingleStudentReport",
  async (data, { rejectWithValue }) => {
    console.log(data);

    try {
      const response = await tokenInterceptor.get(
        `/academics/student/${data}/report/search`
        // data
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
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
        fetchElectiveDraftStatus: "",
        error: "",
        successMessage: "",
      };
    },
    resetFetchCoreReportState(state) {
      return {
        ...state,
        fetchCoreDraftStatus: "",
        error: "",
        successMessage: "",
      };
    },
    resetCoreReportStudentsState(state) {
      return {
        ...state,
        coreDraftReportInfo: "",
      };
    },
    resetElectiveReportStudentsState(state) {
      return {
        ...state,
        electiveDraftReportInfo: "",
      };
    },
    resetCoreSubjectMultiStudentsState(state) {
      return {
        ...state,
        coreSubjectMultiStudentsReports: "",
      };
    },
    resetElectiveSubjectMultiStudentsState(state) {
      return {
        ...state,
        electiveSubjectMultiStudentsReports: "",
      };
    },
    resetClassReportSearchState(state) {
      return {
        ...state,
        searchingStatus: "",
        searchClassReportError: "",
      };
    },
    resetClassReportData(state) {
      return {
        ...state,
        searchedClassReportInfo: "",
      };
    },
    resetStudentReportSearchState(state) {
      return {
        ...state,
        searchedStudentReportInfo: "",
        searchingStatus: "",
        searchClassReportError: "",
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
      return { ...state, fetchElectiveDraftStatus: "pending" };
    });
    builder.addCase(fetchElectiveDraftReport.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          electiveDraftReportInfo: action.payload.foundDraftReport,
          successMessage: action.payload.successMessage,
          fetchElectiveDraftStatus: "success",
        };
      } else return state;
    });
    builder.addCase(fetchElectiveDraftReport.rejected, (state, action) => {
      return {
        ...state,
        fetchElectiveDraftStatus: "rejected",
        error: action.payload,
      };
    });
    // Fetch elective draft report
    builder.addCase(fetchCoreDraftReport.pending, (state) => {
      return { ...state, fetchCoreDraftStatus: "pending" };
    });
    builder.addCase(fetchCoreDraftReport.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          coreDraftReportInfo: action.payload.foundDraftReport,
          successMessage: action.payload.successMessage,
          fetchCoreDraftStatus: "success",
        };
      } else return state;
    });
    builder.addCase(fetchCoreDraftReport.rejected, (state, action) => {
      return {
        ...state,
        fetchCoreDraftStatus: "rejected",
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
    // Fetch Elective Subject MultiStudents Report
    builder.addCase(
      fetchElectiveSubjectMultiStudentsReport.pending,
      (state) => {
        return { ...state, fetchStatus: "pending" };
      }
    );
    builder.addCase(
      fetchElectiveSubjectMultiStudentsReport.fulfilled,
      (state, action) => {
        if (action.payload) {
          return {
            ...state,
            electiveSubjectMultiStudentsReports: action.payload.foundReports,
            successMessage: action.payload.successMessage,
            fetchStatus: "success",
          };
        } else return state;
      }
    );
    builder.addCase(
      fetchElectiveSubjectMultiStudentsReport.rejected,
      (state, action) => {
        return {
          ...state,
          fetchStatus: "rejected",
          error: action.payload,
        };
      }
    );
    // Fetch Subject MultiStudents Report
    builder.addCase(fetchCoreSubjectMultiStudentsReport.pending, (state) => {
      return { ...state, fetchStatus: "pending" };
    });
    builder.addCase(
      fetchCoreSubjectMultiStudentsReport.fulfilled,
      (state, action) => {
        if (action.payload) {
          return {
            ...state,
            coreSubjectMultiStudentsReports: action.payload.foundReports,
            successMessage: action.payload.successMessage,
            fetchStatus: "success",
          };
        } else return state;
      }
    );
    builder.addCase(
      fetchCoreSubjectMultiStudentsReport.rejected,
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
    // Search Class Report
    builder.addCase(searchClassReport.pending, (state) => {
      return { ...state, searchingStatus: "pending" };
    });
    builder.addCase(searchClassReport.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          searchedClassReportInfo: action.payload.foundClassReports,
          successMessage: action.payload.successMessage,
          searchingStatus: "success",
        };
      } else return state;
    });
    builder.addCase(searchClassReport.rejected, (state, action) => {
      return {
        ...state,
        searchingStatus: "rejected",
        searchClassReportError: action.payload,
      };
    });
    // Search Single Student Report
    builder.addCase(searchSingleStudentReport.pending, (state) => {
      return { ...state, searchingStatus: "pending" };
    });
    builder.addCase(searchSingleStudentReport.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          searchedStudentReportInfo: action.payload.allStudentReports,
          successMessage: action.payload.successMessage,
          searchingStatus: "success",
        };
      } else return state;
    });
    builder.addCase(searchSingleStudentReport.rejected, (state, action) => {
      return {
        ...state,
        searchingStatus: "rejected",
        searchClassReportError: action.payload,
      };
    });
  },
});

export const {
  resetCreateReportState,
  resetCreateMultiReportState,
  resetFetchReportState,
  resetFetchElectiveReportState,
  resetElectiveReportStudentsState,
  resetFetchCoreReportState,
  resetCoreSubjectMultiStudentsState,
  resetCoreReportStudentsState,
  resetElectiveSubjectMultiStudentsState,
  resetClassReportSearchState,
  resetClassReportData,
  resetStudentReportSearchState,
} = reportSlice.actions;
export const getAllReports = (state) => state.report.allReports;
export const getElectiveSubjectMultiStudentsReports = (state) =>
  state.report.electiveSubjectMultiStudentsReports;
export const getCoreSubjectMultiStudentsReports = (state) =>
  state.report.coreSubjectMultiStudentsReports;
export const getAllStudentReports = (state) => state.report.allStudentReports;
export const getElectiveDraftReportInfo = (state) =>
  state.report.electiveDraftReportInfo;
export const getCoreDraftReportInfo = (state) =>
  state.report.coreDraftReportInfo;
export const getSearchedClassReportInfo = (state) =>
  state.report.searchedClassReportInfo;
export const getSearchedStudentReportInfo = (state) =>
  state.report.searchedStudentReportInfo;

export default reportSlice.reducer;
