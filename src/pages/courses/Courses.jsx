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
        <title>Programmes - Senya SHS</title>
        <meta
          name="description"
          content="SENSEC offers six programmes. These are, Business, General Arts, Home Economics, General Science, Agricultural Science and Visual Arts"
        />
        <meta
          name="keywords"
          content="Senya SHS Programmes, Sensec Programmes, Senya SHS Courses, Courses, Programmes"
        />
        <meta property="og:title" content="Programmes | Senya SHS" />
        <meta
          property="og:description"
          content="SENSEC offers six programmes. These are, Business, General Arts, Home Economics, General Science, Agricultural Science and Visual Arts"
        />
        <link rel="canonical" href="https://www.senyashs.com/sensec/courses" />
        <link rel="icon" type="image/png" href="/assets/sensec-logo1.png" />
      </Helmet>
      <CoursesBanner />
      <AllCourses allProgrammes={allProgrammes} />
      <Footer />
    </Box>
  );
}
