import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import "./MakePW.css";

import back from "../../assets/img/back.png";
import good from "../../assets/img/check_good.png";
import bad from "../../assets/img/check_bad.png";
import info from "../../assets/img/Information.png";
import axios from "axios";

const goBack = () => {
  let value = JSON.parse(sessionStorage.getItem("value"));
  let newVal = [];
  for (let i = 0; i < 4; i++) {
    newVal.push(value[i]);
  }
  sessionStorage.setItem("value", JSON.stringify(newVal));
  window.location.href = "/signup?name_birth=true&phone_email=true&id=false";
};

const MakePW = () => {
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");

  useEffect(() => {
    const value = JSON.parse(sessionStorage.getItem("value"));
    if (value.length !== 5) {
      window.location.href = "/signup";
    }
  });

  const checkPassword = (str) => {
    const hasLetter = /[a-zA-Z]/.test(str); // 영문 확인
    const hasDigit = /\d/.test(str); // 숫자 확인
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(str); // 특수 문자 확인
    const checkLength = password.length >= 12;
    return hasLetter && hasDigit && hasSpecialChar && checkLength;
  };

  const Join = async (event) => {
    event.preventDefault();
    const span = document.querySelector("#message");
    if (password !== repassword) {
      span.className = "makePW_joinFail";
    } else {
      const value = JSON.parse(sessionStorage.getItem("value"));
      console.log(value);
      try {
        const response = await axios.post(
          "http://18.140.185.78:8000/signup",
          {
            name: value[0],
            birth: value[1],
            phone: value[2],
            email: value[3],
            id: value[4],
            password: password,
          }
        );
        alert("회원가입완료!");
        sessionStorage.removeItem("value");
        window.location.href = "/login";
      } catch (error) {
        alert("회원가입오류");
      }
      // sessionStorage.removeItem("value");
      // alert("회원가입완료!");
      // window.location.href = "/login";
    }
  };
  return (
    <div className="makePW_container">
      <img src={back} className="goback" onClick={goBack} />
      <div>
        <p className="makePW_title1">사용하실 비밀번호를</p>
        <p className="makePW_title2">알려주세요.</p>
      </div>
      <form>
        <div className="makePW_pwContent">
          <label className="makePW_pwTitle">비밀번호</label>
          <div className="makePW_pwInput">
            <input
              className="makePW_pwInputBox"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="사용하실 비밀번호를 입력해주세요."
            />
            {checkPassword(password) ? (
              <img className="makePW_checkImg" src={good} />
            ) : (
              <img className="makePW_checkImg" src={bad} />
            )}
          </div>
          <div className="makePW_info">
            <img className="makePW_infoImg" src={info} />
            <span className="makePW_infoTxt">
              비밀번호는 영문, 숫자, 특수 문자를 포함하여
              <br />
              12자 이상이어야 합니다.
            </span>
          </div>
        </div>
        <div className="makePW_checkContent">
          <label className="makePW_checkTitle">비밀번호 확인</label>
          <div className="makePW_checkInput">
            <input
              className="makePW_checkInputBox"
              type="password"
              onChange={(e) => setRepassword(e.target.value)}
              placeholder="비밀번호를 재입력해주세요."
            />
            {password === repassword && password.length > 1 ? (
              <img className="makePW_checkImg" src={good} />
            ) : (
              <img className="makePW_checkImg" src={bad} />
            )}
          </div>
          {password === repassword ? null : (
            <span className="hidden" id="message">
              비밀번호가 일치하지 않습니다.
            </span>
          )}
        </div>
        <button className="makePW_nextButton" onClick={Join}>
          회원가입완료
        </button>
      </form>
    </div>
  );
};

export default MakePW;
