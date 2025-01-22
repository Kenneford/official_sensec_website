import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SENSEC_API_ENDPOINT } from "../../apiEndPoint/api";
import tokenInterceptor from "../../apiEndPoint/interceptors";

const initialState = {
  classSectionInfo: "",
  assignedLecturer: "",
  allClassSections: [],
  createStatus: "",
  updateStatus: "",
  fetchStatus: "",
  assignLecturerStatus: "",
  removeLecturerStatus: "",
  successMessage: "",
  error: "",
};

export const createClassLevelSection = createAsyncThunk(
  "ClassLevelSection/createClassLevelSection",
  async ({ data }, { rejectWithValue }) => {
    try {
      const res = await tokenInterceptor.post(
        `/academics/class_section/create`,
        {
          data,
        }
      );
      return res.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
// Working✅
export const fetchAllClassSections = createAsyncThunk(
  "ClassSection/fetchAllClassSections",
  async (rejectWithValue) => {
    try {
      const res = await axios.get(
        `${SENSEC_API_ENDPOINT}/academics/class_sections/fetch_all`
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchSingleClassLevelSection = createAsyncThunk(
  "ClassLevelSection/fetchSingleClassLevelSection",
  async ({ classLevelName, sectionName }) => {
    const res = await axios.get(
      `${SENSEC_API_ENDPOINT}/admin/academics/single_class_section/${classLevelName}/${sectionName}`
    );
    return res.data;
  }
);

export const updateClassLevelSection = createAsyncThunk(
  "ClassLevelSection/updateClassLevelSection",
  async (
    {
      classLevelSectionId,
      // sectionName,
      // classLevelId,
      // classLevelName,
      // program,
      currentTeacher,
      lastUpdatedBy,
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.put(
        `${SENSEC_API_ENDPOINT}/admin/academics/class_section/${classLevelSectionId}/update`,
        {
          // sectionName,
          // classLevelId,
          // classLevelName,
          // program,
          currentTeacher,
          lastUpdatedBy,
        }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const assignClassSectionLecturer = createAsyncThunk(
  "ClassLevelSection/assignClassSectionLecturer",
  async ({ data }, { rejectWithValue }) => {
    try {
      const res = await tokenInterceptor.put(
        `/academics/class_section/lecturer/assign`,
        { data }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const removeClassSectionLecturer = createAsyncThunk(
  "ClassLevelSection/removeClassSectionLecturer",
  async (data, { rejectWithValue }) => {
    try {
      const res = await tokenInterceptor.put(
        `/academics/class_section/lecturer/remove`,
        data
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const classSectionsSlice = createSlice({
  name: "ClassSection",
  initialState,
  reducers: {
    resetAssignLecturer(state) {
      return {
        ...state,
        assignLecturerStatus: "",
        successMessage: "",
      };
    },
    resetRemoveLecturer(state) {
      return {
        ...state,
        removeLecturerStatus: "",
        successMessage: "",
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createClassLevelSection.pending, (state) => {
      return { ...state, createStatus: "pending" };
    });
    builder.addCase(createClassLevelSection.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          classSectionInfo: action?.payload?.classLevelSection,
          successMessage: action.payload.successMessage,
          createStatus: "success",
          error: "",
        };
      } else return state;
    });
    builder.addCase(createClassLevelSection.rejected, (state, action) => {
      return {
        ...state,
        createStatus: "rejected",
        error: action.payload,
      };
    });

    builder.addCase(updateClassLevelSection.pending, (state) => {
      return { ...state, updateClassSectionStatus: "pending" };
    });
    builder.addCase(updateClassLevelSection.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          updatedClassLevelSectionInfo: action.payload.classLevelSectionUpdated,
          updateClassSectionSuccessMessage: action.payload.successMessage,
          updateClassSectionStatus: "success",
        };
      } else return state;
    });
    builder.addCase(updateClassLevelSection.rejected, (state, action) => {
      return {
        ...state,
        updateClassSectionStatus: "rejected",
        updateClassSectionError: action.payload,
      };
    });
    // Assign Lecturer
    builder.addCase(assignClassSectionLecturer.pending, (state) => {
      return { ...state, assignLecturerStatus: "pending" };
    });
    builder.addCase(assignClassSectionLecturer.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          classSectionInfo: action.payload.updatedClassSection,
          successMessage: action.payload.successMessage,
          assignLecturerStatus: "success",
        };
      } else return state;
    });
    builder.addCase(assignClassSectionLecturer.rejected, (state, action) => {
      return {
        ...state,
        assignLecturerStatus: "rejected",
        error: action.payload,
      };
    });
    // Remove Lecturer
    builder.addCase(removeClassSectionLecturer.pending, (state) => {
      return { ...state, removeLecturerStatus: "pending" };
    });
    builder.addCase(removeClassSectionLecturer.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          classSectionInfo: action.payload.updatedClassSection,
          successMessage: action.payload.successMessage,
          removeLecturerStatus: "success",
        };
      } else return state;
    });
    builder.addCase(removeClassSectionLecturer.rejected, (state, action) => {
      return {
        ...state,
        removeLecturerStatus: "rejected",
        error: action.payload,
      };
    });

    builder.addCase(fetchAllClassSections.pending, (state) => {
      return { ...state, fetchStatus: "pending" };
    });
    builder.addCase(fetchAllClassSections.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          allClassSections: action.payload.classSections,
          successMessage: action.payload.successMessage,
          fetchStatus: "success",
        };
      } else return state;
    });
    builder.addCase(fetchAllClassSections.rejected, (state, action) => {
      return {
        ...state,
        fetchStatus: "rejected",
        error: action.payload,
      };
    });

    builder.addCase(fetchSingleClassLevelSection.pending, (state) => {
      return { ...state, fetchSingleClassSectionStatus: "pending" };
    });
    builder.addCase(fetchSingleClassLevelSection.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          classLevelSectionInfo: action.payload.classLevelSection,
          fetchSingleClassSectionSuccessMessage: action.payload.successMessage,
          fetchSingleClassSectionStatus: "success",
        };
      } else return state;
    });
    builder.addCase(fetchSingleClassLevelSection.rejected, (state, action) => {
      return {
        ...state,
        fetchSingleClassSectionStatus: "rejected",
        fetchSingleClassSectionError: action.payload,
      };
    });
  },
});
export const { resetAssignLecturer, resetRemoveLecturer } =
  classSectionsSlice.actions;
export const getAllClassSections = (state) =>
  state.classSection.allClassSections;
export const getSingleClassSection = (state) =>
  state.classSection.classSectionInfo;

export default classSectionsSlice.reducer;
