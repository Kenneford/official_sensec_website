import React from "react";
import "./cadet.scss";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";
import { ContainerBox } from "../../../muiStyling/muiStyling";

export default function CadetSection() {
  return (
    <Box className="cadetWrap">
      <Box
        className="banner"
        style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1514124725446-e963f5d6f354?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1629&q=80)`,
        }}
      >
        <Box className="overlay">
          <h1>School Cadet</h1>
        </Box>
      </Box>
      <Box className="cadetCont">
        <Box className="trainer">
          <img
            src="https://images.unsplash.com/photo-1583249238726-0c5159e46750?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
            alt=""
          />
          <Box className="trainerInfo">
            <span className="name">Servant Kenn</span>
            <span className="title">( Cadet Trainer )</span>
          </Box>
        </Box>
        <ContainerBox
          sx={{
            width: { xs: "100%", sm: "95%", md: "90%", lg: "90%", xl: "75%" },
            margin: "auto",
            padding: { xs: "1rem .5rem", sm: "2rem 1rem" },
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box className="message">
            <h3>A Message from our Cadet</h3>
            <p>
              The Sensec Cadet was established in 2011. The purpose is to
              promote discipline, patriotism and fitness required for rigorous
              school life. Students are taken through activities such as
              exercise, parade, hiking, community service and intellectual
              engagements aimed at enabling them sharpen their intelligence,
              social and emotional skills necessary to resist unacceptable
              tendencies such substance abuse, intolerance, violence and other
              social vices.
            </p>
            <Link to={"#"}>
              <button className="cadetBtn">Read More</button>
            </Link>
          </Box>
        </ContainerBox>
      </Box>
    </Box>
  );
}
