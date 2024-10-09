import "./homePage.scss";
import CadetSection from "../../components/forHomePage/CadetSection/CadetSection";
import FacilitiesSection from "../../components/forHomePage/facilitiesSection/Facilities";
import lazyWithSuspense from "../../components/lazyLoading/LazyLoading";
import PageLoading from "../../components/pageLoading/PageLoading";
import { QuestionsSection } from "../../components/lazyLoading/LazyComponents";

export function Home() {
  return (
    <>
      <ImageSlider />
      <SensecInfoSection />
      <HomeProgrammeSection />
      <CoursesSection />
      <FacilitiesSection />
      <CadetSection />
      <QuestionsSection />
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
const CoursesSection = lazyWithSuspense(
  () =>
    import("../../components/forHomePage/coursesSection/CoursesSection").then(
      (module) => {
        return { default: module.CoursesSection };
      }
    ),
  <PageLoading />,
  "PageLayout"
);
