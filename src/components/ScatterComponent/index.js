import React from "react";

import ReactECharts from "echarts-for-react";
const ScatterComponent = (data) => {
  return (
    <div className="graph1">
      <ReactECharts option={data.data} />

      <span className="graph_name">Scatter-Plot</span>
    </div>
  );
};

export default ScatterComponent;
