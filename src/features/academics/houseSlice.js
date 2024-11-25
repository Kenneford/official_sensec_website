import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import tokenInterceptor from "../../apiEndPoint/interceptors";
import { SENSEC_API_ENDPOINT } from "../../apiEndPoint/api";

const initialState = {
  houseInfo: "",
  allHouses: [],
  successMessage: "",
  error: "",
  createStatus: "",
  fetchingStatus: "",
};

export const createHouse = createAsyncThunk(
  "House/createHouse",
  async ({ data }, { rejectWithValue }) => {
    try {
      const res = await tokenInterceptor.post(`/academics/houses/create`, {
        data,
      });
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchAllHouses = createAsyncThunk(
  "House/fetchAllHouses",
  async () => {
    const response = await axios.get(
      `${SENSEC_API_ENDPOINT}/academics/houses/fetch_all`
    );
    // const students = response.data;
    console.log(response.data);
    return response.data;
  }
);

const houseSlice = createSlice({
  name: "House",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createHouse.pending, (state) => {
      return { ...state, createStatus: "pending" };
    });
    builder.addCase(createHouse.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          houseInfo: action.payload.house,
          successMessage: action.payload.successMessage,
          createStatus: "success",
        };
      } else return state;
    });
    builder.addCase(createHouse.rejected, (state, action) => {
      return {
        ...state,
        createStatus: "rejected",
        error: action.payload,
      };
    });

    builder.addCase(fetchAllHouses.pending, (state) => {
      return { ...state, fetchingStatus: "pending" };
    });
    builder.addCase(fetchAllHouses.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          allHouses: action.payload.housesFound,
          successMessage: action.payload.successMessage,
          fetchingStatus: "success",
        };
      } else return state;
    });
    builder.addCase(fetchAllHouses.rejected, (state, action) => {
      return {
        ...state,
        fetchingStatus: "rejected",
        error: action.payload,
      };
    });
  },
});

export const getAllHouses = (state) => state.house.allHouses;

export default houseSlice.reducer;
