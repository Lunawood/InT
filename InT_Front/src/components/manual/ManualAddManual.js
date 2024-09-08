import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import axios from 'axios';
import BottomSheet from "./ManualBottomSheet";
import back from "../../assets/img/back.png";
import Schedule from "../Schedule";
import bulb from "../../assets/img/lightbulb.png";
import "./ManualAddManual.css";

const BaseDiv = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ManualAddManual = () => {
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [select, setSelect] = useState("");
  const [totalCredits, setTotalCredits] = useState(0);
  const [courseList, setCourseList] = useState([]);
  const [timetable, setTimetable] = useState([]);
  const [department, setDepartment] = useState([]);

  const getData = async () => {
    try {
      const id = localStorage.getItem("id");
      const response = await axios.post(
        "http://18.140.185.78:8000/timetablepage/manualAddManual/",
        { id: id }
      );
      const course = await response.data.course;
      const schedule = await response.data.schedule;
      const departments = await response.data.department;
      const credits = await response.data.credits;

      setCourseList(course);
      setTimetable(schedule);
      setDepartment(departments);
      setTotalCredits(credits);


    } catch (error) {
      console.error("Failed to fetch courses:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const search = async () => {
    try {
      const id = localStorage.getItem("id");
      const response = await axios.post(
        "http://18.140.185.78:8000/timetablepage/allFindCourse/",
        {
          id: id,
          input: select,
        }
      );
      const list = await response.data.course;
      setCourseList(list);
    } catch (e) {
      console.log(e);
    }
  };

  const handleCourseClick = async (course) => {
    try {
      const id = localStorage.getItem("id");
      const response = await axios.post(
        "http://18.140.185.78:8000/timetablepage/addCourse/",
        {
          id: id,
          course: course,
        }
      );

      const updatedSchedule = await response.data.schedule;
      const updatedCredits = await response.data.credits;
      setTimetable(updatedSchedule);
      setTotalCredits(updatedCredits);
      const courseName = course.split(", ")[2].trim();
      const courseCredit = parseFloat(course.split(", ")[4]);

      if (!selectedCourses.includes(courseName)) {
        setSelectedCourses((prevSelectedCourses) => [
          ...prevSelectedCourses,
          courseName,
        ]);
      }
    } catch (error) {
      alert("해당 과목을 추가할 수 없습니다.");
      console.error("Failed to update schedule:", error);
    }
  };

  const handleCourseRemove = async (courseName) => {
    try {
      const id = localStorage.getItem("id");
      const response = await axios.post(
        "http://18.140.185.78:8000/timetablepage/removeCourse/",
        {
          id: id,
          courseName: courseName,
        }
      );
      const updatedSchedule = await response.data.schedule;
      const updatedCredits = await response.data.credits;
      setTimetable(updatedSchedule);
      setTotalCredits(updatedCredits);

      const course = courseList.find(c => c.split(", ")[2].trim() === courseName);
      if (course) {
        const courseCredit = parseFloat(course.split(", ")[4]);
        setSelectedCourses((prevSelectedCourses) =>
          prevSelectedCourses.filter((c) => c !== courseName)
        );
      }
    } catch (error) {
      console.error("Failed to update schedule:", error);
    }
  };

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const goHome = () => {
    navigate("/homeAftLog?check=true");
  };

  return (
    <BaseDiv>
      <img className="mam_goback" src={back} onClick={goBack} alt="Go Back"></img>
      <div className="mam_Button" onClick={goHome}>확정하기</div>
      <div className="mam_content">
        <div className="mam_alert">
          {selectedCourses.length === 0 ? (
            <div className="mam_info">
              <div className="mam_infoTitle">
                <img className="mam_infoImg" src={bulb} alt="Info"></img>
                <div className="mam_infoText">아직 추가한 과목이 없어요!</div>
              </div>
              <div className="mam_infoSubtext">
                아래 창을 드래그하여 원하는 과목을 직접 선택하여
                <br />시간표에 추가해 주세요.
              </div>
            </div>
          ) : (
            <div className="mam_selectedCoursesContainer">
              <span>현재 선택 과목 :</span>
              {selectedCourses.map((courseName, index) => (
                <div
                  key={courseName}
                  className="mam_selectedCourse"
                  onClick={() => handleCourseRemove(courseName)}
                >
                  <span className="mam_selected_course_span">
                    {courseName}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="mam_timetable">
          <Schedule schedule={timetable} />
        </div>
      </div>
      <BottomSheet
        handleCourseClick={handleCourseClick}
        search={search}
        setSelect={setSelect}
        department={department}
        setDepartment={setDepartment}
        totalCredits={totalCredits}
        setTotalCredits={setTotalCredits}
        selectedCourses={selectedCourses}
        courseList={courseList}
        setCourseList={setCourseList}
      />
    </BaseDiv>
  );
};

export default ManualAddManual;
