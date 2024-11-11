import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ENDPOINT, SENSEC_API_ENDPOINT } from "../../apiEndPoint/api";

const initialState = {
  employeeInfo: "",
  allEmployees: [],
  approvedEmployee: "",
  updatedEmployee: "",
  employmentStatus: "",
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
    //   Sign Up
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
  },
});

export const { resetEmploymentState } = employmentSlice.actions;
export default employmentSlice.reducer;
