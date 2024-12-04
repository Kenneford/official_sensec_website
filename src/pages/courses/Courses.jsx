import { Box } from "@mui/material";
import React from "react";
import CoursesBanner from "../../components/forCoursesPage/banner/CoursesBanner";
import Footer from "../../components/footer/Footer";
import { AllCourses } from "../../components/lazyLoading/LazyComponents";

export function Courses() {
  return (
    <>
      <CoursesBanner />
      <AllCourses />
      <Footer />
    </>
  );
}
