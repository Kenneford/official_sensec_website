import React, { useState } from "react";
import "./blogs.scss";
import {
  Container,
  Typography,
  Grid,
  Box,
  InputAdornment,
} from "@mui/material";
import BlogCard from "./BlogCard";
import { CustomSearchField } from "../../../../muiStyling/muiStyling";
import { Search } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import SearchForm from "../../../searchForm/SearchForm";

export function Blogs() {
  const { adminCurrentLink, adminCurrentAction } = useParams();
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

  const [searchedBlog, setSearchedBlog] = useState("");

  const [fixedNavbar, setFixedNavbar] = useState(false);
  const detectPageScroll = () => {
    if (window.scrollY >= 25) {
      setFixedNavbar(true);
    } else {
      setFixedNavbar(false);
    }
  };
  window.addEventListener("scroll", detectPageScroll);

  const handleOnChange = (onChangeValue) => {
    setSearchedBlog(onChangeValue);
  };

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
            value={searchedBlog}
            onChange={handleOnChange}
            placeholder={"Search"}
          />
        </Box>
      </Box>
      <Box className="blogs">
        <Box
          sx={{
            position: "sticky",
            top: 60,
            backgroundColor: "#fff",
            padding: 0,
            zIndex: 1,
          }}
          pt={5}
        >
          <Box p={"1rem .5rem"}>
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
              <Box
                className="blogSearch"
                position={"relative"}
                sx={{ display: { xs: "block", sm: "none" } }}
              >
                <CustomSearchField
                  label="Search blog by title "
                  variant="outlined"
                  value={searchedBlog}
                  onChange={(e) => setSearchedBlog(e?.target?.value)}
                  fullWidth
                  // margin="normal"
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <Search />
                        </InputAdornment>
                      ),
                    },
                  }}
                />
                {searchedBlog?.length > 0 && (
                  <Box
                    position={"absolute"}
                    bgcolor={"#fff"}
                    sx={{
                      width: "100%",
                    }}
                    maxHeight={200}
                    zIndex={2}
                    className="blogSearchList"
                  >
                    <Typography variant="h6" component={"p"}>
                      {searchedBlog}
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
        <Box m={".5rem"}>
          <Box
            sx={{
              width: { xs: "100%", sm: "95%", md: "90%", lg: "90%", xl: "70%" },
            }}
            margin={"auto"}
          >
            {posts.map((post) => (
              <Box key={post?.title} mb={4}>
                <BlogCard
                  title={post.title}
                  content={post.content}
                  image={post.image}
                />
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
}
