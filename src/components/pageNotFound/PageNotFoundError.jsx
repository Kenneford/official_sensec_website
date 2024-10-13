import { Avatar, Box, Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { CenteredBox, PageNotFoundWrapBox } from "../../muiStyling/muiStyling";

export function PageNotFoundError() {
  const navigate = useNavigate();
  return (
    <CenteredBox className="empty-page">
      <PageNotFoundWrapBox>
        <Typography
          variant="h6"
          sx={{
            fontWeight: "700",
            fontSize: "4em",
            color: "#696969",
          }}
          className="page404"
        >
          404
        </Typography>
        <Typography variant="h6" sx={{ mb: 2, color: "#696969" }}>
          Page Not Found!
        </Typography>
        <Box className="emptyWrap">
          {/* <img style={{}} /> */}
          <Avatar
            src="/assets/sad-dog1.jpg"
            alt="sad dog"
            sx={{
              width: "10rem",
              height: "10rem",
            }}
          />
        </Box>
        <Typography
          variant="h3"
          sx={{
            fontSize: "1.3em",
            padding: ".5rem 0 0",
            color: "#696969",
          }}
        >
          Oooops!
        </Typography>
        <Typography
          variant="h3"
          sx={{
            fontSize: "1.3em",
            padding: ".5rem 0",
            color: "#696969",
          }}
        >
          There is nothing in here...
        </Typography>
        <Button
          variant="contained"
          color="success"
          size="large"
          onClick={() => navigate("/")}
          sx={{ mt: 2 }}
        >
          Go Home
        </Button>
      </PageNotFoundWrapBox>
    </CenteredBox>
  );
}
