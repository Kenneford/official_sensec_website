import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SENSEC_API_ENDPOINT } from "../../apiEndPoint/api";
import tokenInterceptor from "../../apiEndPoint/interceptors";

const initialState = {
  employeeInfo: "",
  allEmployees: [],
  allApprovedEmployee: [],
  allRejectedEmployee: [],
  approvedEmployee: "",
  rejectedEmployee: "",
  updatedEmployee: "",
  employmentStatus: "",
  approveEmploymentStatus: "",
  approveMultiEmploymentStatus: "",
  rejectEmploymentStatus: "",
  rejectMultiEmploymentStatus: "",
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
export const updateEmployeeData = createAsyncThunk(
  "Employment/updateEmployeeData",
  async (updateData, { rejectWithValue }) => {
    console.log(updateData?.uniqueId);

    try {
      const res = await tokenInterceptor.put(
        `${SENSEC_API_ENDPOINT}/employment/${updateData?.uniqueId}/personal_data/update`,
        {
          updateData,
        }
      );
      return res.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
export const updateEmployeeSchoolData = createAsyncThunk(
  "Employment/updateEmployeeSchoolData",
  async (updateData, { rejectWithValue }) => {
    console.log(updateData?.uniqueId);

    try {
      const res = await tokenInterceptor.put(
        `${SENSEC_API_ENDPOINT}/employment/${updateData?.uniqueId}/school_data/update`,
        {
          updateData,
        }
      );
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
export const approveMultiEmployees = createAsyncThunk(
  "Employment/approveMultiEmployees",
  async ({ employees, employmentApprovedBy }, { rejectWithValue }) => {
    try {
      const res = await tokenInterceptor.put(
        `/employment/${employmentApprovedBy}/employees/multi_data/approve`,
        { employees }
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
export const rejectMultiEmployees = createAsyncThunk(
  "Employment/rejectMultiEmployees",
  async ({ employees, employmentRejectedBy }, { rejectWithValue }) => {
    try {
      const res = await tokenInterceptor.put(
        `/employment/${employmentRejectedBy}/employees/multi_data/reject`,
        { employees }
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
    resetEmploymentUpdateState(state) {
      return {
        ...state,
        updateStatus: "",
        successMessage: "",
        error: "",
      };
    },
    resetEmploymentApprovalState(state) {
      return {
        ...state,
        approveEmploymentStatus: "",
        successMessage: "",
        error: "",
      };
    },
    resetEmploymentRejectionState(state) {
      return {
        ...state,
        rejectEmploymentStatus: "",
        successMessage: "",
        error: "",
      };
    },
    resetMultiApprovalState(state) {
      return {
        ...state,
        approveMultiEmploymentStatus: "",
        successMessage: "",
        error: "",
      };
    },
    resetMultiRejectionState(state) {
      return {
        ...state,
        rejectMultiEmploymentStatus: "",
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
    // Update Employment Data
    builder.addCase(updateEmployeeData.pending, (state) => {
      return { ...state, updateStatus: "pending" };
    });
    builder.addCase(updateEmployeeData.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          updatedEmployee: action.payload.updatedUser,
          successMessage: action.payload.successMessage,
          updateStatus: "success",
        };
      } else return state;
    });
    builder.addCase(updateEmployeeData.rejected, (state, action) => {
      return {
        ...state,
        updateStatus: "rejected",
        error: action.payload,
      };
    });
    // Update Employment School Data
    builder.addCase(updateEmployeeSchoolData.pending, (state) => {
      return { ...state, updateStatus: "pending" };
    });
    builder.addCase(updateEmployeeSchoolData.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          updatedEmployee: action.payload.updatedUser,
          successMessage: action.payload.successMessage,
          updateStatus: "success",
        };
      } else return state;
    });
    builder.addCase(updateEmployeeSchoolData.rejected, (state, action) => {
      return {
        ...state,
        updateStatus: "rejected",
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
    // Approve Multi Employments
    builder.addCase(approveMultiEmployees.pending, (state) => {
      return { ...state, approveMultiEmploymentStatus: "pending" };
    });
    builder.addCase(approveMultiEmployees.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          allApprovedEmployee: action.payload.allApprovedEmployees,
          successMessage: action.payload.successMessage,
          approveMultiEmploymentStatus: "success",
        };
      } else return state;
    });
    builder.addCase(approveMultiEmployees.rejected, (state, action) => {
      return {
        ...state,
        approveMultiEmploymentStatus: "rejected",
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
    // Reject Multi Employments
    builder.addCase(rejectMultiEmployees.pending, (state) => {
      return { ...state, rejectMultiEmploymentStatus: "pending" };
    });
    builder.addCase(rejectMultiEmployees.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          allRejectedEmployee: action.payload.allRejectedEmployees,
          successMessage: action.payload.successMessage,
          rejectMultiEmploymentStatus: "success",
        };
      } else return state;
    });
    builder.addCase(rejectMultiEmployees.rejected, (state, action) => {
      return {
        ...state,
        rejectMultiEmploymentStatus: "rejected",
        error: action.payload,
      };
    });
  },
});

export const {
  resetEmploymentState,
  resetEmploymentApprovalState,
  resetEmploymentRejectionState,
  resetMultiApprovalState,
  resetMultiRejectionState,
  resetEmploymentUpdateState,
} = employmentSlice.actions;
export default employmentSlice.reducer;
