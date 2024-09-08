import React, { useEffect } from "react";

import filter from "../../assets/img/filter.png";
import back from "../../assets/img/back.png";
import "./ManualRandomLoading.css";

const ManualRandomLoading = () => {
  const name = localStorage.getItem("name");
  useEffect(() => {
    const timer1 = setTimeout(() => {
      document.body.classList.add("fade-out");
    }, 10000);

    return () => {
      clearTimeout(timer1);
    };
  }, []);
  return (
    <div className="sfl_container">
      <img src={back} className="goback" />
      <img src={filter} className="sfl_filter" />
      <div className="sfl_main">
        <span className="sfl_main_first">
          마지막으로, {name.substring(1, 3)} 님이 선택한 정보를
        </span>
        <span className="sfl_main_second">
          기반으로 시간표를 만드는 중이예요!
        </span>
      </div>
    </div>
  );
};

export default ManualRandomLoading;
