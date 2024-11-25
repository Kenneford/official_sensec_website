import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SENSEC_API_ENDPOINT } from "../../apiEndPoint/api";
import tokenInterceptor from "../../apiEndPoint/interceptors";

const initialState = {
  placementBatchInfo: "",
  placementInfo: "",
  placementStudentInfo: "",
  allPlacementBatches: [],
  allPlacementStudents: [],
  uploadExcelFileStatus: "",
  createStatus: "",
  checkStatus: "",
  verifyStatus: "",
  updateStatus: "",
  fetchStatus: "",
  successMessage: "",
  fetchSuccessMessage: "",
  error: "",
};

export const createPlacementBatch = createAsyncThunk(
  "Placement/createPlacementBatch",
  async ({ placementBatch }, { rejectWithValue }) => {
    console.log(placementBatch);

    try {
      const accessToken = localStorage.getItem("userToken");
      // console.log(accessToken);

      const res = await tokenInterceptor.post(
        `/placement/batches/create`,
        {
          placementBatch,
        },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      console.log(res);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const uploadPlacementFile = createAsyncThunk(
  "Placement/uploadPlacementFile",
  async (data, { rejectWithValue }) => {
    try {
      const res = await tokenInterceptor.post(
        `/students/placement/excel_file/upload`,
        {
          data,
        }
      );
      console.log(res);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// Works ✅
export const checkPlacement = createAsyncThunk(
  "Placement/checkPlacement",
  async ({ studentIndexNo }, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${SENSEC_API_ENDPOINT}/students/placement/${studentIndexNo}/check`
      );

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const updatePlacementData = createAsyncThunk(
  "Placement/updatePlacementData",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        `${SENSEC_API_ENDPOINT}/students/${data?.jhsIndexNo}/placement/update`,
        {
          data,
        }
      );

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const verifyPlacementStudent = createAsyncThunk(
  "Placement/verifyPlacementStudent",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        `${SENSEC_API_ENDPOINT}/students/placement/verify`,
        { data }
      );

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchSinglePlacementStudent = createAsyncThunk(
  "Placement/fetchSinglePlacementStudent",
  async ({ studentIndexNo }, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${SENSEC_API_ENDPOINT}/students/placement/${studentIndexNo}/fetch`
      );

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const fetchAllPlacementStudents = createAsyncThunk(
  "Placement/fetchAllPlacementStudents",
  async () => {
    const res = await axios.get(
      `${SENSEC_API_ENDPOINT}/students/placement/fetch_all`
    );
    return res.data;
  }
);

const placementSlice = createSlice({
  name: "Placement",
  initialState,
  reducers: {
    resetPlacementUploadState(state) {
      return {
        ...state,
        uploadExcelFileStatus: "",
        successMessage: "",
      };
    },
    resetPlacementUploadErrorState(state) {
      return {
        ...state,
        error: "",
      };
    },
    resetPlacementState(state) {
      return {
        ...state,
        createStatus: "",
        successMessage: "",
        error: "",
      };
    },
    resetUpdateState(state) {
      return {
        ...state,
        updateStatus: "",
        successMessage: "",
        error: "",
      };
    },
  },
  extraReducers: (builder) => {
    // Create Placement Batch
    builder.addCase(createPlacementBatch.pending, (state) => {
      return { ...state, createStatus: "pending" };
    });
    builder.addCase(createPlacementBatch.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          placementBatchInfo: action.payload.placementBatch,
          successMessage: action.payload.successMessage,
          createStatus: "success",
        };
      } else return state;
    });
    builder.addCase(createPlacementBatch.rejected, (state, action) => {
      return {
        ...state,
        createStatus: "rejected",
        error: action.payload,
      };
    });
    //   Upload Excel File
    builder.addCase(uploadPlacementFile.pending, (state) => {
      return { ...state, uploadExcelFileStatus: "pending" };
    });
    builder.addCase(uploadPlacementFile.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          placementFile: action.payload.newFile,
          successMessage: action.payload.successMessage,
          uploadExcelFileStatus: "success",
        };
      } else return state;
    });
    builder.addCase(uploadPlacementFile.rejected, (state, action) => {
      return {
        ...state,
        uploadExcelFileStatus: "rejected",
        error: action.payload,
      };
    });
    //   Student Checks Placement ✅
    builder.addCase(checkPlacement.pending, (state) => {
      return { ...state, checkStatus: "pending" };
    });
    builder.addCase(checkPlacement.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          placementStudentInfo: action.payload.foundStudent,
          successMessage: action.payload.successMessage,
          checkStatus: "success",
        };
      } else return state;
    });
    builder.addCase(checkPlacement.rejected, (state, action) => {
      return {
        ...state,
        checkStatus: "rejected",
        error: action.payload,
      };
    });
    // Student Updates Placement Data
    builder.addCase(updatePlacementData.pending, (state) => {
      return { ...state, updateStatus: "pending" };
    });
    builder.addCase(updatePlacementData.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          updatedPlacementData: action.payload.updatedPlacementStudent,
          successMessage: action.payload.successMessage,
          updateStatus: "success",
        };
      } else return state;
    });
    builder.addCase(updatePlacementData.rejected, (state, action) => {
      return {
        ...state,
        updateStatus: "rejected",
        updateError: action.payload,
      };
    });

    //   Student Verifies Placement
    builder.addCase(verifyPlacementStudent.pending, (state) => {
      return { ...state, verifyStatus: "pending" };
    });
    builder.addCase(verifyPlacementStudent.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          placementStudentInfo: action.payload.verifiedPlacement,
          successMessage: action.payload.successMessage,
          verifyStatus: "success",
        };
      } else return state;
    });
    builder.addCase(verifyPlacementStudent.rejected, (state, action) => {
      return {
        ...state,
        verifyStatus: "rejected",
        error: action.payload,
      };
    });
    //   Student Checks Placement
    builder.addCase(fetchSinglePlacementStudent.pending, (state) => {
      return { ...state, fetchStatus: "pending" };
    });
    builder.addCase(fetchSinglePlacementStudent.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          placementStudentInfo: action.payload.foundStudent,
          fetchSuccessMessage: action.payload.successMessage,
          fetchStatus: "success",
        };
      } else return state;
    });
    builder.addCase(fetchSinglePlacementStudent.rejected, (state, action) => {
      return {
        ...state,
        fetchStatus: "rejected",
        error: action.payload,
      };
    });
    //   Fetch All Placement Students
    builder.addCase(fetchAllPlacementStudents.pending, (state) => {
      return { ...state, fetchStatus: "pending" };
    });
    builder.addCase(fetchAllPlacementStudents.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          allPlacementStudents: action.payload.allStudents,
          fetchSuccessMessage: action.payload.successMessage,
          fetchStatus: "success",
        };
      } else return state;
    });
    builder.addCase(fetchAllPlacementStudents.rejected, (state, action) => {
      return {
        ...state,
        fetchStatus: "rejected",
        error: action.payload,
      };
    });
  },
});

export const {
  resetPlacementState,
  resetUpdateState,
  resetPlacementUploadState,
  resetPlacementUploadErrorState,
} = placementSlice.actions;
export const getAllPlacementStudents = (state) =>
  state.placement.allPlacementStudents;

export default placementSlice.reducer;
