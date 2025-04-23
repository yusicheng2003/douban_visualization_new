import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactECharts from 'echarts-for-react';

const MovieDurationPieChart = () => {
  const [option, setOption] = useState({});

  useEffect(() => {
    axios.get('http://localhost:5000/api/runtime-ranges').then((res) => {
      const data = res.data;
      setOption({
        title: {
          text: '电影时长分布',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} 部 ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: '电影数量',
            type: 'pie',
            radius: '50%',
            data,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
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

export default MovieDurationPieChart;
