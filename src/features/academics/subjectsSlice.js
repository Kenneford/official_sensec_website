import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SENSEC_API_ENDPOINT } from "../../apiEndPoint/api";
import tokenInterceptor from "../../apiEndPoint/interceptors";

const initialState = {
  subjectInfo: "",
  subjectLecturerInfo: "",
  allSubjectLecturers: [],
  allSubjects: [],
  createStatus: "",
  assignLecturerStatus: "",
  removeLecturerStatus: "",
  successMessage: "",
  error: "",
  fetchSuccessMessage: "",
  deleteStatus: "",
};
//Works ✅
export const createSubject = createAsyncThunk(
  "Subject/createSubject",
  async ({ data }, { rejectWithValue }) => {
    try {
      const res = await tokenInterceptor.post(
        `/academics/subjects/core/create`,
        {
          data,
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
export const createESubject = createAsyncThunk(
  "Subject/createESubject",
  async ({ data }, { rejectWithValue }) => {
    try {
      const res = await tokenInterceptor.post(
        `/academics/subjects/elective/create`,
        {
          data,
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
export const assignSubjectLecturer = createAsyncThunk(
  "Subject/assignSubjectLecturer",
  async (data, { rejectWithValue }) => {
    try {
      const res = await tokenInterceptor.put(
        `/academics/subjects/${data?.subjectId}/assign_lecturer`,
        {
          data,
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
export const removeSubjectLecturer = createAsyncThunk(
  "Subject/removeSubjectLecturer",
  async (data, { rejectWithValue }) => {
    try {
      const res = await tokenInterceptor.post(
        `/academics/subjects/${data?.subjectId}/remove_lecturer`,
        {
          data,
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
//✅
export const fetchAllSubjects = createAsyncThunk(
  "Subject/fetchAllSubjects",
  async () => {
    const response = await axios.get(
      `${SENSEC_API_ENDPOINT}/academics/subjects/fetch_all`
    );
    // const students = response.data;
    console.log(response.data);
    return response.data;
  }
);
export const fetchAllSubjectLecturers = createAsyncThunk(
  "Subject/fetchAllSubjectLecturers",
  async (data, { rejectWithValue }) => {
    try {
      const response = await tokenInterceptor.get(
        `/academics/subjects/${data?.subjectId}/lecturers/fetch_all`
      );
      // const students = response.data;
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
//❓
export const fetchSingleSubject = createAsyncThunk(
  "Subject/fetchSingleSubject",
  async (subjectName) => {
    const response = await axios.get(
      `${SENSEC_API_ENDPOINT}/admins/subjects/single_core_subject/${subjectName}`
    );
    // const students = response.data;
    console.log(response.data);
    return response.data;
  }
);
//❓
export const deleteSubject = createAsyncThunk(
  "Subject/deleteSubject",
  async ({ id, adminId }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${SENSEC_API_ENDPOINT}/admin/${adminId}/academics/subject/${id}/delete`
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

const subjectSlice = createSlice({
  name: "Subject",
  initialState,
  reducers: {
    resetCreateSubjectState(state) {
      return {
        ...state,
        createStatus: "",
        successMessage: "",
        error: "",
      };
    },
    resetAssignSubjectLecturerState(state) {
      return {
        ...state,
        assignLecturerStatus: "",
        successMessage: "",
        error: "",
      };
    },
    resetRemoveSubjectLecturerState(state) {
      return {
        ...state,
        removeLecturerStatus: "",
        successMessage: "",
        error: "",
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createSubject.pending, (state) => {
      return { ...state, createStatus: "pending" };
    });
    builder.addCase(createSubject.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          subjectInfo: action.payload.subject,
          successMessage: action.payload.successMessage,
          createStatus: "success",
        };
      } else return state;
    });
    builder.addCase(createSubject.rejected, (state, action) => {
      return {
        ...state,
        createStatus: "rejected",
        error: action.payload,
      };
    });
    builder.addCase(createESubject.pending, (state) => {
      return { ...state, createStatus: "pending" };
    });
    builder.addCase(createESubject.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          subjectInfo: action.payload.subject,
          successMessage: action.payload.successMessage,
          createStatus: "success",
        };
      } else return state;
    });
    builder.addCase(createESubject.rejected, (state, action) => {
      return {
        ...state,
        createStatus: "rejected",
        error: action.payload,
      };
    });
    // Assign Subject Lecturer
    builder.addCase(assignSubjectLecturer.pending, (state) => {
      return { ...state, assignLecturerStatus: "pending" };
    });
    builder.addCase(assignSubjectLecturer.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          subjectLecturerInfo: action.payload.updatedSubject,
          successMessage: action.payload.successMessage,
          assignLecturerStatus: "success",
        };
      } else return state;
    });
    builder.addCase(assignSubjectLecturer.rejected, (state, action) => {
      return {
        ...state,
        assignLecturerStatus: "rejected",
        error: action.payload,
      };
    });
    builder.addCase(fetchAllSubjects.pending, (state) => {
      return { ...state, fetchStatus: "pending" };
    });
    builder.addCase(fetchAllSubjects.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          allSubjects: action.payload.subjects,
          fetchSuccessMessage: action.payload.successMessage,
          fetchStatus: "success",
        };
      } else return state;
    });
    builder.addCase(fetchAllSubjects.rejected, (state, action) => {
      return {
        ...state,
        fetchStatus: "rejected",
        error: action.payload,
      };
    });
    // fetchAllSubjectLecturers
    builder.addCase(fetchAllSubjectLecturers.pending, (state) => {
      return { ...state, fetchingStatus: "pending" };
    });
    builder.addCase(fetchAllSubjectLecturers.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          allSubjectLecturers: action.payload.lecturersFound,
          fetchSuccessMessage: action.payload.successMessage,
          fetchingStatus: "success",
        };
      } else return state;
    });
    builder.addCase(fetchAllSubjectLecturers.rejected, (state, action) => {
      return {
        ...state,
        fetchingStatus: "rejected",
        error: action.payload,
      };
    });
  },
});
export const { resetCreateSubjectState, resetAssignSubjectLecturerState } =
  subjectSlice.actions;
export const getAllSubjects = (state) => state.subject.allSubjects;
export const getAllSubjectLecturers = (state) =>
  state.subject.allSubjectLecturers;
// export const getSingleSubject = (state) => state.subject.subjectInfo;

export default subjectSlice.reducer;
