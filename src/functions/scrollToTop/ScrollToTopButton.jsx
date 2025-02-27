import { KeyboardArrowUp } from "@mui/icons-material";
import { Fab, useTheme, Zoom } from "@mui/material";
import PropTypes from "prop-types";

export default function ScrollToTopButton({ showButton, scrollToTop }) {
  const theme = useTheme();

  return (
    <Zoom in={showButton}>
      <Fab
        title="Scroll To Top"
        color="success"
        size="small"
        onClick={scrollToTop}
        aria-label="Scroll to top"
        style={{
          width: "2.2rem",
          height: "2.2rem",
          borderRadius: "100%",
          transition: "all 0.3s ease-in-out", // Smooth movement
          // position: "fixed",
          // bottom: theme.spacing(4),
          // right: theme.spacing(4),
        }}
      >
        <KeyboardArrowUp />
      </Fab>
    </Zoom>
  );
}

ScrollToTopButton.propTypes = {
  showButton: PropTypes.bool,
  scrollToTop: PropTypes.func,
};
