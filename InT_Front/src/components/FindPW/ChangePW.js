import React, { useState, useEffect } from "react";

import good from "../../assets/img/check_good.png";
import bad from "../../assets/img/check_bad.png";
import info from "../../assets/img/Information.png";
import back from "../../assets/img/back.png";

import "./ChangePW.css";
import axios from "axios";
const ChangePW = () => {
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");

  const checkPassword = (str) => {
    const hasLetter = /[a-zA-Z]/.test(str); // 영문 확인
    const hasDigit = /\d/.test(str); // 숫자 확인
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(str); // 특수 문자 확인
    const checkLength = password.length >= 12;
    return hasLetter && hasDigit && hasSpecialChar && checkLength;
  };

  const changePassword = async (event) => {
    event.preventDefault();
    const span = document.querySelector("#change-message");
    if (password !== repassword) {
      span.className = "error error-text";
      span.innerText = "비밀번호가 일치하지 않습니다.";
    } else if (!checkPassword(password)) {
      span.className = "error error-text";
      span.innerText = "비밀번호 조건이 맞지 않습니다.";
    } else {
      //localStore의 id 정보로 비밀번호 변경
      const response = await axios.post(
        "http://18.140.185.78:8000/changePw",
        {
          id: localStorage.getItem("id"),
          password: password,
        }
      );
      localStorage.removeItem("id");
      window.location.href = "/findPw?check=true&success=true";
    }
  };
  const goBack = () => {
    localStorage.removeItem("id");
    window.location.href = "/findPw";
  };
  const goFindId = () => {
    window.location.href = "/findId";
  };
  const goFindPW = () => {
    window.location.href = "/findPw";
  };
  return (
    <div className="container">
      <img src={back} className="goback" onClick={goBack} />
      <h1 className="find-h1">아이디/ 비밀번호 찾기</h1>
      <div className="tabs">
        <div className="tab inactive" onClick={goFindId}>
          아이디 찾기
        </div>
        <div className="tab active" onClick={goFindPW}>
          비밀번호 찾기
        </div>
      </div>
      <form>
        <div className="new-container">
          <label className="pw-label">새로운 비밀번호</label>
          <div className="change-input-container">
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="변경하실 비밀번호를 입력해주세요."
              className="password-input"
            />
            {checkPassword(password) ? (
              <img className="check-img" src={good} />
            ) : (
              <img className="check-img" src={bad} />
            )}
          </div>
          <div className="info-container">
            <img className="info-img" src={info} />
            <span className="info-span">
              비밀번호는 영문, 숫자, 특수 문자를 포함하여
              <br /> 12자 이상이어야 합니다.
            </span>
          </div>
        </div>
        <div className="new-container next-container">
          <label className="pw-label">비밀번호 확인</label>
          <div className="change-input-container">
            <input
              type="password"
              onChange={(e) => setRepassword(e.target.value)}
              placeholder="비밀번호를 재입력해주세요."
              className="password-input"
            />
            {password === repassword && password.length > 1 ? (
              <img className="check-img" src={good} />
            ) : (
              <img className="check-img" src={bad} />
            )}
          </div>

          {password === repassword ? (
            <span className="hidden" id="change-message"></span>
          ) : (
            <span className="hidden" id="change-message">
              비밀번호가 일치하지 않습니다.
            </span>
          )}
        </div>
        <button onClick={changePassword} className="findpw-button">
          비밀번호 변경
        </button>
      </form>
    </div>
  );
};

export default ChangePW;
