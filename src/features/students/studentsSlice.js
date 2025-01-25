import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SENSEC_API_ENDPOINT } from "../../apiEndPoint/api";
import tokenInterceptor from "../../apiEndPoint/interceptors";

const initialState = {
  studentInfo: "",
  updatedStudent: "",
  allStudents: [],
  allApprovedStudents: [],
  allRejectedStudents: [],
  successMessage: "",
  error: "",
  enrollmentStatus: "",
  enrollmentApprovalStatus: "",
  approveMultiEnrollmentStatus: "",
  rejectMultiEnrollmentStatus: "",
  rejectEnrollmentStatus: "",
  updateStatus: "",
  fetchStatus: "",
};

export const studentEnrollment = createAsyncThunk(
  "Student/studentEnrollment",
  async (newStudentData, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${SENSEC_API_ENDPOINT}/students/enrolment/online`,
        newStudentData
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);
export const studentPersonalDataUpdate = createAsyncThunk(
  "Student/studentPersonalDataUpdate",
  async ({ updateData }, { rejectWithValue }) => {
    console.log(updateData);

    try {
      const res = await axios.put(
        `${SENSEC_API_ENDPOINT}/students/${updateData?.studentId}/personal_data/update`,
        { updateData }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);
export const studentSchoolDataUpdate = createAsyncThunk(
  "Student/studentSchoolDataUpdate",
  async ({ updateData }, { rejectWithValue }) => {
    console.log(updateData);

    try {
      const res = await axios.put(
        `${SENSEC_API_ENDPOINT}/students/${updateData?.studentId}/school_data/update`,
        { updateData }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);
export const approveStudentEnrollment = createAsyncThunk(
  "Student/approveStudentEnrollment",
  async ({ studentId, enrollmentApprovedBy }, { rejectWithValue }) => {
    try {
      const res = await tokenInterceptor.put(
        `/students/${studentId}/enrolment/approve`,
        { enrollmentApprovedBy }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const rejectStudentEnrollment = createAsyncThunk(
  "Student/rejectStudentEnrollment",
  async ({ studentId, enrollmentRejectedBy }, { rejectWithValue }) => {
    try {
      const res = await tokenInterceptor.put(
        `/students/${studentId}/enrolment/reject`,
        { enrollmentRejectedBy }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const approvedMultiStudentEnrollment = createAsyncThunk(
  "Student/approvedMultiStudentEnrollment",
  async ({ students, enrollmentApprovedBy }, { rejectWithValue }) => {
    try {
      const res = await tokenInterceptor.put(
        `students/enrolment/multi_data/approve/all`,
        { students, enrollmentApprovedBy }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const rejectMultiStudentEnrollment = createAsyncThunk(
  "Student/rejectMultiStudentEnrollment",
  async ({ students, enrollmentRejectedBy }, { rejectWithValue }) => {
    try {
      const res = await tokenInterceptor.put(
        `students/enrolment/multi_data/reject/all`,
        { students, enrollmentRejectedBy }
      );
      return res.data;
    } catch (error) {
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
    resetEnrolmentUpdateState(state) {
      return {
        ...state,
        updateStatus: "",
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
    resetEnrolmentRejectionState(state) {
      return {
        ...state,
        rejectEnrollmentStatus: "",
        successMessage: "",
        error: "",
      };
    },
    resetMultiApprovalState(state) {
      return {
        ...state,
        approveMultiEnrollmentStatus: "",
        successMessage: "",
        error: "",
      };
    },
    resetMultiRejectionState(state) {
      return {
        ...state,
        rejectMultiEnrollmentStatus: "",
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
    // Update Student Personal Data
    builder.addCase(studentPersonalDataUpdate.pending, (state) => {
      return { ...state, updateStatus: "pending" };
    });
    builder.addCase(studentPersonalDataUpdate.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          updatedStudent: action.payload.updatedStudent,
          successMessage: action.payload.successMessage,
          updateStatus: "success",
        };
      } else return state;
    });
    builder.addCase(studentPersonalDataUpdate.rejected, (state, action) => {
      return {
        ...state,
        updateStatus: "rejected",
        error: action.payload,
      };
    });
    // Update Student School Data
    builder.addCase(studentSchoolDataUpdate.pending, (state) => {
      return { ...state, updateStatus: "pending" };
    });
    builder.addCase(studentSchoolDataUpdate.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          updatedStudent: action.payload.updatedStudent,
          successMessage: action.payload.successMessage,
          updateStatus: "success",
        };
      } else return state;
    });
    builder.addCase(studentSchoolDataUpdate.rejected, (state, action) => {
      return {
        ...state,
        updateStatus: "rejected",
        error: action.payload,
      };
    });
    // Approve Student Enrollment
    builder.addCase(approveStudentEnrollment.pending, (state) => {
      return { ...state, enrollmentApprovalStatus: "pending" };
    });
    builder.addCase(approveStudentEnrollment.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          studentInfo: action.payload.student,
          successMessage: action.payload.successMessage,
          enrollmentApprovalStatus: "success",
        };
      } else return state;
    });
    builder.addCase(approveStudentEnrollment.rejected, (state, action) => {
      return {
        ...state,
        enrollmentApprovalStatus: "rejected",
        error: action.payload,
      };
    });
    // Reject Student Enrollment
    builder.addCase(rejectStudentEnrollment.pending, (state) => {
      return { ...state, rejectEnrollmentStatus: "pending" };
    });
    builder.addCase(rejectStudentEnrollment.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          studentInfo: action.payload.studentRejected,
          successMessage: action.payload.successMessage,
          rejectEnrollmentStatus: "success",
        };
      } else return state;
    });
    builder.addCase(rejectStudentEnrollment.rejected, (state, action) => {
      return {
        ...state,
        rejectEnrollmentStatus: "rejected",
        error: action.payload,
      };
    });
    // Approve Multi Students Enrollment
    builder.addCase(approvedMultiStudentEnrollment.pending, (state) => {
      return { ...state, approveMultiEnrollmentStatus: "pending" };
    });
    builder.addCase(
      approvedMultiStudentEnrollment.fulfilled,
      (state, action) => {
        if (action.payload) {
          return {
            ...state,
            allApprovedStudents: action.payload.allApprovedStudents,
            successMessage: action.payload.successMessage,
            approveMultiEnrollmentStatus: "success",
          };
        } else return state;
      }
    );
    builder.addCase(
      approvedMultiStudentEnrollment.rejected,
      (state, action) => {
        return {
          ...state,
          approveMultiEnrollmentStatus: "rejected",
          error: action.payload,
        };
      }
    );
    // Reject Multi Students Enrollment
    builder.addCase(rejectMultiStudentEnrollment.pending, (state) => {
      return { ...state, rejectMultiEnrollmentStatus: "pending" };
    });
    builder.addCase(rejectMultiStudentEnrollment.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          allRejectedStudents: action.payload.allRejectedStudents,
          successMessage: action.payload.successMessage,
          rejectMultiEnrollmentStatus: "success",
        };
      } else return state;
    });
    builder.addCase(rejectMultiStudentEnrollment.rejected, (state, action) => {
      return {
        ...state,
        rejectMultiEnrollmentStatus: "rejected",
        error: action.payload,
      };
    });
  },
});

export const {
  resetEnrolmentState,
  resetEnrolmentUpdateState,
  resetEnrolmentApprovalState,
  resetMultiApprovalState,
  resetMultiRejectionState,
  resetEnrolmentRejectionState,
} = studentSlice.actions;

export default studentSlice.reducer;
