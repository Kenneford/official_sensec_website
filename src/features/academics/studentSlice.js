import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SENSEC_API_ENDPOINT } from "../../apiEndPoint/api";

const initialState = {
  studentInfo: "",
  updatedStudent: "",
  allStudents: [],
  successMessage: "",
  error: "",
  enrollStatus: "",
  updateStatus: "",
  fetchStatus: "",
};

export const studentEnrollment = createAsyncThunk(
  "Student/studentEnrollment",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${SENSEC_API_ENDPOINT}/students/enrolment/online`,
        { data }
      );
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response?.data);
    }
  }
);

const studentSlice = createSlice({
  name: "Student",
  initialState: initialState,
  reducers: {
    resetEnrolmentState(state) {
      return {
        ...state,
        enrollStatus: "",
        successMessage: "",
        error: "",
      };
    },
  },
  extraReducers: (builder) => {
    // Student Enrollment
    builder.addCase(studentEnrollment.pending, (state) => {
      return { ...state, enrollStatus: "pending" };
    });
    builder.addCase(studentEnrollment.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          studentInfo: action.payload.newStudentData,
          successMessage: action.payload.successMessage,
          enrollStatus: "success",
        };
      }
    });
    builder.addCase(studentEnrollment.rejected, (state, action) => {
      return {
        ...state,
        enrollStatus: "rejected",
        error: action.payload,
      };
    });
  },
});

export const { resetEnrolmentState } = studentSlice.actions;

export default studentSlice.reducer;
