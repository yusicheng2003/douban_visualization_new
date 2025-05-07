// frontend/src/App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieRatingChart from './component/MovieRatingChart';
import TopDirectorsChart from './component/TopDirectorsChart';
import MovieTypeChart from './component/MovieTypeChart';
import MovieDurationPieChart from './component/MovieDurationPieChart';

const App = () => {
  // 用来存储后端返回的数据
  const [movieData, setMovieData] = useState({
    ratings: [],
    directors: [],
    types: [],
    durations: []
  });

  useEffect(() => {
    // 请求后端 API 获取电影评分数据
    axios.get('http://101.37.168.187:5000/api/top-movies')
      .then(response => {
        setMovieData(prevState => ({
          ...prevState,
          ratings: response.data
        }));
      })
      .catch(error => {
        console.error('Error fetching top movies data:', error);
      });

    // 请求后端 API 获取导演数据
    axios.get('http://101.37.168.187:5000/api/top-directors')
      .then(response => {
        setMovieData(prevState => ({
          ...prevState,
          directors: response.data
        }));
      })
      .catch(error => {
        console.error('Error fetching top directors data:', error);
      });

    // 请求后端 API 获取电影类型数据
    axios.get('http://101.37.168.187:5000/api/movie-types')
      .then(response => {
        setMovieData(prevState => ({
          ...prevState,
          types: response.data
        }));
      })
      .catch(error => {
        console.error('Error fetching movie types data:', error);
      });

    // 请求后端 API 获取电影时长数据
    axios.get('http://101.37.168.187:5000/api/runtime-ranges')
      .then(response => {
        setMovieData(prevState => ({
          ...prevState,
          durations: response.data
        }));
      })
      .catch(error => {
        console.error('Error fetching movie durations data:', error);
      });
  }, []);  // 空依赖数组表示只在组件挂载时执行一次

  return (
    <div className="App">
      <h1>豆瓣数据可视化</h1>

      {/* 电影评分图表 */}
      <MovieRatingChart data={movieData.ratings} />

      {/* 导演排行榜图表 */}
      <TopDirectorsChart data={movieData.directors} />

      {/* 电影类型图表 */}
      <MovieTypeChart data={movieData.types} />

      {/* 电影时长饼图 */}
      <MovieDurationPieChart data={movieData.durations} />
    </div>
  );
};

export default App;
