import React, { useState, useEffect } from "react";
import {
  Close,
  Email,
  KeyboardArrowUp,
  Language,
  WhatsApp,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  ClickAwayListener,
  IconButton,
  Paper,
  Popper,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function WebsiteDeveloperButton({
  setAnchorEl,
  handleClick,
  showButton,
}) {
  // const [anchorEl, setAnchorEl] = useState(null);

  // const handleClickAway = () => {
  //   setAnchorEl(null); // Close when clicking outside
  // };

  // const open = Boolean(anchorEl); // Popper visibility state

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

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        //   href="https://yourwebsite.com"
        size="small"
        title="Contact Developer"
        onClick={handleClick}
        sx={{
          textTransform: "none",
          boxShadow: 3,
          transition: "all 0.3s ease-in-out", // Smooth movement
          width: showButton ? "9rem" : "8rem",
        }}
      >
        Web Developer
      </Button>
    </>
  );
}

WebsiteDeveloperButton.propTypes = {
  showButton: PropTypes.bool,
};
