import React, { useState, useEffect } from "react";
import axios from 'axios';
import "./ManualContent.css";

import find from "../../assets/img/find.png";
import star from "../../assets/img/star.png";

const years = ['1학년', '2학년', '3학년', '4학년', '전체'];
const credits = ['1.0', '2.0', '3.0', '4.0'];

const DropdownButton = ({ label, options, selectedOption, onSelect, className }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option) => {
    if (selectedOption === option) {
      onSelect(''); // 선택된 옵션을 다시 클릭하면 해제 (기본값으로 설정)
    } else {
      onSelect(option);
    }
    setIsOpen(false);
  };

  const getDisplayText = (text) => {
    return text && text.length > 11 ? `${text.substring(0, 11)}...` : text;
  };

  return (
    <div className={`mc_dropdown ${className}`}>
      <button onClick={() => setIsOpen(!isOpen)}>
        {selectedOption ? getDisplayText(selectedOption) : label}
        <span className="dropdown-caret">&#9662;</span> {/* 드롭다운 화살표 추가 */}
      </button>
      {isOpen && (
        <ul className="mc_dropdown-menu">
          {options.map((option, index) => (
            <li key={index} onClick={() => handleSelect(option)}>
              <input 
                type="radio" 
                id={`option-${label}-${index}`}  // 고유한 ID 설정
                name={`dropdown-options-${label}`} // name 속성도 고유하게 설정
                checked={selectedOption === option}
                readOnly 
              />
              <label htmlFor={`option-${label}-${index}`}>{getDisplayText(option)}</label>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const ManualContent = ({ handleCourseClick, search, setSelect, department, setDepartment, totalCredits, setTotalCredits, selectedCourses, courseList = [], setCourseList }) => {
  const [filters, setFilters] = useState({ department: '', subjectType: '', year: '', credits: '' });
  const [subjectTypes, setSubjectTypes] = useState(['전공필수', '전공선택', '핵심교양1']);

  const filter = async (filterType, value) => {
    const newFilters = { ...filters, [filterType]: value || '' }; // 필터값이 없으면 기본값으로 설정
    setFilters(newFilters);
    try {
      const id = localStorage.getItem("id");
      const searchText = localStorage.getItem("searchText");
      const response = await axios.post(
        "http://18.140.185.78:8000/timetablepage/filteringCourse/",
        {
          id: id,
          input: newFilters,
          search: searchText,
        }
      );
      const list = await response.data.course;
      setCourseList(list);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSearch = () => {
    const searchText = localStorage.getItem("searchText");
    search(searchText);
  };

  const handleInputChange = (e) => {
    const searchText = e.target.value;
    setSelect(searchText);
    localStorage.setItem("searchText", searchText);
  };

  return (
    <div className="mc_container">
      {/* 지금 몇 학점 담겨있는지 */}
      <div className="mc_title">현재 {totalCredits} 학점이 시간표에 담겨있어요. </div>
      
      {/* 검색 */}
      <div className="mc_search">
        <input
          type="text"
          placeholder="학과명, 과목명, 학수번호를 입력하세요."
          className="mc_input"
          onChange={handleInputChange}
        ></input>
        <img src={find} className="mc_find" onClick={handleSearch} alt="search icon" />
      </div>

      {/* 필터링 */}
      <div className="mc_filterButtons">
        <DropdownButton
          label="학과/교양"
          options={department}
          selectedOption={filters.department}
          onSelect={(value) => filter('department', value)}
        />
        <DropdownButton
          label="과목구분"
          options={subjectTypes}
          selectedOption={filters.subjectType}
          onSelect={(value) => filter('subjectType', value)}
        />
        <DropdownButton
          label="학년"
          options={years}
          selectedOption={filters.year}
          onSelect={(value) => filter('year', value)}
          className="year" /* 학년 버튼에 특정 클래스 추가 */
        />
        <DropdownButton
          label="학점"
          options={credits}
          selectedOption={filters.credits}
          onSelect={(value) => filter('credits', value)}
          className="credits" /* 학점 버튼에 특정 클래스 추가 */
        />
      </div>

      {/* 전체 과목 */}
      <div className="mc_total_course">
        {courseList && courseList.map((course, index) => (
          <div className="mc_course" key={course.split(", ")[1]}>
            <div className="mc_line"></div>
            <div className="mc_courseInfoContainer">
              <div className="mc_courseInfo">
                <div className="mc_courseType">
                  <div className="mc_courseNum">{course.split(", ")[1]}</div>
                  <div className="mc_courseMajorOrNot">{course.split(", ")[5]}</div>
                  <div className="mc_courseGrade">
                    {course.split(", ")[3] !== "전체" ? `${course.split(", ")[3]}학년` : course.split(", ")[4]}
                  </div>
                  <div className="mc_courseCredit">
                    {parseFloat(course.split(", ")[4])}학점
                  </div>
                  <div className="mc_courseRate">
                    <img className="mc_courseRateImg" src={star} alt="star rating" />
                    <div className="mc_courseRateText">{course.split(", ")[10]}</div>
                  </div>
                </div>
                <div className="mc_courseName">{course.split(", ")[2]}</div>
                <div className="mc_courseProfTime">
                  <div className="mc_courseProf">{course.split(", ")[7]}</div>
                  <div className="mc_courseTime">{course.split(", ")[6]}</div>
                </div>
                <div className="mc_courseSubinfo">
                  <div className="mc_courseExamTitle">평가방식</div>
                  <div className="mc_courseExam">{course.split(", ")[8]}</div>
                  <div className="mc_courseEtcTitle">비고</div>
                  <div className="mc_courseEtc">{course.split(", ")[9] ? course.split(",")[9] : "없음"}</div>
                </div>
              </div>
              <div className="mc_addButton" onClick={() => handleCourseClick(course)}>추가</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManualContent;
