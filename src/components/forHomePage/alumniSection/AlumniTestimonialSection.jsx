import React, { useEffect, useState } from "react";
import "./testimonial.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  Box,
  Typography,
  Avatar,
  Container,
  CardContent,
  Grid,
  Card,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import {
  EffectCoverflow,
  Pagination,
  Navigation,
  Autoplay,
} from "swiper/modules";

const testimonials = [
  {
    name: "Christabel Doe",
    image:
      "https://images.unsplash.com/photo-1542596768-5d1d21f1cf98?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    text: "This is my root!!! One of the good schools in the region no doubt! Nice environment and good tutors who will take their time to nature your ward. Let your child select SENSEC",
    programme: "Web Developer",
    yearGraduated: " 2009",
  },
  {
    name: "Susanna Smith",
    image:
      "https://images.unsplash.com/photo-1592275772614-ec71b19e326f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    text: "Senya Senior High is one of the best school in Ghana.",
    programme: "Caterer",
    yearGraduated: " 2003",
  },
  {
    name: "Alex Johnson",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    text: "Good school and hostel facilities for males.",
    programme: "Lecturer",
    yearGraduated: " 2009",
  },
  {
    name: "Elvis Davis",
    image:
      "https://images.unsplash.com/photo-1520341280432-4749d4d7bcf9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    text: "It's a great place for any Ghanaian student. In fact, one of the best school you can ever find in Mother-Ghana.",
    programme: "Bank Manager",
    yearGraduated: " 2017",
  },
];

export default function AlumniTestimonialSection() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  // State to manage the active slide index
  const [activeIndex, setActiveIndex] = useState(0);

  // Automatically change the slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 3000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);
  return (
    <Box
      className="testimonialWrap"
      sx={{
        padding: { xs: "1rem .5rem", sm: "2rem 1rem" },
      }}
    >
      <Box className="testimonialHeader">
        <h1>What Our Alumni Says</h1>
      </Box>
      <Swiper
        className="testimonialCont mySwiper"
        effect={"coverflow"}
        modules={[Navigation, Pagination, EffectCoverflow, Autoplay]}
        grabCursor={true}
        autoplay={true}
        // centeredSlides={true}
        spaceBetween={50}
        loop={true}
        // slidesPerView={3}
        coverflowEffect={
          {
            //   rotate: 0,
            //   stretch: 0,
            //   depth: 100,
            //   modifier: 2.5,
          }
        }
        pagination={{ el: ".swiper-pagination", clickable: true }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
          clickable: true,
        }}
        breakpoints={{
          1800: {
            width: 1520,
            slidesPerView: 3,
            spaceBetween: 0,
          },
          1600: {
            width: 1300,
            slidesPerView: 3,
            spaceBetween: 0,
          },
          1024: {
            width: 940,
            slidesPerView: 2,
            spaceBetween: 0,
          },
          960: {
            width: 910,
            slidesPerView: 2,
            spaceBetween: 0,
          },
          768: {
            width: 720,
            slidesPerView: 1,
            spaceBetween: 0,
          },
          520: {
            width: 470,
            slidesPerView: 1,
            spaceBetween: 0,
          },
        }}
      >
        {testimonials?.map((test) => (
          <SwiperSlide key={test?.name} className="testimonial">
            <Box className="alumniImg">
              <Avatar
                src={test?.image}
                alt="Alumni Image"
                sx={{
                  width: "5rem",
                  height: "5rem",
                }}
              />
              {/* <img src={test?.image} alt="" /> */}
            </Box>
            <Box className="alumniInfo">
              <h5>{test?.name}</h5>
              <span>
                {test?.programme} [ {test?.yearGraduated} ]
              </span>
            </Box>
            <Box className="testimonialText">
              <Typography>{test?.text}</Typography>
            </Box>
          </SwiperSlide>
        ))}
        <Box className="slider-controler">
          <Box className="swiper-button-prev slider-arrow"></Box>
          <Box className="swiper-button-next slider-arrow"></Box>
          <Box className="swiper-pagination"></Box>
        </Box>
      </Swiper>
    </Box>
  );
}
