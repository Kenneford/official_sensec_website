import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ENDPOINT, SENSEC_API_ENDPOINT } from "../../apiEndPoint/api";

const initialState = {
  studentParentInfo: "",
  successMessage: "",
  error: "",
  createStatus: "",
  updateStatus: "",
  fetchStatus: "",
};

export const AddStudentParent = createAsyncThunk(
  "Student/AddStudentParent",
  async (parentData, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${SENSEC_API_ENDPOINT}/students/${parentData?.studentId}/enrolment/online/parent/add`,
        {
          parentData,
        }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const studentParentUpdate = createAsyncThunk(
  "Student/studentParentUpdate",
  async (
    {
      id,
      firstName,
      lastName,
      fatherName,
      motherName,
      email,
      address,
      phoneNumber,
      lastUpdatedBy,
      updatedDate,
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.put(
        `${API_ENDPOINT}/admin/students/${firstName}_${lastName}/${id}/parent/update`,
        {
          fatherName,
          motherName,
          email,
          address,
          phoneNumber,
          lastUpdatedBy,
          updatedDate,
        }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchAllStudentParents = createAsyncThunk(
  "Student/fetchAllStudentParents",
  async () => {
    const response = await axios.get(
      `${API_ENDPOINT}/admin/students/parent/fetch_all`
    );
    // const students = response.data;
    console.log(response.data);
    return response.data;
  }
);

const parentSlice = createSlice({
  name: "Student",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Create parent data
    builder.addCase(AddStudentParent.pending, (state) => {
      return { ...state, createStatus: "pending" };
    });
    builder.addCase(AddStudentParent.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          studentParentInfo: action.payload.parent,
          successMessage: action.payload.successMessage,
          createStatus: "success",
        };
      } else return state;
    });
    builder.addCase(AddStudentParent.rejected, (state, action) => {
      return {
        ...state,
        createStatus: "rejected",
        error: action.payload,
      };
    });
    builder.addCase(studentParentUpdate.pending, (state) => {
      return { ...state, parentUpdateStatus: "pending" };
    });
    builder.addCase(studentParentUpdate.fulfilled, (state, action) => {
      if (action.payload) {
        const parentUpdated = state.allStudentsParents.map((parent) =>
          parent._id === action.payload.updatedParentData._id
            ? action.payload.updatedParentData
            : parent
        );
        return {
          ...state,
          allStudentsParents: parentUpdated,
          parentUpdateSuccessMessage: action.payload.successMessage,
          parentUpdateStatus: "success",
        };
      } else return state;
    });
    builder.addCase(studentParentUpdate.rejected, (state, action) => {
      return {
        ...state,
        parentUpdateStatus: "rejected",
        parentUpdateError: action.payload,
      };
    });

    builder.addCase(fetchAllStudentParents.pending, (state, action) => {
      return { ...state, fetchingStatus: "pending" };
    });
    builder.addCase(fetchAllStudentParents.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          allStudentsParents: action.payload.allStudentsStatusInfos,
          successMessage: action.payload.successMessage,
          fetchingStatus: "success",
        };
      } else return state;
    });
    builder.addCase(fetchAllStudentParents.rejected, (state, action) => {
      return {
        ...state,
        fetchingStatus: "rejected",
        error: action.payload,
      };
    });
  },
});

export const getStudentParent = (state) => state.parent.studentParentInfo;
export const getAllStudentParents = (state) => state.parent.allStudentsParents;

export default parentSlice.reducer;
