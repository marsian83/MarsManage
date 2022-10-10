import React, { Component } from "react";
import CanvasJSReact from "../lib/canvasjs.react";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
class StackedBarGraph extends Component {
  constructor() {
    super();
    this.toggleDataSeries = this.toggleDataSeries.bind(this);
  }
  toggleDataSeries(e) {
    if (typeof e.dataSeries.visible === "undefined" || e.dataSeries.visible) {
      e.dataSeries.visible = false;
    } else {
      e.dataSeries.visible = true;
    }
    this.chart.render();
  }
  render() {
    function getPreviousDay(date = new Date()) {
      const previous = new Date(date.getTime());
      previous.setDate(date.getDate() - 1);

      return previous;
    }

    function getPastDay(date = new Date(), count) {
      if (count === 1) {
        return getPreviousDay(date);
      }
      return getPastDay(getPreviousDay(date), count - 1);
    }
    let tms = this.props.tms || {};
    let tmy = this.props.tmy || {};
    let tmy2 = this.props.tmy2 || {};
    let tmy3 = this.props.tmy3 || {};
    let tmy4 = this.props.tmy4 || {};
    let tmy5 = this.props.tmy5 || {};
    let tmy6 = this.props.tmy6 || {};

    let day = new Date();

    const options = {
      animationEnabled: true,
      theme: "light2",
      title: {
        text: this.props.title || "Weekly Data",
      },
      axisX: {
        valueFormatString: "DD-MMM",
      },
      axisY: {
        suffix: " hrs",
      },
      toolTip: {
        shared: true,
      },
      legend: {
        cursor: "pointer",
        itemclick: this.toggleDataSeries,
      },
      data: [
        {
          type: "stackedBar",
          name: "Work",
          showInLegend: "true",
          color: "#51cda0",
          xValueFormatString: "DD, MMM",
          yValueFormatString: "##.# hrs",
          dataPoints: [
            { x: day, y: (tms["work"] || 0) / 60 },
            { x: getPastDay(day, 1), y: (tmy["work"] || 0) / 60 },
            { x: getPastDay(day, 2), y: (tmy2["work"] || 0) / 60 },
            { x: getPastDay(day, 3), y: (tmy3["work"] || 0) / 60 },
            { x: getPastDay(day, 4), y: (tmy4["work"] || 0) / 60 },
            { x: getPastDay(day, 5), y: (tmy5["work"] || 0) / 60 },
            { x: getPastDay(day, 6), y: (tmy6["work"] || 0) / 60 },
          ],
        },
        {
          type: "stackedBar",
          name: "Meeting",
          showInLegend: "true",
          color: "rgb(51, 200, 255)",
          xValueFormatString: "DD, MMM",
          yValueFormatString: "##.# hrs",
          dataPoints: [
            { x: day, y: (tms["meeting"] || 0) / 60 },
            { x: getPastDay(day, 1), y: (tmy["meeting"] || 0) / 60 },
            { x: getPastDay(day, 2), y: (tmy2["meeting"] || 0) / 60 },
            { x: getPastDay(day, 3), y: (tmy3["meeting"] || 0) / 60 },
            { x: getPastDay(day, 4), y: (tmy4["meeting"] || 0) / 60 },
            { x: getPastDay(day, 5), y: (tmy5["meeting"] || 0) / 60 },
            { x: getPastDay(day, 6), y: (tmy6["meeting"] || 0) / 60 },
          ],
        },
        {
          type: "stackedBar",
          name: "Non-working",
          showInLegend: "true",
          color: "rgb(183,183,183)",
          xValueFormatString: "DD, MMM",
          yValueFormatString: "##.# hrs",
          dataPoints: [
            {
              x: day,
              y: 24 - ((tms["meeting"] || 0) + (tms["work"] || 0)) / 60,
            },
            {
              x: getPastDay(day, 1),
              y: 24 - ((tmy["meeting"] || 0) + (tmy["work"] || 0)) / 60,
            },
            {
              x: getPastDay(day, 2),
              y: 24 - ((tmy2["meeting"] || 0) + (tmy2["work"] || 0)) / 60,
            },
            {
              x: getPastDay(day, 3),
              y: 24 - ((tmy3["meeting"] || 0) + (tmy3["work"] || 0)) / 60,
            },
            {
              x: getPastDay(day, 4),
              y: 24 - ((tmy4["meeting"] || 0) + (tmy4["work"] || 0)) / 60,
            },
            {
              x: getPastDay(day, 5),
              y: 24 - ((tmy5["meeting"] || 0) + (tmy5["work"] || 0)) / 60,
            },
            {
              x: getPastDay(day, 6),
              y: 24 - ((tmy6["meeting"] || 0) + (tmy6["work"] || 0)) / 60,
            },
          ],
        },
      ],
    };
    return (
      <div>
        <CanvasJSChart options={options} onRef={(ref) => (this.chart = ref)} />
      </div>
    );
  }
}
export default StackedBarGraph;
