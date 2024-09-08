import React, { useEffect, useRef } from "react";

const Schedule = ({ schedule }) => {
  const canvasRef = useRef(null);
  const days = ["월", "화", "수", "목", "금", "웹"];
  const times = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  const colors = [
    "#add8e6",
    "#ffcccc",
    "#90ee90",
    "#a995f5",
    "#ffd700",
    "#ffa07a",
    "#dda0dd",
    "#8fbc8f",
  ];
  const subjectColors = {};

  schedule.forEach((item, index) => {
    if (!subjectColors[item.subject]) {
      subjectColors[item.subject] =
        colors[Object.keys(subjectColors).length % colors.length];
    }
    schedule[index].color = subjectColors[item.subject];
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const canvasWidth = 300;
    const canvasHeight = 600;
    const cellWidth = (canvasWidth - 40) / days.length;
    const cellHeight = (canvasHeight - 40) / times.length;
    const headerHeight = 40;
    const headerWidth = 40;

    // 캔버스 초기화
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // 그리드 그리기
    ctx.strokeStyle = "#ddd";
    for (let i = 0; i <= days.length; i++) {
      ctx.beginPath();
      ctx.moveTo(headerWidth + i * cellWidth, 0);
      ctx.lineTo(
        headerWidth + i * cellWidth,
        headerHeight + times.length * cellHeight
      );
      ctx.stroke();
    }
    for (let i = 0; i <= times.length; i++) {
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
    times.forEach((time, index) => {
      const displayTime = time > 12 ? time - 12 : time;
      ctx.fillText(
        displayTime,
        headerWidth / 2 - ctx.measureText(displayTime).width / 2,
        headerHeight + index * cellHeight + cellHeight / 2 + 4
      );
    });

    // 스케줄 그리기
    schedule.forEach((item) => {
      const dayIndex = days.indexOf(item.day);
      const timeIndex = times.indexOf(Math.floor(item.time));
      if (dayIndex === -1 || timeIndex === -1) return;

      const startX = headerWidth + dayIndex * cellWidth;
      const startY =
        headerHeight + timeIndex * cellHeight + (item.time % 1) * cellHeight;
      const rectWidth = cellWidth;
      const rectHeight = cellHeight * item.duration;

      ctx.fillStyle = item.color;
      ctx.fillRect(startX, startY, rectWidth, rectHeight);

      ctx.fillStyle = "#000";
      ctx.font = '10px "Open Sans"';
      const textWidth = cellWidth - 8;
      const subjectLines = wrapText(ctx, item.subject, textWidth);
      const roomLines = wrapText(ctx, item.room, textWidth);
      const professorLines = wrapText(ctx, item.professor, textWidth);

      let offsetY = startY + 14;
      subjectLines.forEach((line, lineIndex) => {
        ctx.fillText(line, startX + 4, offsetY);
        offsetY += 12;
      });
      roomLines.forEach((line, lineIndex) => {
        ctx.fillText(line, startX + 4, offsetY);
        offsetY += 12;
      });
      professorLines.forEach((line, lineIndex) => {
        ctx.fillText(line, startX + 4, offsetY);
        offsetY += 12;
      });
    });
  }, [schedule]);

  const wrapText = (ctx, text, maxWidth) => {
    let words = text.split("");
    let lines = [];
    let line = "";

    words.forEach((char, index) => {
      let testLine = line + char;
      let metrics = ctx.measureText(testLine);
      let testWidth = metrics.width;
      if (testWidth > maxWidth && line.length > 0) {
        lines.push(line);
        line = char;
      } else {
        line = testLine;
      }
    });
    lines.push(line);
    return lines;
  };

  return <canvas ref={canvasRef} width={300} height={600} />;
};

export default Schedule;
