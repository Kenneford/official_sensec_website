import React from "react";
import { CircularProgress } from "@mui/material";

export default function LoadingProgress({ color, size }) {
  return <CircularProgress style={{ color: color }} size={size} />;
}
