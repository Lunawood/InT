import React, { useState, useEffect } from "react";

import "./ChangeAlert.css";
import locker from "../../assets/img/locker.png";

const ChangeAlert = () => {
    const goLogin = () => {
      window.location.href = "/login";
    };
    return (
      <div className="changeAlert_container">
        <img className="changeAlert_img" src={locker}></img>
        <div className="changeAlert_title1">비밀번호 변경을 완료했습니다!</div>
        <div className="changeAlert_title2">새로운 비밀번호로 로그인해주세요.</div>
        <button className="changeAlert_loginButton" onClick={goLogin}>로그인하기</button>
      </div>
    );
  };
  
  export default ChangeAlert;
  