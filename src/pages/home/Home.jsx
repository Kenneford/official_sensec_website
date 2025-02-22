import "./homePage.scss";
import CadetSection from "../../components/forHomePage/CadetSection/CadetSection";
import FacilitiesSection from "../../components/forHomePage/facilitiesSection/Facilities";
import AlumniTestimonialSection from "../../components/forHomePage/alumniSection/AlumniTestimonialSection";
import Footer from "../../components/footer/Footer";
import { SensecInfoSection } from "../../components/forHomePage/sensecInfoSection/SensecInfoSection";
import { HomeProgrammeSection } from "../../components/forHomePage/programmeSection/HomeProgrammeSection";
import { PopularCoursesSection } from "../../components/forHomePage/coursesSection/PopularCoursesSection";
import { ImageSlider } from "../../components/forHomePage/imageSlider/ImageSlider";
import { QuestionsSection } from "../../components/forHomePage/questionsSection/QuestionsSection";
import { Box } from "@mui/material";
import { FetchAllProgrammes } from "../../data/programme/FetchProgrammeData";
import PageLoading from "../../components/pageLoading/PageLoading";
import { Helmet } from "react-helmet-async";

export function Home() {
  const allProgrammes = FetchAllProgrammes();
  // if (!allProgrammes) {
  //   return (
  //     <Box fontSize={"calc( 0.7rem + 1vmin)"}>
  //       <PageLoading />
  //     </Box>
  //   );
  // }
  return (
    <Box id="homePage">
      <Helmet>
        <title>Senya SHS Homepage</title>
        <meta
          name="description"
          content="In the heart of Senya Beraku, a coastal community nestled along the serene shores of the Central Region of Ghana, Senya Senior High School stands as a citadel of education. Founded on 7th February 1991, Senya Senior High School, affectionately called Great SENSEC, has not only been a source of academic excellence but has also played a pivotal role in shaping the minds and future of countless students. During its early years, the school faced numerous challenges, from inadequate infrastructure to limited resources. However, the determination and dedication of the founding team, along with support from the local community, ensured that SENSEC continued to grow and flourish."
        />
        <meta
          name="keywords"
          content="Senya SHS, Ghana Education, Sensec SHS, Sensec, Sensec Official Website, School, Ghana Schools, Ghana SHS"
        />
        <meta property="og:title" content="Homepage | Senya SHS" />
        <meta
          property="og:description"
          content="In the heart of Senya Beraku, a coastal community nestled along the serene shores of the Central Region of Ghana, Senya Senior High School stands as a citadel of education. Founded on 7th February 1991, Senya Senior High School, affectionately called Great SENSEC, has not only been a source of academic excellence but has also played a pivotal role in shaping the minds and future of countless students. During its early years, the school faced numerous challenges, from inadequate infrastructure to limited resources. However, the determination and dedication of the founding team, along with support from the local community, ensured that SENSEC continued to grow and flourish."
        />
        <link rel="canonical" href="https://www.senyashs.com/sensec/homepage" />
      </Helmet>
      <Box sx={{ overflow: "hidden" }}>
        <ImageSlider />
      </Box>
      <SensecInfoSection />
      <HomeProgrammeSection />
      <PopularCoursesSection />
      <FacilitiesSection />
      <CadetSection />
      <QuestionsSection />
      <AlumniTestimonialSection />
      <Footer />
    </Box>
  );
}

// const ImageSlider = lazyWithSuspense(
//   () =>
//     import("../../components/forHomePage/imageSlider/ImageSlider").then(
//       (module) => {
//         return { default: module.ImageSlider };
//       }
//     ),
//   <PageLoading />,
//   "PageLayout"
// );
// const SensecInfoSection = lazyWithSuspense(
//   () =>
//     import(
//       "../../components/forHomePage/sensecInfoSection/SensecInfoSection"
//     ).then((module) => {
//       return { default: module.SensecInfoSection };
//     }),
//   <PageLoading />,
//   "PageLayout"
// );
// const HomeProgrammeSection = lazyWithSuspense(
//   () =>
//     import(
//       "../../components/forHomePage/programmeSection/HomeProgrammeSection"
//     ).then((module) => {
//       return { default: module.HomeProgrammeSection };
//     }),
//   <PageLoading />,
//   "PageLayout"
// );
// const PopularCoursesSection = lazyWithSuspense(
//   () =>
//     import(
//       "../../components/forHomePage/coursesSection/PopularCoursesSection"
//     ).then((module) => {
//       return { default: module.PopularCoursesSection };
//     }),
//   <PageLoading />,
//   "PageLayout"
// );
