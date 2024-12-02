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

export function Home() {
  return (
    <>
      <ImageSlider />
      <SensecInfoSection />
      <HomeProgrammeSection />
      <PopularCoursesSection />
      <FacilitiesSection />
      <CadetSection />
      <QuestionsSection />
      <AlumniTestimonialSection />
      <Footer />
    </>
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
