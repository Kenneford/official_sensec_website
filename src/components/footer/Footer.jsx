import { useState } from "react";
import "./footer.scss";
import FacebookIcon from "@mui/icons-material/Facebook";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { HashLink } from "react-router-hash-link";
import { Box, Grid, Typography } from "@mui/material";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const scrollWithOffset = (el) => {
    const yCoordinate = el.getBoundingClientRect().top + window.screenY;
    const yOffset = -80;
    window.scrollTo({ top: yCoordinate + yOffset, behavior: "smooth" });
  };

  //THIS REMOVES THE HASHLINK TAG FROM THE URL
  if (window.location.hash) {
    window.history.replaceState("", document.title, window.location.pathname);
  }
  const [openChatBox, setOpenChatBox] = useState(false);

  const openChat = () => setOpenChatBox(!openChatBox);

  const phoneNumber = "+233245940586"; // WhatsApp phone number

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
    <Box className="footer">
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        maxWidth={1020}
        m={"auto"}
        className="footerWrap"
        p={1}
      >
        <Box className="footerCont">
          <Box mb={2} className="footerLogo">
            <Typography variant="h1" fontSize={"1.5rem"} fontWeight={500}>
              Sen<span>sec</span>
            </Typography>
            <Typography fontSize={".8rem"} color="#ccc">
              The Great Sensec!
            </Typography>
            <Typography fontSize={".8rem"} color="#ccc">
              Forever Great!
            </Typography>
          </Box>
          <Box className="footerContent">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={8}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Box className="pageLinks">
                      <h3>Useful Links</h3>
                      <HashLink
                        to={"/sensec/homepage#homePage"}
                        smooth
                        scroll={scrollWithOffset}
                      >
                        Home
                      </HashLink>
                      <HashLink
                        to={"/sensec/about#aboutPage"}
                        smooth
                        scroll={scrollWithOffset}
                      >
                        About
                      </HashLink>
                      <HashLink
                        to={"/sensec/courses#allProgrammes"}
                        smooth
                        scroll={scrollWithOffset}
                      >
                        Courses
                      </HashLink>
                      <HashLink
                        to={"/sensec/contact#contactPage"}
                        smooth
                        scroll={scrollWithOffset}
                      >
                        Contact
                      </HashLink>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box className="policy">
                      <h3>Legal Terms</h3>
                      <HashLink
                        to={"/sensec/privacy_policy"}
                        smooth
                        scroll={scrollWithOffset}
                        onClick={() =>
                          localStorage.removeItem("currentNavLink")
                        }
                      >
                        Privacy Policy
                      </HashLink>
                      <HashLink
                        to={"/sensec/terms_of_service"}
                        smooth
                        scroll={scrollWithOffset}
                        onClick={() =>
                          localStorage.removeItem("currentNavLink")
                        }
                      >
                        Terms of Service
                      </HashLink>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Box className="contactUs">
                      <h3>Contact Us</h3>
                      <Box className="contactIcons">
                        <span>
                          <button
                            id="myCallButton"
                            onClick={() =>
                              gtag("event", "click", {
                                event_category: "Button",
                                event_label: "Call",
                                value: 1,
                              })
                            }
                          >
                            <a
                              href="tel:+491784535757"
                              style={{
                                flexWrap: "wrap",
                                wordBreak: "break-word", // Allows breaking words to wrap text
                                overflowWrap: "break-word", // Ensures long words like email addresses wrap
                              }}
                            >
                              <LocalPhoneIcon style={{ color: "#cccc" }} />
                              +233 508 670 598
                            </a>
                          </button>
                        </span>
                        <span>
                          <button
                            id="myWhatsAppButton"
                            onClick={handleWhatsAppCallClick}
                          >
                            <WhatsAppIcon
                              style={{ color: "rgb(25, 173, 30)" }}
                            />
                            <p
                              style={{
                                flexWrap: "wrap",
                                wordBreak: "break-word", // Allows breaking words to wrap text
                                overflowWrap: "break-word", // Ensures long words like email addresses wrap
                              }}
                            >
                              +233 245 940 586
                            </p>
                          </button>
                        </span>
                        <span>
                          <MailOutlineIcon style={{ color: "#cccc" }} />
                          <p
                            style={{
                              flexWrap: "wrap",
                              wordBreak: "break-word", // Allows breaking words to wrap text
                              overflowWrap: "break-word", // Ensures long words like email addresses wrap
                            }}
                          >
                            senya.shs.1991@gmail.com
                          </p>
                        </span>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box className="socials">
                      <h3>Follow Us</h3>
                      <Box className="socialsIcons">
                        <span className="icon">
                          <FacebookIcon titleAccess="Facebook Link" />
                        </span>
                        <span className="icon">
                          <InstagramIcon titleAccess="Instagram Link" />
                        </span>
                        <span className="icon">
                          <LinkedInIcon titleAccess="LinkedIn Link" />
                        </span>
                        <span className="icon">
                          <TwitterIcon titleAccess="Twitter Link" />
                        </span>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
      {/* <Box className="chatIcon" onClick={openChat}>
        {!openChatBox ? (
          <ChatIcon
            style={{
              color: "#039e0f",
              marginRight: ".02rem",
            }}
            titleAccess="Open Chat"
          />
        ) : (
          <CloseIcon className="closeChatIcon" titleAccess="Close Chat" />
        )}
      </Box>
      {openChatBox && (
        <Box className="chatModal">
          <Box className="msgBox">
            <p>This is a message!</p>
          </Box>
          <Box className="inputField">
            <input type="text" className="msgInput" />
            <TelegramIcon className="sendIcon" />
          </Box>
        </Box>
      )} */}
      <Box className="rights">
        <p>
          Copyright &copy;{currentYear}{" "}
          <span style={{ color: "#0fc80f" }}>Sen</span>
          <span style={{ color: "yellow" }}>sec</span>
        </p>
        <Box
          style={{
            border: "1px solid #fff",
            height: "15px",
          }}
        ></Box>
        <p>All Rights Reserved!</p>
      </Box>
    </Box>
  );
}
