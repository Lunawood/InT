import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";
import { Scrollbar } from "swiper/modules";
import { useState, useEffect, useRef } from "react";

import "./ManualRandomSelect.css";
import back from "../../assets/img/back.png";
import Schedule from "../Schedule.js";
import axios from "axios";
import ManualRandomLoading from "./ManualRandomLoading.js";

const ManualRandomSelect = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [schedules, setSchedules] = useState([]);
  const swiperRef = useRef(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const getData = async () => {
    const liberal = JSON.parse(
      localStorage.getItem("selectedLiberalConditions")
    );
    const major = JSON.parse(localStorage.getItem("selectedMajorConditions"));
    const id = localStorage.getItem("id");
    const response = await axios.post(
      "http://18.140.185.78:8000/timetablepage/getSchedule/",
      {
        liberal: liberal,
        major: major,
        id: id,
      }
    );
    const data = await response.data.courses;
    setSchedules(data);
    setFadeOut(true);
    setTimeout(() => {
      setIsLoading(false); // 페이드 아웃 애니메이션 후 로딩 상태 해제
    }, 1000);
  };
  useEffect(() => {
    getData();
  }, []);
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
    window.location.href = "/homeTimetable";
  };

  const goBack = () => {
    window.location.href = "/firstFilteringQuestion";
  };
  if (isLoading) {
    return (
      <div className={`loading-container ${fadeOut ? "fade-out" : ""}`}>
        <ManualRandomLoading></ManualRandomLoading>
      </div>
    );
  }
  return (
    <div className="manualselect_container">
      <img src={back} className="goback" onClick={goBack} />
      <Swiper
        onSlideChange={handleSlideChange}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        className="manualselect_swiper"
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
            <div className="manualselect_theader">
              <div className="manualselect_title">시간표 {index + 1}</div>
            </div>
            <div className="manualselect_content">
              <Schedule schedule={timetable} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <button className="manualselect_nextButton" onClick={goNext}>
        최종 선택하기
      </button>
    </div>
  );
};

export default ManualRandomSelect;
