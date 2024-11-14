import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SENSEC_API_ENDPOINT } from "../../apiEndPoint/api";
import tokenInterceptor from "../../apiEndPoint/interceptors";

const initialState = {
  employeeInfo: "",
  allEmployees: [],
  approvedEmployee: "",
  rejectedEmployee: "",
  updatedEmployee: "",
  employmentStatus: "",
  approveEmploymentStatus: "",
  rejectEmploymentStatus: "",
  updateStatus: "",
  successMessage: "",
  fetchSuccessMessage: "",
  fetchError: "",
  error: "",
  fetchStatus: "",
};

export const newEmployee = createAsyncThunk(
  "Employment/newEmployee",
  async (employeeData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${SENSEC_API_ENDPOINT}/employment/new`, {
        employeeData,
      });
      return res.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
export const approveEmployee = createAsyncThunk(
  "Employment/approveEmployee",
  async ({ employeeId, employmentApprovedBy }, { rejectWithValue }) => {
    try {
      const res = await tokenInterceptor.put(
        `/employment/${employeeId}/${employmentApprovedBy}/approve`
      );
      return res.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
export const rejectEmployee = createAsyncThunk(
  "Employment/rejectEmployee",
  async ({ employeeId, employmentRejectedBy }, { rejectWithValue }) => {
    try {
      const res = await tokenInterceptor.put(
        `/employment/${employeeId}/${employmentRejectedBy}/reject`
      );
      return res.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

const employmentSlice = createSlice({
  name: "Employment",
  initialState,
  reducers: {
    resetEmploymentState(state) {
      return {
        ...state,
        employmentStatus: "",
        successMessage: "",
        error: "",
      };
    },
  },
  extraReducers: (builder) => {
    // New Employment
    builder.addCase(newEmployee.pending, (state) => {
      return { ...state, employmentStatus: "pending" };
    });
    builder.addCase(newEmployee.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          employeeInfo: action.payload.newEmployeeData,
          successMessage: action.payload.successMessage,
          employmentStatus: "success",
        };
      } else return state;
    });
    builder.addCase(newEmployee.rejected, (state, action) => {
      return {
        ...state,
        employmentStatus: "rejected",
        error: action.payload,
      };
    });
    // Approve Employment
    builder.addCase(approveEmployee.pending, (state) => {
      return { ...state, approveEmploymentStatus: "pending" };
    });
    builder.addCase(approveEmployee.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          approvedEmployee: action.payload.userEmploymentApproved,
          successMessage: action.payload.successMessage,
          approveEmploymentStatus: "success",
        };
      } else return state;
    });
    builder.addCase(approveEmployee.rejected, (state, action) => {
      return {
        ...state,
        approveEmploymentStatus: "rejected",
        error: action.payload,
      };
    });
    // Reject Employment
    builder.addCase(rejectEmployee.pending, (state) => {
      return { ...state, rejectEmploymentStatus: "pending" };
    });
    builder.addCase(rejectEmployee.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          rejectedEmployee: action.payload.userEmploymentRejected,
          successMessage: action.payload.successMessage,
          rejectEmploymentStatus: "success",
        };
      } else return state;
    });
    builder.addCase(rejectEmployee.rejected, (state, action) => {
      return {
        ...state,
        rejectEmploymentStatus: "rejected",
        error: action.payload,
      };
    });
  },
});

export const { resetEmploymentState } = employmentSlice.actions;
export default employmentSlice.reducer;
