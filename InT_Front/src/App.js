import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Home from "./pages/Home.js";
import "./App.css";
import Login from "./pages/Login.js";
import Timetable from "./pages/Timetable.js";
import Signup from "./pages/Signup.js";
import FindID from "./pages/FindID.js";
import FindPW from "./pages/FindPW.js";
import Taste from "./pages/Taste.js";
import HomeAftLog from "./pages/HomeAftLog.js";
import HomeTimetable from "./components/HomeAftLog/HomeTimetable.js";
import Schedule from "./components/Schedule.js";
import FirstFilteringLoading from "./components/filter/FirstFilteringLoading.js";
import FirstFiltering from "./components/filter/FirstFiltering.js";
import FirstFilteringTimetable from "./components/filter/FirstFilteringTimetable.js";
import FirstFilteringQuestion from "./components/filter/FirstFilteringQuestion.js";
import FirstFilteringDecide from "./components/filter/FirstFilteringDecide.js";
import SndFilTimeCheck from "./components/filter/SndFilTimeCheck.js";
import SndFilLikeProf from "./components/filter/SndFilLikeProf.js";
import SndFilLikeCheck from "./components/filter/SndFilLikeCheck.js";
import SndFilHateProf from "./components/filter/SndFilHateProf.js";
import SndFilHateCheck from "./components/filter/SndFilHateCheck.js";
import SndFilLoading from "./components/filter/SndFilLoading.js";
import SndFilDecide from "./components/filter/SndFilDecide.js";
import SndHateTime from "./components/filter/SndHateTime.js";
import ManualStartQ from "./components/manual/manualStartQ.js";
import ManualAutoQ from "./components/manual/manualAutoQ.js";
import ManualAddManual from "./components/manual/ManualAddManual.js";
import ManualAddRandom from "./components/manual/ManualAddRandom.js";
import SndOrding from "./components/filter/SndOrdering.js";
import ManualRandomSelect from "./components/manual/ManualRandomSelect.js";

function App() {
  const [message, setMessage] = useState("");

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/homeAftLog" element={<HomeAftLog />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/timetable" element={<Timetable />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/findId" element={<FindID />}></Route>
          <Route path="/findPw" element={<FindPW />}></Route>
          <Route path="/taste" element={<Taste />}></Route>
          <Route path="/homeTimetable" element={<HomeTimetable />}></Route>
          <Route
            path="/firstFilteringLoading"
            element={<FirstFilteringLoading></FirstFilteringLoading>}
          ></Route>
          <Route
            path="/firstFiltering"
            element={<FirstFiltering></FirstFiltering>}
          ></Route>
          <Route
            path="/firstFilteringTimetable"
            element={<FirstFilteringTimetable></FirstFilteringTimetable>}
          ></Route>
          <Route
            path="/firstFilteringQuestion"
            element={<FirstFilteringQuestion></FirstFilteringQuestion>}
          ></Route>
          <Route
            path="/firstFilteringDecide"
            element={<FirstFilteringDecide></FirstFilteringDecide>}
          ></Route>
          <Route
            path="/sndHateTime"
            element={<SndHateTime></SndHateTime>}
          ></Route>
          <Route
            path="/sndFilTimeCheck"
            element={<SndFilTimeCheck></SndFilTimeCheck>}
          ></Route>
          <Route
            path="/sndFilLikeProf"
            element={<SndFilLikeProf></SndFilLikeProf>}
          ></Route>
          <Route
            path="/sndFilLikeCheck"
            element={<SndFilLikeCheck></SndFilLikeCheck>}
          ></Route>
          <Route
            path="/sndFilHateProf"
            element={<SndFilHateProf></SndFilHateProf>}
          ></Route>
          <Route
            path="/sndFilHateCheck"
            element={<SndFilHateCheck></SndFilHateCheck>}
          ></Route>
          <Route
            path="/sndFilLoading"
            element={<SndFilLoading></SndFilLoading>}
          ></Route>
          <Route
            path="/sndFilDecide"
            element={<SndFilDecide></SndFilDecide>}
          ></Route>
          <Route
            path="/manualStartQ"
            element={<ManualStartQ></ManualStartQ>}
          ></Route>
          <Route
            path="/manualAutoQ"
            element={<ManualAutoQ></ManualAutoQ>}
          ></Route>
          <Route
            path="/manualAddManual"
            element={<ManualAddManual></ManualAddManual>}
          ></Route>
          <Route
            path="/manualAddRandom"
            element={<ManualAddRandom></ManualAddRandom>}
          ></Route>
          <Route path="/sndOrdering" element={<SndOrding></SndOrding>}></Route>
          <Route
            path="/manualRandomSelect"
            element={<ManualRandomSelect></ManualRandomSelect>}
          ></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
