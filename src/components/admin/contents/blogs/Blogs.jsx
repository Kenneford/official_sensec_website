import React, { useEffect, useRef, useState } from "react";
import "./blogs.scss";
import {
  Container,
  Typography,
  Grid,
  Box,
  InputAdornment,
  Avatar,
  Stack,
  Button,
} from "@mui/material";
import BlogCard from "./BlogCard";
import {
  CustomSearchField,
  ExpandableTitleTextField,
} from "../../../../muiStyling/muiStyling";
import { AddAPhoto, Search } from "@mui/icons-material";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import SearchForm from "../../../searchForm/SearchForm";
import { NavigationBar } from "../../../navbar/NavigationBar";
import BlogSearchFilter from "../../../searchForm/BlogSearchFilter";
import { FetchAllBlogs } from "../../../../data/blogs/FetchBlogs";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  createNewBlog,
  resetDeleteBlogState,
} from "../../../../features/blogs/blogSlice";
import Footer from "../../../footer/Footer";
import SmallFooter from "../../../footer/SmallFooter";
import PageLoading from "../../../pageLoading/PageLoading";
import { Helmet } from "react-helmet-async";
import { Editor } from "@tinymce/tinymce-react";
import { getAuthUser } from "../../../../features/auth/authSlice";

export function Blogs() {
  const authAdmin = useSelector(getAuthUser);
  const {
    currentAction,
    setCurrentAction,
    currentLink,
    setCurrentLink,
    setOpenSubNavLinks,
    openSubNavLinks,
    setOpenUserActions,
    openUserActions,
    setOpenSignUpActions,
    openSignUpActions,
    setOpenMenuLinks,
    openMenuLinks,
    isSidebarOpen,
    openSearchModal,
    setOpenSearchModal,
  } = useOutletContext();
  const { deleteStatus, error, successMessage } = useSelector(
    (state) => state.blog
  );
  const { adminCurrentLink, adminCurrentAction } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allBlogs = FetchAllBlogs();
  console.log(allBlogs);

  const tinyMCEKey = import.meta.env.VITE_APP_TINYMCE_KEY;

  const [loadingComplete, setLoadingComplete] = useState(null);
  const [searchedBlog, setSearchedBlog] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [addNewBlog, setAddNewBlog] = useState(false);
  const [loadBlogImage, setLoadBlogImage] = useState("");
  const [imageInfo, setImageInfo] = useState(null); // To store the uploaded image

  const [title, setTitle] = useState("");
  const [blogText, setBlogText] = useState(localStorage.getItem("blogText"));
  const [blog, setBlog] = useState({
    image: "",
    postedBy: "",
    title: "",
    text: "",
  });

  const editorRef = useRef(null);
  const handleImageFileUpload = (e) => {
    if (e.target.files.length !== 0) {
      setBlog({ ...blog, [e.target.name]: e.target.files[0] });
      setImageInfo(e.target.files[0]);
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setLoadBlogImage(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const canSave =
    Boolean(loadBlogImage) &&
    Boolean(title) &&
    Boolean(blogText) &&
    Boolean(authAdmin?.id);
  const handleBlogPost = (e) => {
    e.preventDefault();
    const blogData = {
      image: loadBlogImage,
      title: title,
      text: blogText,
      postedBy: authAdmin?.id,
    };
    dispatch(createNewBlog(blogData));
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 140) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    console.log(window.scrollY > 10);

    // Cleanup the event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleOnChange = (onChangeValue) => {
    setSearchedBlog(onChangeValue);
  };

  // Create blog status check
  useEffect(() => {
    if (deleteStatus === "pending") {
      setLoadingComplete(false);
    }
    if (deleteStatus === "rejected") {
      setTimeout(() => {
        error?.errorMessage?.message?.map((err) =>
          toast.error(err, {
            position: "top-right",
            theme: "light",
            // toastId: successId,
          })
        );
      }, 1000);
      setTimeout(() => {
        setLoadingComplete(null);
        dispatch(resetDeleteBlogState());
      }, 3000);
      return;
    }
    if (deleteStatus === "success") {
      setTimeout(() => {
        toast.success(successMessage, {
          position: "top-right",
          theme: "dark",
          // toastId: successId,
        });
      }, 1000);
      setTimeout(() => {
        setLoadingComplete(true);
      }, 3000);
      setTimeout(() => {
        setLoadingComplete(null);
        dispatch(resetDeleteBlogState());
      }, 6000);
    }
  }, [error, successMessage, deleteStatus, dispatch]);
  // const allProgrammes = FetchAllProgrammes();
  // if (!allProgrammes) {
  //   return (
  //     <Box fontSize={"calc( 0.7rem + 1vmin)"}>
  //       <PageLoading />
  //     </Box>
  //   );
  // }

  return (
    <Box id="blogsPage">
      <Helmet>
        <title>Blogs - Senya SHS</title>
        <meta
          name="description"
          content="Explore Senya Senior High School's blogs which tells our stories from the beginning of our journey!"
        />
        <meta
          name="keywords"
          content="Senya SHS Blogs, Sensec Blogs, Sensec Official Website Blogs"
        />
        <meta property="og:title" content="Blogs | Senya SHS" />
        <meta
          property="og:description"
          content="Explore Senya Senior High School's blogs which tells our stories from the beginning of our journey!"
        />
        <link rel="canonical" href="https://www.senyashs.com/sensec/blogs" />
        <link
          rel="icon"
          type="image/png"
          href="https://www.senyashs.com/assets/sensec-logo1.png"
        />
      </Helmet>
      {/* Navbar */}
      {!adminCurrentAction && (
        <Stack
          direction="column"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#fff",
            padding: ".3rem 0",
            height: "4.5rem",
          }}
        >
          <Box
            onClick={() => {
              // Click handler
              localStorage.removeItem("currentNavLink");
              navigate("/sensec/homepage");
            }}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <Avatar
              src="https://www.senyashs.com/assets/sensec-logo1.png"
              alt="Sensec Logo"
              sx={{ alignItems: "center" }}
            />
            <Box sx={{ display: "flex", height: "1.5rem" }}>
              <Typography variant="h6" color="green">
                Sen
              </Typography>
              <Typography variant="h6" color="#aeae0d">
                sec
              </Typography>
            </Box>
          </Box>
        </Stack>
      )}
      {!adminCurrentAction && (
        <Box
          sx={{
            position: "sticky",
            top: 0,
            padding: 0,
            zIndex: 3,
            mb: 4,
          }}
        >
          <Box>
            <NavigationBar
              setOpenSubNavLinks={setOpenSubNavLinks}
              openSubNavLinks={openSubNavLinks}
              setOpenUserActions={setOpenUserActions}
              openUserActions={openUserActions}
              setOpenSignUpActions={setOpenSignUpActions}
              openSignUpActions={openSignUpActions}
              setOpenMenuLinks={setOpenMenuLinks}
              openMenuLinks={openMenuLinks}
              currentAction={currentAction}
              setCurrentAction={setCurrentAction}
              currentLink={currentLink}
              setCurrentLink={setCurrentLink}
              isSidebarOpen={isSidebarOpen}
              openSearchModal={openSearchModal}
              setOpenSearchModal={setOpenSearchModal}
            />
          </Box>
        </Box>
      )}
      {!adminCurrentAction && (
        <Box
          // sx={{ display: { xs: "none", sm: "block" } }}
          sx={{
            width: { xs: "100%", sm: "95%", md: "90%", lg: "90%", xl: "70%" },
            // padding: ".3rem",
            position: "sticky",
            top: "3.45rem",
            zIndex: 2,
            backgroundColor: "#fff",
          }}
          margin={"auto"}
        >
          <Grid container>
            <Grid item xs={12}>
              <BlogSearchFilter
                value={searchedBlog}
                onChange={handleOnChange}
                placeholder={"Search"}
              />
            </Grid>
          </Grid>
        </Box>
      )}
      {adminCurrentAction && (
        <Box
          component={"div"}
          id="adminDashboardHeaderWrap"
          sx={{
            position: "sticky",
            top: 0,
            backgroundColor: "#fff",
            padding: 0,
            // zIndex: 1,
          }}
        >
          <h1 className="dashAction">
            {adminCurrentAction?.replace(/_/g, "-")} /{" "}
            <span>{adminCurrentLink?.replace(/_/g, " ")}</span>
          </h1>
          {/* Main search bar */}
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <SearchForm
              value={searchedBlog}
              onChange={handleOnChange}
              placeholder={"Search"}
            />
          </Box>
        </Box>
      )}
      {!addNewBlog ? (
        <Box className="blogs">
          <Box m={".5rem"}>
            <Box
              sx={{
                width: {
                  xs: "100%",
                  sm: "95%",
                  md: "90%",
                  lg: "90%",
                  xl: "70%",
                },
              }}
              margin={"auto"}
            >
              {authAdmin && (
                <Box>
                  <Button
                    variant="text"
                    onClick={() => setAddNewBlog(true)}
                    sx={{
                      textTransform: "capitalize",
                      transition: ".5s ease",
                      "&:hover": {
                        backgroundColor: "transparent",
                        color: "#099117",
                      },
                      color: "green",
                      marginBottom: 1,
                    }}
                  >
                    Create New Blog
                  </Button>
                </Box>
              )}
              {allBlogs?.map((blog) => (
                <Box key={blog?.title} mb={4}>
                  <BlogCard
                    blogId={blog?._id}
                    title={blog?.title}
                    content={blog?.text}
                    image={blog?.image?.url}
                    postedBy={blog?.postedBy}
                  />
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      ) : (
        <Box
          className="noticeBox"
          sx={{
            width: { xs: "100%", sm: "95%", md: "90%", lg: "90%", xl: "60%" },
            padding: "1rem .5rem",
            margin: "auto",
          }}
        >
          <Box className="noticeCont">
            <Box className="h3Cont">
              <h3>Create New Blog</h3>
            </Box>
            <Container maxWidth="md" className="inputFields">
              <Box className="form">
                <Box className="postImageFileUpload">
                  <Box
                    sx={{
                      margin: "auto",
                    }}
                  >
                    <Box>
                      <label
                        htmlFor="postImage"
                        className="postImgIcon"
                        style={{
                          maxWidth: "22em",
                          height: "10em",
                          // margin: "auto",
                          borderRadius: ".4rem",
                          border: "1px solid #696969",
                          padding: ".2rem",
                          objectFit: "cover",
                          "&:hover": {
                            cursor: "pointer",
                          },
                        }}
                        title="Upload Image"
                      >
                        {loadBlogImage ? (
                          <Avatar
                            className="postImg"
                            src={loadBlogImage}
                            alt="Blog Image"
                            sx={{
                              width: "20rem",
                              height: "15rem",
                              borderRadius: ".4rem",
                              border: "1px solid #696969",
                              padding: ".2rem",
                              objectFit: "cover",
                              "&:hover": {
                                cursor: "pointer",
                              },
                            }}
                          />
                        ) : (
                          <Box
                            className="postImgIconWrap"
                            sx={{ width: "100%", height: "100%" }}
                          >
                            <AddAPhoto />
                            <p>Upload an image</p>
                          </Box>
                        )}
                      </label>
                      <input
                        style={{ display: "none" }}
                        type="file"
                        onChange={handleImageFileUpload}
                        id="postImage"
                        accept=".png,.jpeg,.jpg"
                      />
                    </Box>
                    {/* <Button
                      variant="contained"
                      component="label"
                      // fullWidth
                      size="small"
                      sx={{
                        textTransform: "capitalize",
                        backgroundColor: "#292929",
                        padding: ".5rem",
                      }}
                    >
                      Upload Image
                      <input
                        style={{ display: "none" }}
                        type="file"
                        onChange={handleImageFileUpload}
                        id="postImage"
                        accept=".png,.jpeg,.jpg"
                      />
                    </Button> */}
                  </Box>
                </Box>
                <Box className="content">
                  <Box className="title">
                    <ExpandableTitleTextField
                      fullWidth
                      size="small"
                      label="Title"
                      name="title"
                      onChange={(e) => setTitle(e.target.value)}
                      value={title}
                      required
                      className="textField"
                    />
                  </Box>
                  <Box className="editor">
                    <h5 className="editorTitle">Blog Text</h5>
                    <Box className="editorBox">
                      <Editor
                        apiKey={tinyMCEKey}
                        onInit={(evt, editor) => (editorRef.current = editor)}
                        value={localStorage.getItem("blogText")}
                        onEditorChange={(newText) => {
                          setBlogText(newText);
                          localStorage.setItem("blogText", newText);
                        }}
                        init={{
                          height: 400,
                          min_width: 500,
                          menubar: true,
                          plugins: [
                            "advlist",
                            "autolink",
                            "link",
                            "image",
                            "lists",
                            "charmap",
                            "preview",
                            "anchor",
                            "pagebreak",
                            "searchreplace",
                            "wordcount",
                            "visualblocks",
                            "visualchars",
                            "code",
                            "fullscreen",
                            "insertdatetime",
                            "media",
                            "table",
                            "emoticons",
                            "template",
                            "help",
                            "linkchecker",
                          ],
                          toolbar:
                            "undo redo | blocks | " +
                            "bold italic forecolor | alignleft aligncenter " +
                            "alignright alignjustify | bullist numlist outdent indent | link image media | print preview | forecolor backcolor  emoticons " +
                            "removeformat | help",
                          content_style:
                            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                          style_formats: [
                            {
                              title: "Blocks",
                              items: [
                                { title: "Box", format: "Box" },
                                { title: "Pre", format: "pre" },
                              ],
                            },
                          ],
                        }}
                      />
                    </Box>
                  </Box>{" "}
                  <Button
                    className="noticeBtn"
                    onClick={handleBlogPost}
                    size="small"
                    fullWidth
                    disabled={!canSave}
                    sx={{
                      backgroundColor: canSave
                        ? "green"
                        : "#adacaccc !important",
                      borderRadius: ".4rem",
                      color: "#fff",
                      minHeight: "2.5rem",
                      marginTop: "1rem",
                      minWidth: "20%",
                      "&.Mui-disabled": {
                        cursor: "not-allowed", // Show not-allowed cursor
                        pointerEvents: "auto",
                        color: "#939292",
                      },
                    }}
                  >
                    {/* {blogLoading === false && (
                        <LoadingProgress color={"#fff"} size={"1.3rem"} />
                      )}
                      {blogStatus === "success" &&
                        blogLoading &&
                        "Blog Posted Successfully"}
                      {blogLoading === null && "Post Blog"} */}
                    Post
                  </Button>
                </Box>
              </Box>
            </Container>
          </Box>
        </Box>
      )}
      <SmallFooter />
    </Box>
  );
}
