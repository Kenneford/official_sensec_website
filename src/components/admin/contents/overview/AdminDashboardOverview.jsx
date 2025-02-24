import { Box, Container, Grid } from "@mui/material";
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
import { ExpandableTitleTextField } from "../../../../muiStyling/muiStyling";
import SearchForm from "../../../searchForm/SearchForm";
import { getAuthUser } from "../../../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  FetchAllEmployedAdmins,
  FetchAllPendingAdmins,
} from "../../../../data/admins/FetchAdmins";
import {
  FetchAllEmployedLecturers,
  FetchAllPendingLecturers,
} from "../../../../data/lecturers/FetchLecturers";
import {
  FetchAllApprovedStudents,
  FetchAllPendingStudents,
} from "../../../../data/students/FetchAllStudents";
import {
  FetchAllEmployedNTStaffs,
  FetchAllPendingNTStaffs,
} from "../../../../data/nt.staffs/FetchNT-Staffs";
import SmallFooter from "../../../footer/SmallFooter";
import {
  createNewBlog,
  resetCreateBlogState,
} from "../../../../features/blogs/blogSlice";
import { toast } from "react-toastify";

export function AdminDashboardOverview() {
  const { createStatus, error, successMessage } = useSelector(
    (state) => state.blog
  );
  const authAdmin = useSelector(getAuthUser);
  const allEmployedAdmins = FetchAllEmployedAdmins();
  const allPendingAdmins = FetchAllPendingAdmins();
  const allEmployedLecturers = FetchAllEmployedLecturers();
  const allPendingLecturers = FetchAllPendingLecturers();
  const approvedStudents = FetchAllApprovedStudents();
  const allPendingStudents = FetchAllPendingStudents();
  const allEmployedNTStaffs = FetchAllEmployedNTStaffs();
  const allPendingNTStaffs = FetchAllPendingNTStaffs();

  const tinyMCEKey = import.meta.env.VITE_APP_TINYMCE_KEY;
  const { adminCurrentAction, adminCurrentLink } = useParams();
  const dispatch = useDispatch();

  const [loadingComplete, setLoadingComplete] = useState(null);
  const [loadBlogImage, setLoadBlogImage] = useState("");
  const [imageInfo, setImageInfo] = useState(null); // To store the uploaded image
  const [blogLoading, setBlogLoading] = useState(null);
  const [searchItem, setSearchItem] = useState("");
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const isMobile = screenWidth && screenWidth <= 600;

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

  const handleOnChange = (onChangeValue) => {
    setSearchItem(onChangeValue);
  };

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

  // Find current device in use
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    // Add event listener to detect window resizing
    window.addEventListener("resize", handleResize);
  });

  // Create blog status check
  useEffect(() => {
    if (createStatus === "pending") {
      setLoadingComplete(false);
    }
    if (createStatus === "rejected") {
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
        dispatch(resetCreateBlogState());
      }, 3000);
      return;
    }
    if (createStatus === "success") {
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
        dispatch(resetCreateBlogState());
        setBlog({
          image: "",
          postedBy: authAdmin?.id,
          title: "",
          text: "",
        });
      }, 6000);
    }
  }, [error, successMessage, createStatus, authAdmin, dispatch]);

  return (
    <>
      {/* Current dashboard title */}
      <Box
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
            value={searchItem}
            onChange={handleOnChange}
            placeholder={"Search"}
          />
        </Box>
      </Box>
      <Box
        id="adminOverview"
        className={"adminOverviewWrap"}
        // minHeight={"106vh"}
      >
        <Box
          className="content"
          sx={{
            padding: {
              xs: "1rem .5rem",
              sm: "1rem .5rem",
              md: "1rem 2rem",
            },
          }}
        >
          <Box className="dashBoardContent">
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <Box className="card" sx={{ backgroundColor: "#292929" }}>
                  <h3>Total Admins</h3>
                  <HashLink
                    to={`/sensec/users/${authAdmin?.uniqueId}/admin/User-Types/Admins/employees/All`}
                    className="cardInfo"
                  >
                    <Box className="cardInfoIcons">
                      <AdminPanelSettings
                        style={{
                          fontSize: "2rem",
                        }}
                        titleAccess="All Employed Admins"
                      />
                    </Box>
                    <Box className="cardTotal">{allEmployedAdmins?.length}</Box>
                  </HashLink>
                  <HashLink
                    to={`/sensec/users/${authAdmin?.uniqueId}/admin/User-Types/Admins/employees/Pending_Admins`}
                    className="pending"
                  >
                    <h4>Pending Admin(s)</h4>
                    <Box className="cardPending">
                      {allPendingAdmins?.length}
                    </Box>
                  </HashLink>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <Box className="card" sx={{ backgroundColor: "green" }}>
                  <h3>Total Lecturers</h3>
                  <HashLink
                    to={`/sensec/users/${authAdmin?.uniqueId}/admin/User-Types/Lecturers/employees/All`}
                    className="cardInfo"
                  >
                    <Box
                      to={`/sensec/users/${authAdmin?.uniqueId}/admin/User-Types/Lecturers`}
                      className="cardInfoIcons"
                    >
                      <SupervisedUserCircle
                        style={{
                          fontSize: "2rem",
                        }}
                        titleAccess="All Employed Lecturers"
                      />
                    </Box>
                    <Box className="cardTotal">
                      {allEmployedLecturers?.length}
                    </Box>
                  </HashLink>
                  <HashLink
                    to={`/sensec/users/${authAdmin?.uniqueId}/admin/User-Types/Lecturers/employees/Pending_Lecturers`}
                    className="pending"
                  >
                    <h4>Pending Lecturer(s)</h4>
                    <Box className="cardPending">
                      {allPendingLecturers?.length}
                    </Box>
                  </HashLink>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <Box className="card" sx={{ backgroundColor: "#414141" }}>
                  <h3>Total Students</h3>
                  <HashLink
                    to={`/sensec/users/${authAdmin?.uniqueId}/admin/User_Types/Students/Enrolled`}
                    className="cardInfo"
                  >
                    <Box className="cardInfoIcons">
                      <SchoolOutlined
                        style={{
                          fontSize: "2rem",
                        }}
                        titleAccess="All Enrolled Students"
                      />
                    </Box>
                    <Box className="cardTotal">{approvedStudents?.length}</Box>
                  </HashLink>
                  <HashLink
                    to={`/sensec/users/${authAdmin?.uniqueId}/admin/User_Types/Students/Pending_Students`}
                    className="pending"
                  >
                    <h4>Pending Student(s)</h4>
                    <Box className="cardPending">
                      {allPendingStudents?.length}
                    </Box>
                  </HashLink>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <Box className="card" sx={{ backgroundColor: "#7a0080" }}>
                  <h3>Total NT-Staffs</h3>
                  <HashLink
                    to={`/sensec/users/${authAdmin?.uniqueId}/admin/User-Types/NT-Staffs/employees/All`}
                    className="cardInfo"
                  >
                    <Box className="cardInfoIcons">
                      <Diversity3
                        style={{
                          fontSize: "2rem",
                        }}
                        titleAccess="All Employed NT Staffs"
                      />
                    </Box>
                    <Box className="cardTotal">
                      {allEmployedNTStaffs?.length}
                    </Box>
                  </HashLink>
                  <HashLink
                    to={`/sensec/users/${authAdmin?.uniqueId}/admin/User-Types/NT-Staffs/employees/Pending_NT-Staffs`}
                    className="pending"
                  >
                    <h4>Pending Staff(s)</h4>
                    <Box className="cardPending">
                      {allPendingNTStaffs?.length}
                    </Box>
                  </HashLink>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <Box className="card" sx={{ backgroundColor: "#005780" }}>
                  <HashLink
                    to={`/sensec/users/${authAdmin?.uniqueId}/admin/Dashboard/Blogs`}
                  >
                    <Box className="titleFlex">
                      <h3>Blogs</h3>
                    </Box>
                    <Box className="cardInfo">
                      <Box className="cardInfoIcons">
                        <RssFeed
                          style={{
                            fontSize: "2rem",
                          }}
                        />
                      </Box>
                      <Box className="cardTotal">{30}</Box>
                    </Box>
                    <Box className="pending">
                      <h4>Old Blogs</h4>
                      <Box className="cardPending">/ 2023</Box>
                    </Box>
                  </HashLink>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
      <SmallFooter />
    </>
  );
}
