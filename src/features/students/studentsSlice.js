import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SENSEC_API_ENDPOINT } from "../../apiEndPoint/api";

const initialState = {
  studentInfo: "",
  updatedStudent: "",
  allStudents: [],
  successMessage: "",
  error: "",
  enrollmentStatus: "",
  enrollmentApprovalStatus: "",
  rejectEnrollmentStatus: "",
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
export const approvedStudentEnrollment = createAsyncThunk(
  "Student/approvedStudentEnrollment",
  async ({ studentId, enrolmentApprovedBy }, { rejectWithValue }) => {
    try {
      const accessToken = localStorage.getItem("userToken");
      const res = await axios.put(
        `${SENSEC_API_ENDPOINT}/students/enrolment/${studentId}/approve`,
        { enrolmentApprovedBy },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
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
        successMessage: "",
        error: "",
      };
    },
    resetEnrolmentApprovalState(state) {
      return {
        ...state,
        enrollmentApprovalStatus: "",
        successMessage: "",
        error: "",
      };
    },
  },
  extraReducers: (builder) => {
    // Student Enrollment
    builder.addCase(studentEnrollment.pending, (state) => {
      return { ...state, enrollmentStatus: "pending" };
    });
    builder.addCase(studentEnrollment.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          studentInfo: action.payload.newStudentData,
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
    // Approve Student Enrollment
    builder.addCase(approvedStudentEnrollment.pending, (state) => {
      return { ...state, enrollmentApprovalStatus: "pending" };
    });
    builder.addCase(approvedStudentEnrollment.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          studentInfo: action.payload.student,
          successMessage: action.payload.successMessage,
          enrollmentApprovalStatus: "success",
        };
      } else return state;
    });
    builder.addCase(approvedStudentEnrollment.rejected, (state, action) => {
      return {
        ...state,
        enrollmentApprovalStatus: "rejected",
        error: action.payload,
      };
    });
  },
});

export const { resetEnrolmentState, resetEnrolmentApprovalState } =
  studentSlice.actions;

export default studentSlice.reducer;
