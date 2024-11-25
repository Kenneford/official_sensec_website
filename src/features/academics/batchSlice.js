import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SENSEC_API_ENDPOINT } from "../../apiEndPoint/api";
import tokenInterceptor from "../../apiEndPoint/interceptors";

const initialState = {
  batchInfo: "",
  allBatches: [],
  successMessage: "",
  error: "",
  createStatus: "",
  fetchStatus: "",
};

export const createBatch = createAsyncThunk(
  "Academics/createBatch",
  async ({ data }, { rejectWithValue }) => {
    try {
      const res = await tokenInterceptor.post(`/academics/batches/create`, {
        data,
      });
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

const batchSlice = createSlice({
  name: "Batch",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createBatch.pending, (state) => {
      return { ...state, createStatus: "pending" };
    });
    builder.addCase(createBatch.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          batchInfo: action.payload.batch,
          successMessage: action.payload.successMessage,
          createStatus: "success",
        };
      } else return state;
    });
    builder.addCase(createBatch.rejected, (state, action) => {
      return {
        ...state,
        createStatus: "rejected",
        error: action.payload,
      };
    });

    builder.addCase(fetchAllBatches.pending, (state) => {
      return { ...state, fetchStatus: "pending" };
    });
    builder.addCase(fetchAllBatches.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          allBatches: action.payload.batchesFound,
          successMessage: action.payload.successMessage,
          fetchStatus: "success",
        };
      } else return state;
    });
    builder.addCase(fetchAllBatches.rejected, (state, action) => {
      return {
        ...state,
        fetchStatus: "rejected",
        error: action.payload,
      };
    });
  },
});

export const getAllBatches = (state) => state.batch.allBatches;

export default batchSlice.reducer;
