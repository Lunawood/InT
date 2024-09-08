import React, { useState, useEffect } from "react";

import "./HomeTimetable.css";
import Schedule from "../Schedule";
import axios from "axios";

const HomeTimetable = () => {
  const [timetable, setTimetable] = useState([]);
  const getData = async () => {
    const id = localStorage.getItem("id");
    try {
      const response = await axios.post(
        "http://18.140.185.78:8000/homeTimetable/",
        {
          id: id,
        }
      );
      const schedule = await response.data.course.homepage_timetable;
      setTimetable(schedule);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="homeTimetable_container">
      <div className="homeTimetable_title">2024학년도 1학기</div>
      <div className="homeTimetable_content1">
        <div className="homeTimetable_content2">
          <Schedule schedule={timetable} />
        </div>
      </div>
    </div>
  );
};

export default HomeTimetable;
