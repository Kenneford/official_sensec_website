import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SENSEC_API_ENDPOINT } from "../../apiEndPoint/api";
import tokenInterceptor from "../../apiEndPoint/interceptors";

const initialState = {
  classLevelInfo: "",
  updatedClassLevel: "",
  allClassLevels: [],
  allLecturerClassLevels: [],
  successMessage: "",
  error: "",
  createStatus: "",
  updateStatus: "",
  fetchStatus: "",
  fetchLectureClassLevelsStatus: "",
};

export const createClassLevel = createAsyncThunk(
  "ClassLevel/createClassLevel",
  async ({ classLevelData }, { rejectWithValue }) => {
    try {
      const res = await tokenInterceptor.post(`/academics/class_level/create`, {
        classLevelData,
      });
      return res.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateClassLevel = createAsyncThunk(
  "ClassLevel/updateClassLevel",
  async ({ name, classLevelId, lastUpdatedBy }, { rejectWithValue }) => {
    try {
      const accessToken = localStorage.getItem("userToken");
      const res = await axios.put(
        `${SENSEC_API_ENDPOINT}/admin/academics/class_level/${classLevelId}/update`,
        { name, lastUpdatedBy },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      return res.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
export const fetchLecturerClassLevels = createAsyncThunk(
  "ClassLevel/fetchLecturerClassLevels",
  async ({ lecturerId }, { rejectWithValue }) => {
    try {
      const res = await tokenInterceptor.get(
        `/academics/lecturer/${lecturerId}/class_levels/fetch_all`
      );
      console.log(res.data);

      return res.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchClassLevels = createAsyncThunk(
  "ClassLevel/fetchClassLevels",
  async () => {
    const response = await axios.get(
      `${SENSEC_API_ENDPOINT}/academics/class_levels/fetch_all`
    );
    // const students = response.data;
    return response.data;
  }
);

export const fetchSingleClassLevel = createAsyncThunk(
  "ClassLevel/fetchSingleClassLevel",
  async (name) => {
    const response = await axios.get(
      `${SENSEC_API_ENDPOINT}/admin/academics/single_class_level/${name}`
    );
    // const students = response.data;
    console.log(response.data);
    return response.data;
  }
);

export const fetchClassLevelPendingStudents = createAsyncThunk(
  "ClassLevel/fetchClassLevelPendingStudents",
  async (name) => {
    const response = await axios.get(
      `${SENSEC_API_ENDPOINT}/admin/academics/pending_students/class_level/${name}`
    );
    // const students = response.data;
    console.log(response.data);
    return response.data;
  }
);

const classLevelsSlice = createSlice({
  name: "ClassLevel",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createClassLevel.pending, (state, action) => {
      return { ...state, createStatus: "pending" };
    });
    builder.addCase(createClassLevel.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          classLevelInfo: action.payload.classLevel,
          allClassLevels: [...state.allClassLevels, action.payload.classLevel],
          successMessage: action.payload.successMessage,
          createStatus: "success",
          error: "",
          authenticated: false,
        };
      } else return state;
    });
    builder.addCase(createClassLevel.rejected, (state, action) => {
      return {
        ...state,
        createStatus: "rejected",
        error: action.payload,
      };
    });

    builder.addCase(updateClassLevel.pending, (state, action) => {
      return { ...state, updateClassLevelStatus: "pending" };
    });
    builder.addCase(updateClassLevel.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          updatedClassLevel: action.payload.updatedClassLevel,
          updateClassLevelSuccessMessage: action.payload.successMessage,
          updateClassLevelStatus: "success",
        };
      } else return state;
    });
    builder.addCase(updateClassLevel.rejected, (state, action) => {
      return {
        ...state,
        updateClassLevelStatus: "rejected",
        updateClassLevelError: action.payload,
      };
    });

    // Works✅
    builder.addCase(fetchClassLevels.pending, (state, action) => {
      return { ...state, fetchStatus: "pending" };
    });
    builder.addCase(fetchClassLevels.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          allClassLevels: action.payload.classLevels,
          successMessage: action.payload.successMessage,
          fetchStatus: "success",
        };
      } else return state;
    });
    builder.addCase(fetchClassLevels.rejected, (state, action) => {
      return {
        ...state,
        fetchStatus: "rejected",
        error: action.payload,
      };
    });
    // Works✅
    builder.addCase(fetchLecturerClassLevels.pending, (state, action) => {
      return { ...state, fetchLectureClassLevelsStatus: "pending" };
    });
    builder.addCase(fetchLecturerClassLevels.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          allLecturerClassLevels: action.payload.lectureClassLevels,
          successMessage: action.payload.successMessage,
          fetchLectureClassLevelsStatus: "success",
        };
      } else return state;
    });
    builder.addCase(fetchLecturerClassLevels.rejected, (state, action) => {
      return {
        ...state,
        fetchLectureClassLevelsStatus: "rejected",
        error: action.payload,
      };
    });

    builder.addCase(fetchSingleClassLevel.pending, (state) => {
      return { ...state, fetchingSingleStatus: "pending" };
    });
    builder.addCase(fetchSingleClassLevel.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          classLevelInfo: action.payload.classLevelData,
          successMessage: action.payload.successMessage,
          fetchingSingleStatus: "success",
        };
      } else return state;
    });
    builder.addCase(fetchSingleClassLevel.rejected, (state, action) => {
      return {
        ...state,
        fetchingSingleStatus: "rejected",
        error: action.payload,
      };
    });

    builder.addCase(fetchClassLevelPendingStudents.pending, (state) => {
      return { ...state, fetchingSingleStatus: "pending" };
    });
    builder.addCase(
      fetchClassLevelPendingStudents.fulfilled,
      (state, action) => {
        if (action.payload) {
          return {
            ...state,
            allPendingStudents: action.payload.classLevelPendingStudents,
            successMessage: action.payload.successMessage,
            fetchingSingleStatus: "success",
          };
        } else return state;
      }
    );
    builder.addCase(
      fetchClassLevelPendingStudents.rejected,
      (state, action) => {
        return {
          ...state,
          fetchingSingleStatus: "rejected",
          error: action.payload,
        };
      }
    );
  },
});

export const getAllClassLevels = (state) => state.classLevel.allClassLevels;
export const getLecturerClassLevels = (state) =>
  state.classLevel.allLecturerClassLevels;
export const getSingleClassLevel = (state) => state.classLevel.classLevelInfo;
export const getUpdatedClassLevel = (state) =>
  state.classLevel.updatedClassLevel;
export const getClassLevelPendingStudents = (state) =>
  state.classLevel.allPendingStudents;
export const getClassLevel100 = (state) =>
  state.classLevel.classLevel100.students;

export const getClassLevel200 = (state) =>
  state.classLevel.classLevel200.students;

export const getClassLevel300 = (state) =>
  state.classLevel.classLevel300.students;

export default classLevelsSlice.reducer;
