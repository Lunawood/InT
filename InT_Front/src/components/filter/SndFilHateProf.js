import React, { useState, useEffect } from "react";

import "./SndFilHateProf.css"; // 파일명도 바꾸는 것이 좋습니다
import back from "../../assets/img/back.png";
import up from "../../assets/img/up_triangle.png";
import down from "../../assets/img/down_triangle.png";
import ai from "../../assets/img/ai.png";
import axios from "axios";

const SndFilHateProf = () => {
  // 컴포넌트 이름도 바꿉니다
  const [isLoading, setIsLoading] = useState(true);
  const [expandedCourse, setExpandedCourse] = useState(null);
  const [selectedHateProfessors, setSelectedHateProfessors] = useState([]);
  const [courses, setCourses] = useState([]);
  const name = localStorage.getItem("name");
  const getData = async () => {
    const cs = localStorage.getItem("courses");
    const id = localStorage.getItem("id");
    const response = await axios.post(
      "http://18.140.185.78:8000/timetablepage/sndFilLikeProf/",
      {
        courses: cs,
        id: id,
      }
    );
    const css = await response.data.courses;
    setCourses(css);
    setIsLoading(false);
  };
  useEffect(() => {
    // 컴포넌트가 마운트될 때 로컬 스토리지에서 선택된 교수님 데이터를 로드합니다.
    getData();
  }, []);

  const toggleCourse = (id) => {
    setExpandedCourse(expandedCourse === id ? null : id);
  };

  const selectHateProfessor = (courseName, professor) => {
    let newSelectedHateProfessors = [...selectedHateProfessors];
    const existingIndex = newSelectedHateProfessors.findIndex(
      (item) => item.course === courseName
    );

    if (existingIndex !== -1) {
      newSelectedHateProfessors[existingIndex] = {
        course: courseName,
        professor,
      };
    } else {
      newSelectedHateProfessors.push({ course: courseName, professor });
    }

    setSelectedHateProfessors(newSelectedHateProfessors);
    localStorage.setItem(
      "selectedHateProfessors",
      JSON.stringify(newSelectedHateProfessors)
    );
  };

  const goBack = () => {
    window.location.href = "/sndFilLikeCheck";
  };

  const goSkip = () => {
    localStorage.setItem("selectedHateProfessors", JSON.parse([]));
    window.location.href = "/sndFilLoading";
  };

  const goNext = () => {
    window.location.href = "/sndFilHateCheck"; // '싫어하는 교수' 검증 페이지로 넘어갑니다
  };
  const getAi = () => {
    window.location.href = "http://18.140.185.78:8501";
  };
  return (
    <div className="sfhp_container">
      <img src={ai} className="ai" onClick={getAi} />
      <img className="goback" src={back} onClick={goBack} alt="Go back"></img>
      <div className="sfhp_title1">
        {name.substring(1, 3)} 님의 스타일과 맞지 않는
      </div>
      <div className="sfhp_title2">교수님을 선택해 주세요!</div>
      <div className="sfhp_content">
        <div className="sfhp_courseInfo">
          {isLoading ? (
            <div className="sfhp_courseInfo_loading">
              <span>교수님 목록 로딩중!</span>
              <span>잠시만 기다려주세요!</span>
            </div>
          ) : (
            courses.map((course) => (
              <div
                key={course.id}
                className={`course ${
                  expandedCourse === course.id ? "expanded" : ""
                }`}
              >
                <div
                  className="course-info"
                  onClick={() => toggleCourse(course.id)}
                >
                  <span className="course-title">과목 {course.id}</span>
                  <span className="course-name">{course.name}</span>
                  <span className="arrow">
                    {expandedCourse === course.id ? (
                      <img src={up} className="sflp_triangle" alt="collapse" />
                    ) : (
                      <img src={down} className="sflp_triangle" alt="expand" />
                    )}
                  </span>
                </div>
                {expandedCourse === course.id && (
                  <div className="professor-list">
                    {course.professors.map((professor) => (
                      <div
                        key={professor}
                        className={`professor-name ${
                          selectedHateProfessors.find(
                            (item) =>
                              item.course === course.name &&
                              item.professor === professor
                          )
                            ? "selected"
                            : ""
                        }`}
                        onClick={() =>
                          selectHateProfessor(course.name, professor)
                        }
                      >
                        {professor}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
        <div className="sfhp_buttons">
          <button className="sfhp_skipButton" onClick={goSkip}>
            그냥 넘어갈래요
          </button>
          <button className="sfhp_nextButton" onClick={goNext}>
            다 골랐어요!
          </button>
        </div>
      </div>
    </div>
  );
};

export default SndFilHateProf;
