import React from 'react';
import { useLocation } from 'react-router-dom';

const Recommendations = () => {
  const {state} = useLocation()


  return (
    <div>
      <h1>여행지 추천 결과</h1>
      {/* 추천 결과를 출력하는 로직을 작성하세요. */}
    </div>
  );
};

export default Recommendations;
