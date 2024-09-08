import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";
import { Scrollbar } from "swiper/modules";
import { useState } from "react";

import "./FirstFilteringTimetable.css";
import blue_heart from "../../assets/img/blue_heart.png";
import gray_heart from "../../assets/img/gray_heart.png";
import back from "../../assets/img/back.png";
import Schedule from "../Schedule.js";
import instance from "../../access/instance.js";
import FirstFilteringLoading from "./FirstFilteringLoading.js";
import axios from "axios";
import ai from "../../assets/img/ai.png";

const FirstFilteringTimetable = () => {
  const [likedStates, setLikedStates] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  const getShedule = async () => {
    const id = localStorage.getItem("id");
    const courses = localStorage.getItem("courses");
    const response = await axios.post(
      process.env.REACT_APP_NOTION_SERVER_URL +
        "timetablepage/firstFilteringTimetable/",
      {
        courses: courses,
        id: id,
      }
    );
    const list = await response.data.courses;
    setSchedules(list);
    let likes = [];
    list.map(() => likes.push(false));
    setLikedStates(likes);
    setFadeOut(true);
    setTimeout(() => {
      setIsLoading(false); // 페이드 아웃 애니메이션 후 로딩 상태 해제
    }, 1000);
  };

  useState(() => {
    getShedule();
  }, []);

  const handleToggle = (index) => {
    setLikedStates((prev) => {
      const newStates = [...prev];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };
  const getAi = () => {
    window.location.href = "http://18.140.185.78:8501";
  };
  const goBack = () => {
    window.location.href = "/firstFilteringLoading";
  };

  const goNext = () => {
    const final = [];
    likedStates.map((status, index) => {
      if (status) {
        final.push(schedules[index]);
      }
    });
    localStorage.setItem("liked", JSON.stringify(final));
    window.location.href = "/firstFilteringQuestion";
  };

  if (isLoading) {
    return (
      <div className={`loading-container ${fadeOut ? "fade-out" : ""}`}>
        <FirstFilteringLoading />
      </div>
    ); // 로딩 중일 때 로딩 페이지를 보여줌
  }
  return (
    <div className="fflt_container">
      <img src={ai} className="ai" onClick={getAi} />
      <img src={back} className="goback" onClick={goBack} />
      <Swiper
        className="fflt_swiper"
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
            <div className="fflt_theader">
              <div className="fflt_title">시간표 {index + 1}</div>
              <img
                src={likedStates[index] ? blue_heart : gray_heart}
                onClick={() => handleToggle(index)}
                className="fflt_heart"
              />
            </div>
            <div className="fflt_content">
              <Schedule schedule={timetable} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <button className="fflt_nextButton" onClick={goNext}>
        다음으로 넘어가기
      </button>
    </div>
  );
};

export default FirstFilteringTimetable;
