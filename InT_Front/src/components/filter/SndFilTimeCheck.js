import React, { useState, useEffect } from "react";

import "./SndFilTimeCheck.css";
import back from "../../assets/img/back.png";

const SndFilTimeCheck = () => {
  const [times, setTimes] = useState([]);
  const name = localStorage.getItem("name");
  useEffect(() => {
    const storedTimes = localStorage.getItem("time");
    if (storedTimes) {
      setTimes(JSON.parse(storedTimes));
    }
  }, []);

  const goBack = () => {
    localStorage.setItem("time", []);
    window.location.href = "/sndHateTime";
  };
  const goNext = () => {
    window.location.href = "/sndFilLikeProf";
  };
  return (
    <div className="sftc_container">
      <img className="goback" src={back} onClick={goBack}></img>
      <div className="sftc_title1">
        {name.substring(1, 3)} 님이 피해야 하는 시간들이에요.
      </div>
      <div className="sftc_title2">정보가 정확한지 확인해 주세요!</div>
      <div className="sftc_content">
        <div className="sftc_line"></div>
        <div className="sftc_infoContainer">
          {times.map((time, index) => (
            <div key={index} className="sftc_info">
              {time}
            </div>
          ))}
        </div>
        <div className="sftc_buttons">
          <button className="sftc_againButton" onClick={goBack}>
            다시 선택할래요
          </button>
          <button className="sftc_nextButton" onClick={goNext}>
            네, 일치해요
          </button>
        </div>
      </div>
    </div>
  );
};

export default SndFilTimeCheck;
