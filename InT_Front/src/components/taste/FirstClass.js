import { useEffect } from "react";
import "./FirstClass.css";

const FirstClass = () => {
  useEffect(() => {
    const value = JSON.parse(sessionStorage.getItem("value"));
    if (value.length > 1) {
      const newVal = [];
      newVal.push(value[0]);
      sessionStorage.setItem("value", JSON.stringify(newVal));
    } else if (value.length === 0) {
      window.location.href = "/taste?time=";
    }
  });
  const click0 = (event) => {
    event.preventDefault();
    let value = JSON.parse(sessionStorage.getItem("value"));
    value.push(0);
    sessionStorage.setItem("value", JSON.stringify(value));
    window.location.href = "/taste?time=true&first_class=true&empty_time=";
  };
  const click1 = (event) => {
    event.preventDefault();
    let value = JSON.parse(sessionStorage.getItem("value"));
    value.push(1);
    sessionStorage.setItem("value", JSON.stringify(value));
    window.location.href = "/taste?time=true&first_class=true&empty_time=";
  };
  const click2 = (event) => {
    event.preventDefault();
    let value = JSON.parse(sessionStorage.getItem("value"));
    value.push(2);
    sessionStorage.setItem("value", JSON.stringify(value));
    window.location.href = "/taste?time=true&first_class=true&empty_time=";
  };
  const click3 = (event) => {
    event.preventDefault();
    let value = JSON.parse(sessionStorage.getItem("value"));
    value.push(3);
    sessionStorage.setItem("value", JSON.stringify(value));
    window.location.href = "/taste?time=true&first_class=true&empty_time=";
  };
  const click4 = (event) => {
    event.preventDefault();
    let value = JSON.parse(sessionStorage.getItem("value"));
    value.push(4);
    sessionStorage.setItem("value", JSON.stringify(value));
    window.location.href = "/taste?time=true&first_class=true&empty_time=";
  };
  return (
    <div className="firstClass_container">
      <div className="progress-bar-container">
        <div className="progress-bar">
          <div className="progress2"></div>
        </div>
      </div>
      <div className="firstClass_title">
        1교시 수업,
        <br />
        최대 며칠까지 가능한가요?
      </div>
      <div className="firstClass_line"></div>
      <div className="firstClass_buttonContainer">
        <button onClick={click0} className="firstClass_btn">
          안돼요
        </button>
        <button onClick={click1} className="firstClass_btn">
          하루 정도는 괜찮아요
        </button>
        <button onClick={click2} className="firstClass_btn">
          이틀까지는 괜찮아요
        </button>
        <button onClick={click3} className="firstClass_btn">
          사흘까지는 괜찮아요
        </button>
        <button onClick={click4} className="firstClass_btn">
          상관 없어요
        </button>
      </div>
    </div>
  );
};

export default FirstClass;
