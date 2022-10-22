import React, { useEffect, useState } from "react";
import JsonData from "../../assets/data/Wine-Data.json";
import styles from "./styled.DataVisualization.css";
import ScatterComponent from "../ScatterComponent";
import BarChartComponent from "../BarChartComponent";
const DataVisualization = () => {
  const data = JsonData;

  return (
    <>
      <div className="container">
        <div className="heading">
          <span className="heading_title">Data Visualization</span>{" "}
        </div>
        <div className="body">
          <ScatterComponent alcohols={data} />
          <BarChartComponent alcohols={data} />
        </div>
      </div>
    </>
  );
};
export default DataVisualization;
