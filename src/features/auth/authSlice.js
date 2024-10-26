import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { SENSEC_API_ENDPOINT } from "../../apiEndPoint/api";

const initialState = {
  allUsers: [],
  authUser: "",
  userInfo: "",
  signUpStatus: "",
  loginStatus: "",
  fetchStatus: "",
  error: "",
  successMessage: "",
  authenticated: false,
};

// Decode user token
const tokenDecoded = (token) => {
  if (!token) return true;
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
export const fetchAllUsers = createAsyncThunk(
  "Auth/fetchAllUsers",
  async (rejectWithValue) => {
    try {
      const res = await axios.get(`${SENSEC_API_ENDPOINT}/users/fetch_all`);
      //   console.log(res.data);
      return res.data;
    } catch (error) {
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
  },
  extraReducers: (builder) => {
    //   Sign Up
    builder.addCase(userSignUp.pending, (state, action) => {
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
    //   User Login
    builder.addCase(userLogin.pending, (state, action) => {
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
    //   Fetch All Users
    builder.addCase(fetchAllUsers.pending, (state, action) => {
      return { ...state, fetchStatus: "pending" };
    });
    builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          allUsers: action.payload.allUsers,
          successMessage: action.payload.successMessage,
          fetchStatus: "success",
        };
      } else return state;
    });
    builder.addCase(fetchAllUsers.rejected, (state, action) => {
      return {
        ...state,
        fetchStatus: "rejected",
        error: action.payload,
      };
    });
  },
});

export const { resetSignUpState } = authSlice.actions;
export const getAuthUser = (state) => state.authUser.authUser;
export const getAllUsers = (state) => state.authUser.allUsers;
export default authSlice.reducer;
