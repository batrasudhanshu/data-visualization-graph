import React from "react";
import ReactECharts from "echarts-for-react";
const BarChartComponent = (data) => {
  return (
    <div className="graph2">
      <ReactECharts option={data.data} />
      <span className="graph_name">Bar-Chart</span>
    </div>
  );
};

export default BarChartComponent;
