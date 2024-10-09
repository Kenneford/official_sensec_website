import { styled, Toolbar, TextField, Box } from "@mui/material";
import { color } from "framer-motion";

// Navbar Styling
export const StyledNavbar = {
  Navbar: styled(Toolbar)({
    display: "flex",
    backgroundColor: "green",
  }),
  CurrentUser: styled(Toolbar)({
    position: "relative",
    display: "flex",
    padding: "0",
    justifyContent: "flex-end",
    gap: ".5rem",
    alignItems: "center",
  }),
};
export const NavLink = styled(Toolbar)({
  color: "#fff",
  cursor: "pointer",
  "&:hover": "yellow",
});
export const ImageSliderBtn = styled(Toolbar)({
  position: "relative",
  backgroundColor: "transparent",
  padding: "0.5rem",
  transition: "color 0.4s linear",
  color: "#fff",
  fontSize: "1.1em",
  letterSpacing: "1px",
  cursor: "pointer",
  borderRadius: "0.4rem",
  border: "2px solid #fff",
  "&::before": {
    content: `""`,
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "green",
    borderRadius: "5px",
    zIndex: -1,
    transition: "transform 0.5s",
    transformOrigin: "0 0",
    transform: "scaleX(0)",
    transitionTimingFunction: "cubic-bezier(0.5, 1.6, 0.4, 0.7)",
  },
  "&:hover::before": {
    transform: "scaleX(1)",
  },
});
export const CenteredBox = styled(Box)({
  // height: "70vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: ".5rem",
  fontSize: "calc(0.7rem + 1vmin)",
});
export const ContainerBox = styled(Box)({
  width: { xs: "100%", sm: "95%", md: "90%", lg: "90%", xl: "75%" },
  margin: "auto",
  padding: "2rem 1rem",
  // paddingBottom: "2rem",
  display: "flex",
  flexDirection: "column",
});

export const CustomTextField = styled(TextField)({
  // Border styles for focused state
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "#454343ad", // Change focus border color
      boxShadow: "2px 2px 3px 0px #454343ad",
    },
    // Border styles for hover
    "&:hover fieldset": {
      border: ".5px solid #454343ad", // Disable border on hover
      boxShadow: "2px 2px 3px 0px #454343ad",
    },
  },
  // Label color on focus
  "& .MuiInputLabel-root.Mui-focused": {
    fontSize: "1.05rem",
    color: "#454343ad", // Custom focus label color
    borderColor: "transparent",
  },
  // Target the required asterisk
  "& .MuiInputLabel-asterisk": {
    color: "red", // Change the asterisk color to red
  },
});
