import { Avatar, Box, Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { CenteredBox } from "../../muiStyling/muiStyling";

export function PageNotFound() {
  const navigate = useNavigate();
  return (
    <CenteredBox className="empty-page">
      <Box
        sx={{
          p: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: "700",
            fontSize: "4em",
          }}
          className="page404"
        >
          404
        </Typography>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Page Not Found!
        </Typography>
        <Box className="emptyWrap">
          {/* <img style={{}} /> */}
          <Avatar
            src="/assets/sad-dog1.jpg"
            alt="sad dog"
            sx={{
              width: { xs: "15rem", sm: "20rem", md: "20rem", lg: "20rem" },
              height: { xs: "15rem", sm: "20rem", md: "20rem", lg: "20rem" },
            }}
          />
        </Box>
        <Typography
          variant="h3"
          sx={{
            fontSize: "1.5em",
            padding: ".5rem 0 0",
          }}
        >
          Oooops!
        </Typography>
        <Typography
          variant="h3"
          sx={{
            fontSize: "1.5em",
            padding: ".5rem 0",
          }}
        >
          There is nothing in here...
        </Typography>
        <Button
          variant="contained"
          color="success"
          size="large"
          onClick={() => navigate(-1)}
          sx={{ mt: 2 }}
        >
          Go back
        </Button>
      </Box>
    </CenteredBox>
  );
}
