import React, { useState, useEffect } from "react";
import "./SndFilHateCheck.css";
import back from "../../assets/img/back.png";

const SndFilHateCheck = () => {
  const [hatedCourses, setHatedCourses] = useState([]);

  useEffect(() => {
    // 로컬 스토리지에서 데이터를 가져옴
    const storedHatedCourses = JSON.parse(
      localStorage.getItem("selectedHateProfessors")
    );
    if (storedHatedCourses && storedHatedCourses.length > 0) {
      setHatedCourses(storedHatedCourses);
    } else {
      setHatedCourses([]); // 데이터가 없으면 빈 배열로 설정
    }
  }, []);

  const goBack = () => {
    window.location.href = "/sndFilHateProf";
  };

  const goNext = () => {
    window.location.href = "/sndOrdering";
  };

  return (
    <div className="sfhc_container">
      <img className="goback" src={back} onClick={goBack} alt="Go back" />
      <div className="sfhc_title1">스타일이 맞지 않는 교수님이에요.</div>
      <div className="sfhc_title2">정보가 정확한지 확인해 주세요!</div>
      <div className="sfhc_content">
        <div className="sfhc_line"></div>
        <div className="sfhc_infoContainer">
          {hatedCourses.length > 0 ? (
            hatedCourses.map((item, index) => (
              <div key={index} className="sflc_info">
                {item.course.split(", ")[1]}, {item.professor}
              </div>
            ))
          ) : (
            <div className="sfhc_alert">선택된 과목이 없습니다.</div>
          )}
        </div>
        <div className="sfhc_buttons">
          <button className="sfhc_againButton" onClick={goBack}>
            다시 선택할래요
          </button>
          <button className="sfhc_nextButton" onClick={goNext}>
            네, 일치해요
          </button>
        </div>
      </div>
    </div>
  );
};

export default SndFilHateCheck;
