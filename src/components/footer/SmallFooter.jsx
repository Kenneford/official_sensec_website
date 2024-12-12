import { Box } from "@mui/material";
import "./smallFooter.scss";

export default function SmallFooter() {
  return (
    <Box id="smallFooterWrap">
      <Box className="smallFooterContent">
        <p>
          Copyright &copy;2023 <span style={{ color: "#0fc80f" }}>Sen</span>
          <span style={{ color: "yellow" }}>sec</span>
        </p>
        <div
          style={{
            border: "1px solid #fff",
            height: "15px",
          }}
        ></div>
        <p>All Rights Reserved.</p>
      </Box>
    </Box>
  );
}
