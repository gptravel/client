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
        const response = await fetch("https://port-0-server-3nec02mlh6ed3go.sel4.cloudtype.app/api/generate-answer/", requestOptions);
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
    };

    fetchData();
  }, [state]);

  return (
    <div>
      <header>
        여행지 추천 결과
      </header>
      <main>
        {answer && (
          <div>
            <p dangerouslySetInnerHTML={{ __html: answer }}></p>
          </div>
        )}
        {/* <table>
        <tr>
            <th>시간</th>
            <td>지역</td>
            <td>비용</td>
            <td>시부야</td>
          </tr>
          <tr>
            <th>오전</th>
            <td>도쿄</td>
            <td>1만원</td>
            <td>시부야</td>
          </tr>
          <tr>
            <th>점심</th>
            <td>윤태호</td>
            <td>경영학</td>
            <td>20180863</td>
          </tr>
          <tr>
            <th>오후</th>
            <td>윤태호</td>
            <td>경영학</td>
            <td>20180863</td>
          </tr>
          <tr>
            <th>저녁</th>
            <td>윤태호</td>
            <td>경영학</td>
            <td>20180863</td>
          </tr>
        </table> */}
      </main>
      <footer>
        Copyright © 2023 서강대학교 윤태호. All right Reserved.
      </footer>
    </div>
  );
};

export default OpenAIComponent;
