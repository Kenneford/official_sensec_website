import { styled, Toolbar, TextField, Box, Button } from "@mui/material";
import { MobileDatePicker } from "@mui/x-date-pickers";

// Navbar Styling
export const StyledNavbar = {
  Navbar: styled(Box)({
    minHeight: "3.5rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green",
    padding: "0 .5rem",
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
  width: { xs: "100%", sm: "95%", md: "90%", lg: "90%", xl: "75%" },
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: ".5rem",
  fontSize: "calc(0.7rem + 1vmin)",
});
export const ContainerBox = styled(Box)({
  width: { xs: "100%", sm: "95%", md: "90%", lg: "90%", xl: "75%" },
  // margin: "auto",
  padding: "1rem 1rem 2rem",
  // paddingBottom: "2rem",
  display: "flex",
  flexDirection: "column",
});
export const CustomTextField = styled(TextField)({
  "& .MuiInputLabel-root": {
    fontSize: ".9em", // Default label size
    transition: "font-size 0.2s, color 0.2s",
  },
  // Border styles for focused state
  "& .MuiOutlinedInput-root": {
    fontSize: ".9em",
    "& legend": {
      display: "inline",
      width: "auto", // Ensure the label width is appropriate
    },
    "&.Mui-focused fieldset": {
      borderColor: "#454343ad", // Change focus border color
      boxShadow: "2px 2px 3px 0px #454343ad",
    },
    // Border styles for hover
    "&:hover fieldset": {
      fontSize: "1.05em",
      border: ".5px solid #454343ad", // Border on hover
      boxShadow: "2px 2px 3px 0px #1a0505ad",
    },
  },
  // Label size and color for focused state
  "& .MuiInputLabel-root.Mui-focused": {
    fontSize: ".9em", // Larger size on focus
    color: "#454343ad", // Custom focus label color
  },
  // Shrinked label (when value exists)
  "& .MuiInputLabel-root.MuiFormLabel-filled": {
    fontSize: ".9em", // Matches focused label size
    color: "#454343ad",
  },
  // Target the required asterisk
  "& .MuiInputLabel-asterisk": {
    color: "red", // Change the asterisk color to red
  },
});
export const CustomMobileDatePicker = styled(MobileDatePicker)({
  // Border styles for focused state
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#b5b3b3 !important", // Remove the border color
      // boxShadow: "2px 2px 3px 0px #454343ad",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#454343ad", // Change focus border color
      boxShadow: "2px 2px 3px 0px #454343ad",
    },
    "&:hover fieldset": {
      border: ".5px solid #454343ad", // Disable border on hover
      boxShadow: "2px 2px 3px 0px #1a0505ad",
    },
  },
  // Label color on focus
  "& .MuiInputLabel-root.Mui-focused": {
    fontSize: "1.1rem",
    color: "#454343ad", // Custom focus label color
    // borderColor: "transparent",
  },
  "& .MuiInputLabel-root": {
    // fontSize: "1.05rem",
    fontSize: "1.1rem",
    color: "#454343ad !important", // Custom focus label color
    border: "none",
  },
});

export const CustomSearchField = styled(TextField)({
  // width: "100%",
  // Border styles for focused state
  "& .MuiOutlinedInput-root": {
    borderRadius: ".5rem .5rem 0 0",
    "&.Mui-focused fieldset": {
      borderColor: "#454343ad", // Change focus border color
      boxShadow: "2px 2px 3px 0px #454343ad",
      borderRadius: ".5rem .5rem 0 0",
    },
    // Border styles for hover
    "&:hover fieldset": {
      border: ".5px solid #454343ad", // Disable border on hover
      boxShadow: "2px 2px 3px 0px #1a0505ad",
      borderRadius: ".5rem .5rem 0 0",
    },
  },
  // Label color on focus
  "& .MuiInputLabel-root.Mui-focused": {
    fontSize: "1.05rem",
    color: "#454343ad", // Custom focus label color
    borderColor: "transparent",
    borderRadius: ".5rem .5rem 0 0",
  },
  // Target the required asterisk
  "& .MuiInputLabel-asterisk": {
    color: "red", // Change the asterisk color to red
  },
});
export const PageNotFoundWrapBox = styled(Box)({
  width: "23em",
  padding: "0 1rem 3rem",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "2rem",
  // border: ".5px solid #454343ad", // Disable border on hover
  // boxShadow: "2px 2px 3px 0px #454343ad",
  filter: "drop-shadow(2rem 3rem 4em #ffffffad)",
  // webkitBoxShadow: " 0px 0px 16px -8px rgba(0, 0, 0, 0.68)",
  boxShadow: "0px 0px 16px -8px rgba(0, 0, 0, 0.68)",
});
export const CustomizedButton = styled(Button)({
  fontSize: ".8em",
  letterSpacing: "1px",
});
export const SidebarSubLinksContainer = styled("div")(
  ({ theme, isExpanded, contentHeight }) => ({
    maxHeight: isExpanded ? `${contentHeight}px` : "0",
    overflow: "hidden",
    transition: "max-height 0.5s ease-out",
  })
);
export const ExpandableTitleTextField = styled(TextField)(({ focused }) => ({
  transition: "width 0.3s ease",
  width: "100%",
  // width: focused ? "100%" : "70%",
  // Border styles for focused state
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "#454343ad", // Change focus border color
      boxShadow: "2px 2px 3px 0px #454343ad",
    },
    // Border styles for hover
    "&:hover fieldset": {
      border: ".5px solid #454343ad", // Disable border on hover
      boxShadow: "2px 2px 3px 0px #1a0505ad",
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
}));
export const FileInput = styled("input")({
  display: "none",
});
export const StickyBox = styled(Box)(({ theme }) => ({
  position: "sticky",
  top: 0,
  backgroundColor: "lightblue",
  padding: theme.spacing(2),
}));
