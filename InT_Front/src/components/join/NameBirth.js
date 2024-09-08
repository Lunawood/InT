import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import "./NameBirth.css";
import back from "../../assets/img/back.png";
import good from "../../assets/img/check_good.png";
import bad from "../../assets/img/check_bad.png";
const NameBirth = () => {
  window.addEventListener("resize", () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  });

  useEffect(() => {
    sessionStorage.setItem("value", "");
  });
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [name, setName] = useState("");
  const currentYear = new Date().getFullYear();
  const [searchParams, setSeratchParams] = useSearchParams();
  const name_birth = searchParams.get("name_birth");

  const years = [];
  for (let y = currentYear; y >= 1900; y--) {
    years.push(y);
  }

  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  const days = [];
  for (let d = 1; d <= 31; d++) {
    days.push(d);
  }

  const goBack = () => {
    window.location.href = "/login";
    window.sessionStorage.setItem("value", "");
  };

  const goNext = (event) => {
    event.preventDefault();
    if (year !== "" && month !== "" && day !== "" && name !== "") {
      const value = [name, year + "-" + month + "-" + day];
      sessionStorage.setItem("value", JSON.stringify(value));
      setSeratchParams({ name_birth: true });
    }
  };
  return (
    <div className="entire">
      <img src={back} className="goback" onClick={goBack} />
      <div>
        <p className="nameBirthTitle1">이름과 생년월일을</p>
        <p className="nameBirthTitle2">알려주세요.</p>
      </div>
      <form>
        <div className="nameContent">
          <label className="nameTitle">이름</label>
          <div className="nameInput">
            <input
              className="nameInputBox"
              type="text"
              onChange={(e) => setName(e.target.value)}
              placeholder="이름을 입력해주세요."
            />
            {name !== "" ? (
              <img className="checkImg" src={good} />
            ) : (
              <img className="checkImg" src={bad} />
            )}
          </div>
        </div>
        <div className="birthContent">
          <label className="birthTitle">생년월일</label>
          <div className="birthInput">
            <select
              className="birthInputBox"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            >
              <option value="">연도</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>

            <select
              className="birthInputBox"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            >
              <option value="">월</option>
              {months.map((month) => (
                <option key={month} value={month}>
                  {month}월
                </option>
              ))}
            </select>

            <select
              className="birthInputBox"
              value={day}
              onChange={(e) => setDay(e.target.value)}
            >
              <option value="">일</option>
              {days.map((day) => (
                <option key={day} value={day}>
                  {day}일
                </option>
              ))}
            </select>
            {year !== "" && month !== "" && day !== "" ? (
              <img className="checkImg" src={good} />
            ) : (
              <img className="checkImg" src={bad} />
            )}
          </div>
        </div>
        <button className="nextButton" onClick={goNext}>
          다음으로 넘어가기
        </button>
      </form>
    </div>
  );
};

export default NameBirth;
