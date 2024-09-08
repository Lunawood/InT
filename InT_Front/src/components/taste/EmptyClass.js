import { useEffect } from "react";
import info from "../../assets/img/Information.png";
import "./EmptyClass.css";
import instance from "../../access/instance";
import axios from "axios";
const EmptyClass = () => {
  useEffect(() => {
    const value = JSON.parse(sessionStorage.getItem("value"));
    if (value.length == 1) {
      window.location.href = "/taste?time=true&first_class=";
    } else if (value.length > 2) {
      let newVal = [];
      for (let i = 0; i < 2; i++) {
        newVal.push(value[i]);
      }
      sessionStorage.setItem("value", JSON.stringify(newVal));
    }
  });
  const ClickYes = async () => {
    //서버 데이터 보내기
    let value = JSON.parse(sessionStorage.getItem("value"));
    value.push(true);
    const id = localStorage.getItem("id");
    try {
      //axios -> instance로 바꾸면 됨!
      const reponse = await axios.post(
        "http://18.140.185.78:8000/taste/",
        {
          taste: value,
          id: id,
        }
      );
    } catch (e) {
      console.log(e);
    }
    sessionStorage.clear();
    window.location.href = "/homeAftLog";
  };
  const ClickNo = async () => {
    //서버 데이터 보내기
    let value = JSON.parse(sessionStorage.getItem("value"));
    value.push(false);
    const id = localStorage.getItem("id");
    try {
      const reponse = await axios.post(
        "http://18.140.185.78:8000/taste/",
        {
          taste: value,
          id: id,
        }
      );
    } catch (e) {
      console.log(e);
    }
    sessionStorage.clear();
    window.location.href = "/homeAftLog";
  };
  return (
    <div className="emptyClass_container">
      <div className="progress-bar-container">
        <div className="progress-bar">
          <div className="progress3"></div>
        </div>
      </div>
      <div className="emptyClass_title">우주 공강을 선호하시나요?</div>
      <div className="emptyClass_info">
        <img className="emptyClass_infoImg" src={info} />
        <div className="emptyClass_infoTxt">
          우주 공강은 3시간 이상 공강이 생기는 것을 말해요!
        </div>
      </div>
      <div className="emptyClass_line"></div>
      <div className="emptyClass_buttonContainer">
        <button className="emptyClass_btn" onClick={ClickYes}>
          우주 공강 좋아요!
        </button>
        <button className="emptyClass_btn" onClick={ClickNo}>
          우주 공강 싫어요!
        </button>
      </div>
    </div>
  );
};

export default EmptyClass;
