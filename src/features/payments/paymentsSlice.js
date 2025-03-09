import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SENSEC_API_ENDPOINT } from "../../apiEndPoint/api";
import tokenInterceptor from "../../apiEndPoint/interceptors";

const initialState = {
  paymentData: "",
  allPaymentsData: [],
  makePaymentStatus: "",
  successMessage: "",
  error: "",
  fetchPaymentDataStatus: "",
  fetchSuccessMessage: "",
  fetchErrorMessage: "",
  deletePaymentDataStatus: "",
};

export const makePayment = createAsyncThunk(
  "Payments/makePayment",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${SENSEC_API_ENDPOINT}/pay_fees`, data);
      return res.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchPaymentData = createAsyncThunk(
  "Payments/fetchPaymentData",
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
    resetMakePaymentData(state) {
      return {
        ...state,
        makePaymentStatus: "",
        error: "",
        successMessage: "",
      };
    },
  },
  extraReducers: (builder) => {
    // Add School Data
    builder.addCase(makePayment.pending, (state) => {
      return { ...state, makePaymentStatus: "pending" };
    });
    builder.addCase(makePayment.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          paymentData: action.payload.paymentData,
          successMessage: action.payload.successMessage,
          makePaymentStatus: "success",
        };
      } else return state;
    });
    builder.addCase(makePayment.rejected, (state, action) => {
      return {
        ...state,
        makePaymentStatus: "rejected",
        error: action.payload,
      };
    });
    // Fetch Payment Data
    builder.addCase(fetchPaymentData.pending, (state) => {
      return { ...state, fetchSchoolDataStatus: "pending" };
    });
    builder.addCase(fetchPaymentData.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          sensecSchoolDataInfo: action.payload.sensecSchoolData,
          fetchSuccessMessage: action.payload.successMessage,
          fetchSchoolDataStatus: "success",
        };
      } else return state;
    });
    builder.addCase(fetchPaymentData.rejected, (state, action) => {
      return {
        ...state,
        fetchSchoolDataStatus: "rejected",
        fetchErrorMessage: action.payload,
      };
    });
  },
});

export const { resetMakePaymentData } = schoolDataSlice.actions;
export const getSensecSchoolData = (state) =>
  state.schoolData.sensecSchoolDataInfo;

export default schoolDataSlice.reducer;
