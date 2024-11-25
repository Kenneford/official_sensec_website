import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SENSEC_API_ENDPOINT } from "../../apiEndPoint/api";
import tokenInterceptor from "../../apiEndPoint/interceptors";

const initialState = {
  academicYearInfo: "",
  allAcademicYears: [],
  successMessage: "",
  error: "",
  createStatus: "",
  fetchStatus: "",
};

export const createAcademicYear = createAsyncThunk(
  "AcademicYear/createAcademicYear",
  async ({ academicYear }, { rejectWithValue }) => {
    try {
      const res = await tokenInterceptor.post(`/academics/year/create`, {
        academicYear,
      });
      return res.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchAllAcademicYears = createAsyncThunk(
  "AcademicYear/fetchAllAcademicYears",
  async () => {
    const response = await axios.get(
      `${SENSEC_API_ENDPOINT}/academics/year/fetch_all`
    );
    // const students = response.data;
    return response.data;
  }
);

const academicYearSlice = createSlice({
  name: "AcademicYear",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createAcademicYear.pending, (state) => {
      return { ...state, createStatus: "pending" };
    });
    builder.addCase(createAcademicYear.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          academicYearInfo: action.payload.academicYear,
          successMessage: action.payload.successMessage,
          createStatus: "success",
        };
      } else return state;
    });
    builder.addCase(createAcademicYear.rejected, (state, action) => {
      return {
        ...state,
        createStatus: "rejected",
        error: action.payload,
      };
    });

    builder.addCase(fetchAllAcademicYears.pending, (state) => {
      return { ...state, fetchStatus: "pending" };
    });
    builder.addCase(fetchAllAcademicYears.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          allAcademicYears: action.payload.academicYears,
          successMessage: action.payload.successMessage,
          fetchStatus: "success",
        };
      } else return state;
    });
    builder.addCase(fetchAllAcademicYears.rejected, (state, action) => {
      return {
        ...state,
        fetchStatus: "rejected",
        error: action.payload,
      };
    });
  },
});

export const getAllAcademicYears = (state) =>
  state.academicYear.allAcademicYears;

export default academicYearSlice.reducer;
