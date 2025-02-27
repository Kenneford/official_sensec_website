import { Box } from "@mui/material";
import "./aboutBanner.scss";
import { HashLink } from "react-router-hash-link";

export function AboutBanner() {
  const scrollWithOffset = (el) => {
    const yCoordinate = el.getBoundingClientRect().top + window.scrollY;
    const yOffset = -70;
    window.scrollTo({ top: yCoordinate + yOffset, behavior: "smooth" });
  };
  //THIS REMOVES THE NavLINK TAG FROM THE URL
  if (window.location.hash) {
    window.history.replaceState("", document.title, window.location.pathname);
  }

  return (
    <Box className="bannerWrap">
      <Box
        className="bannerImg"
        style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1562516875-a8316c161614?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80")`,
        }}
      >
        <Box className="overlay">
          <h1>About Us</h1>
          <span>( Senya Senior High School )</span>
        </Box>
      </Box>
      <Box className="aboutLinks">
        <HashLink
          to={"/sensec/about#whoWeAre"}
          smooth
          scroll={scrollWithOffset}
        >
          Who We Are
        </HashLink>
        <HashLink
          to={"/sensec/about#ourVision"}
          smooth
          scroll={scrollWithOffset}
        >
          Vision
        </HashLink>
        <HashLink
          to={"/sensec/about#ourHistory"}
          smooth
          scroll={scrollWithOffset}
        >
          History
        </HashLink>
        <HashLink
          to={"/sensec/about#ourAchievements"}
          smooth
          scroll={scrollWithOffset}
        >
          Achievements
        </HashLink>
        {/* <HashLink to={"/sensec/about#ourTeam"} smooth scroll={scrollWithOffset}>
          Our Team
        </HashLink> */}
      </Box>
    </Box>
  );
}
