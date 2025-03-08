import {
  Box,
  Card,
  CardContent,
  Typography,
  CardMedia,
  Button,
} from "@mui/material";
import SmallFooter from "../../components/footer/SmallFooter";

export function PortalLoginVideo() {
  return (
    <>
      <Box maxWidth={960} margin={"auto"} p={1}>
        {/* <Typography>PortalLoginVideo</Typography> */}
        <Card sx={{ maxWidth: 600, margin: "auto", my: 4, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              How to Log into Your Portal
            </Typography>
            <CardMedia
              component="iframe"
              height="315"
              src="https://www.youtube.com/embed/Ovef6GrQhbc"
              title="How to Log into Your Portal"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </CardContent>
        </Card>
      </Box>
      <SmallFooter />
    </>
  );
}
