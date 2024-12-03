import { Box } from "@mui/material";
import React from "react";
import CoursesBanner from "../../components/forCoursesPage/banner/CoursesBanner";
import AllCourses from "../../components/forCoursesPage/courses/AllCourses";
import Footer from "../../components/footer/Footer";

export function Courses() {
  return (
    <>
      <CoursesBanner />
      <AllCourses />
      <Footer />
    </>
  );
}
