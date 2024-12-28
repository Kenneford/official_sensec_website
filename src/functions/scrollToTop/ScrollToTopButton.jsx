import { useState, useEffect } from "react";
import { KeyboardArrowUp } from "@mui/icons-material";
import { Fab, useTheme, Zoom } from "@mui/material";

export default function ScrollToTopButton() {
  const [showButton, setShowButton] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const theme = useTheme();

  return (
    <Zoom in={showButton}>
      <Fab
        color="success"
        size="medium"
        onClick={scrollToTop}
        aria-label="Scroll to top"
        style={{
          position: "fixed",
          bottom: theme.spacing(4),
          right: theme.spacing(4),
        }}
      >
        <KeyboardArrowUp />
      </Fab>
    </Zoom>
  );
}
