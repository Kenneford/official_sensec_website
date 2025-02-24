import React from "react";
import Footer from "../../components/footer/Footer";
import { AboutBanner } from "../../components/forAboutPage/banner/AboutBanner";
import { WhoWeAre } from "../../components/forAboutPage/aboutWhoWeAre/WhoWeAre";
import { OurHistory } from "../../components/forAboutPage/aboutOurHistory/OurHistory";
import { OurVision } from "../../components/forAboutPage/aboutOurVision/OurVision";
import { Achievements } from "../../components/forAboutPage/aboutAchievements/Achievements";
import { Box, Typography } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { FetchSensecSchoolData } from "../../data/blogs/FetchSensecSchoolData";

export function About() {
  const sensecSchoolData = FetchSensecSchoolData();
  return (
    <Box id="aboutPage">
      <Helmet>
        <title>About Us - Senya SHS</title>
        <meta
          name="description"
          content="A School that provides learners with excellent academics, skills development and strong ethical foundation for national development."
        />
        <meta
          name="keywords"
          content="Senya SHS About Us, Sensec About Us, About Us, Sensec Official Website About Us"
        />
        <meta property="og:title" content="About Us | Senya SHS" />
        <meta
          property="og:description"
          content="A School that provides learners with excellent academics, skills development and strong ethical foundation for national development."
        />
        <link rel="canonical" href="https://www.senyashs.com/sensec/about" />
        <link
          rel="icon"
          type="image/png"
          href="https://www.senyashs.com/assets/sensec-logo1.png"
        />
      </Helmet>
      <AboutBanner />
      {!sensecSchoolData[0]?.whoWeAre &&
        !sensecSchoolData[0]?.history &&
        !sensecSchoolData[0]?.schoolVision &&
        !sensecSchoolData[0]?.achievements && (
          <Typography
            variant="h6"
            sx={{
              textAlign: "center",
              color: "#c01515",
              fontWeight: "300",
              margin: "1rem 0",
            }}
          >
            No data fetched!
          </Typography>
        )}
      {sensecSchoolData[0]?.whoWeAre && <WhoWeAre />}
      {sensecSchoolData[0]?.history && <OurHistory />}
      {sensecSchoolData[0]?.schoolVision && <OurVision />}
      {sensecSchoolData[0]?.achievements && <Achievements />}
      <Footer />
    </Box>
  );
}
