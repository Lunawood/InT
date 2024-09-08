import React, { useEffect, useRef, useState } from "react";
import back from "../../assets/img/back.png";
import "./SndHateTime.css";

const SndHateTime = () => {
  const canvasRef = useRef(null);
  const [selectedTimes, setSelectedTimes] = useState([]);

  const days = ["월", "화", "수", "목", "금"];
  const times = [9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8];

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const canvasWidth = 18.75 * 16; // 18.75rem in pixels
    const canvasHeight = 22 * 16; // 22rem in pixels
    const cellWidth = (canvasWidth - 40) / days.length;
    const cellHeight = (canvasHeight - 40) / (times.length * 2); // 행의 크기를 줄임
    const headerHeight = 40;
    const headerWidth = 40;

    const drawGrid = () => {
      // 캔버스 초기화
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      // 그리드 그리기
      ctx.strokeStyle = "#ddd";
      for (let i = 0; i <= days.length; i++) {
        ctx.beginPath();
        ctx.moveTo(headerWidth + i * cellWidth, 0);
        ctx.lineTo(
          headerWidth + i * cellWidth,
          headerHeight + times.length * 2 * cellHeight
        );
        ctx.stroke();
      }
      for (let i = 0; i <= times.length * 2; i++) {
        ctx.beginPath();
        ctx.moveTo(0, headerHeight + i * cellHeight);
        ctx.lineTo(
          headerWidth + days.length * cellWidth,
          headerHeight + i * cellHeight
        );
        ctx.stroke();
      }

      // 헤더 그리기
      ctx.fillStyle = "#000";
      ctx.font = 'bold 12px "Open Sans"';
      days.forEach((day, index) => {
        ctx.fillText(
          day,
          headerWidth +
            index * cellWidth +
            cellWidth / 2 -
            ctx.measureText(day).width / 2,
          headerHeight / 2 + 4
        );
      });
      for (let i = 0; i < times.length; i++) {
        ctx.fillText(
          times[i],
          headerWidth / 2 - ctx.measureText(times[i]).width / 2,
          headerHeight + i * cellHeight * 2 + cellHeight + 4
        );
      }
    };

    const drawSelections = () => {
      ctx.fillStyle = "rgba(0, 128, 0, 0.3)";
      selectedTimes.forEach(({ dayIndex, startTimeIndex, endTimeIndex }) => {
        ctx.fillRect(
          headerWidth + dayIndex * cellWidth,
          headerHeight + startTimeIndex * cellHeight,
          cellWidth,
          (endTimeIndex - startTimeIndex + 1) * cellHeight
        );
      });
    };

    drawGrid();
    drawSelections();
  }, [selectedTimes]);

  useEffect(() => {
    const canvas = canvasRef.current;
    let isDragging = false;
    let startDayIndex = null;
    let startTimeIndex = null;

    const getMousePosition = (event) => {
      const rect = canvas.getBoundingClientRect();
      return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
    };

    const getCellFromPosition = (x, y) => {
      const canvasWidth = 18.75 * 16; // 18.75rem in pixels
      const canvasHeight = 22 * 16; // 22rem in pixels
      const cellWidth = (canvasWidth - 40) / days.length;
      const cellHeight = (canvasHeight - 40) / (times.length * 2); // 행의 크기를 줄임
      const headerHeight = 40;
      const headerWidth = 40;

      const dayIndex = Math.floor((x - headerWidth) / cellWidth);
      const timeIndex = Math.floor((y - headerHeight) / cellHeight);

      return { dayIndex, timeIndex };
    };

    const handleMouseDown = (event) => {
      isDragging = true;
      const { x, y } = getMousePosition(event);
      const { dayIndex, timeIndex } = getCellFromPosition(x, y);
      startDayIndex = dayIndex;
      startTimeIndex = timeIndex;
    };

    const handleMouseUp = (event) => {
      if (isDragging) {
        isDragging = false;
        const { x, y } = getMousePosition(event);
        const { dayIndex, timeIndex } = getCellFromPosition(x, y);
        if (
          startDayIndex !== null &&
          startTimeIndex !== null &&
          dayIndex !== null &&
          timeIndex !== null
        ) {
          const newSelections = [];

          const day = days[startDayIndex];
          const startTimeIndexFinal = Math.min(startTimeIndex, timeIndex);
          const endTimeIndexFinal = Math.max(startTimeIndex, timeIndex);

          const existingIndex = selectedTimes.findIndex(
            (selection) =>
              selection.dayIndex === startDayIndex &&
              selection.startTimeIndex <= endTimeIndexFinal &&
              selection.endTimeIndex >= startTimeIndexFinal
          );

          if (existingIndex !== -1) {
            // 이미 선택된 시간 범위 내에서 클릭한 경우 해당 시간 범위를 분할 또는 제거
            const updatedTimes = [...selectedTimes];
            const existingSelection = updatedTimes[existingIndex];

            if (
              existingSelection.startTimeIndex === startTimeIndexFinal &&
              existingSelection.endTimeIndex === endTimeIndexFinal
            ) {
              // 정확히 해당 시간 범위를 제거
              updatedTimes.splice(existingIndex, 1);
            } else if (
              existingSelection.startTimeIndex === startTimeIndexFinal
            ) {
              // 시작 부분만 제거
              existingSelection.startTimeIndex = endTimeIndexFinal + 1;
            } else if (existingSelection.endTimeIndex === endTimeIndexFinal) {
              // 끝 부분만 제거
              existingSelection.endTimeIndex = startTimeIndexFinal - 1;
            } else {
              // 중간 부분을 분할
              const newSelection = {
                dayIndex: startDayIndex,
                startTimeIndex: endTimeIndexFinal + 1,
                endTimeIndex: existingSelection.endTimeIndex,
              };
              existingSelection.endTimeIndex = startTimeIndexFinal - 1;
              updatedTimes.push(newSelection);
            }

            setSelectedTimes(updatedTimes);
          } else {
            // 새로운 선택 시간 범위를 추가
            newSelections.push({
              dayIndex: startDayIndex,
              startTimeIndex: startTimeIndexFinal,
              endTimeIndex: endTimeIndexFinal,
            });

            const updatedSelectedTimes = [...selectedTimes, ...newSelections];
            setSelectedTimes(updatedSelectedTimes);
          }
        }
      }
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mouseup", handleMouseUp);

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mouseup", handleMouseUp);
    };
  }, [selectedTimes]);

  const handleSave = () => {
    const mergedTimes = [];

    // 선택된 시간을 요일별로 그룹화
    const groupedTimes = selectedTimes.reduce((acc, curr) => {
      const { dayIndex, startTimeIndex, endTimeIndex } = curr;
      if (!acc[dayIndex]) {
        acc[dayIndex] = [];
      }
      acc[dayIndex].push({ startTimeIndex, endTimeIndex });
      return acc;
    }, {});

    // 그룹화된 시간대를 병합
    Object.keys(groupedTimes).forEach((dayIndex) => {
      const times = groupedTimes[dayIndex].sort(
        (a, b) => a.startTimeIndex - b.startTimeIndex
      );

      let mergedStart = times[0].startTimeIndex;
      let mergedEnd = times[0].endTimeIndex;

      for (let i = 1; i < times.length; i++) {
        if (times[i].startTimeIndex <= mergedEnd + 1) {
          mergedEnd = Math.max(mergedEnd, times[i].endTimeIndex);
        } else {
          mergedTimes.push({
            dayIndex: parseInt(dayIndex, 10),
            startTimeIndex: mergedStart,
            endTimeIndex: mergedEnd,
          });
          mergedStart = times[i].startTimeIndex;
          mergedEnd = times[i].endTimeIndex;
        }
      }

      mergedTimes.push({
        dayIndex: parseInt(dayIndex, 10),
        startTimeIndex: mergedStart,
        endTimeIndex: mergedEnd,
      });
    });

    const savedTimes = mergedTimes.map(
      ({ dayIndex, startTimeIndex, endTimeIndex }) => {
        const day = days[dayIndex];
        const formatTime = (timeIndex) => {
          if (timeIndex >= times.length * 2) {
            return "21시"; // 8시 30분 이후를 9시로 표시
          }
          const hour = times[Math.floor(timeIndex / 2)];
          const minute = timeIndex % 2 === 0 ? "" : " 30분";
          const displayHour =
            hour >= 1 && hour <= 8
              ? `${hour + 12}시${minute}`
              : `${hour}시${minute}`;
          return displayHour.trim();
        };

        const displayStartTime = formatTime(startTimeIndex);
        const displayEndTime = formatTime(endTimeIndex + 1);

        return `${day}요일 ${displayStartTime} ~ ${displayEndTime}`;
      }
    );

    localStorage.setItem("time", JSON.stringify(savedTimes));
    window.location.href = "/sndFilTimeCheck";
  };

  const Skip = () => {
    localStorage.setItem("time", []);
    window.location.href = "/sndFilLikeProf";
  };
  const goBack = () => {
    window.location.href = "/firstFilteringQuestion";
  };
  return (
    <div className="hatetime_container">
      <img src={back} className="hatetime_img" onClick={goBack} />
      <div className="hatetime_header">
        <span>피해야 하는 시간을</span>
        <br />
        <span>모두 골라주세요!</span>
      </div>
      <div className="hatetime_ex">
        ex. 알바, 동아리 등 기타 일정과 겹치는 시간
      </div>
      <div className="hatetime_schedule">
        <canvas
          ref={canvasRef}
          style={{ width: "18.75rem", height: "22rem" }}
          width={18.75 * 16}
          height={22 * 16}
        />
      </div>
      <div className="hatetime_buttons">
        <button onClick={Skip}>그냥 넘어갈래요</button>
        <button onClick={handleSave}>다 골랐어요!</button>
      </div>
    </div>
  );
};

export default SndHateTime;
