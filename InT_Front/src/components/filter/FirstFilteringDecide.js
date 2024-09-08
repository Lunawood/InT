import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";
import { Scrollbar } from "swiper/modules";
import { useState, useEffect, useRef } from "react";

import "./FirstFilteringDecide.css";
import back from "../../assets/img/back.png";
import Schedule from "../Schedule.js";
import axios from "axios";
import ai from "../../assets/img/ai.png";

const FirstFilteringDecide = () => {
  const schedules = JSON.parse(localStorage.getItem("liked"));
  const swiperRef = useRef(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const handleSlideChange = (swiper) => {
    setCurrentSlideIndex(swiper.activeIndex);
  };

  const goNext = async () => {
    const id = localStorage.getItem("id");
    try {
      const response = await axios.post(
        process.env.REACT_APP_NOTION_SERVER_URL +
          "timetablepage/firstFilteringDecide/",
        {
          final: schedules[currentSlideIndex],
          id: id,
        }
      );
    } catch (error) {
      console.log(error);
    }
    localStorage.removeItem("liked");
    localStorage.removeItem("courses");
    window.location.href = "/homeTimetable";
  };

  const getAi = () => {
    window.location.href = "http://18.140.185.78:8501";
  };

  const goBack = () => {
    window.location.href = "/firstFilteringQuestion";
  };

  return (
    <div className="ffd_container">
      <img src={ai} className="ai" onClick={getAi} />
      <img src={back} className="goback" onClick={goBack} />
      <Swiper
        onSlideChange={handleSlideChange}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        className="ffd_swiper"
        slidesPerView={1.2}
        centeredSlides={true}
        spaceBetween={40}
        loop={false}
        modules={[Scrollbar]}
        scrollbar={{ draggable: true }}
        speed={200}
      >
        {schedules.map((timetable, index) => (
          <SwiperSlide key={index}>
            <div className="ffd_theader">
              <div className="ffd_title">시간표 {index + 1}</div>
            </div>
            <div className="ffd_content">
              <Schedule schedule={timetable} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <button className="ffd_nextButton" onClick={goNext}>
        이 시간표로 확정할래요!
      </button>
    </div>
  );
};

export default FirstFilteringDecide;
