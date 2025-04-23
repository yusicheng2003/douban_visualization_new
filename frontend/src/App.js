import React from 'react';
import MovieRatingChart from './component/MovieRatingChart';
import TopDirectorsChart from './component/TopDirectorsChart';
import MovieTypeChart from './component/MovieTypeChart';
import MovieDurationPieChart from './component/MovieDurationPieChart';

function App() {
  return (
    <div className="App">
      <h1>豆瓣数据可视化</h1>
      <MovieRatingChart />
      <TopDirectorsChart />
      <MovieTypeChart />
      <MovieDurationPieChart />
    </div>
  );
}

export default App;

