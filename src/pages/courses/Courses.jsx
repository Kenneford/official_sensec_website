import { Box } from "@mui/material";
import React, { useEffect } from "react";
import CoursesBanner from "../../components/forCoursesPage/banner/CoursesBanner";
import Footer from "../../components/footer/Footer";
// import { AllCourses } from "../../components/lazyLoading/LazyComponents";
import { AllCourses } from "../../components/forCoursesPage/courses/AllCourses";
import { FetchAllProgrammes } from "../../data/programme/FetchProgrammeData";

export function Courses() {
  const allProgrammes = FetchAllProgrammes();
  return (
    <Box id="allProgrammes">
      <CoursesBanner />
      <AllCourses />
      <Footer />
    </Box>
  );
}
