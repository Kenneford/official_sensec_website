import React from "react";
import Footer from "../../components/footer/Footer";
import { AboutBanner } from "../../components/forAboutPage/banner/AboutBanner";
import { WhoWeAre } from "../../components/forAboutPage/aboutWhoWeAre/WhoWeAre";
import { OurHistory } from "../../components/forAboutPage/aboutOurHistory/OurHistory";
import { OurVision } from "../../components/forAboutPage/aboutOurVision/OurVision";
import { Achievements } from "../../components/forAboutPage/aboutAchievements/Achievements";
import { Box } from "@mui/material";
import { Helmet } from "react-helmet-async";

export function About() {
  return (
    <Box id="aboutPage">
      <Helmet>
        <title>Senya SHS About</title>
        <meta
          name="description"
          content="A School that provides learners with excellent academics, skills development and strong ethical foundation for national development."
        />
        <meta
          name="keywords"
          content="Senya SHS About Us, Sensec About Us, About Us"
        />
        <meta property="og:title" content="About Us | Senya SHS" />
        <meta
          property="og:description"
          content="A School that provides learners with excellent academics, skills development and strong ethical foundation for national development."
        />
        <link rel="canonical" href="https://www.senyashs.com/sensec/about" />
        <link rel="icon" type="image/png" href="/assets/sensec-logo1.png" />
      </Helmet>
      <AboutBanner />
      <WhoWeAre />
      <OurHistory />
      <OurVision />
      <Achievements />
      <Footer />
    </Box>
  );
}
