// OpenAIComponent.js
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import './Recommendations.css'

const OpenAIComponent = () => {
  const { state } = useLocation();
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ state }),
      };

      try {
        const response = await fetch("http://127.0.0.1:8000/api/generate-answer/", requestOptions);
        // const response = null
        if (response.body) {
          const reader = response.body.getReader();
          let result = "";

          reader.read().then(async function processText({ done, value }) {
            if (done) {
              return;
            }

            result += new TextDecoder("utf-8").decode(value);
            setAnswer(result.replace(/\n/g, "<br/>"));
            return reader.read().then(processText);
          });
        }
      } catch (error) {
        console.error("Error fetching answer:", error);
      }
    } 

    fetchData();
  }, [state]);

  const displayLabel = (key) => {
    const labels = {
      month: "날짜",
      duration: "기간",
      where: "여행지",
      budget: "총예산",
      keyword: "여행키워드",
      purpose: "여행목적",
      accompany: "동행인",
    };

    return labels[key] || key;
  };

  return (
    <div>
      <header>
        여행지 추천 결과
      </header>
      <main>
        <div className="state-info">
          <h2>입력한 정보:</h2>
          {state &&
            Object.entries(state)
              .filter(([key]) => key !== "id") // id를 제외하고 필터링
              .map(([key, value]) => (
                <p key={key}>
                  {displayLabel(key)}: {value}
                </p>
              ))}
        </div>
        {answer && (
          <div class="answer">
            <div>
              {/* {`${month} / ${duration} / ${where} / ${budget} / ${keyword} / ${purpose} / ${accompany}`} */}
            </div>
            <p id="answer" dangerouslySetInnerHTML={{ __html: answer }}></p>
          </div>
        )}
      </main>
      <footer>
        Copyright © 2023 서강대학교 윤태호. All right Reserved.
      </footer>
    </div>
  );
};

export default OpenAIComponent;
