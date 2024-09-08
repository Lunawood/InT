import React, { useState, useEffect } from "react";

import "../css/Timetable.css";
import back from "../assets/img/back.png";

const Timetable = () => {
  const goBack = () => {
    window.location.href = "/homeAftLog";
  };

  const goManual = () => {
    window.location.href = "/manualAutoQ";
  };

  const goFiltering = () => {
    window.location.href = "/firstFiltering";
  };
  return (
    <div className="timetable_container">
      <img className="goback" src={back} onClick={goBack}></img>
      <div className="timetable_title1">InT는 시간표를 더욱 쉽게</div>
      <div className="timetable_title2">짤 수 있는 기능을 제공해요!</div>
      <div className="timetable_content">
        <div className="timetable_line"></div>
        <button className="timetable_filteringButton" onClick={goFiltering}>
          네! InT가 제공하는 기능으로
          <br />
          맞춤형 시간표를 짜 볼래요.
        </button>
        <button className="timetable_manualButton" onClick={goManual}>
          직접 짜는 게 더 편해요.
        </button>
      </div>
    </div>
  );
};

export default Timetable;
