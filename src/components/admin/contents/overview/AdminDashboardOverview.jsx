import { Box, Button, Container, TextField, Typography } from "@mui/material";
import "./adminDashboardOverview.scss";
import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { HashLink } from "react-router-hash-link";
import {
  AddAPhoto,
  AdminPanelSettings,
  Diversity3,
  RssFeed,
  SchoolOutlined,
  SupervisedUserCircle,
} from "@mui/icons-material";
import { Editor } from "@tinymce/tinymce-react";
import {
  CenteredBox,
  ContainerBox,
  CustomTextField,
  ExpandableTitleTextField,
} from "../../../../muiStyling/muiStyling";
import SearchForm from "../../../searchForm/SearchForm";
import { getAuthUser } from "../../../../features/auth/authSlice";
import { useSelector } from "react-redux";

const cardsData = [
  {
    title: "Card 1",
    image: "https://via.placeholder.com/150",
    description: "This is card 1",
  },
  {
    title: "Card 2",
    image: "https://via.placeholder.com/150",
    description: "This is card 2",
  },
  {
    title: "Card 3",
    image: "https://via.placeholder.com/150",
    description: "This is card 3",
  },
  {
    title: "Card 4",
    image: "https://via.placeholder.com/150",
    description: "This is card 4",
  },
  {
    title: "Card 5",
    image: "https://via.placeholder.com/150",
    description: "This is card 5",
  },
  // Add more cards as needed
];

export function AdminDashboardOverview() {
  const authAdmin = useSelector(getAuthUser);
  const tinyMCEKey = import.meta.env.VITE_APP_TINYMCE_KEY;
  const { adminCurrentAction, adminCurrentLink } = useParams();
  const [loadBlogImage, setLoadBlogImage] = useState("");
  const [imageInfo, setImageInfo] = useState(null); // To store the uploaded image
  const [blogLoading, setBlogLoading] = useState(null);
  const [searchItem, setSearchItem] = useState("");
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const isMobile = screenWidth && screenWidth <= 600;

  const [title, setTitle] = useState("");
  const [blogText, setBlogText] = useState(localStorage.getItem("blogText"));
  const [blog, setBlog] = useState({
    blogImage: "",
    postedBy: "",
    title: "",
    blogText: "",
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

  const handleOnChange = (onChangeValue) => {
    setSearchItem(onChangeValue);
  };

  const handleBlogPost = (e) => {
    e.preventDefault();
    // dispatch(
    //   adminBlog({
    //     blogImage: loadBlogImage,
    //     title: title,
    //     blogText: blogText,
    //     postedBy: userInfo?.id,
    //   })
    // );
  };

  // Find current device in use
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    // Add event listener to detect window resizing
    window.addEventListener("resize", handleResize);
  });

  return (
    <>
      {/* Current dashboard title */}
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
        minHeight={"4rem"}
      >
        <h1 className="dashAction">
          {adminCurrentAction?.replace(/_/g, "-")} /{" "}
          <span>{adminCurrentLink?.replace(/_/g, " ")}</span>
        </h1>
        {/* Main search bar */}
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          <SearchForm
            value={searchItem}
            onChange={handleOnChange}
            placeholder={"Search"}
          />
        </Box>
      </Box>
      <Box
        component={"div"}
        id="adminOverview"
        className={"adminOverviewWrap"}
        // minHeight={"106vh"}
      >
        <Box sx={{ padding: "1rem 2rem" }}>
          <div className="content">
            <div className="dashBoardContent">
              <div className="card">
                <h3>Total Admins</h3>
                <HashLink
                  to={`/sensec/users/${authAdmin?.uniqueId}/admin/Users/Admins/employees/All`}
                  className="cardInfo"
                >
                  <div className="cardInfoIcons">
                    <AdminPanelSettings
                      style={{
                        fontSize: "2rem",
                      }}
                      titleAccess="All Employed Admins"
                    />
                  </div>
                  <div className="cardTotal">{7}</div>
                </HashLink>
                <HashLink
                  to={`/sensec/users/${authAdmin?.uniqueId}/admin/Users/Admins/employees/Pending_Admins`}
                  className="pending"
                >
                  <h4>Pending Admin(s)</h4>
                  <div className="cardPending">{20}</div>
                </HashLink>
              </div>
              <div className="card">
                <h3>Total Lecturers</h3>
                <HashLink
                  to={`/sensec/users/${authAdmin?.uniqueId}/admin/Users/Lecturers/employees/All`}
                  className="cardInfo"
                >
                  <div
                    to={`/sensec/users/${authAdmin?.uniqueId}/admin/Users/Lecturers`}
                    className="cardInfoIcons"
                  >
                    <SupervisedUserCircle
                      style={{
                        fontSize: "2rem",
                      }}
                      titleAccess="All Employed Lecturers"
                    />
                  </div>
                  <div className="cardTotal">6</div>
                </HashLink>
                <HashLink
                  to={`/sensec/users/${authAdmin?.uniqueId}/admin/Users/Lecturers/employees/Pending_Lecturers`}
                  className="pending"
                >
                  <h4>Pending Lecturer(s)</h4>
                  <div className="cardPending">5</div>
                </HashLink>
              </div>
              <div className="card">
                <h3>Total Students</h3>
                <HashLink
                  to={`/sensec/users/${authAdmin?.uniqueId}/admin/User_Types/Students/Enrolled`}
                  className="cardInfo"
                >
                  <div className="cardInfoIcons">
                    <SchoolOutlined
                      style={{
                        fontSize: "2rem",
                      }}
                      titleAccess="All Enrolled Students"
                    />
                  </div>
                  <div className="cardTotal">13</div>
                </HashLink>
                <HashLink
                  to={`/sensec/users/${authAdmin?.uniqueId}/admin/User_Types/Students/Pending_Students`}
                  className="pending"
                >
                  <h4>Pending Student(s)</h4>
                  <div className="cardPending">{121}</div>
                </HashLink>
              </div>
              <div className="card">
                <h3>Total NT-Staffs</h3>
                <HashLink
                  to={`/sensec/users/${authAdmin?.uniqueId}/admin/Users/NT-Staffs/employees/All`}
                  className="cardInfo"
                >
                  <div className="cardInfoIcons">
                    <Diversity3
                      style={{
                        fontSize: "2rem",
                      }}
                      titleAccess="All Employed NT Staffs"
                    />
                  </div>
                  <div className="cardTotal">{17}</div>
                </HashLink>
                <HashLink
                  to={`/sensec/users/${authAdmin?.uniqueId}/admin/Users/NT-Staffs/employees/Pending_NT-Staffs`}
                  className="pending"
                >
                  <h4>Pending Staff(s)</h4>
                  <div className="cardPending">{23}</div>
                </HashLink>
              </div>
              <div className="card">
                <HashLink
                  to={`/sensec/users/${authAdmin?.uniqueId}/admin/Users/Blogs`}
                >
                  <div className="titleFlex">
                    <h3>Blogs</h3>
                  </div>
                  <div className="cardInfo">
                    <div className="cardInfoIcons">
                      <RssFeed
                        style={{
                          fontSize: "2rem",
                        }}
                      />
                    </div>
                    <div className="cardTotal">{30}</div>
                  </div>
                  <div className="pending">
                    <h4>Old Blogs</h4>
                    <div className="cardPending">/ 2023</div>
                  </div>
                </HashLink>
              </div>
            </div>
            <div className="noticeBox">
              <div className="noticeCont">
                <div className="h3Cont">
                  <h3>POST A BLOG</h3>
                </div>
                <Container maxWidth="md" className="inputFields">
                  <form onSubmit={handleBlogPost}>
                    <div className="postImageFileUpload">
                      <div className="file">
                        <label htmlFor="postImage" className="postImageUpload">
                          {loadBlogImage ? (
                            <img
                              className="postImg"
                              src={loadBlogImage}
                              alt=""
                            />
                          ) : (
                            // <Box
                            //   component="img"
                            //   sx={{
                            //     width: "300px", // Customize preview size
                            //     height: "auto",
                            //     borderRadius: "8px",
                            //     boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                            //   }}
                            //   alt="Preview"
                            //   src={loadBlogImage}
                            // />
                            <div className="postImgIcon">
                              <div className="postImgIconWrap">
                                <AddAPhoto />
                                <p>Upload an image</p>
                              </div>
                            </div>
                          )}
                        </label>
                        <input
                          style={{ display: "none" }}
                          type="file"
                          onChange={handleImageFileUpload}
                          name="blogImage"
                          id="postImage"
                          accept=".png,.jpeg,.jpg"
                        />
                      </div>
                    </div>
                    <div className="content">
                      <div className="title">
                        <ExpandableTitleTextField
                          fullWidth
                          label="Title"
                          name="title"
                          onChange={(e) => setTitle(e.target.value)}
                          value={title}
                          required
                          className="textField"
                          sx={{}}
                          // focused={focused}
                          // onFocus={() => setFocused(true)}
                          // onBlur={() => setFocused(false)}
                        />
                      </div>
                      <div className="editor">
                        <h5 className="editorTitle">Blog Text</h5>
                        {/* <Typography variant="h5" gutterBottom>
                        Blog Text
                      </Typography> */}
                        <div className="editorBox">
                          <Editor
                            apiKey={tinyMCEKey}
                            onInit={(evt, editor) =>
                              (editorRef.current = editor)
                            }
                            // initialValue={localStorage.getItem("myContentText")}
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
                                    { title: "Div", format: "div" },
                                    { title: "Pre", format: "pre" },
                                  ],
                                },
                              ],
                            }}
                          />
                        </div>
                      </div>{" "}
                      <button className="noticeBtn" type="submit">
                        {/* {blogLoading === false && (
                        <LoadingProgress color={"#fff"} size={"1.3rem"} />
                      )}
                      {blogStatus === "success" &&
                        blogLoading &&
                        "Blog Posted Successfully"}
                      {blogLoading === null && "Post Blog"} */}
                        Post
                      </button>
                    </div>
                  </form>
                </Container>
              </div>
            </div>
          </div>
        </Box>
      </Box>
    </>
  );
}
