import { useState, useEffect, useRef } from "react";
import "./IDCheck.css";
import back from "../../assets/img/back.png";
import axios from "axios";
const Check = () => {
  const [check, setCheck] = useState(true);
  const [timer, setTimer] = useState(600);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");
  const [third, setThird] = useState("");
  const [number, setNumber] = useState("");
  const formRef = useRef();
  useEffect(() => {
    let interval = null;
    if (isTimerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timer]);

  const sendNumber = async (event) => {
    event.preventDefault();
    setTimer(600);
    setIsTimerActive(true);
    try {
      const response = await axios.post(
        "http://18.140.185.78:8000/checkPhone/",
        {
          phone: `${first}${second}${third}`,
        }
      );
    } catch (error) {
      console.log(error);
      alert("전화번호를 확인해주세요.");
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };
  const checkNumber = async (event) => {
    event.preventDefault();
    //인증번호 인증 로직
    try {
      const response = await axios.post(
        "http://18.140.185.78:8000/checkPhoneNumber/",
        {
          number: number,
          phone: `${first}${second}${third}`,
        }
      );
      setCheck(true);
    } catch (error) {
      setCheck(false);
    }
    const span = document.querySelector("#message");
    if (!check) {
      span.innerText = "인증에 실패하였습니다. 인증번호를 다시 확인해 주세요.";
      span.className = "error";
    } else {
      span.innerText = "인증에 성공하였습니다.";
      span.className = "ok";
    }
  };

  const goNext = async (event) => {
    event.preventDefault();
    const span = document.querySelector("#message");
    if (!check) {
      span.innerText = "인증에 실패하였습니다. 인증번호를 다시 확인해 주세요.";
      span.className = "error";
    } else {
      // 아이디 정보 가져오는 로직(로컬 스토리지에 저장) -> result 값
      try {
        const response = await axios.post(
          "http://18.140.185.78:8000/findId/",
          {
            phone: `${first}${second}${third}`,
          }
        );
        localStorage.setItem("result", [response.data.id, response.data.date]);
      } catch (error) {
        localStorage.setItem("result", []);
      }
      window.location.href = "/findId?check=true";
    }
  };

  const goBack = () => {
    window.location.href = "/login";
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
        <div className="tab active" onClick={goFindId}>
          아이디 찾기
        </div>
        <div className="tab inactive" onClick={goFindPW}>
          비밀번호 찾기
        </div>
      </div>
      <div className="content">
        <label className="phone-label">전화번호</label>
        <div className="phone-input">
          <input
            className="number-first"
            name="first"
            type="text"
            maxLength="3"
            onChange={(e) => {
              setFirst(e.target.value);
            }}
          />
          <span>-</span>
          <input
            className="number-second"
            name="second"
            type="text"
            maxLength="4"
            onChange={(e) => {
              setSecond(e.target.value);
            }}
          />
          <span>-</span>
          <input
            className="number-last"
            name="third"
            type="text"
            maxLength="4"
            onChange={(e) => {
              setThird(e.target.value);
            }}
          />
          <button className="send-code-button" onClick={sendNumber}>
            인증번호 전송
          </button>
        </div>
        <label>인증번호 입력</label>
        <div className="code-input">
          <div className="check-box">
            <input
              type="text"
              placeholder="인증번호 입력"
              name="number"
              onChange={(e) => setNumber(e.target.value)}
            />
            <span className="timer">{formatTime(timer)}</span>
          </div>
          <button className="verify-button" onClick={checkNumber}>
            확인
          </button>
        </div>
        <span className="hidden" id="message"></span>
        <button className="find-button" onClick={goNext}>
          아이디 찾기
        </button>
      </div>
    </div>
  );
};

export default Check;
