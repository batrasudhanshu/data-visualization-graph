import React, { useEffect, useState } from "react";
import JsonData from "../../assets/data/Wine-Data.json";
import styles from "./styled.DataVisualization.css";
import ScatterComponent from "../ScatterComponent";
import BarChartComponent from "../BarChartComponent";
const DataVisualization = () => {
  const [data, setData] = useState(JsonData);
  const [averageMalic, setAverageMalic] = useState([]);
  const [types, setTypes] = useState([]);
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
    let avgObject = {};
    avgObject[type] = averageData || {};
    return avgObject;
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
        data: types,
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
          data: averageMalic,
          type: "bar",
          smooth: true,
        },
      ],
    });
  }, [averageMalic]);
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
  }, [scatter]);

  useEffect(() => {
    const items = data;
    const HuesData = items.map((ele) => ele.Hue);
    const ColorIntensityData = items.map((ele) => ele["Color intensity"]);

    const scatterData = HuesData.map((value, index) => {
      return [value, ColorIntensityData[index]];
    });
    setScatter(scatterData);

    const types = {};
    const arr = [];

    items.map((ele, index) => {
      if (types[ele.Alcohol.toString()]) {
        types[ele.Alcohol.toString()].push(ele);
      } else {
        types[ele.Alcohol.toString()] = [
          {
            ...ele,
          },
        ];
      }
    });
    let typesEle = Object.keys(types);

    for (let i = 0; i < typesEle.length; i++) {
      const element = typesEle[i];
      let result = averageCalculate(types[element], element);
      arr.push(Number(Object.values(result).toString()));
    }
    setTypes(typesEle);
    setAverageMalic(arr);
  }, []);

  return (
    <>
      <div className="container">
        <div className="heading">
          <span className="heading_title">Data Visualization</span>{" "}
        </div>
        <div className="body">
          <ScatterComponent data={scatterOptions} />
          <BarChartComponent data={options} />
        </div>
      </div>
    </>
  );
};
export default DataVisualization;
