import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ENDPOINT, SENSEC_API_ENDPOINT } from "../../apiEndPoint/api";
import tokenInterceptor from "../../apiEndPoint/interceptors";

const initialState = {
  blogDetails: "",
  deletedBlog: "",
  blogs: [],
  blogLikes: [],
  successMessage: "",
  error: "",
  blogStatus: "",
  likeBlogStatus: "",
  likeBlogSuccessMessage: "",
  likeBlogError: "",
  loveBlogStatus: "",
  loveBlogSuccessMessage: "",
  loveBlogError: "",
  updateBlogStatus: "",
  fetchStatus: "",
  singlefetchStatus: "",
  deleteStatus: "",
  deleteBlogSuccessMessage: "",
  deleteBlogError: "",
};

export const createNewBlog = createAsyncThunk(
  "Blog/createNewBlog",
  async (blogData, { rejectWithValue }) => {
    console.log(blogData);

    try {
      const res = await tokenInterceptor.post(`/blogs/create`, {
        blogData,
      });
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchBlogs = createAsyncThunk(
  "Blog/fetchBlogs",
  async (rejectWithValue) => {
    try {
      const res = await axios.get(`${SENSEC_API_ENDPOINT}/blogs/fetch_all`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchSingleBlog = createAsyncThunk(
  "Blog/fetchSingleBlog",
  async ({ title }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_ENDPOINT}/user/blogs/single/${title}/fetch`
      );
      // const students = response.data;
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const likeBlog = createAsyncThunk(
  "Blog/likeBlog",
  async ({ userId, blogId }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_ENDPOINT}/user/${userId}/blogs/${blogId}/like`,
        userId
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const loveBlog = createAsyncThunk(
  "Blog/loveBlog",
  async ({ userId, blogId }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_ENDPOINT}/user/${userId}/blogs/${blogId}/love`,
        userId
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const updateBlog = createAsyncThunk(
  "Blog/updateBlog",
  async (
    { blogTitle, newTitle, blogText, blogImage, lastUpdatedBy },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.put(
        `${API_ENDPOINT}/admin/blogs/${blogTitle}/update`,
        { newTitle, blogText, blogImage, lastUpdatedBy }
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const deleteBlog = createAsyncThunk(
  "Blog/deleteBlog",
  async (blogId, { rejectWithValue }) => {
    try {
      const response = await tokenInterceptor.delete(`/blogs/${blogId}/delete`);
      return response.data;
    } catch (error) {
      console.log(error.response?.data);
      return rejectWithValue(error.response?.data);
    }
  }
);

const blogSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    resetCreateBlogState(state) {
      return {
        ...state,
        createStatus: "",
        error: "",
        successMessage: "",
      };
    },
    resetDeleteBlogState(state) {
      return {
        ...state,
        deleteStatus: "",
        error: "",
        successMessage: "",
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createNewBlog.pending, (state) => {
      return { ...state, createStatus: "pending" };
    });
    builder.addCase(createNewBlog.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          blogDetails: action.payload.blog,
          successMessage: action.payload.successMessage,
          createStatus: "success",
          error: "",
        };
      } else return state;
    });
    builder.addCase(createNewBlog.rejected, (state, action) => {
      return {
        ...state,
        createStatus: "rejected",
        error: action.payload,
      };
    });

    builder.addCase(fetchBlogs.pending, (state) => {
      return { ...state, fetchStatus: "pending" };
    });
    builder.addCase(fetchBlogs.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          blogs: action.payload.blogs,
          successMessage: action.payload.successMessage,
          fetchStatus: "success",
        };
      }
    });
    builder.addCase(fetchBlogs.rejected, (state, action) => {
      return {
        ...state,
        fetchStatus: "rejected",
        error: action.payload,
      };
    });
    builder.addCase(fetchSingleBlog.pending, (state) => {
      return { ...state, singlefetchStatus: "pending" };
    });
    builder.addCase(fetchSingleBlog.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          blogDetails: action.payload.singleBlog,
          successMessage: action.payload.successMessage,
          singlefetchStatus: "success",
        };
      }
    });
    builder.addCase(fetchSingleBlog.rejected, (state, action) => {
      return {
        ...state,
        singlefetchStatus: "rejected",
        error: action.payload,
      };
    });

    builder.addCase(likeBlog.pending, (state) => {
      return { ...state, likeBlogStatus: "pending" };
    });
    builder.addCase(likeBlog.fulfilled, (state, action) => {
      if (action.payload) {
        const currentBlogs = state.blogs.findIndex(
          (blog) => blog._id === action.payload.likedBlog
        );
        return {
          ...state,
          blogs: [...state.blogs, currentBlogs],
          likeBlogSuccessMessage: action.payload.successMessage,
          likeBlogStatus: "success",
        };
      }
    });
    builder.addCase(likeBlog.rejected, (state, action) => {
      return {
        ...state,
        likeBlogStatus: "rejected",
        likeBlogError: action.payload,
      };
    });

    builder.addCase(loveBlog.pending, (state) => {
      return { ...state, loveBlogStatus: "pending" };
    });
    builder.addCase(loveBlog.fulfilled, (state, action) => {
      if (action.payload) {
        const currentBlogs = state.blogs.findIndex(
          (blog) => blog._id === action.payload.lovedBlog
        );
        return {
          ...state,
          blogs: [...state.blogs, currentBlogs],
          loveBlogSuccessMessage: action.payload.successMessage,
          loveBlogStatus: "success",
        };
      }
    });
    builder.addCase(loveBlog.rejected, (state, action) => {
      return {
        ...state,
        loveBlogStatus: "rejected",
        loveBlogError: action.payload,
      };
    });

    builder.addCase(deleteBlog.pending, (state) => {
      return { ...state, deleteStatus: "pending" };
    });
    builder.addCase(deleteBlog.fulfilled, (state, action) => {
      if (action.payload) {
        // const currentBlogs = state.blogs.filter(
        //   (blog) => blog._id !== action.payload.blogDeleted._id
        // );
        return {
          ...state,
          deletedBlog: action.payload.blogDeleted,
          successMessage: action.payload.successMessage,
          deleteStatus: "success",
        };
      }
    });
    builder.addCase(deleteBlog.rejected, (state, action) => {
      return {
        ...state,
        deleteStatus: "rejected",
        error: action.payload,
      };
    });

    builder.addCase(updateBlog.pending, (state) => {
      return { ...state, updateblogStatus: "pending" };
    });
    builder.addCase(updateBlog.fulfilled, (state, action) => {
      if (action.payload) {
        const currentBlogs = state?.blogs?.filter(
          (blog) => blog._id === action.payload.updatedBlog?._id
        );
        return {
          ...state,
          blogs: currentBlogs,
          updateSuccessMessage: action.payload.successMessage,
          updateblogStatus: "success",
        };
      }
    });
    builder.addCase(updateBlog.rejected, (state, action) => {
      return {
        ...state,
        updateBlogStatus: "rejected",
        updateError: action.payload,
      };
    });
  },
});

export const { resetCreateBlogState, resetDeleteBlogState } = blogSlice.actions;
export const getAllBlogs = (state) => state.blog.blogs;
export const getSingleBlog = (state) => state.blog.blogDetails;

export default blogSlice.reducer;
