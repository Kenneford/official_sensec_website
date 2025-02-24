import React from "react";
import "./cadet.scss";
import { Link } from "react-router-dom";
import { Avatar, Box, Typography } from "@mui/material";
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
          <Typography
            variant="h1"
            fontSize={"1.7em"}
            fontWeight={500}
            letterSpacing={1}
            textAlign={"center"}
          >
            School Cadet
          </Typography>
        </Box>
      </Box>
      <Box className="cadetCont">
        <Box className="trainer">
          <Box
            sx={{
              width: "5em",
              height: "5em",
            }}
          >
            <Avatar
              src="https://images.unsplash.com/photo-1583249238726-0c5159e46750?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
              alt="Cadet Trainer Image"
              sx={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                objectFit: "cover",
                top: { xs: "-2em", sm: "-3em" },
              }}
            />
          </Box>
          <Box className="trainerInfo">
            <Typography
              variant="h6"
              fontSize={"1em"}
              color="#696969"
              className="name"
            >
              Servant Kenn
            </Typography>
            <Typography variant="h6" fontSize={".8em"} className="title">
              ( Cadet Trainer )
            </Typography>
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
            <Typography
              variant="h3"
              fontSize={"1em"}
              sx={{ textAlign: "center" }}
            >
              A Message from our Cadet
            </Typography>
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
