import calender from "../../assets/img/calender.png";
import { useSearchParams } from "react-router-dom";
import React, { useEffect } from "react";
import "./Main.css";
const Main = ({ name }) => {
  const [searchParams, setSeratchParams] = useSearchParams();
  useEffect(() => {
    const timer1 = setTimeout(() => {
      document.body.classList.add("fade-out");
    }, 2000);

    const timer2 = setTimeout(() => {
      window.location.href = "/taste?time=";
    }, 3000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);
  return (
    <div className="tasteMain">
      <img className="tasteMain_calenderImg" src={calender} />
      <div className="tasteMain_title1">
        {`${name.substring(1, 3)} 님 맞춤 시간표를 짜기 위해`}
      </div>
      <div className="tasteMain_title2">몇 가지 질문을 드릴게요!</div>
      <span id="s">입력하신 선호도는 나중에 변경할 수 있어요.</span>
    </div>
  );
};

export default Main;
