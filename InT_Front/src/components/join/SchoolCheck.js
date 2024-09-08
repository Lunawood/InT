import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import "./SchoolCheck.css";
import back from "../../assets/img/back.png";
import axios from "axios";

const SchoolCheck = () => {
  window.addEventListener("resize", () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  });
  const [school, setSchool] = useState(false);
  const [searchParams, setSeratchParams] = useSearchParams();
  const formRef = useRef();

  useEffect(() => {
    const value = JSON.parse(sessionStorage.getItem("value"));
    if (value.length < 4) {
      window.location.href = "/signup";
    } else if (value.length > 4) {
      let newVal = [];
      for (let i = 0; i < 4; i++) {
        newVal.push(value[i]);
      }
      sessionStorage.setItem("value", JSON.stringify(newVal));
    }
  }, []);

  const goBack = () => {
    setSeratchParams({ name_birth: true });
  };

  async function checkScool(event) {
    event.preventDefault();
    const span = document.querySelector("#schoolCheck_message");
    //확인하는 로직
    try {
      const value = JSON.parse(sessionStorage.getItem("value"));
      const response = await axios.post(
        "http://18.140.185.78:8000/checkEmailNumber/",
        {
          email: value[3],
        }
      );
      setSchool(true);
      span.className = "identifySuccess";
      span.innerText = "인증에 성공하였습니다.";
    } catch (error) {
      setSchool(false);
      console.log(error);
      span.className = "identifyFail";
      span.innerText = "인증에 실패하였습니다. 인증 링크를 다시 확인해 주세요.";
    }
  }

  const goNext = (event) => {
    event.preventDefault();
    const span = document.querySelector("#schoolCheck_message");
    if (!school) {
      span.className = "identifyFail";
      span.innerText = "인증을 먼저 완료해주세요.";
    } else {
      setSeratchParams({ name_birth: true, phone_email: true, id: false });
    }
  };

  return (
    <div className="entire">
      <img src={back} className="goback" onClick={goBack} />
      <div>
        <p className="schoolCheckTitle1">인하대학교 재학생이</p>
        <p className="schoolCheckTitle2">맞는지 확인할게요.</p>
      </div>
      <div className="schoolCheck_content">
        <div className="sendAlert">
          입력해 주신 이메일로
          <br />
          인증 링크를 발송했어요!
          <br />
          링크 접속 후 확인 버튼을 눌러주세요.
        </div>
        <button className="schoolCheck_checkButton" onClick={checkScool}>
          인증 링크 확인
        </button>
        <span id="schoolCheck_message" className="hidden">
          인증에 실패하였습니다. 인증번호를 다시 입력해 주세요.
        </span>
        <button className="nextCheckButton" onClick={goNext}>
          다음으로 넘어가기
        </button>
      </div>
    </div>
  );
};

export default SchoolCheck;
