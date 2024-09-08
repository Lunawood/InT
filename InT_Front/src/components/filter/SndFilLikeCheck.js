import React, { useState, useEffect } from "react";
import "./SndFilLikeCheck.css";
import back from "../../assets/img/back.png";

const SndFilLikeCheck = () => {
  const [likedCourses, setLikedCourses] = useState([]);
  const name = localStorage.getItem("name");
  useEffect(() => {
    // 로컬 스토리지에서 데이터를 가져옴
    const storedLikedCourses = JSON.parse(
      localStorage.getItem("selectedLikeProfessors")
    );
    if (storedLikedCourses && storedLikedCourses.length > 0) {
      setLikedCourses(storedLikedCourses);
    } else {
      setLikedCourses([]); // 데이터가 없으면 빈 배열로 설정
    }
  }, []);

  const goBack = () => {
    window.location.href = "/sndFilLikeProf";
  };

  const goNext = () => {
    window.location.href = "/sndFilHateProf";
  };

  return (
    <div className="sflc_container">
      <img className="goback" src={back} onClick={goBack} alt="Go back" />
      <div className="sflc_title1">
        {name.substring(1, 3)} 님이 원하는 교수님 수업이에요.
      </div>
      <div className="sflc_title2">정보가 정확한지 확인해 주세요!</div>
      <div className="sflc_content">
        <div className="sflc_line"></div>
        <div className="sflc_infoContainer">
          {likedCourses.length > 0 ? (
            likedCourses.map((item, index) => (
              <div key={index} className="sflc_info">
                {item.course.split(", ")[1]}, {item.professor}
              </div>
            ))
          ) : (
            <div className="sflc_alert">선택된 과목이 없습니다.</div>
          )}
        </div>
        <div className="sflc_buttons">
          <button className="sflc_againButton" onClick={goBack}>
            다시 선택할래요
          </button>
          <button className="sflc_nextButton" onClick={goNext}>
            네, 일치해요
          </button>
        </div>
      </div>
    </div>
  );
};

export default SndFilLikeCheck;
