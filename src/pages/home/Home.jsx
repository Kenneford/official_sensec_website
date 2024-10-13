import "./homePage.scss";
import CadetSection from "../../components/forHomePage/CadetSection/CadetSection";
import FacilitiesSection from "../../components/forHomePage/facilitiesSection/Facilities";
import lazyWithSuspense from "../../components/lazyLoading/LazyLoading";
import PageLoading from "../../components/pageLoading/PageLoading";
import { QuestionsSection } from "../../components/lazyLoading/LazyComponents";
import AlumniTestimonialSection from "../../components/forHomePage/alumniSection/AlumniTestimonialSection";
import Footer from "../../components/footer/Footer";

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

const ImageSlider = lazyWithSuspense(
  () =>
    import("../../components/forHomePage/imageSlider/ImageSlider").then(
      (module) => {
        return { default: module.ImageSlider };
      }
    ),
  <PageLoading />,
  "PageLayout"
);
const SensecInfoSection = lazyWithSuspense(
  () =>
    import(
      "../../components/forHomePage/sensecInfoSection/SensecInfoSection"
    ).then((module) => {
      return { default: module.SensecInfoSection };
    }),
  <PageLoading />,
  "PageLayout"
);
const HomeProgrammeSection = lazyWithSuspense(
  () =>
    import(
      "../../components/forHomePage/programmeSection/HomeProgrammeSection"
    ).then((module) => {
      return { default: module.HomeProgrammeSection };
    }),
  <PageLoading />,
  "PageLayout"
);
const PopularCoursesSection = lazyWithSuspense(
  () =>
    import(
      "../../components/forHomePage/coursesSection/PopularCoursesSection"
    ).then((module) => {
      return { default: module.PopularCoursesSection };
    }),
  <PageLoading />,
  "PageLayout"
);
