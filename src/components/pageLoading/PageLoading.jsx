import React from "react";
import "./pageLoading.scss";
import { Box } from "@mui/material";

export default function PageLoading() {
  return (
    <Box
      className="promotionSpinner"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mt: "2rem",
        fontSize: "1em",
        color: "#696969",
        fontWeight: "500",
      }}
    >
      <p>Loading</p>
      <span className="dot-ellipsis" style={{ marginTop: "-.1rem" }}>
        <span className="dot">.</span>
        <span className="dot">.</span>
        <span className="dot">.</span>
      </span>
    </Box>
  );
}
