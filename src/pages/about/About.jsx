import React from "react";
import Footer from "../../components/footer/Footer";
import {
  AboutBanner,
  Achievements,
  OurHistory,
  OurVision,
  WhoWeAre,
} from "../../components/lazyLoading/LazyComponents";

export function About() {
  return (
    <>
      <AboutBanner />
      <WhoWeAre />
      <OurHistory />
      <OurVision />
      <Achievements />
      <Footer />
    </>
  );
}
