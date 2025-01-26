import { Avatar, Box, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import CoursesBanner from "../../components/forCoursesPage/banner/CoursesBanner";
import Footer from "../../components/footer/Footer";
// import { AllCourses } from "../../components/lazyLoading/LazyComponents";
import { AllCourses } from "../../components/forCoursesPage/courses/AllCourses";
import { FetchAllProgrammes } from "../../data/programme/FetchProgrammeData";
import { useNavigate, useOutletContext } from "react-router-dom";
import { NavigationBar } from "../../components/navbar/NavigationBar";
import PageLoading from "../../components/pageLoading/PageLoading";

export function Courses() {
  const allProgrammes = FetchAllProgrammes();
  if (!allProgrammes) {
    return (
      <Box fontSize={"calc( 0.7rem + 1vmin)"}>
        <PageLoading />
      </Box>
    );
  }
  return (
    <Box id="allProgrammes">
      <CoursesBanner />
      <AllCourses />
      <Footer />
    </Box>
  );
}
