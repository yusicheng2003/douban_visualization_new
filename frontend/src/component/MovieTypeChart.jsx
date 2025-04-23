import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactECharts from 'echarts-for-react';

const MovieTypeChart = () => {
  const [option, setOption] = useState({});

  useEffect(() => {
    axios.get('http://localhost:5000/api/movie-types').then((res) => {
      const { xAxis, series } = res.data;

      // 构造饼图需要的 [{value, name}] 格式
      const dataPair = xAxis.map((name, index) => ({
        name,
        value: series[index]
      }));

      setOption({
        title: {
          text: '各类型电影数量占比',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: '类型数量',
            type: 'pie',
            radius: '50%',
            data: dataPair,
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

export default MovieTypeChart;
