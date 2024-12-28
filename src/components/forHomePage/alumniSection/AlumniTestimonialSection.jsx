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
    name: "John Doe",
    image:
      "https://images.unsplash.com/photo-1542596768-5d1d21f1cf98?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    text: "This is the best service I have ever used!",
    programme: "Web Developer",
    yearGraduated: " 2009",
  },
  {
    name: "Jane Smith",
    image:
      "https://images.unsplash.com/photo-1592275772614-ec71b19e326f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    text: "Highly recommend this company!",
    programme: "Caterer",
    yearGraduated: " 2003",
  },
  {
    name: "Alex Johnson",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    text: "Incredible experience from start to finish.",
    programme: "Lecturer",
    yearGraduated: " 2009",
  },
  {
    name: "Emily Davis",
    image:
      "https://images.unsplash.com/photo-1520341280432-4749d4d7bcf9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    text: "Professional and quick!",
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
              <p>{test?.text}</p>
            </Box>
          </SwiperSlide>
        ))}
        {/* <SwiperSlide className="testimonial">
          <Box className="alumniImg">
            <img
              src="https://images.unsplash.com/photo-1542596768-5d1d21f1cf98?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
              alt=""
            />
          </Box>
          <Box className="alumniInfo">
            <h5>Jennifer Aboagye</h5>
            <span>Web Developer (2009)</span>
          </Box>
          <Box className="testimonialText">
            <p>
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form, by
              injected humour, or randomised words which don't look even
              slightly believable. If you are going to use a passage of Lorem
              Ipsum .
            </p>
          </Box>
        </SwiperSlide>
        <SwiperSlide className="testimonial">
          <Box className="alumniImg">
            <img
              src="https://images.unsplash.com/photo-1592275772614-ec71b19e326f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
              alt=""
            />
          </Box>
          <Box className="alumniInfo">
            <h5>Millicent Ama Gyamfoah</h5>
            <span>Caterer (2003)</span>
          </Box>
          <Box className="testimonialText">
            <p>
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form, by
              injected humour, or randomised words which don't look even
              slightly believable. If you are going to use a passage of Lorem
              Ipsum .
            </p>
          </Box>
        </SwiperSlide>
        <SwiperSlide className="testimonial">
          <Box className="alumniImg">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
              alt=""
            />
          </Box>
          <Box className="alumniInfo">
            <h5>Benjamin Acquah</h5>
            <span>Lecturer (2009)</span>
          </Box>
          <Box className="testimonialText">
            <p>
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form, by
              injected humour, or randomised words which don't look even
              slightly believable. If you are going to use a passage of Lorem
              Ipsum .
            </p>
          </Box>
        </SwiperSlide>
        <SwiperSlide className="testimonial">
          <Box className="alumniImg">
            <img
              src="https://images.unsplash.com/photo-1520341280432-4749d4d7bcf9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
              alt=""
            />
          </Box>
          <Box className="alumniInfo">
            <h5>Stephen Ansah</h5>
            <span>Bank Manager (2017)</span>
          </Box>
          <Box className="testimonialText">
            <p>
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form, by
              injected humour, or randomised words which don't look even
              slightly believable. If you are going to use a passage of Lorem
              Ipsum .
            </p>
          </Box>
        </SwiperSlide> */}
        <Box className="slider-controler">
          <Box className="swiper-button-prev slider-arrow"></Box>
          <Box className="swiper-button-next slider-arrow"></Box>
          <Box className="swiper-pagination"></Box>
        </Box>
      </Swiper>
      {/* <Footer /> */}
    </Box>
    // <Swiper
    //   slidesPerView={2}
    //   spaceBetween={30}
    //   autoplay={{ delay: 3000, disableOnInteraction: false }}
    //   pagination={{ clickable: true }}
    //   loop={true}
    //   breakpoints={{
    //     // When window width is <= 640px, show 1 slide per view
    //     640: { slidesPerView: 1 },
    //     // When window width is >= 768px, show 2 slides per view
    //     768: { slidesPerView: 2 },
    //   }}
    // >
    //   {testimonials.map((testimonial, index) => (
    //     <SwiperSlide key={index}>
    //       <Card sx={{ minWidth: 275 }}>
    //         <CardContent>
    //           <Grid container spacing={2} alignItems="center">
    //             <Grid item>
    //               <Avatar
    //                 alt={testimonial.name}
    //                 src={testimonial.image}
    //                 sx={{ width: 56, height: 56 }}
    //               />
    //             </Grid>
    //             <Grid item xs>
    //               <Typography variant="h6" component="Box">
    //                 {testimonial.name}
    //               </Typography>
    //               <Typography variant="body2" color="text.secondary">
    //                 {testimonial.review}
    //               </Typography>
    //             </Grid>
    //           </Grid>
    //         </CardContent>
    //       </Card>
    //     </SwiperSlide>
    //   ))}
    // </Swiper>
    // <Box sx={{ width: "80%", margin: "auto", mt: 5 }}>
    //   <Slider {...settings}>
    //     {testimonials.map((_, testimonial) => (
    //       <Grid container spacing={3} key={testimonial}>
    //         {testimonials
    //           .slice(testimonial * 2, testimonial * 2 + 2)
    //           .map((testimonial) => (
    //             <Grid item xs={12} md={6} key={testimonial?.name}>
    //               <Card
    //                 sx={{ display: "flex", alignItems: "center", padding: 2 }}
    //               >
    //                 <Avatar
    //                   src={testimonial.image}
    //                   sx={{ width: 80, height: 80, mr: 2 }}
    //                 />
    //                 <CardContent>
    //                   <Typography variant="h6">{testimonial.name}</Typography>
    //                   <Typography variant="body2">
    //                     {testimonial.text}
    //                   </Typography>
    //                 </CardContent>
    //               </Card>
    //             </Grid>
    //           ))}
    //       </Grid>
    //     ))}
    //   </Slider>
    // </Box>
    // <Container sx={{ mt: 5, textAlign: "center" }}>
    //   <Box
    //     sx={{
    //       display: "flex",
    //       flexDirection: "column",
    //       alignItems: "center",
    //       transition: "transform 0.5s ease-in-out",
    //     }}
    //   >
    //     <Avatar
    //       alt={testimonials[activeIndex].name}
    //       src={testimonials[activeIndex].image}
    //       sx={{ width: 150, height: 150, mb: 2 }}
    //     />
    //     <Typography variant="h6">{testimonials[activeIndex].name}</Typography>
    //     <Typography variant="body1" sx={{ mt: 1, maxWidth: 600 }}>
    //       {testimonials[activeIndex].feedback}
    //     </Typography>
    //   </Box>
    // </Container>
  );
}
