import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { SENSEC_API_ENDPOINT } from "../../apiEndPoint/api";
import tokenInterceptor from "../../apiEndPoint/interceptors";

// Initialize an Axios instance
const api = axios.create({
  baseURL: SENSEC_API_ENDPOINT,
});

// Interceptor to attach token to each request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("userToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const initialState = {
  allUsers: [],
  authUser: "",
  userInfo: "",
  passwordReset: "",
  userVerificationData: "",
  refreshTokenInfo: "",
  signUpStatus: "",
  verifyEmailStatus: "",
  loginStatus: "",
  refreshTokenStatus: "",
  fetchStatus: "",
  error: "",
  fetchError: "",
  successMessage: "",
  fetchSuccessMessage: "",
  authenticated: false,
  token: localStorage.getItem("userToken") || null,
  isRefreshing: false,
  sessionExpired: false,
  forgotPasswordStatus: "",
  forgotPasswordSuccessMessage: "",
  forgotPasswordError: "",
  resetPasswordStatus: "",
  resetPasswordSuccessMessage: "",
  resetPasswordError: "",
};

// Decode user token
const tokenDecoded = (token) => {
  if (!token) return;
  const decodeTokenString = jwtDecode(token);
  const expTime = new Date(decodeTokenString.exp * 1000);
  if (new Date() > expTime) {
    return null;
  }
  return decodeTokenString;
};
// Get token from local storage
const getUserToken = localStorage.getItem("userToken");
if (getUserToken) {
  const getUserInfo = tokenDecoded(getUserToken);
  if (getUserInfo) {
    initialState.authUser = getUserInfo;
    initialState.authenticated = true;
  }
}

export const userSignUp = createAsyncThunk(
  "Auth/userSignUp",
  async (signUpData, { rejectWithValue }) => {
    console.log(signUpData);
    try {
      const res = await axios.post(`${SENSEC_API_ENDPOINT}/users/sign_up`, {
        signUpData,
      });
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
export const fetchVerificationData = createAsyncThunk(
  "Auth/fetchVerificationData",
  async (emailToken, { rejectWithValue }) => {
    console.log(emailToken);

    try {
      const res = await axios.get(
        `${SENSEC_API_ENDPOINT}/users/verification_data/${emailToken}/fetch`
      );
      console.log(res.data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const verifyUser = createAsyncThunk(
  "Auth/verifyUser",
  async ({ userId, emailToken }, { rejectWithValue }) => {
    localStorage.setItem("signUpId", userId);
    try {
      const res = await axios.post(
        `${SENSEC_API_ENDPOINT}/users/${userId}/${emailToken}/verify`
      );
      console.log(res.data);
      localStorage.setItem("userToken", res?.data?.token);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const userLogin = createAsyncThunk(
  "Auth/userLogin",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${SENSEC_API_ENDPOINT}/users/login`, data);
      //   localStorage.setItem("userId", res?.data?.user?.uniqueId);
      localStorage.setItem("userToken", res?.data?.token);
      // localStorage.removeItem("emailVerificationToken");
      return res.data;
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error.response.data);
    }
  }
);
export const refreshSessionToken = createAsyncThunk(
  "Auth/refreshSessionToken",
  async (token, { rejectWithValue }) => {
    try {
      const res = await tokenInterceptor.post(`/users/refresh-token`, {
        token,
      });
      //   localStorage.setItem("userId", res?.data?.user?.uniqueId);
      localStorage.setItem("userToken", res?.data?.token);
      // localStorage.removeItem("emailVerificationToken");
      return res.data;
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error.response.data);
    }
  }
);
export const fetchAllUsers = createAsyncThunk(
  "Auth/fetchAllUsers",
  async (rejectWithValue) => {
    try {
      const res = await axios.get(`${SENSEC_API_ENDPOINT}/users/fetch_all`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const forgotPassword = createAsyncThunk(
  "User/forgotPassword",
  async (email, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${SENSEC_API_ENDPOINT}/users/request_password_reset`,
        email
      );
      console.log("User", res.data);
      if (res.data.token !== "" && res.data.secret !== "") {
        localStorage.setItem("verifiedUser", "change_your_password");
        return res.data;
      }
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error.response.data);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "User/resetPassword",
  async (
    { token, uniqueId, password, confirmPassword },
    { rejectWithValue }
  ) => {
    console.log(password);
    try {
      const res = await axios.post(
        `${SENSEC_API_ENDPOINT}/users/${uniqueId}/password/${token}/reset`,
        { password, confirmPassword }
      );
      localStorage.setItem("userToken", res?.data?.token);
      return res.data;
    } catch (error) {
      console.log(error);
      console.log(error.response);
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "Auth",
  initialState: initialState,
  reducers: {
    resetSignUpState(state) {
      return {
        ...state,
        signUpStatus: "",
        userInfo: "",
        error: "",
        successMessage: "",
      };
    },
    resetEmailVerificationState(state) {
      return {
        ...state,
        verifyEmailStatus: "",
        userInfo: "",
        error: "",
        successMessage: "",
      };
    },
    resetLoginState(state) {
      return {
        ...state,
        loginStatus: "",
        error: "",
        successMessage: "",
      };
    },
    resetSessionUpdateState(state) {
      return {
        ...state,
        refreshTokenStatus: "",
        error: "",
        successMessage: "",
      };
    },
    userLogout(state) {
      localStorage.removeItem("userToken");
      localStorage.removeItem("emailVerificationToken");
      return {
        ...state,
        authUser: "",
        error: "",
        successMessage: "",
        authenticated: false,
      };
    },
  },
  extraReducers: (builder) => {
    //   Sign Up
    builder.addCase(userSignUp.pending, (state) => {
      return { ...state, signUpStatus: "pending" };
    });
    builder.addCase(userSignUp.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          userInfo: action.payload.user,
          successMessage: action.payload.successMessage,
          signUpStatus: "success",
        };
      } else return state;
    });
    builder.addCase(userSignUp.rejected, (state, action) => {
      return {
        ...state,
        signUpStatus: "rejected",
        error: action.payload,
      };
    });
    //   User Email Verification
    builder.addCase(verifyUser.pending, (state) => {
      return { ...state, verifyEmailStatus: "pending" };
    });
    builder.addCase(verifyUser.fulfilled, (state, action) => {
      if (action.payload) {
        const user = tokenDecoded(action.payload.token);
        return {
          ...state,
          authUser: user,
          successMessage: action.payload.successMessage,
          verifyEmailStatus: "success",
        };
      } else return state;
    });
    builder.addCase(verifyUser.rejected, (state, action) => {
      return {
        ...state,
        verifyEmailStatus: "rejected",
        error: action.payload,
      };
    });
    //   User Email Verification
    builder.addCase(fetchVerificationData.pending, (state) => {
      return { ...state, fetchStatus: "pending" };
    });
    builder.addCase(fetchVerificationData.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          userVerificationData: action.payload.verificationDataFound,
          fetchSuccessMessage: action.payload.successMessage,
          fetchStatus: "success",
        };
      } else return state;
    });
    builder.addCase(fetchVerificationData.rejected, (state, action) => {
      return {
        ...state,
        fetchStatus: "rejected",
        error: action.payload,
      };
    });
    //   User Login
    builder.addCase(userLogin.pending, (state) => {
      return { ...state, loginStatus: "pending" };
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      if (action.payload) {
        const user = tokenDecoded(action.payload.token);
        return {
          ...state,
          authUser: user,
          successMessage: action.payload.successMessage,
          loginStatus: "success",
        };
      } else return state;
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      return {
        ...state,
        loginStatus: "rejected",
        error: action.payload,
      };
    });
    //   User Session Update
    builder.addCase(refreshSessionToken.pending, (state) => {
      return { ...state, refreshTokenStatus: "pending" };
    });
    builder.addCase(refreshSessionToken.fulfilled, (state, action) => {
      if (action.payload) {
        const user = tokenDecoded(action.payload.token);
        return {
          ...state,
          authUser: user,
          successMessage: action.payload.successMessage,
          refreshTokenStatus: "success",
        };
      } else return state;
    });
    builder.addCase(refreshSessionToken.rejected, (state, action) => {
      return {
        ...state,
        refreshTokenStatus: "rejected",
        error: action.payload,
      };
    });
    //   Fetch All Users
    builder.addCase(fetchAllUsers.pending, (state) => {
      return { ...state, fetchStatus: "pending" };
    });
    builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          allUsers: action.payload.allUsers,
          fetchSuccessMessage: action.payload.successMessage,
          fetchStatus: "success",
        };
      } else return state;
    });
    builder.addCase(fetchAllUsers.rejected, (state, action) => {
      return {
        ...state,
        fetchStatus: "rejected",
        fetchError: action.payload,
      };
    });
    // forgotPassword
    builder.addCase(forgotPassword.pending, (state) => {
      return { ...state, forgotPasswordStatus: "pending" };
    });
    builder.addCase(forgotPassword.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          // userInfo: action.payload.token,
          forgotPasswordSuccessMessage: action.payload.successMessage,
          forgotPasswordStatus: "success",
        };
      } else return state;
    });
    builder.addCase(forgotPassword.rejected, (state, action) => {
      return {
        ...state,
        forgotPasswordStatus: "rejected",
        forgotPasswordError: action.payload,
      };
    });
    // resetPassword
    builder.addCase(resetPassword.pending, (state) => {
      return { ...state, resetPasswordStatus: "pending" };
    });
    builder.addCase(resetPassword.fulfilled, (state, action) => {
      if (action.payload) {
        const user = tokenDecoded(action.payload.token);
        return {
          ...state,
          authUser: user,
          // passwordReset: action.payload.user,
          resetPasswordSuccessMessage: action.payload.successMessage,
          resetPasswordStatus: "success",
        };
      } else return state;
    });
    builder.addCase(resetPassword.rejected, (state, action) => {
      return {
        ...state,
        resetPasswordStatus: "rejected",
        resetPasswordError: action.payload,
      };
    });
  },
});

export const {
  resetSignUpState,
  resetEmailVerificationState,
  resetLoginState,
  resetSessionUpdateState,
  userLogout,
} = authSlice.actions;
export const getAuthUser = (state) => state.authUser.authUser;
export const getUserVerificationData = (state) =>
  state.authUser.userVerificationData;
export const getAllUsers = (state) => state.authUser.allUsers;
export const getRefreshToken = (state) => state.authUser.refreshTokenInfo;
export default authSlice.reducer;
