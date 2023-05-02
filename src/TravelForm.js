import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TravelForm.css';

const TravelForm = () => {
    const [month, setMonth] = useState('');
    const [duration, setDuration] = useState('1');
    const [budget, setBudget] = useState('');
    const [where, setWhere] = useState('추천해줘');
    const [keyword, setKeyword] = useState('');
    const [purpose, setPurpose] = useState('');
    const [accompany, setAccompany] = useState('혼자');
  
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const formData = {
        month,
        duration,
        budget,
        where,
        keyword,
        purpose,
        accompany,
      };
  
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      };
  
      const response = await fetch('https://port-0-server-3nec02mlh6ed3go.sel4.cloudtype.app/api/recommend/', requestOptions);
      const data = await response.json();
      
      console.log(data)
      if (response.ok) {
        navigate("/recommendations", {state: data})
      } else {

      }
    };

  return (
    <div>
      <header>
        여행 정보 입력
      </header>

      <main>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="month">몇 월에 가고 싶은가요?</label>
            <input type="text" id="month" name="month" value={month} onChange={(e) => setMonth(e.target.value)} required />
          </div>

          <div className="form-group">
            <label htmlFor="duration">몇 박 며칠로 가실 건가요?</label>
            <select id="duration" name="duration" value={duration} onChange={(e) => setDuration(e.target.value)} >
              <option value="1">당일치기</option>
              <option value="2">1박 2일</option>
              <option value="3">2박 3일</option>
              <option value="4">3박 4일</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="budget">생각하고 있는 여행의 총 경비를 알려주세요</label>
            <input type="text" id="budget" name="budget" onChange={(e) => setBudget(e.target.value)} required />
          </div>

          <div className="form-group">
            <label htmlFor="where">어디로 가고싶으신가요? 나라와 지역을 입력해주세요. (추천받고 싶다면 비워주세요!)</label>
            <input type="text" id="where" name="where" onChange={(e) => setWhere(e.target.value)} />
          </div>

          <div className="form-group">
            <label htmlFor="keyword">본인의 관심사나, 여행 키워드를 알려주세요!</label>
            <input type="text" id="keyword" name="keyword" onChange={(e) => setKeyword(e.target.value)} required />
          </div>

          <div className="form-group">
            <label htmlFor="purpose">
              여행 목적을 알려주세요 (예: 휴양, 문화체험, 자연 경관 감상, 음식 탐방, 축제 참여 등)
            </label>
            <input type="text" id="purpose" name="purpose" onChange={(e) => setPurpose(e.target.value)} required />
          </div>

          <div className="form-group">
            <label htmlFor="accompany">여행을 누구랑 가시나요?</label>
            <select id="accompany" name="accompany" value={accompany} onChange={(e) => setAccompany(e.target.value)} >
              <option value="혼자">혼자</option>
              <option value="애인">애인</option>
              <option value="가족">가족</option>
              <option value="친구">친구</option>
              <option value="비즈니스">비즈니스</option>
            </select>
          </div>
          
          <button type="submit">여행지 추천받기!</button>
        </form>
      </main>

      <footer>
        Copyright © 2023 서강대학교 윤태호. All right Reserved.
      </footer>
    </div>
  );
};

export default TravelForm;
