import { useEffect } from "react";
import "./Time.css";

const Time = () => {
  useEffect(() => {
    sessionStorage.setItem("value", "");
  });
  const clickAm = (event) => {
    event.preventDefault();
    const value = [];
    value.push(true);
    sessionStorage.setItem("value", JSON.stringify(value));
    window.location.href = "/taste?time=true&first_class=";
  };
  const ClickPm = (event) => {
    event.preventDefault();
    const value = [];
    value.push(false);
    sessionStorage.setItem("value", JSON.stringify(value));
    window.location.href = "/taste?time=true&first_class=";
  };
  return (
    <div className="time_container">
      <div className="progress-bar-container">
        <div className="progress-bar">
          <div className="progress"></div>
        </div>
      </div>
      <div className="time_title">
        오전과 오후 수업 중,
        <br />
        어느 시간대를 더 선호하시나요?
      </div>
      <div className="time_line"></div>
      <div className="time_button-container">
        <button onClick={clickAm} className="time_btn">
          오전 수업이 좋아요
        </button>
        <button onClick={ClickPm} className="time_btn">
          오후 수업이 좋아요
        </button>
      </div>
    </div>
  );
};

export default Time;
