import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SENSEC_API_ENDPOINT } from "../../apiEndPoint/api";

const initialState = {
  classSectionInfo: "",
  allClassSections: [],
  createStatus: "",
  updateStatus: "",
  fetchStatus: "",
  removeLecturerStatus: "",
  successMessage: "",
  error: "",
};

export const createClassLevelSection = createAsyncThunk(
  "ClassLevelSection/createClassLevelSection",
  async (
    {
      sectionName,
      classLevelId,
      classLevelName,
      program,
      currentTeacher,
      createdBy,
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.post(
        `${SENSEC_API_ENDPOINT}/admin/academics/class_section/create`,
        {
          sectionName,
          classLevelId,
          classLevelName,
          program,
          currentTeacher,
          createdBy,
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

export const removeClassSectionLecturer = createAsyncThunk(
  "ClassLevelSection/removeClassSectionLecturer",
  async ({ lecturerId, adminId }, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        `${SENSEC_API_ENDPOINT}/admin/${adminId}/academics/class_section/lecturer/${lecturerId}/remove`
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
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createClassLevelSection.pending, (state, action) => {
      return { ...state, createClassSectionStatus: "pending" };
    });
    builder.addCase(createClassLevelSection.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          classLevelSectionInfo: action.payload.classLevelSection,
          allClassLevelSections: [
            state.allClassLevelSections,
            action.payload.classLevelSection,
          ],
          createClassSectionSuccessMessage: action.payload.successMessage,
          createClassSectionStatus: "success",
          createClassSectionError: "",
        };
      } else return state;
    });
    builder.addCase(createClassLevelSection.rejected, (state, action) => {
      return {
        ...state,
        createClassSectionStatus: "rejected",
        createClassSectionError: action.payload,
      };
    });

    builder.addCase(updateClassLevelSection.pending, (state, action) => {
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

    builder.addCase(removeClassSectionLecturer.pending, (state, action) => {
      return { ...state, removeClassSectionLecturerStatus: "pending" };
    });
    builder.addCase(removeClassSectionLecturer.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          removedLecturer: action.payload.removedLecturer,
          removeClassSectionLecturerSuccessMessage:
            action.payload.successMessage,
          removeClassSectionLecturerStatus: "success",
        };
      } else return state;
    });
    builder.addCase(removeClassSectionLecturer.rejected, (state, action) => {
      return {
        ...state,
        removeClassSectionLecturerStatus: "rejected",
        removeClassSectionLecturerError: action.payload,
      };
    });

    builder.addCase(fetchAllClassSections.pending, (state, action) => {
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

    builder.addCase(fetchSingleClassLevelSection.pending, (state, action) => {
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

export const getAllClassSections = (state) =>
  state.classSection.allClassSections;
export const getSingleClassSection = (state) =>
  state.classSection.classSectionInfo;

export default classSectionsSlice.reducer;
