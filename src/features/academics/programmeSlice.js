import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SENSEC_API_ENDPOINT } from "../../apiEndPoint/api";
import tokenInterceptor from "../../apiEndPoint/interceptors";

const initialState = {
  selectedProgramme: null,
  programInfo: "",
  divisionProgramInfo: "",
  allProgrammes: [],
  allProgrammeStudents: [],
  allFlattenedProgrammes: [],
  allDivisionProgrammesById: [],
  createdDivisionProgrammes: [],
  error: "",
  successMessage: "",
  fetchSuccessMessage: "",
  updateProgramSuccessMessage: "",
  deleteProgramSuccessMessage: "",
  createStatus: "",
  deleteProgramStatus: "",
  deleteProgramError: "",
  updateProgramError: "",
  updateStatus: "",
  updateProgramStatus: "",
  fetchingStatus: "",
};

export const createProgramme = createAsyncThunk(
  "Programme/createProgramme",
  async (program, { rejectWithValue }) => {
    try {
      const res = await tokenInterceptor.post(
        `/academics/programme/create`,
        program
      );
      return res.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
export const createDivisionProgramme = createAsyncThunk(
  "Programme/createDivisionProgramme",
  async ({ data }, { rejectWithValue }) => {
    try {
      const res = await tokenInterceptor.post(
        `/academics/program/division/create`,
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
export const fetchAllProgrammes = createAsyncThunk(
  "Programme/fetchAllProgrammes",
  async () => {
    const response = await axios.get(
      `${SENSEC_API_ENDPOINT}/academics/programmes/fetch_all`
    );
    return response.data;
  }
);

export const fetchAllFlattenedProgrammes = createAsyncThunk(
  "Programme/fetchAllFlattenedProgrammes",
  async (rejectWithValue) => {
    try {
      const response = await axios.get(
        `${SENSEC_API_ENDPOINT}/academics/programmes_and_divisions/fetch_all`
      );
      // const students = response.data;
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const fetchAllDivisionProgrammes = createAsyncThunk(
  "Programme/fetchAllDivisionProgrammes",
  async ({ programId }, { rejectWithValue }) => {
    console.log(programId);

    try {
      const response = await axios.get(
        `${SENSEC_API_ENDPOINT}/academics/programs/${programId}/divisions/fetch_all`
      );
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
export const fetchAllProgrammeStudents = createAsyncThunk(
  "Programme/fetchAllProgrammeStudents",
  async ({ programId }, { rejectWithValue }) => {
    try {
      const response = await tokenInterceptor.get(
        `/academics/programs/${programId}/students/fetch_all`
      );
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
export const fetchCreatedDivisionProgrammes = createAsyncThunk(
  "Programme/fetchCreatedDivisionProgrammes",
  async (rejectWithValue) => {
    try {
      const response = await axios.get(
        `${SENSEC_API_ENDPOINT}/academics/programs/divisions/fetch_all`
      );
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
export const fetchSingleProgram = createAsyncThunk(
  "Program/fetchSingleProgram",
  async (programName, { rejectWithValue }) => {
    try {
      const response = await tokenInterceptor.get(
        `/admin/academics/single_program/${programName}`
      );
      // const students = response.data;
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateProgram = createAsyncThunk(
  "Program/updateProgram",
  async (data, { rejectWithValue }) => {
    try {
      const response = await tokenInterceptor.put(
        `/academics/programs/${data?.programId}/update`,
        data
      );
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteProgram = createAsyncThunk(
  "Program/deleteProgram",
  async (data, { rejectWithValue }) => {
    try {
      const response = await tokenInterceptor.delete(
        `/academics/programs/${data?.programId}/delete`,
        data
      );
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

const programmeSlice = createSlice({
  name: "Programme",
  initialState,
  reducers: {
    selectProgramme: (state, action) => {
      state.selectProgramme = state.data.find(
        (programme) => programme._id === action.payload
      );
    },
    resetCreateProgrammeState(state) {
      return {
        ...state,
        createStatus: "",
        successMessage: "",
        error: "",
      };
    },
    resetUpdateProgramState(state) {
      return {
        ...state,
        updateProgramStatus: "",
        updateProgramSuccessMessage: "",
        updateProgramError: "",
      };
    },
    resetDeleteProgrammeState(state) {
      return {
        ...state,
        deleteProgramStatus: "",
        deleteProgramSuccessMessage: "",
        deleteProgramError: "",
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createProgramme.pending, (state, action) => {
      return { ...state, createStatus: "pending" };
    });
    builder.addCase(createProgramme.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          programInfo: action.payload.programme,
          allProgrammes: [...state.allProgrammes, action.payload.programme],
          successMessage: action.payload.successMessage,
          createStatus: "success",
          error: "",
        };
      } else return state;
    });
    builder.addCase(createProgramme.rejected, (state, action) => {
      return {
        ...state,
        createStatus: "rejected",
        error: action.payload,
      };
    });
    builder.addCase(createDivisionProgramme.pending, (state) => {
      return { ...state, createStatus: "pending" };
    });
    builder.addCase(createDivisionProgramme.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          divisionProgramInfo: action.payload.newDivisionProgram,
          successMessage: action.payload.successMessage,
          createStatus: "success",
          error: "",
        };
      } else return state;
    });
    builder.addCase(createDivisionProgramme.rejected, (state, action) => {
      return {
        ...state,
        createStatus: "rejected",
        error: action.payload,
      };
    });
    // Fetch all programmes
    builder.addCase(fetchAllProgrammes.pending, (state, action) => {
      return { ...state, fetchingStatus: "pending" };
    });
    builder.addCase(fetchAllProgrammes.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          allProgrammes: action.payload.programs,
          fetchSuccessMessage: action.payload.successMessage,
          fetchingStatus: "success",
        };
      } else return state;
    });
    builder.addCase(fetchAllProgrammes.rejected, (state, action) => {
      return {
        ...state,
        fetchingStatus: "rejected",
        error: action.payload,
      };
    });
    // Fetch all programmes
    builder.addCase(fetchAllProgrammeStudents.pending, (state, action) => {
      return { ...state, fetchingStatus: "pending" };
    });
    builder.addCase(fetchAllProgrammeStudents.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          allProgrammeStudents: action.payload.programStudentFound,
          fetchSuccessMessage: action.payload.successMessage,
          fetchingStatus: "success",
        };
      } else return state;
    });
    builder.addCase(fetchAllProgrammeStudents.rejected, (state, action) => {
      return {
        ...state,
        fetchingStatus: "rejected",
        error: action.payload,
      };
    });
    // fetchAllFlattenedProgrammes
    builder.addCase(fetchAllFlattenedProgrammes.pending, (state, action) => {
      return { ...state, fetchingStatus: "pending" };
    });
    builder.addCase(fetchAllFlattenedProgrammes.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          allFlattenedProgrammes: action.payload.flattenedProgrammes,
          fetchSuccessMessage: action.payload.successMessage,
          fetchingStatus: "success",
        };
      } else return state;
    });
    builder.addCase(fetchAllFlattenedProgrammes.rejected, (state, action) => {
      return {
        ...state,
        fetchingStatus: "rejected",
        error: action.payload,
      };
    });

    builder.addCase(fetchAllDivisionProgrammes.pending, (state, action) => {
      return { ...state, fetchStatus: "pending" };
    });
    builder.addCase(fetchAllDivisionProgrammes.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          allDivisionProgrammesById: action.payload.programs,
          fetchSuccessMessage: action.payload.successMessage,
          fetchStatus: "success",
        };
      } else return state;
    });
    builder.addCase(fetchAllDivisionProgrammes.rejected, (state, action) => {
      return {
        ...state,
        fetchStatus: "rejected",
        error: action.payload,
      };
    });

    builder.addCase(fetchCreatedDivisionProgrammes.pending, (state) => {
      return { ...state, fetchStatus: "pending" };
    });
    builder.addCase(
      fetchCreatedDivisionProgrammes.fulfilled,
      (state, action) => {
        if (action.payload) {
          return {
            ...state,
            createdDivisionProgrammes: action.payload.divisionProgramsFound,
            fetchSuccessMessage: action.payload.successMessage,
            fetchStatus: "success",
          };
        } else return state;
      }
    );
    builder.addCase(
      fetchCreatedDivisionProgrammes.rejected,
      (state, action) => {
        return {
          ...state,
          fetchStatus: "rejected",
          error: action.payload,
        };
      }
    );

    builder.addCase(fetchSingleProgram.pending, (state, action) => {
      return { ...state, fetchingStatus: "pending" };
    });
    builder.addCase(fetchSingleProgram.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          programInfo: action.payload.program,
          successMessage: action.payload.successMessage,
          fetchingStatus: "success",
        };
      } else return state;
    });
    builder.addCase(fetchSingleProgram.rejected, (state, action) => {
      return {
        ...state,
        fetchingStatus: "rejected",
        error: action.payload,
      };
    });

    builder.addCase(deleteProgram.pending, (state, action) => {
      return { ...state, deleteProgramStatus: "pending" };
    });
    builder.addCase(deleteProgram.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          deleteProgramSuccessMessage: action.payload.successMessage,
          deleteProgramStatus: "success",
        };
      } else return state;
    });
    builder.addCase(deleteProgram.rejected, (state, action) => {
      return {
        ...state,
        deleteProgramStatus: "rejected",
        deleteProgramError: action.payload,
      };
    });

    builder.addCase(updateProgram.pending, (state, action) => {
      return { ...state, updateProgramStatus: "pending" };
    });
    builder.addCase(updateProgram.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          updatedProgram: action.payload.updatedProgram,
          updateProgramSuccessMessage: action.payload.successMessage,
          updateProgramStatus: "success",
        };
      } else return state;
    });
    builder.addCase(updateProgram.rejected, (state, action) => {
      return {
        ...state,
        updateProgramStatus: "rejected",
        updateProgramError: action.payload,
      };
    });
  },
});

export const {
  resetCreateProgrammeState,
  selectProgramme,
  resetDeleteProgrammeState,
  resetUpdateProgramState,
} = programmeSlice.actions;
export const getAllProgrammes = (state) => state.programme.allProgrammes;
export const getAllProgrammeStudents = (state) =>
  state.programme.allProgrammeStudents;
export const getAllFlattenedProgrammes = (state) =>
  state.programme.allFlattenedProgrammes;
export const getAllDivisionProgrammes = (state) =>
  state.programme.allDivisionProgrammesById;
export const getCreatedDivisionProgrammes = (state) =>
  state.programme.createdDivisionProgrammes;
export const getSingleProgram = (state) => state.programme.programInfo;
export const getUpdatedProgram = (state) => state.programme.updatedProgram;

export default programmeSlice.reducer;
