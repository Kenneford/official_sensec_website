import React from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";

export default function SwiperNavBtn() {
  const swiperNavigation = useSwiper();
  return (
    <div>
      <button className="iconLeft" onClick={() => swiperNavigation.slidePrev()}>
        <ArrowBackIosIcon className="backArrow" />
      </button>
      <button
        className="iconRight"
        onClick={() => swiperNavigation.slideNext()}
      >
        <ArrowForwardIosIcon className="forwardArrow" />
      </button>
    </div>
  );
}
