// TopDirectorsChart.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactECharts from 'echarts-for-react';

const TopDirectorsChart = () => {
  const [option, setOption] = useState({});

  useEffect(() => {
    axios.get('http://localhost:5000/api/top-directors').then((res) => {
      const { xAxis, series } = res.data;
      setOption({
        title: {
          text: '出现次数最多的导演',
          left: 'center'
        },
       tooltip: {
          trigger: 'axis',
         axisPointer: {
           type: 'shadow'
          }
       },
        xAxis: {
         type: 'value'
        },
        yAxis: {
         type: 'category',
         data: xAxis,
         axisLabel: {
            interval: 0
          }
        },
        series: [
          {
           name: '出现次数',
           type: 'bar',
           data: series
         }
       ]
      });

    });
  }, []);

  return (
    <div style={{ width: '800px', margin: 'auto' }}>
      <ReactECharts option={option} style={{ height: 400 }} />
    </div>
  );
};

export default TopDirectorsChart;
