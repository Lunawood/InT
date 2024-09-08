import React, { useState, useEffect } from "react";

import "./SndFilLikeProf.css";
import back from "../../assets/img/back.png";
import up from "../../assets/img/up_triangle.png";
import down from "../../assets/img/down_triangle.png";
import ai from "../../assets/img/ai.png";
import axios from "axios";

const SndFilLikeProf = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [expandedCourse, setExpandedCourse] = useState(null);
  const [selectedLikeProfessors, setSelectedLikeProfessors] = useState([]);
  const [courses, setCourses] = useState([]);
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

  const selectLikeProfessor = (courseName, professor) => {
    let newSelectedLikeProfessors = [...selectedLikeProfessors];
    const existingIndex = newSelectedLikeProfessors.findIndex(
      (item) => item.course === courseName
    );

    if (existingIndex !== -1) {
      newSelectedLikeProfessors[existingIndex] = {
        course: courseName,
        professor,
      };
    } else {
      newSelectedLikeProfessors.push({ course: courseName, professor });
    }

    setSelectedLikeProfessors(newSelectedLikeProfessors);
    localStorage.setItem(
      "selectedLikeProfessors",
      JSON.stringify(newSelectedLikeProfessors)
    );
  };

  const goBack = () => {
    window.location.href = "/sndFilTimeCheck";
  };

  const goSkip = () => {
    localStorage.setItem("selectedLikeProfessors", JSON.parse([]));
    window.location.href = "/sndFilHateProf";
  };
  const goNext = () => {
    window.location.href = "/sndFilLikeCheck";
  };
  const getAi = () => {
    window.location.href = "http://18.140.185.78:8501";
  };
  return (
    <div className="sflp_container">
      <img src={ai} className="ai" onClick={getAi} />
      <img className="goback" src={back} onClick={goBack}></img>
      <div className="sflp_title1">다음으로, 과목 별로 가장 듣고 싶은</div>
      <div className="sflp_title2">교수님을 선택해 주세요!</div>
      <div className="sflp_content">
        <div className="sflp_courseInfo">
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
                  <span className="course-title">과목 {course.id} </span>
                  <span className="course-name"> {course.name} </span>
                  <span className="arrow">
                    {expandedCourse === course.id ? (
                      <img src={up} className="sflp_triangle" />
                    ) : (
                      <img src={down} className="sflp_triangle" />
                    )}
                  </span>
                </div>
                {expandedCourse === course.id && (
                  <div className="professor-list">
                    {course.professors.map((professor) => (
                      <div
                        key={professor}
                        className={`professor-name ${
                          selectedLikeProfessors.find(
                            (item) =>
                              item.course === course.name &&
                              item.professor === professor
                          )
                            ? "selected"
                            : ""
                        }`}
                        onClick={() =>
                          selectLikeProfessor(course.name, professor)
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
        <div className="sflp_buttons">
          <button className="sflp_skipButton" onClick={goSkip}>
            그냥 넘어갈래요
          </button>
          <button className="sflp_nextButton" onClick={goNext}>
            다 골랐어요!
          </button>
        </div>
      </div>
    </div>
  );
};

export default SndFilLikeProf;
