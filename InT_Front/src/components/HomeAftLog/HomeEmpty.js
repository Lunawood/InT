import React, { useState, useEffect } from "react";

import "./HomeEmpty.css";
import Exclamation_mark from "../../assets/img/Exclamation_mark.png";

const HomeEmpty = () => {
    const goTimetable = () => {
      window.location.href = "/timetable";
    };
    return (
      <div className="homeEmpty_container">
        <img className="homeEmpty_img" src={Exclamation_mark}></img>
        <div className="homeEmpty_title1">아직 이번 학기 시간표가</div>
        <div className="homeEmpty_title2">저장되어 있지 않아요!</div>
        <button className="homeEmpty_timetableButton" onClick={goTimetable}>이번 학기 시간표 짜러 이동하기</button>
      </div>
    );
  };
  
  export default HomeEmpty;
