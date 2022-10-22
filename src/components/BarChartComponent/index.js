import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
const BarChartComponent = (props) => {
  //Calculate function of Mallic Acid of Different Alcohold
  const alcoholItems = props.alcohols;

  const [options, setOptions] = useState({});

  const averageCalculate = (items) => {
    let avgMap = new Map();
    for (let i = 0; i < items.length; i++) {
      let alcoholItem = items[i];

      let records = { sum: alcoholItem["Malic Acid"], count: 1 };
      if (!avgMap[alcoholItem.Alcohol]) {
        avgMap[alcoholItem.Alcohol] = records;
      } else {
        let oldRecords = {
          sum: avgMap[alcoholItem.Alcohol].sum,
          count: avgMap[alcoholItem.Alcohol].count,
        };
        avgMap[alcoholItem.Alcohol] = {
          sum: oldRecords.sum + records.sum,
          count: oldRecords.count + records.count,
        };
      }
    }

    for (var x in avgMap) {
      avgMap[x] = Number((avgMap[x].sum / avgMap[x].count).toFixed(2));
    }
    return avgMap;
  };

  useEffect(() => {
    let arrKeys = [];
    let arrValues = [];
    let avgValue = averageCalculate(alcoholItems);

    arrKeys = Object.keys(avgValue);
    arrValues = Object.values(avgValue);
    setOptions({
      grid: {
        left:
          window.innerWidth <= 576 ? 20 : window.innerWidth <= 768 ? 30 : 40,
        top: 12,
        right: 12,
        bottom: 30,
      },
      color: ["pink"],
      xAxis: {
        type: "category",
        data: arrKeys,
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
          data: arrValues,
          type: "bar",
          smooth: true,
        },
      ],
    });
  }, [alcoholItems]);

  return (
    <div className="graph2">
      <ReactECharts option={options} />
      <span className="graph_name">Bar-Chart</span>
    </div>
  );
};

export default BarChartComponent;
