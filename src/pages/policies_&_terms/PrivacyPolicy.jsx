import { Box, Typography } from "@mui/material";
import React from "react";
import SmallFooter from "../../components/footer/SmallFooter";

export function PrivacyPolicy() {
  return (
    <>
      <Box
        maxWidth={960}
        m={"2rem auto"}
        p={2}
        color="#696969"
        sx={{
          // boxShadow: "0px 1px 2px 2px #cccc",
          borderRadius: ".4rem",
        }}
      >
        <Typography
          variant="h1"
          fontSize={"1.5rem"}
          fontWeight={500}
          color="#696969"
          m={".5rem 0 1rem"}
        >
          Privacy Policy | Senya SHS
        </Typography>
      </Box>
      <SmallFooter />
    </>
  );
}
