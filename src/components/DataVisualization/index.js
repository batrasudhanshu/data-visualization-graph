import React, { useEffect, useState } from "react";
import JsonData from "../../assets/data/Wine-Data.json";
import ReactECharts from "echarts-for-react";
import DataVisualizationWrapper from "./styled.DataVisualization";
const DataVisualization = () => {
  const [data, setData] = useState(JsonData);
  const [Hues, setHues] = useState([]);
  const [ColorIntensity, setColorIntensity] = useState({});
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

  const getData = (url) => {
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        console.log("rew", response);
        return response.json();
      })
      .then(function (myJson) {
        console.log(myJson);
        //setData(myJson);
      });
  };
  const averageA = (categoryAData) => {
    const MalicA = categoryAData.map((ele) => ele["Malic Acid"]);
    const averageAData = (
      MalicA.reduce((a, b) => a + b, 0) / MalicA.length
    ).toFixed(2);
    setAverageAMalic(averageAData);
  };
  const averageB = (categoryBData) => {
    const MalicB = categoryBData.map((ele) => ele["Malic Acid"]);
    const averageBData = (
      MalicB.reduce((a, b) => a + b, 0) / MalicB.length
    ).toFixed(2);
    setAverageBMalic(averageBData);
  };
  const averageC = (categoryCData) => {
    const MalicC = categoryCData.map((ele) => ele["Malic Acid"]);
    const averageCData = (
      MalicC.reduce((a, b) => a + b, 0) / MalicC.length
    ).toFixed(2);
    setAverageCMalic(averageCData);
  };
  const setDimension = () => {
    getDimension({
      dynamicWidth: window.innerWidth,
      dynamicHeight: window.innerHeight,
    });
  };

  useEffect(() => {
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
    console.log(options);
  }, [averageAMalic, averageBMalic, averageCMalic, screenSize]);
  useEffect(() => {
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
    console.log(scatterData);
    setHues(HuesData);
    setColorIntensity(ColorIntensityData);
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
    averageA(categoryA);
    averageB(categoryB);
    averageC(categoryC);
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

          {console.log(screenSize.dynamicWidth)}
        </div>
      </div>
    </DataVisualizationWrapper>
  );
};
export default DataVisualization;
