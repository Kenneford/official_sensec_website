import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SENSEC_API_ENDPOINT } from "../../apiEndPoint/api";

const initialState = {
  allStudents: [],
  allApprovedStudents: [],
  enrollmentStatus: "",
  successMessage: "",
  error: "",
};

export const studentEnrollment = createAsyncThunk(
  "Student/studentEnrollment",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        // `${API_ENDPOINT}/student/enrollment/online`,
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
        enrollmentStatus: "",
      };
    },
  },
  extraReducers: (builder) => {
    //   Student Enrollment
    builder.addCase(studentEnrollment.pending, (state) => {
      return { ...state, enrollmentStatus: "pending" };
    });
    builder.addCase(studentEnrollment.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          enrolledStudent: action.payload.newStudentData,
          successMessage: action.payload.successMessage,
          enrollmentStatus: "success",
        };
      }
    });
    builder.addCase(studentEnrollment.rejected, (state, action) => {
      return {
        ...state,
        enrollmentStatus: "rejected",
        error: action.payload,
      };
    });
  },
});

export default studentSlice.reducer;
