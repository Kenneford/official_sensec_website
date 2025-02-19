import { Box } from "@mui/material";
import CoursesBanner from "../../components/forCoursesPage/banner/CoursesBanner";
import Footer from "../../components/footer/Footer";
import { AllCourses } from "../../components/forCoursesPage/courses/AllCourses";
import { FetchAllProgrammes } from "../../data/programme/FetchProgrammeData";
import PageLoading from "../../components/pageLoading/PageLoading";

export function Courses() {
  const allProgrammes = FetchAllProgrammes();
  // if (!allProgrammes) {
  //   return (
  //     <Box fontSize={"calc( 0.7rem + 1vmin)"}>
  //       <PageLoading />
  //     </Box>
  //   );
  // }
  return (
    <Box id="allProgrammes">
      <CoursesBanner />
      <AllCourses allProgrammes={allProgrammes} />
      <Footer />
    </Box>
  );
}
