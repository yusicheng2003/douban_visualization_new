// src/components/MovieRatingChart.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactECharts from 'echarts-for-react';

const MovieRatingChart = () => {
  const [option, setOption] = useState({});

useEffect(() => {
  axios.get('http://localhost:5000/api/top-movies').then((res) => {
    const { xAxis, series } = res.data;
    setOption({
      title: { text: '豆瓣电影评分柱状图' },
      xAxis: { type: 'category', data: xAxis },
      yAxis: { type: 'value' },
      series: [{ type: 'bar', name: '评分', data: series }]
    });
  });
}, []);


  return (
    <div style={{ width: '800px', margin: 'auto' }}>
      <ReactECharts option={option} style={{ height: 400 }} />
    </div>
  );
};

export default MovieRatingChart;
