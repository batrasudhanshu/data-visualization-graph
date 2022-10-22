import React, { useEffect, useState } from "react";

import ReactECharts from "echarts-for-react";
const ScatterComponent = (props) => {
  const alcoholItems = props.alcohols;
  const [scatterOptions, setScatterOptions] = useState({});

  useEffect(() => {
    const HuesData = alcoholItems.map((ele) => ele.Hue);
    const ColorIntensityData = alcoholItems.map(
      (ele) => ele["Color intensity"]
    );
    const scatterData = HuesData.map((value, index) => {
      return [value, ColorIntensityData[index]];
    });
    setScatterOptions({
      grid: {
        left:
          window.innerWidth <= 576 ? 20 : window.innerWidth <= 768 ? 30 : 40,
        top: 12,
        right: 12,
        bottom: 30,
      },
      darkMode: "auto",
      color: ["red"],
      xAxis: {
        axisLabel: { fontSize: 18, color: "darkBlue", fontWeight: 800 },
        axisLine: { lineStyle: { color: "cyan", width: 3 } },
      },
      yAxis: {
        axisLabel: { fontSize: 18, color: "darkBlue", fontWeight: 800 },
        axisLine: { lineStyle: { color: "cyan", width: 3 } },
      },
      series: [
        {
          symbolSize: 10,
          data: scatterData,
          type: "scatter",
          smooth: true,
        },
      ],
    });
  }, [alcoholItems]);

  return (
    <div className="graph1">
      <ReactECharts option={scatterOptions} />

      <span className="graph_name">Scatter-Plot</span>
    </div>
  );
};

export default ScatterComponent;
