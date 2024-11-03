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

export const AddStudentGuardian = createAsyncThunk(
  "Student/AddStudentGuardian",
  async (guardianData, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${SENSEC_API_ENDPOINT}/students/${guardianData?.studentId}/enrolment/online/guardian/add`,
        {
          guardianData,
        }
      );
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const studentGuardianUpdate = createAsyncThunk(
  "Student/studentGuardianUpdate",
  async (
    {
      id,
      firstName,
      lastName,
      guardianName,
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
        `${API_ENDPOINT}/admin/students/${firstName}_${lastName}/${id}/guardian/update`,
        {
          guardianName,
          email,
          address,
          phoneNumber,
          lastUpdatedBy,
          updatedDate,
        }
      );
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchAllStudentParents = createAsyncThunk(
  "Student/fetchAllStudentParents",
  async () => {
    const response = await axios.get(
      `${API_ENDPOINT}/admin/students/guardian/fetch_all`
    );
    // const students = response.data;
    console.log(response.data);
    return response.data;
  }
);

const guardianSlice = createSlice({
  name: "Student",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(AddStudentGuardian.pending, (state) => {
      return { ...state, createStatus: "pending" };
    });
    builder.addCase(AddStudentGuardian.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          studentGuardianInfo: action.payload.guardian,
          successMessage: action.payload.successMessage,
          createStatus: "success",
        };
      } else return state;
    });
    builder.addCase(AddStudentGuardian.rejected, (state, action) => {
      return {
        ...state,
        createStatus: "rejected",
        error: action.payload,
      };
    });

    builder.addCase(studentGuardianUpdate.pending, (state) => {
      return { ...state, guardianUpdateStatus: "pending" };
    });
    builder.addCase(studentGuardianUpdate.fulfilled, (state, action) => {
      if (action.payload) {
        const updatedGuardian = state.allStudentsGuardians.map((guardian) =>
          guardian._id === action.payload.guardianUpdated._id
            ? action.payload.guardianUpdated
            : guardian
        );
        return {
          ...state,
          studentGuardianInfo: updatedGuardian,
          guardianUpdateSuccessMessage: action.payload.successMessage,
          guardianUpdateStatus: "success",
        };
      } else return state;
    });
    builder.addCase(studentGuardianUpdate.rejected, (state, action) => {
      return {
        ...state,
        guardianUpdateStatus: "rejected",
        guardianUpdateError: action.payload,
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

export const getStudentGuardian = (state) => state.guardian.studentGuardianInfo;
export const getAllStudentGuardians = (state) =>
  state.guardian.allStudentsGuardians;

export default guardianSlice.reducer;
