import React, { useEffect, useState } from "react";
import JsonData from "../../assets/data/Wine-Data.json";
import ReactECharts from "echarts-for-react";
import DataVisualizationWrapper from "./styled.DataVisualization";
const DataVisualization = () => {
  const [data, setData] = useState(JsonData);
  const [averageAMalic, setAverageAMalic] = useState(0);
  const [averageBMalic, setAverageBMalic] = useState(0);
  const [averageCMalic, setAverageCMalic] = useState(0);
  const [options, setOptions] = useState({});
  const [scatter, setScatter] = useState([]);
  const [screenSize, getDimension] = useState({
    dynamicWidth: window.innerWidth,
    dynamicHeight: window.innerHeight,
  });
  const [scatterOptions, setScatterOptions] = useState({});

  //Calculate function of Mallic Acid of Different Alcohold
  const averageCalculate = (categoryData, type) => {
    const Malic = categoryData.map((ele) => ele["Malic Acid"]);
    const averageData = (
      Malic.reduce((a, b) => a + b, 0) / Malic.length
    ).toFixed(2);

    type == "A"
      ? setAverageAMalic(averageData)
      : type == "B"
      ? setAverageBMalic(averageData)
      : setAverageCMalic(averageData);
  };
  const setDimension = () => {
    getDimension({
      dynamicWidth: window.innerWidth,
      dynamicHeight: window.innerHeight,
    });
  };

  useEffect(() => {
    //options for different type Bar-Chart
    setOptions({
      grid: {
        left:
          screenSize.dynamicWidth <= 576
            ? 20
            : screenSize.dynamicWidth <= 768
            ? 30
            : 60,
        top: 12,
        right: 11,
        bottom: 30,
      },
      color: ["pink"],
      xAxis: {
        type: "category",
        data: ["A", "B", "C"],
        axisLabel: { fontSize: 16, color: "darkBlue", fontWeight: 800 },
        axisLine: { lineStyle: { color: "cyan", width: 3 } },
      },
      yAxis: {
        type: "value",
        axisLabel: { fontSize: 18, color: "darkBlue", fontWeight: 800 },
        axisLine: {
          lineStyle: { color: "cyan", width: 3 },
          symbolSize: 9,
        },
      },
      textStyle: {
        fontSize: 20,
      },

      series: [
        {
          data: [averageAMalic, averageBMalic, averageCMalic],
          type: "bar",
          smooth: true,
        },
      ],
    });
  }, [averageAMalic, averageBMalic, averageCMalic, screenSize]);
  useEffect(() => {
    //options for Scatter Plot
    setScatterOptions({
      grid: {
        left:
          screenSize.dynamicWidth <= 576
            ? 20
            : screenSize.dynamicWidth <= 768
            ? 30
            : 40,
        top: 12,
        right: 11,
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
          data: scatter,
          type: "scatter",
          smooth: true,
        },
      ],
    });
  }, [scatter, screenSize]);
  useEffect(() => {
    window.addEventListener("resize", setDimension);

    return () => {
      window.removeEventListener("resize", setDimension);
    };
  }, [screenSize]);

  useEffect(() => {
    const items = data;
    const HuesData = items.map((ele) => ele.Hue);
    const ColorIntensityData = items.map((ele) => ele["Color intensity"]);

    const scatterData = HuesData.map((value, index) => {
      return [value, ColorIntensityData[index]];
    });
    setScatter(scatterData);

    const categoryA = [];
    const categoryB = [];
    const categoryC = [];
    items.map((ele, index) => {
      ele.Alcohol === 1
        ? categoryA.push(ele)
        : ele.Alcohol === 2
        ? categoryB.push(ele)
        : categoryC.push(ele);
    });

    averageCalculate(categoryA, "A");
    averageCalculate(categoryB, "B");
    averageCalculate(categoryC, "C");
  }, []);

  return (
    <DataVisualizationWrapper>
      <div className="container">
        <div className="container__heading">
          <span>Data Visualization</span>{" "}
        </div>
        <div className="container__body">
          <div className="container__body__graph1">
            <ReactECharts option={scatterOptions} />

            <span>Scatter-Plot</span>
          </div>
          <div className="container__body__graph2">
            <ReactECharts option={options} />
            <span>Bar-Chart</span>
          </div>
        </div>
      </div>
    </DataVisualizationWrapper>
  );
};
export default DataVisualization;
