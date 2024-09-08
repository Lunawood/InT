import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import "./MakeID.css";
import back from "../../assets/img/back.png";
import axios from "axios";

const MakeID = () => {
  window.addEventListener("resize", () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  });
  const [checkID, setCheckID] = useState(true);
  const [ID, setID] = useState("");
  const [searchParams, setSeratchParams] = useSearchParams();
  const formRef = useRef();
  useEffect(() => {
    const value = JSON.parse(sessionStorage.getItem("value"));
    if (value.length !== 4) {
      window.location.href = "/signup";
    }
  });

  const Check = async (event) => {
    event.preventDefault();
    const span = document.querySelector("#message");
    // id 중복확인 로직
    try {
      const response = await axios.post(
        "http://18.140.185.78:8000/checkId/",
        {
          id: formRef.current.id.value,
        }
      );
      setCheckID(true);
      span.className = "makeID_checkSuccess";
      span.innerText = "사용 가능한 아이디입니다.";
    } catch (error) {
      setCheckID(false);
      span.className = "makeID_checkFail";
      span.innerText = "이미 사용중인 아이디입니다.";
    }
  };
  const goBack = () => {
    window.location.href = "/signup?name_birth=true&&phone_email=true";
  };
  const goNext = (event) => {
    event.preventDefault();
    if (!checkID) {
      const span = document.querySelector("#message");
      span.className = "makeID_checkFail";
      span.innerText = "사용할 아이디를 입력하고 인증해주세요.";
    } else {
      let value = JSON.parse(window.sessionStorage.getItem("value"));
      value.push(ID);
      sessionStorage.setItem("value", JSON.stringify(value));
      setSeratchParams({
        name_birth: true,
        phone_email: true,
        id: true,
        pw: false,
      });
    }
  };
  return (
    <div className="makeID_container">
      {<img src={back} className="goback" onClick={goBack} />}
      <div>
        <p className="makeID_title1">사용하실 아이디를 </p>
        <p className="makeID_title2">입력해주세요.</p>
      </div>
      <form ref={formRef}>
        <div className="makeID_content">
          <label className="makeID_idTitle">아이디</label>
          <div className="makeID_idInput">
            <input
              className="makeID_idInputBox"
              type="text"
              placeholder="사용하실 아이디를 입력해주세요."
              onChange={(e) => setID(e.target.value)}
              name="id"
            />
            <button className="makeID_checkOnly" onClick={Check}>
              중복확인
            </button>
          </div>
          <span id="message" className="hidden">
            이미 사용중인 아이디입니다.
          </span>
        </div>
      </form>
      <button className="makeID_nextButton" onClick={goNext}>
        다음으로 넘어가기
      </button>
    </div>
  );
};

export default MakeID;
