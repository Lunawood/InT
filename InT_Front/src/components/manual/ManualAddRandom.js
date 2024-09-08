import React, { useState, useEffect } from "react";
import "./ManualAddRandom.css";
import back from "../../assets/img/back.png";
import add from "../../assets/img/add.png";
import remove from "../../assets/img/remove.png";
import ai from "../../assets/img/ai.png";
import axios from "axios";

const credits = Array.from({ length: 30 }, (_, i) => (i + 1).toString());
const subjectTypes = ["전공필수", "전공선택", "교양필수"];
const liberalTypes = [
  "핵심교양 1",
  "핵심교양 2",
  "핵심교양 3",
  "핵심교양 4",
  "핵심교양 5",
  "핵심교양 6",
  "일반교양",
];

const DropdownButton = ({ label, options, onSelect, className, id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelect = (option) => {
    if (selectedOption === option) {
      setSelectedOption(null); // 선택된 옵션을 다시 클릭하면 해제
      onSelect(null);
    } else {
      setSelectedOption(option);
      onSelect(option);
    }
    setIsOpen(false);
  };

  const getDisplayText = (text) => {
    return text && text.length > 4 ? `${text.substring(0, 4)}...` : text;
  };

  return (
    <div className={`mar_dropdown ${className}`}>
      <button onClick={() => setIsOpen(!isOpen)}>
        {selectedOption ? getDisplayText(selectedOption) : label}
        <span className="mar_dropdown-caret">&#9662;</span>{" "}
        {/* 드롭다운 화살표 추가 */}
      </button>
      {isOpen && (
        <ul className="mar_dropdown-menu">
          {options.map((option, index) => (
            <li key={index} onClick={() => handleSelect(option)}>
              <input
                type="radio"
                id={`${id}-${index}`} // 고유한 ID 설정
                name={`dropdown-options-${id}`} // name 속성도 고유하게 설정
                checked={selectedOption === option}
                readOnly
              />
              <label htmlFor={`${id}-${index}`}>{option}</label>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const ManualAddRandom = () => {
  const [selectedMajorConditions, setSelectedMajorConditions] = useState([]);
  const [selectedLiberalConditions, setSelectedLiberalConditions] = useState(
    []
  );
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const storedMajorConditions = JSON.parse(
      localStorage.getItem("selectedMajorConditions")
    );
    const storedLiberalConditions = JSON.parse(
      localStorage.getItem("selectedLiberalConditions")
    );

    if (storedMajorConditions) {
      setSelectedMajorConditions(storedMajorConditions);
    }
    if (storedLiberalConditions) {
      setSelectedLiberalConditions(storedLiberalConditions);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "selectedMajorConditions",
      JSON.stringify(selectedMajorConditions)
    );
  }, [selectedMajorConditions]);

  useEffect(() => {
    localStorage.setItem(
      "selectedLiberalConditions",
      JSON.stringify(selectedLiberalConditions)
    );
  }, [selectedLiberalConditions]);

  const getDepartmentData = async () => {
    const response = await axios.post(
      "http://18.140.185.78:8000/timetablepage/departments/"
    );
    const data = await response.data.department;
    setDepartments(data);
  };

  useEffect(() => {
    getDepartmentData();
  }, []);

  const goBack = () => {
    window.location.href = "/manualAutoQ";
  };

  const goSelect = () => {
    window.location.href = "/manualRandomSelect";
  };

  const getAi = () => {
    window.location.href = "http://18.140.185.78:8501";
  };

  const addMajorCondition = () => {
    setSelectedMajorConditions([
      ...selectedMajorConditions,
      { credits: "", department: "", subjectType: "" },
    ]);
  };

  const removeMajorCondition = (index) => {
    console.log(index);
    const newConditions = selectedMajorConditions.filter((_, i) => i !== index);
    console.log(newConditions);
    setSelectedMajorConditions(newConditions);
    localStorage.setItem(
      "selectedMajorConditions",
      JSON.stringify(newConditions)
    ); // 로컬 스토리지 업데이트
  };

  const updateMajorCondition = (index, field, value) => {
    const newConditions = [...selectedMajorConditions];
    newConditions[index][field] = value;
    setSelectedMajorConditions(newConditions);
  };

  const addLiberalCondition = () => {
    setSelectedLiberalConditions([
      ...selectedLiberalConditions,
      { credits: "", liberalType: "" },
    ]);
  };

  const removeLiberalCondition = (index) => {
    const newConditions = selectedLiberalConditions.filter(
      (_, i) => i !== index
    );
    setSelectedLiberalConditions(newConditions);
    localStorage.setItem(
      "selectedLiberalConditions",
      JSON.stringify(newConditions)
    ); // 로컬 스토리지 업데이트
  };

  const updateLiberalCondition = (index, field, value) => {
    const newConditions = [...selectedLiberalConditions];
    newConditions[index][field] = value;
    setSelectedLiberalConditions(newConditions);
  };

  return (
    <div className="mar_container">
      <img src={ai} className="ai" onClick={getAi} />
      <img className="goback" src={back} onClick={goBack} alt="Go back" />
      <div className="mar_title">자동 추가 기능</div>
      <div className="mar_content">
        <div className="mar_line"></div>
        <div className="mar_majorTtile">
          <div className="mar_majorText">전공과목</div>
          <img
            className="mar_majorImg"
            src={add}
            onClick={addMajorCondition}
            alt="Add major condition"
          />
        </div>
        {selectedMajorConditions.length === 0 ? (
          <div className="mar_majorContent">
            아직 전공 과목에 대한 조건이 없어요!
            <br />+ 버튼을 눌러 원하는 조건을 입력해주세요.
          </div>
        ) : (
          <div className="conditions-container">
            {selectedMajorConditions.map((condition, index) => (
              <div key={index} className="condition-box1">
                <div className="mar_major1">
                  <img
                    className="remove"
                    src={remove}
                    onClick={() => removeMajorCondition(index)}
                    alt="Remove condition"
                  />
                  <DropdownButton
                    id={`major-credits-${index}`}
                    label="학점"
                    options={credits}
                    onSelect={(value) =>
                      updateMajorCondition(index, "credits", value)
                    }
                  />
                  학점을
                  <DropdownButton
                    id={`major-department-${index}`}
                    label="학과"
                    options={departments}
                    onSelect={(value) =>
                      updateMajorCondition(index, "department", value)
                    }
                  />
                  학과의
                </div>
                <div className="mar_major2">
                  <DropdownButton
                    id={`major-subjectType-${index}`}
                    label="과목구분"
                    options={subjectTypes}
                    onSelect={(value) =>
                      updateMajorCondition(index, "subjectType", value)
                    }
                  />
                  으로 채워주세요!
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="mar_liberalTtile">
          <div className="mar_liberalText">교양과목</div>
          <img
            className="mar_liberalImg"
            src={add}
            onClick={addLiberalCondition}
            alt="Add liberal condition"
          />
        </div>
        {selectedLiberalConditions.length === 0 ? (
          <div className="mar_liberalContent">
            아직 교양 과목에 대한 조건이 없어요!
            <br />+ 버튼을 눌러 원하는 조건을 입력해주세요.
          </div>
        ) : (
          <div className="conditions-container">
            {selectedLiberalConditions.map((condition, index) => (
              <div key={index} className="condition-box2">
                <div className="mar_liberal1">
                  <img
                    className="remove"
                    src={remove}
                    onClick={() => removeLiberalCondition(index)}
                    alt="Remove condition"
                  />
                  <DropdownButton
                    id={`liberal-credits-${index}`}
                    label="학점"
                    options={credits}
                    onSelect={(value) =>
                      updateLiberalCondition(index, "credits", value)
                    }
                  />
                  학점을
                  <DropdownButton
                    id={`liberal-type-${index}`}
                    label="교양구분"
                    options={liberalTypes}
                    onSelect={(value) =>
                      updateLiberalCondition(index, "liberalType", value)
                    }
                  />
                  으로 채워주세요!
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="mar_button" onClick={goSelect}>
          자동으로 선택하기
        </div>
      </div>
    </div>
  );
};

export default ManualAddRandom;
