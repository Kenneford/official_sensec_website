import { Box } from "@mui/material";
import "./smallFooter.scss";

export default function SmallFooter() {
  return (
    // <Box id="smallFooterWrap">
    <Box className="smallFooterContent">
      <p>
        Copyright &copy;2023{" "}
        <span style={{ color: "#0fc80f", marginLeft: ".3rem" }}>Sen</span>
        <span style={{ color: "yellow" }}>sec</span>
        <span
          style={{
            border: "1px solid #fff",
            height: "15px",
            margin: "0 .5rem",
          }}
        ></span>
        All Rights Reserved.
      </p>
      {/* <p>All Rights Reserved.</p> */}
    </Box>
    // </Box>
  );
}
