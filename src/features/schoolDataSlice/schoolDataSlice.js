import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SENSEC_API_ENDPOINT } from "../../apiEndPoint/api";
import tokenInterceptor from "../../apiEndPoint/interceptors";

const initialState = {
  schoolDetails: "",
  allSchoolData: [],
  successMessage: "",
  error: "",
  addSchoolStatus: "",
  fetchSchoolDataStatus: "",
  fetchSuccessMessage: "",
  fetchErrorMessage: "",
  updateSchoolStatus: "",
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

export const fetchAllSchoolData = createAsyncThunk(
  "SchoolData/fetchAllSchoolData",
  async ({ rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${SENSEC_API_ENDPOINT}/school_data/fetch_all`
      );
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
  },
  extraReducers: (builder) => {
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

    builder.addCase(fetchAllSchoolData.pending, (state) => {
      return { ...state, fetchSchoolDataStatus: "pending" };
    });
    builder.addCase(fetchAllSchoolData.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          allSchoolData: action.payload.sensecSchoolData,
          fetchSuccessMessage: action.payload.successMessage,
          fetchSchoolDataStatus: "success",
        };
      } else return state;
    });
    builder.addCase(fetchAllSchoolData.rejected, (state, action) => {
      return {
        ...state,
        fetchSchoolDataStatus: "rejected",
        fetchErrorMessage: action.payload,
      };
    });
  },
});

export const { resetAddSchoolData } = schoolDataSlice.actions;
export const getSensecSchoolData = (state) => state.schoolData.allSchoolData;

export default schoolDataSlice.reducer;
