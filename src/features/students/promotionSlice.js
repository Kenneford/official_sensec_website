import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ENDPOINT } from "../../apiEndPoint/api";
import tokenInterceptor from "../../apiEndPoint/interceptors";

const initialState = {
  promotedStudentInfo: "",
  graduatedStudentInfo: "",
  multiStudentsPromoted: [],
  multiStudentsGraduated: [],
  promotionStatus: "",
  multiStudentsPromotionStatus: "",
  multiStudentsDemotionStatus: "",
  successMessage: "",
  error: "",
  fetchingStatus: "",
};

export const promoteStudent = createAsyncThunk(
  "Student/promoteStudent",
  async ({ studentId, lastPromotedBy }, { rejectWithValue }) => {
    try {
      const res = await tokenInterceptor.put(`/students/${studentId}/promote`, {
        lastPromotedBy,
      });
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
export const promoteMultiStudents = createAsyncThunk(
  "Student/promoteMultiStudents",
  async ({ students, classLevel, lastPromotedBy }, { rejectWithValue }) => {
    try {
      const res = await tokenInterceptor.put(
        `/students/multi_data/promote/all`,
        { students, classLevel, lastPromotedBy }
      );
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

const promotionSlice = createSlice({
  name: "Student",
  initialState,
  reducers: {
    resetPromotionState(state) {
      return {
        ...state,
        promotionStatus: "",
        successMessage: "",
        error: "",
      };
    },
    resetMultiPromotionsState(state) {
      return {
        ...state,
        multiStudentsPromotionStatus: "",
        successMessage: "",
        error: "",
      };
    },
    resetMultiDemotionsState(state) {
      return {
        ...state,
        multiStudentsDemotionStatus: "",
        successMessage: "",
        error: "",
      };
    },
  },
  extraReducers: (builder) => {
    // Promote Student ✅
    builder.addCase(promoteStudent.pending, (state) => {
      return { ...state, promotionStatus: "pending" };
    });
    builder.addCase(promoteStudent.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          promotedStudentInfo: action.payload.promotedStudent,
          successMessage: action.payload.successMessage,
          promotionStatus: "success",
        };
      } else return state;
    });
    builder.addCase(promoteStudent.rejected, (state, action) => {
      return {
        ...state,
        promotionStatus: "rejected",
        error: action.payload,
      };
    });
    // Promote Multi Students
    builder.addCase(promoteMultiStudents.pending, (state) => {
      return { ...state, multiStudentsPromotionStatus: "pending" };
    });
    builder.addCase(promoteMultiStudents.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          multiStudentsPromoted: action.payload.promotedStudents,
          successMessage: action.payload.successMessage,
          multiStudentsPromotionStatus: "success",
        };
      } else return state;
    });
    builder.addCase(promoteMultiStudents.rejected, (state, action) => {
      return {
        ...state,
        multiStudentsPromotionStatus: "rejected",
        error: action.payload,
      };
    });
  },
});

export const {
  resetPromotionState,
  resetMultiPromotionsState,
  resetMultiDemotionsState,
} = promotionSlice.actions;
export default promotionSlice.reducer;
