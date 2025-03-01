import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SENSEC_API_ENDPOINT } from "../../apiEndPoint/api";
import tokenInterceptor from "../../apiEndPoint/interceptors";

const initialState = {
  academicTermInfo: "",
  updatedSemester: "",
  deletedSemester: "",
  currentAcademicTerm: "",
  allAcademicTerms: [],
  successMessage: "",
  updateSuccessMessage: "",
  fetchSuccessMessage: "",
  deleteSuccessMessage: "",
  error: "",
  createStatus: "",
  fetchStatus: "",
  deleteStatus: "",
  updateSemesterStatus: "",
  deleteSemesterStatus: "",
};

export const createAcademicTerm = createAsyncThunk(
  "AcademicTerm/createAcademicTerm",
  async ({ academicTermData }, { rejectWithValue }) => {
    try {
      const res = await tokenInterceptor.post(`/academics/terms/create`, {
        academicTermData,
      });
      return res.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
export const updateAcademicTermStatus = createAsyncThunk(
  "AcademicTerm/updateAcademicTermStatus",
  async (data, { rejectWithValue }) => {
    try {
      const res = await tokenInterceptor.put(
        `/academics/terms/${data?.semesterId}/status/set`,
        data
      );
      return res.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
export const fetchCurrentTerm = createAsyncThunk(
  "AcademicTerm/fetchCurrentTerm",
  async () => {
    const response = await axios.get(`/academics/terms/current/fetch`);
    // const students = response.data;
    return response.data;
  }
);
export const fetchAllAcademicTerms = createAsyncThunk(
  "AcademicTerm/fetchAllAcademicTerms",
  async () => {
    try {
      const response = await axios.get(
        `${SENSEC_API_ENDPOINT}/academics/terms/fetch_all`
      );
      // const students = response.data;
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      // return rejectWithValue(error.response.data);
    }
  }
);
export const deleteAcademicTerm = createAsyncThunk(
  "AcademicTerm/deleteAcademicTerm",
  async (data, { rejectWithValue }) => {
    try {
      const res = await tokenInterceptor.delete(
        `/academics/terms/${data?.semesterId}/delete`
      );
      return res.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

const academicTermSlice = createSlice({
  name: "AcademicTerm",
  initialState,
  reducers: {
    resetUpdateSemesterStatusState(state) {
      return {
        ...state,
        updateSemesterStatus: "",
        updateSuccessMessage: "",
        error: "",
      };
    },
    resetDeleteSemesterState(state) {
      return {
        ...state,
        deletedSemesterSemesterStatus: "",
        deleteSuccessMessage: "",
        error: "",
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createAcademicTerm.pending, (state) => {
      return { ...state, createStatus: "pending" };
    });
    builder.addCase(createAcademicTerm.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          academicTermInfo: action.payload.academicTerm,
          successMessage: action.payload.successMessage,
          createStatus: "success",
        };
      } else return state;
    });
    builder.addCase(createAcademicTerm.rejected, (state, action) => {
      return {
        ...state,
        createStatus: "rejected",
        error: action.payload,
      };
    });
    // updateAcademicTermStatus
    builder.addCase(updateAcademicTermStatus.pending, (state) => {
      return { ...state, updateSemesterStatus: "pending" };
    });
    builder.addCase(updateAcademicTermStatus.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          updatedSemester: action.payload.updatedSemesterStatus,
          updateSuccessMessage: action.payload.successMessage,
          updateSemesterStatus: "success",
        };
      } else return state;
    });
    builder.addCase(updateAcademicTermStatus.rejected, (state, action) => {
      return {
        ...state,
        updateSemesterStatus: "rejected",
        error: action.payload,
      };
    });

    builder.addCase(fetchAllAcademicTerms.pending, (state) => {
      return { ...state, fetchStatus: "pending" };
    });
    builder.addCase(fetchAllAcademicTerms.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          allAcademicTerms: action.payload.academicTerms,
          fetchSuccessMessage: action.payload.successMessage,
          fetchStatus: "success",
        };
      } else return state;
    });
    builder.addCase(fetchAllAcademicTerms.rejected, (state, action) => {
      return {
        ...state,
        fetchStatus: "rejected",
        error: action.payload,
      };
    });

    builder.addCase(fetchCurrentTerm.pending, (state) => {
      return { ...state, fetchStatus: "pending" };
    });
    builder.addCase(fetchCurrentTerm.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          currentAcademicTerm: action.payload.currentAcademicTerm,
          fetchSuccessMessage: action.payload.successMessage,
          fetchStatus: "success",
        };
      } else return state;
    });
    builder.addCase(fetchCurrentTerm.rejected, (state, action) => {
      return {
        ...state,
        fetchStatus: "rejected",
        error: action.payload,
      };
    });
    // deleteAcademicTerm
    builder.addCase(deleteAcademicTerm.pending, (state) => {
      return { ...state, deleteSemesterStatus: "pending" };
    });
    builder.addCase(deleteAcademicTerm.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          deletedSemester: action.payload.deletedAcademicTerm,
          deleteSuccessMessage: action.payload.successMessage,
          deleteSemesterStatus: "success",
        };
      } else return state;
    });
    builder.addCase(deleteAcademicTerm.rejected, (state, action) => {
      return {
        ...state,
        deleteSemesterStatus: "rejected",
        error: action.payload,
      };
    });
  },
});

export const { resetUpdateSemesterStatusState, resetDeleteSemesterState } =
  academicTermSlice.actions;
export const getAllAcademicTerms = (state) =>
  state.academicTerm.allAcademicTerms;
export const getCurrentAcademicTerm = (state) =>
  state.academicTerm.currentAcademicTerm;

export default academicTermSlice.reducer;
