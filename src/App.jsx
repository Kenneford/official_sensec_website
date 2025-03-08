import "./App.scss";
import PageNavigation from "./components/router/PageNavigation";
import ScrollToTop from "./functions/scrollToTop/ScrollToTop";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TokenExpiry from "./pages/auth/token/TokenExpiry";
import ScrollToTopButton from "./functions/scrollToTop/ScrollToTopButton";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import WebsiteDeveloperButton from "./webDeveloper/WebsiteDeveloperButton";
import DeveloperInfo from "./webDeveloper/DeveloperInfo";

function App() {
  if (import.meta.env.MODE === "production") {
    console.log("You are in production mode");
  } else {
    console.log("You are in development mode");
  }

  const [showButton, setShowButton] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);

  // const open = Boolean(anchorEl); // Popper visibility state

  const [open, setOpen] = useState(false);
  console.log("open: ", open);

  const handleClick = () => {
    setOpen((prev) => !prev); // Toggle box visibility
  };

  const handleClickAway = () => {
    setOpen(false); // Close when clicking outside
  };

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

  return (
    <>
      <ScrollToTop />
      <TokenExpiry />
      <PageNavigation />
      <ToastContainer style={{ top: "-.1rem" }} />
      <DeveloperInfo
        open={open}
        handleClick={handleClick}
        handleClickAway={handleClickAway}
        showButton={showButton}
        setShowButton={setShowButton}
        scrollToTop={scrollToTop}
      />
    </>
  );
}

export default App;
