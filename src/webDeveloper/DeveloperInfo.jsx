import { Close, Email, Language, WhatsApp } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  ClickAwayListener,
  Divider,
  IconButton,
  Paper,
  Popper,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import WebsiteDeveloperButton from "./WebsiteDeveloperButton";
import ScrollToTopButton from "../functions/scrollToTop/ScrollToTopButton";

export default function DeveloperInfo({
  open,
  handleClick,
  handleClickAway,
  showButton,
  setShowButton,
  scrollToTop,
}) {
  const [isLandScape, setIsLandScape] = useState(false);
  const phoneNumber = "+4915755359461"; // WhatsApp phone number

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());

  gtag("config", "G-MZ4J9R0K70");

  const handleWhatsAppCallClick = () => {
    gtag("event", "click", {
      event_category: "Button",
      event_label: "WhatsApp Chat",
      value: 1,
    });
    window.open(`https://wa.me/${phoneNumber}`, "_blank");
  };

  function isLandscape() {
    // return window.matchMedia("(orientation: landscape)").matches;
    return window.matchMedia("(max-width: 1024px) and (orientation: landscape)")
      .matches;
  }

  useEffect(() => {
    if (isLandscape()) {
      console.log("Landscape mode detected!");
      // Render landscape-specific content
      setIsLandScape(true);
    }
  }, []);
  // Listen for screen orientation changes
  window.addEventListener("resize", () => {
    if (isLandscape()) {
      console.log("Switched to Mobile Landscape Mode");
      setIsLandScape(true);
    } else {
      console.log("Switched to another mode");
      setIsLandScape(false);
    }
  });

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box
        sx={{
          position: "fixed",
          bottom: 60,
          right: 20,
          zIndex: 1250,
        }}
      >
        <Box sx={{ position: "relative" }}>
          {/* Button Row (Web Developer + Scroll Button) */}
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              right: -12,
              color: "gray",
              display: "flex",
              gap: 1,
            }}
          >
            <WebsiteDeveloperButton
              showButton={showButton}
              handleClick={handleClick}
            />
            {showButton && (
              <ScrollToTopButton
                showButton={showButton}
                setShowButton={setShowButton}
                scrollToTop={scrollToTop}
              />
            )}
          </Box>
          {/* Developer Info Box */}
          {!isLandScape && (
            <Paper
              elevation={3}
              sx={{
                position: "absolute",
                bottom: 40,
                right: -12,
                width: "300px",
                p: 2,
                borderRadius: "10px",
                backgroundColor: "white",
                boxShadow: 3,
                transform: open ? "scaleY(1)" : "scaleY(0)",
                transformOrigin: "bottom",
                transition: "transform 0.3s ease-in-out",
                overflow: "hidden",
                color: "#696969",
              }}
            >
              {/* Close Button */}
              <IconButton
                onClick={handleClick} // Toggle close
                sx={{
                  position: "absolute",
                  top: 5,
                  right: 5,
                  color: "gray",
                }}
                size="small"
              >
                <Close />
              </IconButton>

              {/* Avatar & Info */}
              <Avatar
                src="https://res.cloudinary.com/codewithkenn/image/upload/v1740002644/Students/bhvrfjhhrwkxp0laujxb.jpg"
                alt="Developer's Image"
                sx={{
                  mx: "auto",
                  borderRadius: ".4rem",
                  objectFit: "cover",
                  width: "5rem",
                  height: "5rem",
                }}
              />
              <Typography
                variant="h6"
                sx={{ fontSize: ".8rem", textAlign: "center", mt: 1, mb: 1 }}
              >
                Patrick Kenneford Annan
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ textAlign: "center", mb: 1, color: "#3995d7" }}
              >
                Full-Stack Web & App Developer | HTML | React | JavaScript |
                Node.js
                {/* | MUI */}
              </Typography>
              <Divider />
              <Typography variant="body2" sx={{ mt: 1 }}>
                🚀 2+ years of experience building scalable and modern web
                applications.
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                🔹 **What I Create:**
              </Typography>
              <Typography variant="body2">
                ✔ School Management Systems
              </Typography>
              <Typography variant="body2">✔ E-Commerce Platforms</Typography>
              <Typography variant="body2">✔ Chat Applications</Typography>
              <Typography variant="body2">✔ Company & Business Apps</Typography>
              <Typography variant="body2">✔ ...and many more!</Typography>

              {/* Contact Details */}
              <Typography
                variant="body2"
                sx={{ mt: 1 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: ".5rem",
                  fontWeight: 500,
                }}
              >
                <Email sx={{ fontSize: "1.2rem" }} /> kenneford85@gmail.com
              </Typography>
              <Typography
                variant="body2"
                sx={{ mt: 1, mb: 1 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: ".5rem",
                  cursor: "pointer",
                }}
              >
                <WhatsApp sx={{ fontSize: "1.2rem", color: "#0d930d" }} />
                <Button
                  onClick={handleWhatsAppCallClick}
                  sx={{
                    color: "#696969",
                    padding: "unset",
                    // fontWeight: 300,
                    fontSize: ".8rem",
                    "&:hover": {
                      backgroundColor: "transparent",
                    },
                  }}
                >
                  +49 1575 5359461
                </Button>
              </Typography>
              {/* <Typography
              variant="body2"
              sx={{ mt: 1, mb: 1 }}
              style={{ display: "flex", alignItems: "center", gap: ".5rem" }}
            >
              <Language sx={{ fontSize: "1.2rem", color: "#3995d7" }} />
              <Link href="https://somelink.com" style={{ color: "#696969" }}>
                www.mywebsite.com
              </Link>
            </Typography> */}
              <Divider />
              <Typography
                sx={{ mt: 1, textAlign: "center", fontSize: ".8rem" }}
              >
                Contact me for something amazing! 💡💻
              </Typography>
            </Paper>
          )}
          {isLandScape && (
            <Paper
              elevation={3}
              sx={{
                position: "absolute",
                bottom: 40,
                right: -12,
                width: "300px",
                p: 2,
                borderRadius: "10px",
                backgroundColor: "white",
                boxShadow: 3,
                transform: open ? "scaleY(1)" : "scaleY(0)",
                transformOrigin: "bottom",
                transition: "transform 0.3s ease-in-out",
                overflow: "hidden",
                color: "#696969",
              }}
            >
              {/* Close Button */}
              {/* <IconButton
                onClick={handleClick} // Toggle close
                sx={{
                  position: "absolute",
                  top: 5,
                  right: 5,
                  color: "gray",
                }}
                size="small"
              >
                <Close />
              </IconButton> */}

              {/* Avatar & Info */}
              {/* <Avatar
                src="https://res.cloudinary.com/codewithkenn/image/upload/v1740002644/Students/bhvrfjhhrwkxp0laujxb.jpg"
                alt="Developer's Image"
                sx={{
                  mx: "auto",
                  borderRadius: ".4rem",
                  objectFit: "cover",
                  width: "5rem",
                  height: "5rem",
                }}
              /> */}
              {/* <Typography
                variant="h6"
                sx={{ fontSize: ".8rem", textAlign: "center", mt: 1, mb: 1 }}
              >
                Patrick Kenneford Annan
              </Typography> */}
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ textAlign: "center", mb: 1, color: "#3995d7" }}
              >
                Full-Stack Web & App Developer | HTML | React | JavaScript |
                Node.js
                {/* | MUI */}
              </Typography>
              <Divider />
              {/* <Typography variant="body2" sx={{ mt: 1 }}>
                🚀 2+ years of experience building scalable and modern web
                applications.
              </Typography> */}
              {/* <Typography variant="body2" sx={{ mt: 1 }}>
                🔹 **What I Create:**
              </Typography>
              <Typography variant="body2">
                ✔ School Management Systems
              </Typography>
              <Typography variant="body2">✔ E-Commerce Platforms</Typography>
              <Typography variant="body2">✔ Chat Applications</Typography>
              <Typography variant="body2">✔ Company & Business Apps</Typography>
              <Typography variant="body2">✔ ...and many more!</Typography> */}

              {/* Contact Details */}
              <Typography
                variant="body2"
                sx={{ mt: 1 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: ".5rem",
                  fontWeight: 500,
                }}
              >
                <Email sx={{ fontSize: "1.2rem" }} /> kenneford85@gmail.com
              </Typography>
              <Typography
                variant="body2"
                sx={{ mt: 1, mb: 1 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: ".5rem",
                  cursor: "pointer",
                }}
              >
                <WhatsApp sx={{ fontSize: "1.2rem", color: "#0d930d" }} />
                <Button
                  onClick={handleWhatsAppCallClick}
                  sx={{
                    color: "#696969",
                    padding: "unset",
                    // fontWeight: 300,
                    fontSize: ".8rem",
                    "&:hover": {
                      backgroundColor: "transparent",
                    },
                  }}
                >
                  +49 1575 5359461
                </Button>
              </Typography>
              {/* <Typography
              variant="body2"
              sx={{ mt: 1, mb: 1 }}
              style={{ display: "flex", alignItems: "center", gap: ".5rem" }}
            >
              <Language sx={{ fontSize: "1.2rem", color: "#3995d7" }} />
              <Link href="https://somelink.com" style={{ color: "#696969" }}>
                www.mywebsite.com
              </Link>
            </Typography> */}
              <Divider />
              <Typography
                sx={{ mt: 1, textAlign: "center", fontSize: ".8rem" }}
              >
                Contact me for something amazing! 💡💻
              </Typography>
            </Paper>
          )}
        </Box>
      </Box>
    </ClickAwayListener>
  );
}
