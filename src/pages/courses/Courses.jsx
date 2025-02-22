import { Box } from "@mui/material";
import CoursesBanner from "../../components/forCoursesPage/banner/CoursesBanner";
import Footer from "../../components/footer/Footer";
import { AllCourses } from "../../components/forCoursesPage/courses/AllCourses";
import { FetchAllProgrammes } from "../../data/programme/FetchProgrammeData";
import PageLoading from "../../components/pageLoading/PageLoading";
import { Helmet } from "react-helmet-async";

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
      <Helmet>
        <title>Senya SHS Programmes</title>
        <meta
          name="description"
          content="SENSEC offers six programmes. These are, Business, General Arts, Home Economics, General Science, Agricultural Science and Visual Arts"
        />
        <meta
          name="keywords"
          content="Senya SHS, Ghana Education, Sensec, Sensec Official Website, Programmes, Courses"
        />
        <meta property="og:title" content="Senya SHS Programmes" />
        <meta
          property="og:description"
          content="SENSEC offers six programmes. These are, Business, General Arts, Home Economics, General Science, Agricultural Science and Visual Arts"
        />
      </Helmet>
      <CoursesBanner />
      <AllCourses allProgrammes={allProgrammes} />
      <Footer />
    </Box>
  );
}
