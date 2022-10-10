import React from "react";
import CanvasJSReact from "../lib/canvasjs.react";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function PieChart(props) {
  let totalTime =
    Number(props.breakTime || 0) +
    Number(props.meetingTime || 0) +
    Number(props.workTime || 0);
  let breakAvg = props.breakTime
    ? 100 * (Number(props.breakTime) / totalTime)
    : 0;
  let meetingAvg = props.meetingTime
    ? 100 * (Number(props.meetingTime) / totalTime)
    : 0;
  let workAvg = props.workTime ? 100 * (Number(props.workTime) / totalTime) : 0;
  const options = {
    exportEnabled: true,
    animationEnabled: true,
    title: {
      text: props.title || "Pie Chart",
    },
    data: [
      {
        type: "pie",
        startAngle: 75,
        toolTipContent: "<b>{label}</b>: {y}%",
        indexLabel: "{}",
        showInLegend: "true",
        legendText: "{label}",
        dataPoints: [
          { y: Math.round(breakAvg) || 0, label: "Break", color: "#df7970" },
          {
            y: Math.round(meetingAvg) || 0,
            label: "Meeting",
            color: "rgb(51, 200, 255)",
          },
          {
            y: Math.round(workAvg) || 0,
            label: "Work",
            color: "#51cda0",
          },
        ],
      },
    ],
  };
  return (
    <>
      <div>
        <CanvasJSChart options={options} />
      </div>
    </>
  );
}
