import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./manualStartQ.css";
import back from "../../assets/img/back.png";
import bulb from "../../assets/img/lightbulb.png";

const ManualStartQ = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const goAutoQ = () => {
    window.location.href = "/manualAutoQ";
  };

  const goHome = () => {
    window.location.href = "/homeTimetable";
  };
  return (
    <div className="manualStartQ_container">
      <img className="goback" src={back} onClick={goBack}></img>
      <div className="manualStartQ_title">더 추가할 과목이 있으신가요?</div>
      <div className="manualStartQ_content">
        <div className="manualStartQ_info">
          <img className="manualStartQ_infoImg" src={bulb}></img>
          <div className="manualStartQ_infoText">
            남은 학점 중 원하는 과목을 직접 추가할 수 있어요!
          </div>
        </div>
        <div className="manualStartQ_line"></div>
        <button className="manualStartQ_autoQButton" onClick={goAutoQ}>
          네, 몇 가지 고민되는 과목을 추가할래요.
        </button>
        <button className="manualStartQ_homeButton" onClick={goHome}>
          아니요, 더 이상 추가할 과목이 없어요.
        </button>
      </div>
    </div>
  );
};

export default ManualStartQ;
