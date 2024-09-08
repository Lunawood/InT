import React, { useState, useEffect } from "react";

import "./manualAutoQ.css";
import back from "../../assets/img/back.png";
import bulb from "../../assets/img/lightbulb.png";

const ManualAutoQ = () => {
  const goBack = () => {
    window.location.href = "/manualStartQ";
  };

  const goAddManual = () => {
    window.location.href = "/manualAddManual";
  };

  const goAddAuto = () => {
    window.location.href = "/manualAddRandom";
  };
  return (
    <div className="manualAutoQ_container">
      <img className="goback" src={back} onClick={goBack}></img>
      <div className="manualAutoQ_title">어떤 방식으로 추가하시겠어요?</div>
      <div className="manualAutoQ_content">
        <div className="manualAutoQ_info">
          <img className="manualAutoQ_infoImg" src={bulb}></img>
          <div className="manualAutoQ_infoText">
            자동 추가 기능은 남은 학점을 전공이나 교양 과목
            <br />
            중에서 자동으로 선택하여 시간표에 추가해줘요!
          </div>
        </div>
        <div className="manualAutoQ_line"></div>
        <button className="manualAutoQ_addManualButton" onClick={goAddManual}>
          직접 시간표에 하나씩 넣어보며 추가할래요.
        </button>
        <button className="manualAutoQ_addAutoButton" onClick={goAddAuto}>
          자동 추가 기능을 이용할래요.
        </button>
      </div>
    </div>
  );
};

export default ManualAutoQ;
