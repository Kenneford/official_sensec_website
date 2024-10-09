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
            paddingTop: "2rem",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box className="message">
            <h3>A Message from our Cadet</h3>
            <p>
              It has roots in a piece of classical Latin literature from 45 BC,
              making it over 2000 years old. Richard McClintock, a Latin
              professor at Hampden-Sydney College in Virginia, looked up one of
              the more obscure Latin words, consectetur, from a Lorem Ipsum
              passage, and going through the cites of the word in classical
              literature, discovered the undoubtable source.
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
