import React, { useState } from "react";
import back from "../../assets/img/back.png";
import up from "../../assets/img/up_triangle.png";
import down from "../../assets/img/down_triangle.png";
import "./SndOrdering.css";

const SndOrding = () => {
  const name = localStorage.getItem("name");
  const [firstPriority, setFirstPriority] = useState("1순위");
  const [secondPriority, setSecondPriority] = useState("2순위");
  const [thirdPriority, setThirdPriority] = useState("3순위");
  const [isFirstOpen, setIsFirstOpen] = useState(false);
  const [isSecondOpen, setIsSecondOpen] = useState(false);
  const [isThirdOpen, setIsThirdOpen] = useState(false);

  const toggleFirst = () => setIsFirstOpen((prev) => !prev);
  const toggleSecond = () => setIsSecondOpen((prev) => !prev);
  const toggleThird = () => setIsThirdOpen((prev) => !prev);

  const goBack = () => {
    window.location.href = "/sndFilHateCheck";
  };
  const goNext = () => {
    if (
      firstPriority === "1순위" ||
      secondPriority === "2순위" ||
      thirdPriority === "3순위"
    ) {
      const span = document.querySelector(".ordering_alert");
      span.innerText = "우선순위를 선택해주세요!";
      span.className = "ordering_alert error";
    } else if (
      firstPriority !== secondPriority &&
      firstPriority !== thirdPriority &&
      secondPriority !== thirdPriority
    ) {
      const span = document.querySelector(".ordering_alert");
      span.innerText = "";
      let order = [];
      order.push(firstPriority);
      order.push(secondPriority);
      order.push(thirdPriority);
      localStorage.setItem("ordering", JSON.stringify(order));
      window.location.href = "/sndFilDecide";
    } else {
      const span = document.querySelector(".ordering_alert");
      span.innerText = "우선순위를 중복 없이 선택해주세요!";
      span.className = "ordering_alert error";
    }
  };

  return (
    <div className="ordering_container">
      <img className="goback" src={back} onClick={goBack} alt="Go back" />
      <div className="ordering_title1">
        {name.substring(1, 3)} 님의 필터링 우선순위를
      </div>
      <div className="ordering_title2">알려주세요!</div>
      <div className="ordering_content">
        <div className="ordering_line"></div>
        <div className="ordering_courseInfo">
          <div className="ordering_selectWrapper">
            <select
              className="ordering_select"
              value={firstPriority}
              onChange={(e) => setFirstPriority(e.target.value)}
              onClick={toggleFirst}
            >
              <option value="1순위">1순위</option>
              <option value="time">피해야하는 시간</option>
              <option value="good">선호하는 교수님</option>
              <option value="bad">피하고싶은 교수님</option>
            </select>
            <img
              className="ordering_triangle"
              src={isFirstOpen ? up : down}
              alt="toggle"
            />
          </div>
          <div className="ordering_selectWrapper">
            <select
              className="ordering_select"
              value={secondPriority}
              onChange={(e) => setSecondPriority(e.target.value)}
              onClick={toggleSecond}
            >
              <option value="2순위">2순위</option>
              <option value="time">피해야하는 시간</option>
              <option value="good">선호하는 교수님</option>
              <option value="bad">피하고싶은 교수님</option>
            </select>
            <img
              className="ordering_triangle"
              src={isSecondOpen ? up : down}
              alt="toggle"
            />
          </div>
          <div className="ordering_selectWrapper">
            <select
              className="ordering_select"
              value={thirdPriority}
              onChange={(e) => setThirdPriority(e.target.value)}
              onClick={toggleThird}
            >
              <option value="3순위">3순위</option>
              <option value="time">피해야하는 시간</option>
              <option value="good">선호하는 교수님</option>
              <option value="bad">피하고싶은 교수님</option>
            </select>
            <img
              className="ordering_triangle"
              src={isThirdOpen ? up : down}
              alt="toggle"
            />
          </div>
        </div>
        <span className="ordering_alert"></span>
        <button className="ordering_nextButton" onClick={goNext}>
          우선순위 결정 완료
        </button>
      </div>
    </div>
  );
};

export default SndOrding;
