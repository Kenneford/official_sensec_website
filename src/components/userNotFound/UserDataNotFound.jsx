import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function UserDataNotFound({ dataType }) {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h4" textAlign={"center"} color="#696969" mt={2}>
        404 : Error
      </Typography>
      <Typography
        variant="h6"
        textAlign={"center"}
        color="#696969"
        // mt={2}
        fontWeight={400}
      >
        {dataType ? dataType : "User"} Data Not Found!
      </Typography>
      <Button
        variant="contained"
        size="small"
        sx={{
          maxWidth: "7rem",
          textTransform: "capitalize",
          backgroundColor: "green",
          mt: 2,
        }}
        onClick={() => navigate("/")}
      >
        Go Home
      </Button>
    </Box>
  );
}
