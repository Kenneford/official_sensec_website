import React, { useEffect, useState } from "react";
import "./blogs.scss";
import {
  Container,
  Typography,
  Grid,
  Box,
  InputAdornment,
  Avatar,
  Stack,
} from "@mui/material";
import BlogCard from "./BlogCard";
import { CustomSearchField } from "../../../../muiStyling/muiStyling";
import { Search } from "@mui/icons-material";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import SearchForm from "../../../searchForm/SearchForm";
import { NavigationBar } from "../../../navbar/NavigationBar";
import BlogSearchFilter from "../../../searchForm/BlogSearchFilter";
import { FetchAllBlogs } from "../../../../data/blogs/FetchBlogs";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { resetDeleteBlogState } from "../../../../features/blogs/blogSlice";
import Footer from "../../../footer/Footer";
import SmallFooter from "../../../footer/SmallFooter";

export function Blogs() {
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

  const posts = [
    {
      title: "Blog Post 1",
      content: "This is the first blog post.",
      image:
        "https://images.unsplash.com/photo-1503235930437-8c6293ba41f5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Blog Post 2",
      content: "This is the second blog post.",
      image:
        "https://images.unsplash.com/photo-1521341957697-b93449760f30?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Blog Post 3",
      content: "This is the third blog post.",
      image:
        "https://images.unsplash.com/photo-1536084006720-6c105926e135?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  const [loadingComplete, setLoadingComplete] = useState(null);
  const [searchedBlog, setSearchedBlog] = useState("");

  const [isScrolled, setIsScrolled] = useState(false);

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

  return (
    <>
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
              src="/assets/sensec-logo1.png"
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
      <Box className="blogs">
        <Box m={".5rem"}>
          <Box
            sx={{
              width: { xs: "100%", sm: "95%", md: "90%", lg: "90%", xl: "70%" },
            }}
            margin={"auto"}
          >
            {allBlogs.map((blog) => (
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
      {/* <Footer /> */}
      <SmallFooter />
    </>
  );
}
