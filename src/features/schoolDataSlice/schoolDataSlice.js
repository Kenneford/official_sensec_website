import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SENSEC_API_ENDPOINT } from "../../apiEndPoint/api";
import tokenInterceptor from "../../apiEndPoint/interceptors";

const initialState = {
  schoolDetails: "",
  updatedSchoolData: "",
  sensecSchoolDataInfo: [],
  successMessage: "",
  error: "",
  addSchoolStatus: "",
  updateSchoolStatus: "",
  fetchSchoolDataStatus: "",
  fetchSuccessMessage: "",
  fetchErrorMessage: "",
  singleSchoolFetchingStatus: "",
  deleteSchoolStatus: "",
};

export const addSchoolData = createAsyncThunk(
  "SchoolData/addSchoolData",
  async (data, { rejectWithValue }) => {
    try {
      const res = await tokenInterceptor.post(`/school_data/add`, data);
      return res.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
export const updateSchoolData = createAsyncThunk(
  "SchoolData/updateSchoolData",
  async (data, { rejectWithValue }) => {
    try {
      const res = await tokenInterceptor.put(`/school_data/update`, data);
      return res.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchSensecSchoolData = createAsyncThunk(
  "SchoolData/fetchSensecSchoolData",
  async (rejectWithValue) => {
    try {
      const res = await axios.get(`${SENSEC_API_ENDPOINT}/school_data/fetch`);
      return res.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

const schoolDataSlice = createSlice({
  name: "SchoolData",
  initialState,
  reducers: {
    resetAddSchoolData(state) {
      return {
        ...state,
        addSchoolStatus: "",
        error: "",
        successMessage: "",
      };
    },
    resetUpdateSchoolDataState(state) {
      return {
        ...state,
        updateSchoolStatus: "",
        error: "",
        successMessage: "",
      };
    },
  },
  extraReducers: (builder) => {
    // Add School Data
    builder.addCase(addSchoolData.pending, (state) => {
      return { ...state, addSchoolStatus: "pending" };
    });
    builder.addCase(addSchoolData.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          schoolDetails: action.payload.schoolData,
          successMessage: action.payload.successMessage,
          addSchoolStatus: "success",
        };
      } else return state;
    });
    builder.addCase(addSchoolData.rejected, (state, action) => {
      return {
        ...state,
        addSchoolStatus: "rejected",
        error: action.payload,
      };
    });
    // Update School Data
    builder.addCase(updateSchoolData.pending, (state) => {
      return { ...state, updateSchoolStatus: "pending" };
    });
    builder.addCase(updateSchoolData.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          updatedSchoolData: action.payload.updatedSensecSchoolData,
          successMessage: action.payload.successMessage,
          updateSchoolStatus: "success",
        };
      } else return state;
    });
    builder.addCase(updateSchoolData.rejected, (state, action) => {
      return {
        ...state,
        updateSchoolStatus: "rejected",
        error: action.payload,
      };
    });
    // Fetch School Data
    builder.addCase(fetchSensecSchoolData.pending, (state) => {
      return { ...state, fetchSchoolDataStatus: "pending" };
    });
    builder.addCase(fetchSensecSchoolData.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          sensecSchoolDataInfo: action.payload.sensecSchoolData,
          fetchSuccessMessage: action.payload.successMessage,
          fetchSchoolDataStatus: "success",
        };
      } else return state;
    });
    builder.addCase(fetchSensecSchoolData.rejected, (state, action) => {
      return {
        ...state,
        fetchSchoolDataStatus: "rejected",
        fetchErrorMessage: action.payload,
      };
    });
  },
});

export const { resetAddSchoolData, resetUpdateSchoolDataState } =
  schoolDataSlice.actions;
export const getSensecSchoolData = (state) =>
  state.schoolData.sensecSchoolDataInfo;

export default schoolDataSlice.reducer;
