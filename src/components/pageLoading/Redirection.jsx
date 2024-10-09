import React from "react";
import LoadingProgress from "./LoadingProgress";

export default function Redirection({ color, size }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: ".4rem",
        // color: color,
      }}
    >
      <p>Redirecting...</p>
      <LoadingProgress color={color} size={size} />
    </div>
  );
}
