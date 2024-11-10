import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ENDPOINT, SENSEC_API_ENDPOINT } from "../../apiEndPoint/api";

const initialState = {
  adminInfo: "",
  allAdmins: [],
  approvedAdmin: "",
  updatedAdmin: "",
  updateStatus: "",
  successMessage: "",
  fetchSuccessMessage: "",
  fetchError: "",
  fetchStatus: "",
};

//In Use ❓
export const adminUpdate = createAsyncThunk(
  "Admin/adminUpdate",
  async (
    {
      adminUniqueId,
      firstName,
      lastName,
      otherName,
      dateOfBirth,
      placeOfBirth,
      gender,
      nationality,
      profilePicture,
      homeTown,
      district,
      region,
      currentCity,
      residentialAddress,
      gpsAddress,
      mobile,
      email,
      height,
      weight,
      complexion,
      motherTongue,
      otherTongue,
      residentialStatus,
      lastUpdatedBy,
    },
    { rejectWithValue }
  ) => {
    const accessToken = localStorage.getItem("userToken");
    try {
      const res = await axios.put(
        `${API_ENDPOINT}/admin/${adminUniqueId}/update`,
        {
          firstName,
          lastName,
          otherName,
          dateOfBirth,
          placeOfBirth,
          gender,
          nationality,
          profilePicture,
          homeTown,
          district,
          region,
          currentCity,
          residentialAddress,
          gpsAddress,
          mobile,
          email,
          height,
          weight,
          complexion,
          motherTongue,
          otherTongue,
          residentialStatus,
          lastUpdatedBy,
        },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response?.data);
    }
  }
);

//In Use ❓
export const approveAdminEmployment = createAsyncThunk(
  "Admin/approveAdminEmployment",
  async ({ adminUniqueId, employmentApprovedBy }, { rejectWithValue }) => {
    try {
      const accessToken = localStorage.getItem("userToken");
      const res = await axios.put(
        `${API_ENDPOINT}/admin/${adminUniqueId}/employment/approve`,
        {
          employmentApprovedBy,
        },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

//In Use ❓
export const fetchSingleAdmin = createAsyncThunk(
  "Admin/fetchSingleAdmin",
  async (
    { adminTakingActionUniqueId, adminUserUniqueId },
    { rejectWithValue }
  ) => {
    const accessToken = localStorage.getItem("userToken");
    console.log(accessToken);
    try {
      const response = await axios.get(
        `${API_ENDPOINT}/admin/${adminTakingActionUniqueId}/single/${adminUserUniqueId}/fetch`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
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

export const fetchAllAdmins = createAsyncThunk(
  "Admin/fetchAllAdmins",
  async (rejectWithValue) => {
    const accessToken = localStorage.getItem("userToken");
    console.log(accessToken);
    try {
      const response = await axios.get(
        `${SENSEC_API_ENDPOINT}/admins/fetch_all`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
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

export const searchForAdmin = createAsyncThunk(
  "Student/searchForAdmin",
  async ({ admin_username }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_ENDPOINT}/admin/search?admin_username=${admin_username}`
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

const adminsSlice = createSlice({
  name: "Admin",
  initialState,
  reducers: {
    refreshPage(state) {
      return {
        ...state,
        authAdminInfo: state.authAdminInfo,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(approveAdminEmployment.pending, (state, action) => {
      return { ...state, approveAdminStatus: "pending" };
    });
    builder.addCase(approveAdminEmployment.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          approvedAdmin: action.payload.userEmploymentApproved,
          approveAdminSuccessMessage: action.payload.successMessage,
          approveAdminStatus: "success",
        };
      } else return state;
    });
    builder.addCase(approveAdminEmployment.rejected, (state, action) => {
      return {
        ...state,
        approveAdminStatus: "rejected",
        approveAdminError: action.payload,
      };
    });

    builder.addCase(adminUpdate.pending, (state) => {
      return { ...state, adminUpdateStatus: "pending" };
    });
    builder.addCase(adminUpdate.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          updatedAdmin: action.payload.adminUpdated,
          adminUpdateSuccessMessage: action.payload.successMessage,
          adminUpdateStatus: "success",
        };
      } else return state;
    });
    builder.addCase(adminUpdate.rejected, (state, action) => {
      return {
        ...state,
        adminUpdateStatus: "rejected",
        adminUpdateError: action.payload,
      };
    });

    builder.addCase(fetchSingleAdmin.pending, (state) => {
      return { ...state, fetchStatus: "pending" };
    });
    builder.addCase(fetchSingleAdmin.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          adminInfo: action.payload.adminFound,
          fetchSuccessMessage: action.payload.successMessage,
          fetchStatus: "success",
        };
      } else return state;
    });
    builder.addCase(fetchSingleAdmin.rejected, (state, action) => {
      return {
        ...state,
        fetchStatus: "rejected",
        fetchError: action.payload,
      };
    });
    // Fetch All Admins
    builder.addCase(fetchAllAdmins.pending, (state) => {
      return { ...state, fetchStatus: "pending" };
    });
    builder.addCase(fetchAllAdmins.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          allAdmins: action.payload.allAdmins,
          fetchSuccessMessage: action.payload.successMessage,
          fetchStatus: "success",
        };
      } else return state;
    });
    builder.addCase(fetchAllAdmins.rejected, (state, action) => {
      return {
        ...state,
        fetchStatus: "rejected",
        fetchError: action.payload,
      };
    });

    builder.addCase(searchForAdmin.pending, (state, action) => {
      return { ...state, searchAdminStatus: "pending" };
    });
    builder.addCase(searchForAdmin.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          searchedAdmin: action.payload.foundAdmin,
          searchAdminSuccessMessage: action.payload.successMessage,
          searchAdminStatus: "success",
          fetchingStudentStatus: "",
        };
      } else return state;
    });
    builder.addCase(searchForAdmin.rejected, (state, action) => {
      return {
        ...state,
        searchAdminStatus: "rejected",
        searchAdminError: action.payload,
      };
    });
  },
});

export const getApprovedAdmin = (state) => state.admin.approvedAdmin;
export const getAllAdmins = (state) => state.admin.allAdmins;
export const getSingleAdmin = (state) => state.admin.adminInfo;
export const getAllSearchedAdmins = (state) => state.admin.allSearchedAdmins;
export const { refreshPage } = adminsSlice.actions;

export default adminsSlice.reducer;
