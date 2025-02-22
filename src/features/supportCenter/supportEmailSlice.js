import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SENSEC_API_ENDPOINT } from "../../apiEndPoint/api";

const initialState = {
  sentSupportEmail: "",
  success: "",
  error: "",
  sendSupportEmailStatus: "",
};

export const sendSupportEmail = createAsyncThunk(
  "Support_Email/sendSupportEmail",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${SENSEC_API_ENDPOINT}/support/message/send`,
        data
      );
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

const supportEmailSlice = createSlice({
  name: "Support_Email",
  initialState,
  reducers: {
    resetSentEmailState(state) {
      return {
        ...state,
        sendSupportEmailStatus: "",
        error: "",
        successMessage: "",
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(sendSupportEmail.pending, (state) => {
      return { ...state, sendSupportEmailStatus: "pending" };
    });
    builder.addCase(sendSupportEmail.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          sentSupportEmail: action.payload.email,
          success: action.payload.successMessage,
          sendSupportEmailStatus: "success",
        };
      }
    });
    builder.addCase(sendSupportEmail.rejected, (state, action) => {
      return {
        ...state,
        sendSupportEmailStatus: "rejected",
        error: action.payload,
      };
    });
  },
});

export const { resetSentEmailState } = supportEmailSlice.actions;

export default supportEmailSlice.reducer;
