import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./imageSlider.scss";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Box, Typography, useMediaQuery } from "@mui/material";

const sliderImages = [
  {
    url: "/assets/images/home-img/home-banner_img.avif",
    title: "Senya Senior High School",
    description: "We are the best among equals!",
    actionButtonText: "Enroll Now",
    actionLink: "/sensec/students/enrollment/documentation",
    alt: "Sensec Classroom Image",
  },
  {
    url: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80",
    title: "How To Log Into Your Portal",
    description:
      "Kindly watch this short video on how to log into your portal.",
    actionButtonText: "Click Here",
    actionLink: "/sensec/portal/how_to_login",
    alt: "Portal Image",
  },
  {
    url: "https://images.unsplash.com/photo-1506377872008-6645d9d29ef7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    title: "School Library",
    description:
      "Our Library is fully resourced with all the needs of our Students.",
    actionButtonText: "Discover More",
    actionLink: "/sensec/school_library",
    alt: "Sensec Library Image",
  },
  {
    url: "https://images.unsplash.com/photo-1629904853893-c2c8981a1dc5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    title: "IT Department",
    description: "All you need to know about our IT department.",
    actionButtonText: "Read More",
    actionLink: "/sensec/school_IT_department",
    alt: "Sensec IT Department Image",
  },
  {
    url: "https://images.unsplash.com/photo-1514124725446-e963f5d6f354?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1629&q=80",
    title: "School Cadet",
    description: "# 1 School Cadet in Ghana handled by top military officials.",
    actionButtonText: "Discover More",
    actionLink: "/sensec/school_cadet",
    alt: "Sensec Cadet Image",
  },
];

export function ImageSlider() {
  const navigate = useNavigate();
  const settings = {
    dots: true, // show dots navigation
    infinite: true, // infinite loop
    speed: 500,
    slidesToShow: 1, // show one image at a time
    slidesToScroll: 1,
    autoplay: true, // automatically change slides
    autoplaySpeed: 5000,
    // arrows: true,
  };

  const animate1 = {
    off: { y: -50, opacity: 0 },
    on: {
      y: -10,
      opacity: 1,
      transition: { type: "spring", bounce: 0.3, duration: 3 },
    },
  };
  const animate2 = {
    off: { y: 50, opacity: 0 },
    on: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", bounce: 0.3, duration: 3, delay: 0.5 },
    },
  };
  const animate3 = {
    off: { y: 50, opacity: 0 },
    on: {
      y: 10,
      opacity: 1,
      transition: { type: "spring", bounce: 0.3, duration: 3, delay: 1 },
    },
  };

  // Detect landscape orientation
  const isLandscape = useMediaQuery("(orientation: landscape)");

  return (
    <Box
      component="div"
      id="homeImageSliderWrap"
      sx={{
        display: "inline-block",
        width: "100%",
        height: isLandscape
          ? "47vh"
          : {
              xs: "25vh",
              sm: "30vh",
              md: "40vh",
              lg: "40vh",
            },
      }}
    >
      <Slider {...settings}>
        {sliderImages?.map((image) => (
          <Box
            key={image?.title}
            sx={{
              position: "relative",
              height: isLandscape
                ? "47vh"
                : {
                    xs: "25vh",
                    sm: "30vh",
                    md: "40vh",
                    lg: "40vh",
                  },
            }}
          >
            <img
              src={image.url}
              alt={`slide-${image?.alt}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
            {/* Overlay */}
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.5)", // semi-transparent overlay
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                cursor: "grab",
              }}
            >
              <Box sx={{ padding: ".5rem 1rem" }}>
                <motion.div
                  initial={"off"}
                  whileInView={"on"}
                  variants={animate1}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: {
                        xs: "1.5rem",
                        sm: "2rem",
                        md: "2.5rem",
                        lg: "3rem",
                      },
                      color: "#fff",
                    }}
                  >
                    {image.title}
                  </Typography>
                </motion.div>
                <motion.div
                  initial={"off"}
                  whileInView={"on"}
                  variants={animate2}
                >
                  {/* {image.description} */}
                  <Typography
                    variant="h1"
                    sx={{
                      fontSize: {
                        xs: "1rem",
                        sm: "1.3rem",
                        md: "1.5rem",
                        lg: "2rem",
                      },
                      color: "#fff",
                      backgroundColor: "rgba(0, 0, 0, 0.6)",
                      padding: ".5rem",
                      borderRadius: "0.4rem",
                      letterSpacing: "1px",
                      width: "fit-content",
                    }}
                  >
                    {image.description}
                  </Typography>
                </motion.div>
                <motion.button
                  onClick={() => {
                    localStorage.removeItem("currentNavLink");
                    navigate(image.actionLink);
                  }}
                  id="ImgSliderBtn"
                  initial={"off"}
                  whileInView={"on"}
                  variants={animate3}
                >
                  {/* <ImageSliderBtn
                      sx={{
                        height: "1rem",
                      }}
                    >
                      <Button
                        sx={{
                          backgroundColor: "none",
                          height: "2rem",
                          // position: "relative",
                          // backgroundColor: "transparent",
                          // padding: "0.5rem",
                          // transition: "color 0.4s linear",
                          color: "#fff",
                          // fontSize: "1.1em",
                          // letterSpacing: "1px",
                          // cursor: "pointer",
                          // borderRadius: "0.4rem",
                          // border: "2px solid #fff",
                        }}
                      >
                      </Button>
                    </ImageSliderBtn> */}
                  <Typography
                    variant="h1"
                    sx={{
                      fontSize: {
                        xs: "1rem",
                        sm: "1.5rem",
                      },
                      color: "#fff",
                    }}
                  >
                    {image.actionButtonText}
                  </Typography>
                </motion.button>
              </Box>
            </Box>
          </Box>
        ))}
      </Slider>
    </Box>
  );
}
