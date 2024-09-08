import React, { useState, useEffect } from "react";

import "./FirstFilteringQuestion.css";
import back from "../../assets/img/back.png";

const FirstFilteringQuestion = () => {
  const goBack = () => {
    window.location.href = "/firstFilteringTimetable";
  };

  const goSecond = () => {
    window.location.href = "/sndHateTime";
  };

  const goDecide = () => {
    const liked = JSON.parse(localStorage.getItem("liked"));
    if (liked.length == 0) {
      alert("찜한 시간표가 없습니다!");
    } else {
      window.location.href = "/firstFilteringDecide";
    }
  };
  return (
    <div className="ffq_container">
      <img className="goback" src={back} onClick={goBack}></img>
      <div className="ffq_title1">최종 확정하고 싶은</div>
      <div className="ffq_title2">시간표가 있으셨나요?</div>
      <div className="ffq_content">
        <div className="ffq_line"></div>
        <button className="ffq_filteringButton" onClick={goDecide}>
          네, 찜한 시간표 중에서 고를래요.
        </button>
        <button className="ffq_manualButton" onClick={goSecond}>
          아니요, 제가 원하는 조건의 시간표가 없어요.
          <br />
          조건을 더 걸어볼래요.
        </button>
      </div>
    </div>
  );
};

export default FirstFilteringQuestion;
